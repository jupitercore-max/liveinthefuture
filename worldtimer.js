// World Timer Clock
(function() {
  // Check if required elements exist
  const clockFace = document.getElementById('clockFace');
  if (!clockFace) return; // Exit if not on a page with the world timer

  const clockCities = document.getElementById('clockCities');
  const hourRing = document.getElementById('hourRing');
  const digitalTime = document.getElementById('digitalTime');
  const digitalDate = document.getElementById('digitalDate');
  const timezoneInfo = document.getElementById('timezoneInfo');

  // Home timezone state (null = use local)
  let homeTimezone = null;
  let homeCityName = null;

  // Get the browser's local timezone
  function getLocalTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  // Get current UTC offset for a timezone in hours
  function getTimezoneOffset(tz) {
    try {
      const now = new Date();
      const tzTime = new Date(now.toLocaleString('en-US', { timeZone: tz }));
      const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
      return (tzTime - utcTime) / (1000 * 60 * 60);
    } catch (e) {
      return 0;
    }
  }

  // Get home timezone offset in hours
  function getHomeOffset() {
    if (homeTimezone) {
      return getTimezoneOffset(homeTimezone);
    }
    return -new Date().getTimezoneOffset() / 60;
  }

  // Get the effective home timezone
  function getHomeTimezone() {
    return homeTimezone || getLocalTimezone();
  }

  // Animation state for city ring transitions
  let isAnimatingCities = false;
  let polarEarthAnimationOffset = 0; // Degrees, decays to 0 during animation

  // Day/night city label tinting state
  let lastCityTintUpdate = 0;
  const CITY_TINT_INTERVAL = 30000; // update every 30s
  // Hour chime state
  let chimeEnabled = localStorage.getItem('wt_chime') !== 'off';
  let lastChimeKey = '';
  let chimeToggle = null; // created later in DOM init

  // Mechanical tick sound state
  let tickEnabled = localStorage.getItem('wt_tick') === 'on'; // off by default
  let tickToggle = null; // created later in DOM init
  let lastTickBeat = -1; // track last played beat to avoid double-ticks
  let tickAudioCtx = null; // reuse AudioContext for ticks

  // Lume Shot mode state
  let lumeMode = localStorage.getItem('wt_lume') === 'on';
  let lumeToggle = null; // created later in DOM init
  if (lumeMode) document.body.classList.add('lume-mode');

  // ═══════════════════════════════════════════════════
  // Dynamic Hand Shadows — light source from crystal
  // reflection position creates realistic depth illusion
  // ═══════════════════════════════════════════════════
  let lightSourceX = 30; // % across clock face (synced with crystal)
  let lightSourceY = 22; // % down clock face

  // ═══════════════════════════════════════════════════
  // Alarm Complication (JLC Memovox style)
  // ═══════════════════════════════════════════════════
  let alarmArmed = false;
  let alarmHour = 7;   // 0-23
  let alarmMinute = 0;
  let alarmFiredKey = ''; // prevents re-fire within same minute
  let alarmRinging = false;
  let alarmRingStart = 0;
  const ALARM_RING_DURATION = 15000; // 15 seconds of ringing

  // Restore alarm from localStorage
  const savedAlarm = localStorage.getItem('wt_alarm');
  if (savedAlarm) {
    try {
      const a = JSON.parse(savedAlarm);
      alarmArmed = a.armed;
      alarmHour = a.hour;
      alarmMinute = a.minute;
    } catch (_) {}
  }

  function saveAlarm() {
    localStorage.setItem('wt_alarm', JSON.stringify({
      armed: alarmArmed, hour: alarmHour, minute: alarmMinute
    }));
  }

  function getAlarmAngleDeg() {
    // 12-hour dial: alarm hand points to hour+minute position
    const h12 = alarmHour % 12;
    return (h12 * 30) + (alarmMinute * 0.5);
  }

  function playAlarmSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      // Escalating bell pattern: 5 quick rings
      for (let i = 0; i < 5; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        // Rising frequency for urgency
        osc.frequency.value = 880 + i * 80;
        osc.type = 'sine';
        const t = ctx.currentTime + i * 0.18;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.start(t);
        osc.stop(t + 0.15);
      }
    } catch (_) {}
  }

  function checkAlarm(hours, minutes, seconds) {
    if (!alarmArmed) return;
    const key = hours + ':' + minutes;
    if (hours === alarmHour && minutes === alarmMinute && seconds < 2) {
      if (alarmFiredKey !== key) {
        alarmFiredKey = key;
        alarmRinging = true;
        alarmRingStart = Date.now();
        playAlarmSound();
        // Repeat sound every 2 seconds for duration
        const ringInterval = setInterval(() => {
          if (!alarmRinging || Date.now() - alarmRingStart > ALARM_RING_DURATION) {
            clearInterval(ringInterval);
            alarmRinging = false;
            const handEl = document.getElementById('alarmHand');
            if (handEl) handEl.classList.remove('ringing');
            return;
          }
          playAlarmSound();
        }, 2000);
        const handEl = document.getElementById('alarmHand');
        if (handEl) handEl.classList.add('ringing');
      }
    } else {
      alarmFiredKey = '';
    }
    // Auto-stop ringing after duration
    if (alarmRinging && Date.now() - alarmRingStart > ALARM_RING_DURATION) {
      alarmRinging = false;
      const handEl = document.getElementById('alarmHand');
      if (handEl) handEl.classList.remove('ringing');
    }
  }

  function updateAlarmHand() {
    const handEl = document.getElementById('alarmHand');
    if (!handEl) return;
    if (alarmArmed) {
      const deg = getAlarmAngleDeg();
      handEl.style.setProperty('--alarm-deg', deg + 'deg');
      handEl.style.transform = 'translateX(-50%) rotate(' + deg + 'deg)';
      handEl.classList.add('visible');
    } else {
      handEl.classList.remove('visible');
      handEl.classList.remove('ringing');
    }
  }

  function updateAlarmUI() {
    const statusEl = document.getElementById('alarmStatus');
    const barEl = document.getElementById('alarmBar');
    const inputEl = document.getElementById('alarmTimeInput');
    if (alarmArmed) {
      const hh = String(alarmHour).padStart(2, '0');
      const mm = String(alarmMinute).padStart(2, '0');
      if (statusEl) {
        statusEl.textContent = '⏰ ' + hh + ':' + mm;
        statusEl.classList.add('armed');
      }
      if (inputEl) inputEl.value = hh + ':' + mm;
    } else {
      if (statusEl) {
        statusEl.textContent = 'Off';
        statusEl.classList.remove('armed');
      }
    }
    updateAlarmHand();
  }

  // ═══════════════════════════════════════════════════
  // Bezel Drag Rotation State
  // Drag the outer city ring to rotate timezones,
  // like turning a real world timer bezel.
  // ═══════════════════════════════════════════════════
  let bezelDragging = false;
  let bezelDragStartAngle = 0;   // angle (deg) where drag began
  let bezelDragCurrentDelta = 0; // cumulative rotation delta in degrees
  let bezelDragMoved = false;    // true once drag exceeds threshold (distinguishes click vs drag)
  let bezelDragEndTime = 0;      // timestamp when drag ended, to suppress click
  let bezelLastDetent = 0;       // last crossed 15° detent index during drag
  let bezelClickCtx = null;      // shared AudioContext for bezel clicks

  // Set home timezone with animated transition
  function setHomeTimezone(tz, cityName) {
    if (isAnimatingCities) return; // Ignore clicks during animation

    const oldOffset = getHomeOffset();
    homeTimezone = tz;
    homeCityName = cityName;
    const newOffset = getHomeOffset();

    // Calculate rotation needed (15° per hour of offset difference)
    const rotationDelta = (newOffset - oldOffset) * 15;

    if (Math.abs(rotationDelta) < 0.1) {
      // No significant change, just rebuild
      positionCities();
      return;
    }

    // Animate the city ring rotation
    animateCityRing(rotationDelta);
  }

  // Reset to local timezone with animated transition
  function resetToLocalTimezone() {
    if (isAnimatingCities) return;

    const oldOffset = getHomeOffset();
    homeTimezone = null;
    homeCityName = null;
    const newOffset = getHomeOffset();

    const rotationDelta = (newOffset - oldOffset) * 15;

    if (Math.abs(rotationDelta) < 0.1) {
      positionCities();
      return;
    }

    animateCityRing(rotationDelta);
  }

  // Animate the city ring rotation
  function animateCityRing(rotationDelta) {
    isAnimatingCities = true;

    const svg = clockCities.querySelector('svg');
    if (!svg) {
      positionCities();
      isAnimatingCities = false;
      return;
    }

    // Get the center of the container for rotation
    const containerRect = clockCities.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    // Set up the transition for city labels
    svg.style.transition = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
    svg.style.transformOrigin = `${centerX}px ${centerY}px`;
    svg.style.transform = `rotate(${rotationDelta}deg)`;

    // Also animate the 24-hour ring - just set transition, updateClock will set new value
    hourRing.style.transition = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)';

    // Animate the polar earth by using an offset that decays over time
    // The offset starts at -rotationDelta so the map appears to stay in place initially
    polarEarthAnimationOffset = -rotationDelta;

    // After animation completes, rebuild the positions
    const onTransitionEnd = () => {
      svg.removeEventListener('transitionend', onTransitionEnd);
      svg.style.transition = '';
      svg.style.transform = '';

      hourRing.style.transition = '';
      polarEarthAnimationOffset = 0;

      positionCities();
      isAnimatingCities = false;
    };

    svg.addEventListener('transitionend', onTransitionEnd);

    // Fallback in case transitionend doesn't fire
    setTimeout(() => {
      if (isAnimatingCities) {
        onTransitionEnd();
      }
    }, 1600);
  }

  // Check if a city is currently in daylight (roughly 6am to 6pm local time)
  function isCityInDaylight(tz) {
    try {
      const now = new Date();
      const cityTime = new Date(now.toLocaleString('en-US', { timeZone: tz }));
      const hour = cityTime.getHours();
      return hour >= 6 && hour < 18;
    } catch (e) {
      return false;
    }
  }

  // Large pool of cities covering all offsets, with priority order
  const cityPool = [
    // UTC-11
    { name: 'Midway', tz: 'Pacific/Midway' },
    { name: 'Pago Pago', tz: 'Pacific/Pago_Pago' },
    // UTC-10
    { name: 'Honolulu', tz: 'Pacific/Honolulu' },
    { name: 'Tahiti', tz: 'Pacific/Tahiti' },
    // UTC-9
    { name: 'Anchorage', tz: 'America/Anchorage' },
    { name: 'Gambier', tz: 'Pacific/Gambier' },
    // UTC-8
    { name: 'LA', tz: 'America/Los_Angeles' },
    { name: 'San Francisco', tz: 'America/Los_Angeles' },
    { name: 'Vancouver', tz: 'America/Vancouver' },
    { name: 'Tijuana', tz: 'America/Tijuana' },
    // UTC-7
    { name: 'Denver', tz: 'America/Denver' },
    { name: 'Phoenix', tz: 'America/Phoenix' },
    { name: 'Calgary', tz: 'America/Edmonton' },
    // UTC-6
    { name: 'Chicago', tz: 'America/Chicago' },
    { name: 'Houston', tz: 'America/Chicago' },
    { name: 'Mexico City', tz: 'America/Mexico_City' },
    { name: 'Guatemala', tz: 'America/Guatemala' },
    // UTC-5
    { name: 'New York', tz: 'America/New_York' },
    { name: 'Miami', tz: 'America/New_York' },
    { name: 'Toronto', tz: 'America/Toronto' },
    { name: 'Bogota', tz: 'America/Bogota' },
    { name: 'Lima', tz: 'America/Lima' },
    // UTC-4
    { name: 'Santiago', tz: 'America/Santiago' },
    { name: 'Caracas', tz: 'America/Caracas' },
    { name: 'La Paz', tz: 'America/La_Paz' },
    // UTC-3
    { name: 'São Paulo', tz: 'America/Sao_Paulo' },
    { name: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires' },
    { name: 'Rio', tz: 'America/Sao_Paulo' },
    // UTC-2
    { name: 'Fernando', tz: 'America/Noronha' },
    { name: 'S. Georgia', tz: 'Atlantic/South_Georgia' },
    // UTC-1
    { name: 'Azores', tz: 'Atlantic/Azores' },
    { name: 'Cape Verde', tz: 'Atlantic/Cape_Verde' },
    // UTC+0
    { name: 'London', tz: 'Europe/London' },
    { name: 'Dublin', tz: 'Europe/Dublin' },
    { name: 'Lisbon', tz: 'Europe/Lisbon' },
    { name: 'Reykjavik', tz: 'Atlantic/Reykjavik' },
    { name: 'Accra', tz: 'Africa/Accra' },
    // UTC+1
    { name: 'Paris', tz: 'Europe/Paris' },
    { name: 'Berlin', tz: 'Europe/Berlin' },
    { name: 'Madrid', tz: 'Europe/Madrid' },
    { name: 'Rome', tz: 'Europe/Rome' },
    { name: 'Lagos', tz: 'Africa/Lagos' },
    // UTC+2
    { name: 'Cairo', tz: 'Africa/Cairo' },
    { name: 'Athens', tz: 'Europe/Athens' },
    { name: 'Johannesburg', tz: 'Africa/Johannesburg' },
    { name: 'Helsinki', tz: 'Europe/Helsinki' },
    // UTC+3
    { name: 'Moscow', tz: 'Europe/Moscow' },
    { name: 'Istanbul', tz: 'Europe/Istanbul' },
    { name: 'Nairobi', tz: 'Africa/Nairobi' },
    // UTC+4
    { name: 'Dubai', tz: 'Asia/Dubai' },
    { name: 'Abu Dhabi', tz: 'Asia/Dubai' },
    { name: 'Baku', tz: 'Asia/Baku' },
    // UTC+5
    { name: 'Karachi', tz: 'Asia/Karachi' },
    { name: 'Tashkent', tz: 'Asia/Tashkent' },
    // UTC+6
    { name: 'Dhaka', tz: 'Asia/Dhaka' },
    { name: 'Almaty', tz: 'Asia/Almaty' },
    // UTC+7
    { name: 'Bangkok', tz: 'Asia/Bangkok' },
    { name: 'Jakarta', tz: 'Asia/Jakarta' },
    { name: 'Hanoi', tz: 'Asia/Ho_Chi_Minh' },
    // UTC+8
    { name: 'Singapore', tz: 'Asia/Singapore' },
    { name: 'Hong Kong', tz: 'Asia/Hong_Kong' },
    { name: 'Shanghai', tz: 'Asia/Shanghai' },
    { name: 'Perth', tz: 'Australia/Perth' },
    // UTC+9
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
    { name: 'Seoul', tz: 'Asia/Seoul' },
    { name: 'Osaka', tz: 'Asia/Tokyo' },
    // UTC+10
    { name: 'Sydney', tz: 'Australia/Sydney' },
    { name: 'Melbourne', tz: 'Australia/Melbourne' },
    { name: 'Brisbane', tz: 'Australia/Brisbane' },
    { name: 'Guam', tz: 'Pacific/Guam' },
    // UTC+11
    { name: 'Noumea', tz: 'Pacific/Noumea' },
    { name: 'Solomon Is', tz: 'Pacific/Guadalcanal' },
    // UTC+12
    { name: 'Auckland', tz: 'Pacific/Auckland' },
    { name: 'Fiji', tz: 'Pacific/Fiji' },
    // UTC+13
    { name: 'Samoa', tz: 'Pacific/Apia' },
    { name: 'Tongatapu', tz: 'Pacific/Tongatapu' },
    // UTC+14
    { name: 'Kiritimati', tz: 'Pacific/Kiritimati' },
  ];

  // Build city list - select exactly one city per current offset
  let offsetToCities = new Map();

  function buildCityList() {
    const offsetToCity = new Map();
    offsetToCities = new Map();

    cityPool.forEach(city => {
      const rawOffset = getTimezoneOffset(city.tz);
      let offset = Math.round(rawOffset);
      if (offset > 12) offset -= 24;
      if (offset < -11) offset += 24;

      if (!offsetToCities.has(offset)) {
        offsetToCities.set(offset, []);
      }
      offsetToCities.get(offset).push(city);

      if (!offsetToCity.has(offset)) {
        offsetToCity.set(offset, {
          ...city,
          normalizedOffset: offset,
          isDaylight: isCityInDaylight(city.tz)
        });
      }
    });

    return Array.from(offsetToCity.entries())
      .sort((a, b) => a[0] - b[0])
      .map(entry => entry[1]);
  }

  let allCities = buildCityList();

  // Solar calculations for sunrise/sunset
  function calculateSunTimes(lat, lon, date) {
    const rad = Math.PI / 180;
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    const gamma = (2 * Math.PI / 365) * (dayOfYear - 1 + (12 - 12) / 24);
    const eqTime = 229.18 * (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma)
      - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));
    const decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma)
      - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma)
      - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma);

    const latRad = lat * rad;
    const zenith = 90.833 * rad;
    let cosHA = (Math.cos(zenith) / (Math.cos(latRad) * Math.cos(decl))) - Math.tan(latRad) * Math.tan(decl);
    cosHA = Math.max(-1, Math.min(1, cosHA));
    const ha = Math.acos(cosHA) / rad;

    const sunrise = 720 - 4 * (lon + ha) - eqTime;
    const sunset = 720 - 4 * (lon - ha) - eqTime;
    const tzOffset = -date.getTimezoneOffset();
    const sunriseLocal = ((sunrise + tzOffset) / 60 + 24) % 24;
    const sunsetLocal = ((sunset + tzOffset) / 60 + 24) % 24;

    const zenithCivil = 96 * rad;
    let cosHACivil = (Math.cos(zenithCivil) / (Math.cos(latRad) * Math.cos(decl))) - Math.tan(latRad) * Math.tan(decl);
    cosHACivil = Math.max(-1, Math.min(1, cosHACivil));
    const haCivil = Math.acos(cosHACivil) / rad;

    const dawnCivil = 720 - 4 * (lon + haCivil) - eqTime;
    const duskCivil = 720 - 4 * (lon - haCivil) - eqTime;
    const dawnLocal = ((dawnCivil + tzOffset) / 60 + 24) % 24;
    const duskLocal = ((duskCivil + tzOffset) / 60 + 24) % 24;

    return { sunrise: sunriseLocal, sunset: sunsetLocal, dawn: dawnLocal, dusk: duskLocal };
  }

  function generateDayNightGradient(sunTimes) {
    const { sunrise, sunset, dawn, dusk } = sunTimes;
    const toDeg = h => h * 15;

    const dawnDeg = toDeg(dawn);
    const sunriseDeg = toDeg(sunrise);
    const noonDeg = 180;
    const sunsetDeg = toDeg(sunset);
    const duskDeg = toDeg(dusk);

    const stops = [
      { deg: 0, color: '#0d1a2d' },
      { deg: dawnDeg - 15, color: '#0d1a2d' },
      { deg: dawnDeg, color: '#1a2a4a' },
      { deg: (dawnDeg + sunriseDeg) / 2, color: '#4a3a5a' },
      { deg: sunriseDeg, color: '#e8a060' },
      { deg: sunriseDeg + 7.5, color: '#f0c896' },
      { deg: sunriseDeg + 22.5, color: '#87ceeb' },
      { deg: (sunriseDeg + noonDeg) / 2, color: '#add8e6' },
      { deg: noonDeg - 15, color: '#b8e0f0' },
      { deg: noonDeg, color: '#c4e8f8' },
      { deg: noonDeg + 15, color: '#b8e0f0' },
      { deg: (noonDeg + sunsetDeg) / 2, color: '#add8e6' },
      { deg: sunsetDeg - 22.5, color: '#87ceeb' },
      { deg: sunsetDeg - 7.5, color: '#f0c896' },
      { deg: sunsetDeg, color: '#e07830' },
      { deg: (sunsetDeg + duskDeg) / 2, color: '#c04830' },
      { deg: duskDeg, color: '#4a3a5a' },
      { deg: duskDeg + 15, color: '#1a2a4a' },
      { deg: duskDeg + 30, color: '#0d1a2d' },
      { deg: 360, color: '#0d1a2d' }
    ];

    stops.sort((a, b) => a.deg - b.deg);
    const filteredStops = [];
    for (let i = 0; i < stops.length; i++) {
      if (i === 0 || stops[i].deg - filteredStops[filteredStops.length - 1].deg >= 1) {
        filteredStops.push(stops[i]);
      }
    }

    const gradientStops = filteredStops.map(s => `${s.color} ${s.deg}deg`).join(', ');
    return `conic-gradient(from 0deg, ${gradientStops})`;
  }

  let currentSunTimes = { sunrise: 6, sunset: 18, dawn: 5.5, dusk: 18.5 };

  function updateDayNightGradient() {
    const gradient = generateDayNightGradient(currentSunTimes);
    hourRing.style.background = gradient;
  }

  function initSunTimes() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          currentSunTimes = calculateSunTimes(latitude, longitude, new Date());
          updateDayNightGradient();
        },
        (error) => {
          estimateSunTimesFromTimezone();
        },
        { timeout: 5000, maximumAge: 3600000 }
      );
    } else {
      estimateSunTimesFromTimezone();
    }
  }

  function estimateSunTimesFromTimezone() {
    const defaultLat = 40;
    const tzOffset = -new Date().getTimezoneOffset() / 60;
    const defaultLon = tzOffset * 15;
    currentSunTimes = calculateSunTimes(defaultLat, defaultLon, new Date());
    updateDayNightGradient();
  }

  function getCityLabelRotation(positionAngleDeg) {
    let rotation = positionAngleDeg + 90;
    while (rotation > 180) rotation -= 360;
    while (rotation < -180) rotation += 360;
    if (positionAngleDeg > 0 && positionAngleDeg < 180) {
      rotation += 180;
    }
    if (positionAngleDeg < -180 || positionAngleDeg > 180) {
      const normalized = ((positionAngleDeg % 360) + 360) % 360;
      if (normalized > 0 && normalized < 180) {
        rotation += 180;
      }
    }
    return rotation;
  }

  function positionCities() {
    const homeOffset = getHomeOffset();
    clockCities.innerHTML = '';

    const containerRect = clockCities.getBoundingClientRect();
    const containerSize = containerRect.width;
    const center = containerSize / 2;
    const outerRadius = containerSize / 2 - 14;
    const innerRadius = containerSize / 2 - 32;
    const fontSize = 11;
    const ns = 'http://www.w3.org/2000/svg';

    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', containerSize);
    svg.setAttribute('height', containerSize);
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.overflow = 'visible';

    const defs = document.createElementNS(ns, 'defs');
    svg.appendChild(defs);

    const cityPositions = allCities.map((city, originalIdx) => {
      let offset = city.normalizedOffset !== undefined
        ? city.normalizedOffset
        : Math.round(getTimezoneOffset(city.tz));
      if (offset > 12) offset -= 24;
      if (offset < -11) offset += 24;

      const relativeOffset = offset - homeOffset;
      const angleDeg = -relativeOffset * 15 - 90;
      const normAngle = ((angleDeg % 360) + 360) % 360;
      return { city, offset, angleDeg, normAngle, originalIdx };
    }).sort((a, b) => a.normAngle - b.normAngle);

    cityPositions.forEach((pos, sortedIdx) => {
      const { city, offset, angleDeg, originalIdx } = pos;
      const isHome = Math.abs(offset - homeOffset) < 0.5;

      let normAngle = ((angleDeg % 360) + 360) % 360;
      const isBottomHalf = normAngle > 0 && normAngle < 180;
      const radius = sortedIdx % 2 === 0 ? outerRadius : innerRadius;

      const pathId = `cityPath${originalIdx}`;
      const arcSpan = 18;
      const startAngle = angleDeg - arcSpan;
      const endAngle = angleDeg + arcSpan;

      let arcPath;
      if (isBottomHalf) {
        const startRad = (endAngle) * Math.PI / 180;
        const endRad = (startAngle) * Math.PI / 180;
        const x1 = center + radius * Math.cos(startRad);
        const y1 = center + radius * Math.sin(startRad);
        const x2 = center + radius * Math.cos(endRad);
        const y2 = center + radius * Math.sin(endRad);
        arcPath = `M ${x1} ${y1} A ${radius} ${radius} 0 0 0 ${x2} ${y2}`;
      } else {
        const startRad = (startAngle) * Math.PI / 180;
        const endRad = (endAngle) * Math.PI / 180;
        const x1 = center + radius * Math.cos(startRad);
        const y1 = center + radius * Math.sin(startRad);
        const x2 = center + radius * Math.cos(endRad);
        const y2 = center + radius * Math.sin(endRad);
        arcPath = `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;
      }

      const path = document.createElementNS(ns, 'path');
      path.setAttribute('id', pathId);
      path.setAttribute('d', arcPath);
      path.setAttribute('fill', 'none');
      defs.appendChild(path);

      const text = document.createElementNS(ns, 'text');
      text.setAttribute('font-size', fontSize);
      text.setAttribute('fill', isHome ? '#1E90FF' : '#ccc');
      text.setAttribute('font-family', 'inherit');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'central');
      text.setAttribute('font-weight', isHome ? '600' : 'normal');
      text.style.textTransform = 'uppercase';
      text.style.letterSpacing = '0.3px';
      text.style.cursor = 'pointer';
      text.style.pointerEvents = 'auto';

      text.dataset.tz = city.tz;
      text.dataset.offset = offset;
      text.dataset.cityName = city.name;

      const textPath = document.createElementNS(ns, 'textPath');
      textPath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + pathId);
      textPath.setAttribute('startOffset', '50%');
      textPath.textContent = city.name;

      text.appendChild(textPath);
      svg.appendChild(text);

      text.addEventListener('mouseenter', (e) => showCityTooltip(e, city, offset));
      text.addEventListener('mouseleave', hideCityTooltip);

      text.addEventListener('click', (e) => {
        e.stopPropagation();
        // Suppress click if we just finished a bezel drag
        if (Date.now() - bezelDragEndTime < 400) return;
        hideCityTooltip();
        setHomeTimezone(city.tz, city.name);
      });
    });

    clockCities.appendChild(svg);
  }

  const tooltip = document.getElementById('cityTooltip');

  function showCityTooltip(event, city, offset) {
    const allCitiesAtOffset = offsetToCities.get(offset) || [];
    const otherCities = allCitiesAtOffset.filter(c => c.name !== city.name);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      timeZone: city.tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const dateStr = now.toLocaleDateString('en-US', {
      timeZone: city.tz,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const offsetStr = offset >= 0 ? `UTC+${offset}` : `UTC${offset}`;

    let html = `
      <div class="city-tooltip-header">${city.name}</div>
      <div class="city-tooltip-time">${timeStr}</div>
      <div class="city-tooltip-offset">${dateStr} · ${offsetStr}</div>
    `;

    if (otherCities.length > 0) {
      const otherNames = otherCities.map(c => `<span>${c.name}</span>`).join('');
      html += `<div class="city-tooltip-others">Also: ${otherNames}</div>`;
    }

    tooltip.innerHTML = html;

    const containerRect = document.getElementById('clockContainer').getBoundingClientRect();
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top + 20;

    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
    tooltip.classList.add('visible');
  }

  function hideCityTooltip() {
    tooltip.classList.remove('visible');
  }

  // ═══════════════════════════════════════════════════
  // Day/Night City Label Tinting
  // Cities in daylight glow warm gold; nighttime cities dim to cool blue.
  // Smooth gradient through dawn/dusk hours for natural transitions.
  // ═══════════════════════════════════════════════════
  function getCityTintColor(tz, isHome) {
    if (isHome) return null; // home city keeps accent blue
    try {
      const now = new Date();
      const cityTime = new Date(now.toLocaleString('en-US', { timeZone: tz }));
      const h = cityTime.getHours() + cityTime.getMinutes() / 60;

      // Smooth day/night curve:
      //   Night (21-5):   cool dim blue-gray  #7088a8
      //   Dawn (5-7):     warming transition
      //   Day (7-17):     warm golden white    #ffe8b0
      //   Dusk (17-21):   cooling transition
      let warmth; // 0 = full night, 1 = full day
      if (h >= 7 && h <= 17) {
        warmth = 1.0;
      } else if (h >= 21 || h <= 5) {
        warmth = 0.0;
      } else if (h > 5 && h < 7) {
        // Dawn transition
        warmth = (h - 5) / 2;
      } else {
        // Dusk transition (17 < h < 21)
        warmth = 1.0 - (h - 17) / 4;
      }

      // Interpolate between night color and day color
      const nightR = 112, nightG = 136, nightB = 168; // #7088a8 — cool blue-gray
      const dayR = 255, dayG = 232, dayB = 176;       // #ffe8b0 — warm gold
      const r = Math.round(nightR + (dayR - nightR) * warmth);
      const g = Math.round(nightG + (dayG - nightG) * warmth);
      const b = Math.round(nightB + (dayB - nightB) * warmth);

      return `rgb(${r},${g},${b})`;
    } catch (e) {
      return '#ccc';
    }
  }

  function updateCityTints() {
    const now = Date.now();
    if (now - lastCityTintUpdate < CITY_TINT_INTERVAL) return;
    lastCityTintUpdate = now;

    const svg = clockCities.querySelector('svg');
    if (!svg) return;

    const homeOffset = getHomeOffset();
    const texts = svg.querySelectorAll('text');
    texts.forEach(text => {
      const tz = text.dataset.tz;
      if (!tz) return;
      const offset = parseFloat(text.dataset.offset);
      const isHome = Math.abs(offset - homeOffset) < 0.5;
      const tint = getCityTintColor(tz, isHome);
      if (tint) {
        text.setAttribute('fill', tint);
      }
    });
  }

  function generateHourRing() {
    hourRing.innerHTML = '';

    const ringRect = hourRing.getBoundingClientRect();
    const ringCenter = ringRect.width / 2;
    const ringRadius = ringCenter - 14;

    for (let h = 0; h < 24; h++) {
      // Position angle (counter-clockwise from top)
      const angleDeg = -h * 15 - 90;
      const angleRad = angleDeg * Math.PI / 180;

      const marker = document.createElement('div');
      marker.className = 'hour-marker';
      marker.dataset.hour = h; // Store hour for dynamic rotation updates

      if (h >= 7 && h < 17) {
        marker.classList.add('day');
      } else if (h >= 5 && h < 7 || h >= 17 && h < 20) {
        marker.classList.add('dusk');
      } else {
        marker.classList.add('night');
      }

      marker.textContent = h.toString().padStart(2, '0');

      const x = ringCenter + ringRadius * Math.cos(angleRad);
      const y = ringCenter + ringRadius * Math.sin(angleRad);

      marker.style.left = x + 'px';
      marker.style.top = y + 'px';
      // Initial rotation will be set by updateHourMarkerRotations
      hourRing.appendChild(marker);
    }
  }

  // Update hour marker rotations based on current ring rotation
  function updateHourMarkerRotations(ringRotation) {
    const markers = hourRing.querySelectorAll('.hour-marker');
    markers.forEach(marker => {
      const h = parseInt(marker.dataset.hour);

      // Marker's tangent angle on ring (fixed)
      const markerAngleOnRing = -h * 15;

      // Marker's actual screen position after ring rotation
      const screenAngle = markerAngleOnRing + ringRotation;

      // Normalize to 0-360
      const normalizedScreenAngle = ((screenAngle % 360) + 360) % 360;

      // Base rotation keeps text tangent to the circle
      let textRotation = markerAngleOnRing;

      // If marker is in bottom half of screen (90° to 270°), flip 180°
      if (normalizedScreenAngle > 90 && normalizedScreenAngle < 270) {
        textRotation += 180;
      }

      marker.style.transform = `translate(-50%, -50%) rotate(${textRotation}deg)`;
    });
  }

  const faceCenter = 172;

  // Generate clock ticks
  for (let i = 0; i < 60; i++) {
    const tick = document.createElement('div');
    const isMajor = i % 5 === 0;
    const isQuarter = !isMajor && (i % 5 === 1 || i % 5 === 4); // ticks adjacent to hours
    tick.className = 'clock-tick' + (isMajor ? ' major' : isQuarter ? ' quarter' : '');
    tick.style.transform = `translateX(-50%) rotate(${i * 6}deg)`;
    clockFace.appendChild(tick);
  }

  // Generate hour numbers
  const hourNumRadius = 125;
  for (let i = 1; i <= 12; i++) {
    const angle = (i * 30 - 90) * Math.PI / 180;
    const num = document.createElement('div');
    num.className = 'clock-hour-num';
    num.textContent = i;
    num.style.left = (faceCenter + hourNumRadius * Math.cos(angle)) + 'px';
    num.style.top = (faceCenter + hourNumRadius * Math.sin(angle)) + 'px';
    clockFace.appendChild(num);
  }

  // Create hands
  // Alarm hand (behind all other hands)
  const alarmHand = document.createElement('div');
  alarmHand.className = 'clock-hand clock-hand-alarm';
  alarmHand.id = 'alarmHand';
  clockFace.appendChild(alarmHand);

  const hourHand = document.createElement('div');
  hourHand.className = 'clock-hand clock-hand-hour';
  hourHand.id = 'hourHand';
  clockFace.appendChild(hourHand);

  const minuteHand = document.createElement('div');
  minuteHand.className = 'clock-hand clock-hand-minute';
  minuteHand.id = 'minuteHand';
  clockFace.appendChild(minuteHand);

  const gmtHand = document.createElement('div');
  gmtHand.className = 'clock-hand clock-hand-gmt';
  gmtHand.id = 'gmtHand';
  clockFace.appendChild(gmtHand);

  const secondHand = document.createElement('div');
  secondHand.className = 'clock-hand clock-hand-second';
  secondHand.id = 'secondHand';
  clockFace.appendChild(secondHand);

  // Shadow clones — inserted BEFORE real hands for correct layering
  function createShadowHand(refHand, className) {
    const shadow = document.createElement('div');
    shadow.className = 'clock-hand-shadow ' + className;
    // Insert before the alarm hand (behind all real hands)
    clockFace.insertBefore(shadow, clockFace.querySelector('.clock-hand-alarm') || clockFace.firstChild);
    return shadow;
  }
  const hourShadow = createShadowHand(hourHand, 'shadow-hour');
  const minuteShadow = createShadowHand(minuteHand, 'shadow-minute');
  const secondShadow = createShadowHand(secondHand, 'shadow-second');

  // Time-lapse animation state
  let isAnimating = false;
  let animationStartTime = null;
  let animationStartOffset = 0;
  let secondHandStartAngle = 0;
  let lastStoppedSecondAngle = null; // tracks where second hand froze when watch stops
  let lastStoppedCageAngle = null;   // tracks where tourbillon cage froze
  const ANIMATION_DURATION = 10000;

  // Click handler for time-lapse
  const clockContainer = document.getElementById('clockContainer');
  clockContainer.style.cursor = 'pointer';
  clockContainer.addEventListener('click', (e) => {
    if (e.target.closest('.city-tooltip')) return;
    // Suppress time-lapse toggle if we just finished a bezel drag
    if (Date.now() - bezelDragEndTime < 400) return;

    if (isAnimating) {
      isAnimating = false;
      animationStartTime = null;
      document.getElementById('minuteHand').classList.remove('animating');
      document.getElementById('secondHand').classList.remove('animating');
    } else {
      isAnimating = true;
      animationStartTime = performance.now();
      const now = new Date();
      secondHandStartAngle = (now.getSeconds() + now.getMilliseconds() / 1000) * 6;
      const homeTz = getHomeTimezone();
      const homeTime = new Date(new Date().toLocaleString('en-US', { timeZone: homeTz }));
      animationStartOffset = homeTime.getHours() * 3600 + homeTime.getMinutes() * 60 + homeTime.getSeconds() + homeTime.getMilliseconds() / 1000;
      document.getElementById('minuteHand').classList.add('animating');
      document.getElementById('secondHand').classList.add('animating');
    }
  });

  // Double-click on clock face to reset to local timezone
  clockFace.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    resetToLocalTimezone();
  });

  // Watch crown click — reset to local timezone (like pressing Esc)
  const watchCrown = document.getElementById('watchCrown');
  if (watchCrown) {
    watchCrown.addEventListener('click', (e) => {
      e.stopPropagation();
      resetToLocalTimezone();
    });
  }

  // ═══════════════════════════════════════════════════
  // Crown Winding — scroll wheel over crown to wind power reserve
  // Each scroll tick plays a mechanical ratcheting click and charges
  // the mainspring, just like winding a real mechanical watch.
  // ═══════════════════════════════════════════════════
  let windAudioCtx = null;
  let lastWindTime = 0;
  const WIND_COOLDOWN = 60; // ms between wind clicks

  function getWindAudioCtx() {
    if (!windAudioCtx || windAudioCtx.state === 'closed') {
      windAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (windAudioCtx.state === 'suspended') windAudioCtx.resume();
    return windAudioCtx;
  }

  function playWindClick(direction) {
    try {
      const ctx = getWindAudioCtx();
      const now = ctx.currentTime;

      // Mechanical ratchet click: brief noise burst + metallic ping
      // 1. Ratchet click — very short noise burst
      const clickLen = 0.008 + Math.random() * 0.004;
      const noiseBuffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * clickLen), ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length); // decaying noise
      }
      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = noiseBuffer;

      // Bandpass to make it metallic
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 3000 + Math.random() * 1500;
      bp.Q.value = 2;

      const clickGain = ctx.createGain();
      clickGain.gain.value = 0.15;

      noiseSrc.connect(bp);
      bp.connect(clickGain);
      clickGain.connect(ctx.destination);
      noiseSrc.start(now);

      // 2. Metallic ping — sine at ~4kHz, very short
      const ping = ctx.createOscillator();
      ping.type = 'sine';
      ping.frequency.value = 3800 + Math.random() * 800;
      const pingGain = ctx.createGain();
      pingGain.gain.setValueAtTime(0.06, now);
      pingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      ping.connect(pingGain);
      pingGain.connect(ctx.destination);
      ping.start(now);
      ping.stop(now + 0.04);

      // 3. Spring tension tone — subtle low hum that gets higher as power fills
      const springFreq = 120 + powerLevel * 180; // 120-300 Hz based on tension
      const spring = ctx.createOscillator();
      spring.type = 'triangle';
      spring.frequency.value = springFreq;
      const springGain = ctx.createGain();
      springGain.gain.setValueAtTime(0.02, now);
      springGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      spring.connect(springGain);
      springGain.connect(ctx.destination);
      spring.start(now);
      spring.stop(now + 0.07);
    } catch (e) { /* audio not available */ }
  }

  function showWindFlash() {
    const flash = document.getElementById('powerWindFlash');
    if (!flash) return;
    const pct = Math.round(powerLevel * 100);
    flash.textContent = pct + '%';
    // Color based on level
    if (powerLevel > 0.5) {
      flash.style.color = '#4da6ff';
      flash.style.textShadow = '0 0 6px rgba(77,166,255,0.6)';
    } else if (powerLevel > 0.2) {
      flash.style.color = '#ffa726';
      flash.style.textShadow = '0 0 6px rgba(255,167,38,0.6)';
    } else {
      flash.style.color = '#ef5350';
      flash.style.textShadow = '0 0 6px rgba(239,83,80,0.6)';
    }
    flash.classList.remove('show');
    // Force reflow
    void flash.offsetWidth;
    flash.classList.add('show');
  }

  if (watchCrown) {
    // Scroll wheel on crown winds the power reserve
    watchCrown.addEventListener('wheel', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastWindTime < WIND_COOLDOWN) return;
      lastWindTime = now;

      const direction = e.deltaY < 0 ? 1 : -1; // scroll up = wind

      if (direction > 0) {
        // Wind up — charge power reserve
        const chargeAmount = 0.03; // 3% per click, ~33 clicks for full wind
        const before = powerLevel;
        powerLevel = Math.min(1.0, powerLevel + chargeAmount);

        if (powerLevel > before) {
          playWindClick(direction);
          showWindFlash();

          // Animate crown rotation
          watchCrown.classList.remove('winding', 'winding-reverse');
          void watchCrown.offsetWidth;
          watchCrown.classList.add('winding');
        }
      } else {
        // Scroll down — does nothing useful on a real watch, but give feedback
        // Light reverse click, no power change
        playWindClick(direction);
        watchCrown.classList.remove('winding', 'winding-reverse');
        void watchCrown.offsetWidth;
        watchCrown.classList.add('winding-reverse');
      }
    }, { passive: false });

    // Touch drag on crown for mobile winding
    let crownTouchStartY = null;
    let crownLastDeltaY = 0;

    watchCrown.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        crownTouchStartY = e.touches[0].clientY;
        crownLastDeltaY = 0;
        e.preventDefault();
      }
    }, { passive: false });

    watchCrown.addEventListener('touchmove', (e) => {
      if (crownTouchStartY === null || e.touches.length !== 1) return;
      e.preventDefault();

      const currentY = e.touches[0].clientY;
      const deltaY = crownTouchStartY - currentY; // positive = finger moving up = wind
      const stepSize = 12; // px per wind step

      // Check if we've moved enough for another wind click
      if (Math.abs(deltaY - crownLastDeltaY) >= stepSize) {
        const direction = (deltaY > crownLastDeltaY) ? 1 : -1;
        crownLastDeltaY = deltaY;

        const now = Date.now();
        if (now - lastWindTime < WIND_COOLDOWN) return;
        lastWindTime = now;

        if (direction > 0) {
          powerLevel = Math.min(1.0, powerLevel + 0.03);
          playWindClick(direction);
          showWindFlash();
          watchCrown.classList.remove('winding', 'winding-reverse');
          void watchCrown.offsetWidth;
          watchCrown.classList.add('winding');
        } else {
          playWindClick(direction);
          watchCrown.classList.remove('winding', 'winding-reverse');
          void watchCrown.offsetWidth;
          watchCrown.classList.add('winding-reverse');
        }
      }
    }, { passive: false });

    watchCrown.addEventListener('touchend', () => {
      crownTouchStartY = null;
    });
  }

  // ═══════════════════════════════════════════════════
  // Bezel Drag Rotation Handlers
  // Drag the outer city ring to rotate timezones.
  // On release, snaps to the nearest 1-hour (15°) and
  // selects the city at that offset via setHomeTimezone.
  // ═══════════════════════════════════════════════════

  function getAngleFromCenter(clientX, clientY) {
    const rect = clockCities.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx) * 180 / Math.PI;
  }

  function isInBezelRing(clientX, clientY) {
    const rect = clockCities.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = rect.width / 2;
    // Bezel ring = outer 30% of the city circle (between 70% and 100% of radius)
    return dist > radius * 0.65 && dist <= radius * 1.05;
  }

  // ── Bezel Detent Click Sound ──
  // Synthesizes the tactile "click" of a unidirectional bezel
  // engaging its spring-loaded ball bearing at each hour position.
  // Shorter and sharper than the crown wind click — more metallic snap.
  function getBezelClickCtx() {
    if (!bezelClickCtx || bezelClickCtx.state === 'closed') {
      try {
        bezelClickCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { return null; }
    }
    if (bezelClickCtx.state === 'suspended') bezelClickCtx.resume();
    return bezelClickCtx;
  }

  function playBezelClick() {
    const ctx = getBezelClickCtx();
    if (!ctx) return;
    const t = ctx.currentTime;

    // 1. Sharp metallic snap — very short noise burst (~4ms)
    const clickLen = 0.004;
    const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * clickLen), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.1));
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;

    // High-pass to keep only the crisp snap
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 4500;
    hp.Q.value = 0.8;

    const clickGain = ctx.createGain();
    clickGain.gain.value = 0.12;

    src.connect(hp);
    hp.connect(clickGain);
    clickGain.connect(ctx.destination);
    src.start(t);

    // 2. Brief metallic ring — sine at ~6kHz, extremely short
    const ring = ctx.createOscillator();
    ring.type = 'sine';
    ring.frequency.value = 5800 + Math.random() * 600;
    const ringGain = ctx.createGain();
    ringGain.gain.setValueAtTime(0.05, t);
    ringGain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);
    ring.connect(ringGain);
    ringGain.connect(ctx.destination);
    ring.start(t);
    ring.stop(t + 0.02);
  }

  // ── Bezel Detent Visual Pulse ──
  // Brief flash on the outer bezel ring when crossing a detent
  function flashBezelDetent() {
    const ring = hourRing;
    if (!ring) return;
    ring.classList.remove('detent-flash');
    void ring.offsetWidth; // force reflow
    ring.classList.add('detent-flash');
  }

  function bezelStart(clientX, clientY) {
    if (isAnimatingCities) return;
    if (!isInBezelRing(clientX, clientY)) return;
    bezelDragging = true;
    bezelDragMoved = false;
    bezelDragCurrentDelta = 0;
    bezelDragStartAngle = getAngleFromCenter(clientX, clientY);
    bezelLastDetent = 0; // start at detent 0
    clockCities.style.cursor = 'grabbing';
  }

  function bezelMove(clientX, clientY) {
    if (!bezelDragging) return;
    const currentAngle = getAngleFromCenter(clientX, clientY);
    let delta = currentAngle - bezelDragStartAngle;
    // Handle wrap-around at ±180°
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    bezelDragCurrentDelta = delta;

    // Mark as dragged once past 3° threshold
    if (Math.abs(delta) > 3) {
      bezelDragMoved = true;
    }

    // ── Detent detection: click at every 15° crossing ──
    // Calculate which 15° detent we're closest to (rounded)
    const currentDetent = Math.round(delta / 15);
    if (currentDetent !== bezelLastDetent && bezelDragMoved) {
      bezelLastDetent = currentDetent;
      playBezelClick();
      flashBezelDetent();
    }

    // Live rotate the SVG inside clockCities
    const svg = clockCities.querySelector('svg');
    if (svg && bezelDragMoved) {
      const rect = clockCities.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      svg.style.transition = 'none';
      svg.style.transformOrigin = `${cx}px ${cy}px`;
      svg.style.transform = `rotate(${delta}deg)`;
    }
  }

  function bezelEnd() {
    if (!bezelDragging) return;
    bezelDragging = false;
    bezelDragEndTime = Date.now();
    clockCities.style.cursor = '';

    if (!bezelDragMoved) {
      // Tiny movement — let click handler deal with it
      const svg = clockCities.querySelector('svg');
      if (svg) { svg.style.transition = ''; svg.style.transform = ''; }
      return;
    }

    // Snap to nearest 15° (= 1 hour)
    const snappedDeg = Math.round(bezelDragCurrentDelta / 15) * 15;
    const hourShift = -snappedDeg / 15; // positive = eastward (higher UTC offset)

    // Animate snap
    const svg = clockCities.querySelector('svg');
    if (svg) {
      const rect = clockCities.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      svg.style.transformOrigin = `${cx}px ${cy}px`;
      svg.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      svg.style.transform = `rotate(${snappedDeg}deg)`;
    }

    if (Math.abs(hourShift) < 0.5) {
      // Negligible rotation — just reset
      setTimeout(() => {
        if (svg) { svg.style.transition = ''; svg.style.transform = ''; }
      }, 350);
      return;
    }

    // Find the city closest to the new target offset
    const currentOffset = getHomeOffset();
    const targetOffset = currentOffset + hourShift;

    let bestCity = null;
    let bestDist = Infinity;
    allCities.forEach(city => {
      let cityOff = city.normalizedOffset !== undefined
        ? city.normalizedOffset
        : Math.round(getTimezoneOffset(city.tz));
      if (cityOff > 12) cityOff -= 24;
      if (cityOff < -11) cityOff += 24;
      const dist = Math.abs(cityOff - targetOffset);
      // Also check wrap-around
      const distWrap = Math.min(dist, 24 - dist);
      if (distWrap < bestDist) {
        bestDist = distWrap;
        bestCity = city;
      }
    });

    // Wait for snap animation, then apply the timezone change
    setTimeout(() => {
      if (svg) { svg.style.transition = ''; svg.style.transform = ''; }
      if (bestCity) {
        setHomeTimezone(bestCity.tz, bestCity.name);
      }
    }, 350);
  }

  // Mouse events on the city ring
  clockCities.addEventListener('mousedown', (e) => {
    bezelStart(e.clientX, e.clientY);
  });
  document.addEventListener('mousemove', (e) => {
    if (bezelDragging) {
      e.preventDefault();
      bezelMove(e.clientX, e.clientY);
    }
  });
  document.addEventListener('mouseup', () => {
    bezelEnd();
  });

  // Touch events on the city ring
  clockCities.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    bezelStart(t.clientX, t.clientY);
  }, { passive: true });
  document.addEventListener('touchmove', (e) => {
    if (bezelDragging) {
      e.preventDefault();
      const t = e.touches[0];
      bezelMove(t.clientX, t.clientY);
    }
  }, { passive: false });
  document.addEventListener('touchend', () => {
    bezelEnd();
  });

  // Hover cursor: show grab when over the bezel ring area
  clockCities.addEventListener('mousemove', (e) => {
    if (!bezelDragging && isInBezelRing(e.clientX, e.clientY)) {
      clockCities.style.cursor = 'grab';
    } else if (!bezelDragging) {
      clockCities.style.cursor = '';
    }
  });

  function getHomeTime(date) {
    const homeTz = getHomeTimezone();
    const timeStr = date.toLocaleString('en-US', {
      timeZone: homeTz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      fractionalSecondDigits: 3
    });
    const parts = timeStr.split(':');
    const secParts = parts[2].split('.');
    return {
      hours: parseInt(parts[0]),
      minutes: parseInt(parts[1]),
      seconds: parseInt(secParts[0]),
      millis: parseInt(secParts[1] || 0)
    };
  }

  // ═══════════════════════════════════════════════════
  // Mechanical Tick Sound
  // Synthesizes the sharp "tick" of an escapement wheel
  // releasing a pallet jewel — 8 beats/sec matching the
  // visual spring movement. Uses a shared AudioContext
  // to avoid garbage-collecting hundreds of contexts.
  // ═══════════════════════════════════════════════════
  function getTickAudioCtx() {
    if (!tickAudioCtx || tickAudioCtx.state === 'closed') {
      try {
        tickAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { return null; }
    }
    if (tickAudioCtx.state === 'suspended') {
      tickAudioCtx.resume();
    }
    return tickAudioCtx;
  }

  function playTickSound() {
    const ctx = getTickAudioCtx();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Sharp click: very short noise burst filtered to high frequency
    // Simulates metal-on-metal pallet jewel impact
    const bufferSize = Math.floor(ctx.sampleRate * 0.008); // 8ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Exponential decay noise
      const env = Math.exp(-i / (bufferSize * 0.15));
      data[i] = (Math.random() * 2 - 1) * env;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // High-pass filter — only the sharp "tick", no thud
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 3000;
    hp.Q.value = 0.7;

    // Band emphasis for metallic character
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 5500;
    bp.Q.value = 2.0;

    const gain = ctx.createGain();
    gain.gain.value = 0.04; // very subtle

    source.connect(hp);
    hp.connect(bp);
    bp.connect(gain);
    gain.connect(ctx.destination);

    source.start(t);
    source.stop(t + 0.01);
  }

  function updateClock() {
    const now = new Date();
    let hours, minutes, seconds, millis;
    let displayDate = now;
    const homeTz = getHomeTimezone();

    if (isAnimating && animationStartTime !== null) {
      const elapsed = performance.now() - animationStartTime;
      const progress = elapsed / ANIMATION_DURATION;

      if (progress >= 1) {
        isAnimating = false;
        animationStartTime = null;
        document.getElementById('minuteHand').classList.remove('animating');
        document.getElementById('secondHand').classList.remove('animating');
        const homeTime = getHomeTime(now);
        hours = homeTime.hours;
        minutes = homeTime.minutes;
        seconds = homeTime.seconds;
        millis = homeTime.millis;
      } else {
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const additionalSeconds = eased * 24 * 3600;
        const totalSeconds = animationStartOffset + additionalSeconds;

        hours = Math.floor(totalSeconds / 3600) % 24;
        minutes = Math.floor((totalSeconds % 3600) / 60);
        seconds = Math.floor(totalSeconds % 60);
        millis = (totalSeconds % 1) * 1000;

        displayDate = new Date(now);
        displayDate.setHours(hours, minutes, seconds, millis);
      }
    } else {
      const homeTime = getHomeTime(now);
      hours = homeTime.hours;
      minutes = homeTime.minutes;
      seconds = homeTime.seconds;
      millis = homeTime.millis;
    }

    // ── Mainspring Depletion Effects ──────────────────────────
    // As power reserve drains, the movement degrades like a real watch:
    //   100-30%: Full performance — crisp 8-beat ticks, full amplitude
    //   30-10%:  Amplitude loss — beats slow to ~6/sec, overshoot fades,
    //            occasional irregularity (like a real movement losing amplitude)
    //   10-3%:   Dying movement — ~4 beats/sec, visible jitter, hand stutters
    //   <3%:     Watch stops — hands freeze, balance wheel halts
    const watchStopped = powerLevel < 0.03;

    // Effective beat rate degrades with power
    let effectiveBPS = 8;
    let overshootStrength = 1.0; // 0..1, multiplier on the spring overshoot
    let beatJitter = 0;          // random timing jitter in fractional beats
    if (powerLevel < 0.30 && powerLevel >= 0.10) {
      // Gradual degradation: 8 → 6 BPS, overshoot fading
      const degradePct = 1 - (powerLevel - 0.10) / 0.20; // 0 at 30%, 1 at 10%
      effectiveBPS = 8 - degradePct * 2; // 8 → 6
      overshootStrength = 1.0 - degradePct * 0.7; // 1.0 → 0.3
      beatJitter = degradePct * 0.08; // subtle irregularity
    } else if (powerLevel < 0.10 && powerLevel >= 0.03) {
      // Dying: 6 → 4 BPS, heavy jitter, no overshoot
      const dyingPct = 1 - (powerLevel - 0.03) / 0.07; // 0 at 10%, 1 at 3%
      effectiveBPS = 6 - dyingPct * 2; // 6 → 4
      overshootStrength = 0.3 - dyingPct * 0.3; // 0.3 → 0
      beatJitter = 0.08 + dyingPct * 0.15; // growing jitter
    }

    // Mechanical movement simulation: beats per second with spring overshoot
    // Each beat: hand snaps to next position, overshoots slightly, settles
    const BEATS_PER_SEC = effectiveBPS;
    const rawBeatPos = (seconds * BEATS_PER_SEC) + (millis / 1000 * BEATS_PER_SEC);
    const beatIndex = Math.floor(rawBeatPos);
    const beatFrac = rawBeatPos % 1;
    const baseDeg = (beatIndex / BEATS_PER_SEC) * 6; // 6° per second, divided into beats

    // Trigger tick sound on each new beat (skip if stopped)
    if (tickEnabled && beatIndex !== lastTickBeat && !document.hidden && !watchStopped) {
      lastTickBeat = beatIndex;
      playTickSound();
    }

    // Spring physics: quick snap with slight overshoot then settle
    let springOffset = 0;
    if (watchStopped) {
      // Watch is dead — freeze at last position
      springOffset = 0;
    } else {
      // Apply jitter: slightly randomize the beat fraction timing
      let jitteredFrac = beatFrac;
      if (beatJitter > 0) {
        // Deterministic jitter from beatIndex so it doesn't flicker
        const jitterSeed = Math.sin(beatIndex * 127.1) * 43758.5453;
        const jitterVal = (jitterSeed - Math.floor(jitterSeed)) * 2 - 1; // -1..1
        jitteredFrac = Math.max(0, Math.min(1, beatFrac + jitterVal * beatJitter));
      }

      const overshoot = 0.12 * overshootStrength;
      if (jitteredFrac < 0.15) {
        // Snap phase: accelerate to target + overshoot
        const t = jitteredFrac / 0.15;
        springOffset = (1 + overshoot * Math.sin(t * Math.PI)) * t;
        springOffset = Math.min(springOffset, 1 + overshoot);
      } else if (jitteredFrac < 0.35) {
        // Settle phase: overshoot decays back
        const t = (jitteredFrac - 0.15) / 0.2;
        springOffset = (1 + overshoot) - overshoot * t;
      } else {
        // Rest phase: stationary at target
        springOffset = 1.0;
      }
    }

    const nextBeatDeg = 6 / BEATS_PER_SEC; // degrees per beat
    const secondAngle = watchStopped
      ? (lastStoppedSecondAngle !== null ? lastStoppedSecondAngle : baseDeg)
      : baseDeg + springOffset * nextBeatDeg;
    if (watchStopped && lastStoppedSecondAngle === null) {
      lastStoppedSecondAngle = baseDeg;
    } else if (!watchStopped) {
      lastStoppedSecondAngle = null;
    }

    const minuteAngle = (minutes * 6) + (seconds * 0.1);
    const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);

    // When watch is stopped, freeze hands at their last known position
    const secEl = document.getElementById('secondHand');
    if (!watchStopped) {
      document.getElementById('hourHand').style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
      document.getElementById('minuteHand').style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
      secEl.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;
      // Subtle opacity reduction as power fades
      secEl.style.opacity = powerLevel < 0.10 ? (0.4 + powerLevel * 6).toFixed(2) : '1';
    }
    // Toggle stopped class for potential CSS styling
    clockFace.classList.toggle('watch-stopped', watchStopped);

    // Dynamic hand shadows — offset from light source position
    // Light at upper-left (30,22) → shadow shifts down-right
    // Shadow offset is proportional to distance from center (50,50)
    const shadowDx = (lightSourceX - 50) * -0.06; // px offset, inverted from light
    const shadowDy = (lightSourceY - 50) * -0.06;
    const shadowOffX = shadowDx.toFixed(1);
    const shadowOffY = shadowDy.toFixed(1);
    if (!watchStopped) {
      hourShadow.style.transform = `translateX(calc(-50% + ${shadowOffX}px)) translateY(${shadowOffY}px) rotate(${hourAngle}deg)`;
      minuteShadow.style.transform = `translateX(calc(-50% + ${shadowOffX}px)) translateY(${shadowOffY}px) rotate(${minuteAngle}deg)`;
      secondShadow.style.transform = `translateX(calc(-50% + ${shadowOffX}px)) translateY(${shadowOffY}px) rotate(${secondAngle}deg)`;
    }

    // GMT hand: shows LOCAL time on 24h scale when a city is selected
    // This lets you read city time on hour/minute hands + local time on 24h bezel
    const gmtEl = document.getElementById('gmtHand');
    if (homeTimezone && homeTimezone !== getLocalTimezone()) {
      const localNow = new Date();
      const localH = localNow.getHours();
      const localM = localNow.getMinutes();
      const localS = localNow.getSeconds();
      const localMs = localNow.getMilliseconds();
      const gmtDeg = (localH * 15) + (localM * 0.25) + (localS * (0.25 / 60)) + (localMs * (0.25 / 60000));
      gmtEl.style.transform = `translateX(-50%) rotate(${gmtDeg}deg)`;
      gmtEl.classList.add('visible');
    } else {
      gmtEl.classList.remove('visible');
    }

    const hour24 = hours + minutes / 60 + seconds / 3600;
    const ringRotation = hour24 * 15;
    hourRing.style.transform = `rotate(${ringRotation}deg)`;

    // Update hour marker rotations to keep them readable as ring rotates
    updateHourMarkerRotations(ringRotation);

    const hourForGlow = hour24;
    const rawGlow = (Math.cos(hourForGlow * Math.PI / 12) + 1) / 2;
    const glowIntensity = Math.pow(rawGlow, 1.5);
    const finalGlow = lumeMode ? 1.0 :
      (hourForGlow >= 18 || hourForGlow <= 6 ? glowIntensity : glowIntensity * 0.3);
    clockFace.style.setProperty('--lume-glow', finalGlow.toFixed(3));

    const timeStr = String(hours).padStart(2, '0') + ':' +
                   String(minutes).padStart(2, '0') + ':' +
                   String(seconds).padStart(2, '0');
    digitalTime.textContent = timeStr;

    digitalDate.textContent = now.toLocaleDateString('en-US', {
      timeZone: homeTz,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Update date window complication
    const dateNumEl = document.getElementById('dateNum');
    if (dateNumEl) {
      const dayOfMonth = now.toLocaleDateString('en-US', { timeZone: homeTz, day: 'numeric' });
      if (dateNumEl.textContent !== dayOfMonth) {
        dateNumEl.classList.add('flip');
        setTimeout(() => {
          dateNumEl.textContent = dayOfMonth;
          dateNumEl.classList.remove('flip');
        }, 350);
      }
    }

    // Day-of-week window (Rolex Day-Date style)
    const dayTextEl = document.getElementById('dayText');
    if (dayTextEl) {
      const dowShort = now.toLocaleDateString('en-US', { timeZone: homeTz, weekday: 'short' }).toUpperCase();
      if (dayTextEl.textContent !== dowShort) {
        dayTextEl.classList.add('flip');
        setTimeout(() => {
          dayTextEl.textContent = dowShort;
          dayTextEl.classList.remove('flip');
        }, 350);
      }
    }

    // Month window (Annual Calendar / Perpetual Calendar style)
    const monthTextEl = document.getElementById('monthText');
    if (monthTextEl) {
      const monthShort = now.toLocaleDateString('en-US', { timeZone: homeTz, month: 'short' }).toUpperCase();
      if (monthTextEl.textContent !== monthShort) {
        monthTextEl.classList.add('flip');
        setTimeout(() => {
          monthTextEl.textContent = monthShort;
          monthTextEl.classList.remove('flip');
        }, 350);
      }
    }

    const offset = getHomeOffset();
    const offsetHours = Math.floor(Math.abs(offset));
    const offsetMinutes = Math.round((Math.abs(offset) % 1) * 60);
    const offsetStr = (offset >= 0 ? '+' : '-') +
      String(offsetHours).padStart(2, '0') + ':' +
      String(offsetMinutes).padStart(2, '0');

    let tzDisplay = homeCityName || homeTz;
    if (homeTimezone && homeTimezone !== getLocalTimezone()) {
      tzDisplay += ' 📍';
    }
    timezoneInfo.textContent = `${tzDisplay} (UTC${offsetStr})` + (isAnimating ? ' ⏩' : '');

    drawPolarEarth(hours, minutes, seconds);
    updateCityTints();

    // Power reserve
    updateRotor();
    updatePowerReserve();
    drawPowerReserve();
    updateSunInfo(hours, minutes);
    updateEquationOfTime();
    updateHomeTimeDual();
    checkChime(hours, minutes, seconds);
    checkAlarm(hours, minutes, seconds);
    updateAlarmHand();
    drawBalanceWheel(seconds, millis);

    requestAnimationFrame(updateClock);
  }

  // Polar Earth drawing
  const polarCanvas = document.getElementById('polarEarthCanvas');
  const polarCtx = polarCanvas.getContext('2d');
  const polarSize = 240;
  const polarCenter = polarSize / 2;
  const polarRadius = polarSize / 2 - 4;

  const polarEarthImg = new Image();
  polarEarthImg.src = '/500px-Northern_Hemisphere.png';

  let polarImageLoaded = false;
  polarEarthImg.onload = function() {
    polarImageLoaded = true;
  };

  function drawPolarEarth(hours, minutes, seconds) {
    const ctx = polarCtx;
    ctx.clearRect(0, 0, polarSize, polarSize);

    const homeOffset = getHomeOffset();
    const homeLongitude = homeOffset * 15;
    const imageDefaultLongitude = 180;

    // Apply animation offset and decay it smoothly
    let mapRotation = homeLongitude - imageDefaultLongitude + polarEarthAnimationOffset;
    if (Math.abs(polarEarthAnimationOffset) > 0.1) {
      // Decay factor for smooth easing (about 1.5s to reach near-zero at 60fps)
      polarEarthAnimationOffset *= 0.97;
    } else if (polarEarthAnimationOffset !== 0) {
      polarEarthAnimationOffset = 0;
    }

    const displayedHomeHours = hours + minutes / 60 + seconds / 3600;
    const displayedUtcHours = (displayedHomeHours - homeOffset + 24) % 24;
    const sunLongitude = (180 - displayedUtcHours * 15 + 360) % 360;
    const sunAngleFromHome = sunLongitude - homeLongitude;
    const shadingRotation = -sunAngleFromHome * Math.PI / 180;

    ctx.save();
    ctx.beginPath();
    ctx.arc(polarCenter, polarCenter, polarRadius, 0, Math.PI * 2);
    ctx.clip();

    if (polarImageLoaded) {
      ctx.save();
      ctx.translate(polarCenter, polarCenter);
      ctx.rotate(mapRotation * Math.PI / 180);
      ctx.drawImage(polarEarthImg, -polarRadius, -polarRadius, polarRadius * 2, polarRadius * 2);
      ctx.restore();
    } else {
      ctx.fillStyle = '#1a4d7a';
      ctx.fill();
    }

    ctx.restore();

    ctx.save();
    ctx.translate(polarCenter, polarCenter);
    ctx.rotate(shadingRotation);
    ctx.translate(-polarCenter, -polarCenter);

    // Draw curved terminator with twilight bands
    // The terminator is an ellipse — wider at equator, narrower at poles
    // We draw night as a filled shape covering the dark half
    const tw = polarRadius * 0.12; // twilight band width

    // Night side (bottom half after rotation = away from sun)
    // Civil twilight zone
    ctx.beginPath();
    ctx.arc(polarCenter, polarCenter, polarRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 40, 0.15)';
    ctx.fill();

    // Draw the night shadow as a half-circle with soft edge
    // The terminator curves — use an elliptical clip
    ctx.save();
    ctx.beginPath();
    // Terminator line: a slight ellipse to simulate curvature
    ctx.ellipse(polarCenter, polarCenter + tw * 0.3, polarRadius, polarRadius * 0.92, 0, 0, Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 30, 0.35)';
    ctx.fill();
    ctx.restore();

    // Deeper night core
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(polarCenter, polarCenter + tw, polarRadius * 0.95, polarRadius * 0.8, 0, 0, Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 20, 0.3)';
    ctx.fill();
    ctx.restore();

    // Sun-side warm glow
    ctx.save();
    const sunGlow = ctx.createRadialGradient(
      polarCenter, polarCenter - polarRadius * 0.5, 0,
      polarCenter, polarCenter - polarRadius * 0.5, polarRadius * 0.8
    );
    sunGlow.addColorStop(0, 'rgba(255, 250, 200, 0.2)');
    sunGlow.addColorStop(0.5, 'rgba(255, 240, 180, 0.08)');
    sunGlow.addColorStop(1, 'rgba(255, 240, 180, 0)');
    ctx.beginPath();
    ctx.arc(polarCenter, polarCenter, polarRadius, 0, Math.PI * 2);
    ctx.fillStyle = sunGlow;
    ctx.fill();
    ctx.restore();

    // City lights on the dark side — small twinkling dots
    const cityPositions = [
      // Approximate polar-projection positions (relative to center, -1 to 1)
      // Major cities in northern hemisphere
      { x: 0.05, y: 0.15, s: 1.2 },   // London
      { x: 0.12, y: 0.18, s: 0.9 },   // Paris
      { x: 0.25, y: 0.12, s: 1.0 },   // Moscow
      { x: -0.35, y: 0.28, s: 1.3 },  // New York
      { x: -0.52, y: 0.25, s: 1.1 },  // Chicago
      { x: -0.7, y: 0.22, s: 1.0 },   // LA
      { x: 0.55, y: 0.35, s: 1.2 },   // Tokyo
      { x: 0.48, y: 0.38, s: 1.1 },   // Shanghai
      { x: 0.35, y: 0.45, s: 0.8 },   // Mumbai
      { x: 0.15, y: 0.30, s: 0.7 },   // Cairo
      { x: 0.18, y: 0.15, s: 0.8 },   // Berlin
      { x: -0.42, y: 0.35, s: 0.7 },  // Houston
      { x: 0.52, y: 0.30, s: 0.9 },   // Seoul
      { x: -0.60, y: 0.30, s: 0.8 },  // Denver
      { x: 0.40, y: 0.25, s: 0.7 },   // Dubai
    ];
    const now = Date.now();
    for (const city of cityPositions) {
      // Rotate city position with the map
      const rot = mapRotation * Math.PI / 180;
      const rx = city.x * Math.cos(rot) - city.y * Math.sin(rot);
      const ry = city.x * Math.sin(rot) + city.y * Math.cos(rot);
      const cx = polarCenter + rx * polarRadius;
      const cy = polarCenter + ry * polarRadius;

      // Only show if in the dark half (positive y after shading rotation means night side)
      const sr = shadingRotation;
      const nightY = (cx - polarCenter) * Math.sin(-sr) + (cy - polarCenter) * Math.cos(-sr);
      if (nightY < polarRadius * 0.1) continue; // skip if on day side

      // Check if within circle
      const dist = Math.hypot(cx - polarCenter, cy - polarCenter);
      if (dist > polarRadius * 0.9) continue;

      // Twinkle effect
      const twinkle = 0.5 + 0.5 * Math.sin(now / (300 + city.s * 200) + city.x * 10);
      const alpha = 0.3 + twinkle * 0.5;
      const size = city.s * (0.8 + twinkle * 0.4);

      ctx.beginPath();
      ctx.arc(cx, cy, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 230, 150, ${alpha.toFixed(2)})`;
      ctx.fill();

      // Tiny glow
      if (twinkle > 0.6) {
        ctx.beginPath();
        ctx.arc(cx, cy, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 100, ${(alpha * 0.15).toFixed(2)})`;
        ctx.fill();
      }
    }

    ctx.restore();

    // ─── Atmospheric Effects ───────────────────────────────
    // 1. Star field on the dark side — tiny white dots that twinkle subtly
    ctx.save();
    ctx.beginPath();
    ctx.arc(polarCenter, polarCenter, polarRadius, 0, Math.PI * 2);
    ctx.clip();
    // Use a seeded pseudo-random for deterministic star positions
    const starSeed = 42;
    for (let i = 0; i < 35; i++) {
      // Simple hash for consistent positions
      const sx = ((Math.sin(i * 127.1 + starSeed) * 43758.5453) % 1 + 1) % 1;
      const sy = ((Math.sin(i * 269.5 + starSeed * 1.3) * 28462.1927) % 1 + 1) % 1;
      const rawX = polarCenter + (sx - 0.5) * polarRadius * 1.8;
      const rawY = polarCenter + (sy - 0.5) * polarRadius * 1.8;
      // Check if inside the circle
      const dFromCenter = Math.hypot(rawX - polarCenter, rawY - polarCenter);
      if (dFromCenter > polarRadius * 0.92) continue;
      // Only show in the dark half (positive y in shading-rotated space = night)
      const nightCheck = (rawX - polarCenter) * Math.sin(-shadingRotation) +
                         (rawY - polarCenter) * Math.cos(-shadingRotation);
      if (nightCheck < polarRadius * 0.15) continue;
      // Twinkle
      const twinkleS = 0.4 + 0.6 * Math.abs(Math.sin(now / (800 + i * 90) + i * 2.7));
      const starAlpha = 0.15 + twinkleS * 0.25;
      const starSize = 0.4 + ((i * 73) % 10) / 20;
      ctx.beginPath();
      ctx.arc(rawX, rawY, starSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha.toFixed(2)})`;
      ctx.fill();
    }
    ctx.restore();

    // 2. Sunrise/sunset band — warm glow along the terminator
    ctx.save();
    ctx.beginPath();
    ctx.arc(polarCenter, polarCenter, polarRadius, 0, Math.PI * 2);
    ctx.clip();
    ctx.translate(polarCenter, polarCenter);
    ctx.rotate(shadingRotation);
    ctx.translate(-polarCenter, -polarCenter);
    // Horizontal band along the terminator (y = polarCenter = the day/night boundary)
    const terminatorGrad = ctx.createLinearGradient(
      polarCenter, polarCenter - polarRadius * 0.15,
      polarCenter, polarCenter + polarRadius * 0.15
    );
    terminatorGrad.addColorStop(0, 'rgba(255, 180, 80, 0)');
    terminatorGrad.addColorStop(0.3, 'rgba(255, 140, 60, 0.12)');
    terminatorGrad.addColorStop(0.5, 'rgba(255, 100, 60, 0.18)');
    terminatorGrad.addColorStop(0.7, 'rgba(200, 80, 120, 0.10)');
    terminatorGrad.addColorStop(1, 'rgba(100, 50, 120, 0)');
    ctx.fillStyle = terminatorGrad;
    ctx.fillRect(polarCenter - polarRadius, polarCenter - polarRadius * 0.15,
                 polarRadius * 2, polarRadius * 0.30);
    ctx.restore();

    // 3. Atmospheric limb glow — blue haze ring around the earth's edge
    const limbGrad = ctx.createRadialGradient(
      polarCenter, polarCenter, polarRadius * 0.88,
      polarCenter, polarCenter, polarRadius * 1.02
    );
    limbGrad.addColorStop(0, 'rgba(80, 160, 255, 0)');
    limbGrad.addColorStop(0.5, 'rgba(80, 160, 255, 0.08)');
    limbGrad.addColorStop(0.75, 'rgba(60, 130, 220, 0.15)');
    limbGrad.addColorStop(1, 'rgba(40, 100, 200, 0)');
    ctx.beginPath();
    ctx.arc(polarCenter, polarCenter, polarRadius * 1.02, 0, Math.PI * 2);
    ctx.fillStyle = limbGrad;
    ctx.fill();
    // ─── End Atmospheric Effects ───────────────────────────

    ctx.beginPath();
    ctx.arc(polarCenter, polarCenter, polarRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Initialize
  initSunTimes();
  positionCities();
  lastCityTintUpdate = 0; // force immediate tint on first frame
  generateHourRing();
  // ═══════════════════════════════════════════════════
  // Power Reserve Complication (6 o'clock)
  // Simulates a mechanical watch mainspring:
  //   - Starts fully wound (100%)
  //   - Drains slowly when tab is hidden (~1%/min)
  //   - Recharges on any user interaction (mouse/key/touch)
  //   - Drawn as a classic arc gauge with needle
  // ═══════════════════════════════════════════════════
  const powerCanvas = document.getElementById('powerCanvas');
  let powerLevel = 1.0; // 0..1
  let lastPowerUpdate = Date.now();

  // ═══════════════════════════════════════════════════
  // Automatic Winding Rotor
  // Like a real automatic watch: mouse/touch movement spins a
  // weighted rotor with inertia and friction. Rotor spin speed
  // charges the mainspring (power reserve). Visible behind the
  // tourbillon in the open-heart complication.
  // ═══════════════════════════════════════════════════
  let rotorAngle = 0;        // current rotor angle in radians
  let rotorVelocity = 0;     // angular velocity in rad/s
  const ROTOR_FRICTION = 0.97;  // per-frame friction multiplier (~60fps)
  const ROTOR_MOUSE_GAIN = 0.08; // how much mouse movement adds to velocity
  const ROTOR_CHARGE_RATE = 0.0004; // power charge per abs(velocity) per frame
  let lastMouseX = 0;
  let lastMouseY = 0;
  let lastMouseTime = 0;

  // Mouse movement drives the rotor via angular impulse from cursor velocity
  document.addEventListener('mousemove', function(e) {
    const now = performance.now();
    const dt = now - lastMouseTime;
    if (dt > 0 && dt < 200) { // ignore stale deltas
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      // Direction: use cross product of delta to give consistent rotation sense
      const dir = (dx + dy) > 0 ? 1 : -1;
      rotorVelocity += dir * speed * ROTOR_MOUSE_GAIN * (16 / Math.max(dt, 8));
      // Clamp velocity to prevent runaway
      rotorVelocity = Math.max(-40, Math.min(40, rotorVelocity));
    }
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    lastMouseTime = now;
  });

  // Touch movement also drives rotor
  let lastTouchX = 0, lastTouchY = 0, lastTouchTime = 0;
  document.addEventListener('touchmove', function(e) {
    if (!e.touches.length) return;
    const touch = e.touches[0];
    const now = performance.now();
    const dt = now - lastTouchTime;
    if (dt > 0 && dt < 200) {
      const dx = touch.clientX - lastTouchX;
      const dy = touch.clientY - lastTouchY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const dir = (dx + dy) > 0 ? 1 : -1;
      rotorVelocity += dir * speed * ROTOR_MOUSE_GAIN * (16 / Math.max(dt, 8));
      rotorVelocity = Math.max(-40, Math.min(40, rotorVelocity));
    }
    lastTouchX = touch.clientX;
    lastTouchY = touch.clientY;
    lastTouchTime = now;
  }, { passive: true });
  document.addEventListener('touchstart', function(e) {
    if (!e.touches.length) return;
    lastTouchX = e.touches[0].clientX;
    lastTouchY = e.touches[0].clientY;
    lastTouchTime = performance.now();
  }, { passive: true });

  // Keyboard actions give a small kick
  document.addEventListener('keydown', function() {
    rotorVelocity += (Math.random() > 0.5 ? 1 : -1) * 3;
  });
  document.addEventListener('scroll', function() {
    rotorVelocity += 2;
  });

  function updateRotor() {
    // Apply friction
    rotorVelocity *= ROTOR_FRICTION;
    // Threshold to zero when nearly stopped
    if (Math.abs(rotorVelocity) < 0.05) rotorVelocity = 0;
    // Update angle
    rotorAngle += rotorVelocity * (1 / 60); // approximate 60fps frame
    // Charge power reserve proportional to spin speed
    const chargeAmount = Math.abs(rotorVelocity) * ROTOR_CHARGE_RATE;
    if (chargeAmount > 0) {
      powerLevel = Math.min(1.0, powerLevel + chargeAmount);
    }
  }

  function drawRotor(ctx, cx, cy, r) {
    // Draw the automatic winding rotor — a semicircular weight
    // Layered behind the tourbillon cage
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotorAngle);

    // Central bearing
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(180, 175, 160, 0.5)';
    ctx.fill();
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(120, 115, 105, 0.6)';
    ctx.stroke();

    // Rotor arm — extends from center to edge
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.12);
    ctx.lineTo(r * 0.85, -r * 0.06);
    ctx.lineTo(r * 0.85, r * 0.06);
    ctx.lineTo(0, r * 0.12);
    ctx.closePath();
    const armGrad = ctx.createLinearGradient(0, -r * 0.1, 0, r * 0.1);
    armGrad.addColorStop(0, 'rgba(160, 155, 140, 0.35)');
    armGrad.addColorStop(0.5, 'rgba(190, 185, 170, 0.45)');
    armGrad.addColorStop(1, 'rgba(140, 135, 120, 0.3)');
    ctx.fillStyle = armGrad;
    ctx.fill();

    // Rotor weight — semicircular heavy mass at the end
    // This is the characteristic weighted sector of an automatic rotor
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.88, -0.45, 0.45); // ~50° arc
    ctx.lineTo(r * 0.6 * Math.cos(0.45), r * 0.6 * Math.sin(0.45));
    ctx.arc(0, 0, r * 0.6, 0.45, -0.45, true);
    ctx.closePath();

    // Tungsten-like heavy metal gradient (darker, denser look)
    const weightGrad = ctx.createRadialGradient(
      r * 0.5, 0, r * 0.1,
      r * 0.5, 0, r * 0.5
    );
    weightGrad.addColorStop(0, 'rgba(100, 95, 85, 0.7)');
    weightGrad.addColorStop(0.5, 'rgba(140, 135, 120, 0.65)');
    weightGrad.addColorStop(1, 'rgba(80, 75, 65, 0.6)');
    ctx.fillStyle = weightGrad;
    ctx.fill();
    ctx.lineWidth = 0.6;
    ctx.strokeStyle = 'rgba(200, 195, 180, 0.3)';
    ctx.stroke();

    // Decorative Geneva stripes on the rotor weight (Côtes de Genève)
    ctx.save();
    ctx.clip(); // clip to rotor weight shape
    ctx.globalAlpha = 0.12;
    for (let i = -5; i < 8; i++) {
      const y = i * r * 0.12;
      ctx.beginPath();
      ctx.moveTo(r * 0.5, y);
      ctx.lineTo(r * 1.0, y + r * 0.04);
      ctx.lineWidth = r * 0.06;
      ctx.strokeStyle = '#fff';
      ctx.stroke();
    }
    ctx.restore();

    // "AUTOMATIC" text engraved on rotor
    ctx.save();
    ctx.rotate(0); // already in rotor space
    ctx.font = `${Math.max(3, r * 0.09)}px sans-serif`;
    ctx.fillStyle = 'rgba(200, 195, 180, 0.35)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AUTOMATIC', r * 0.74, 0);
    ctx.restore();

    // Bearing screw in center
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.05, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(220, 215, 200, 0.7)';
    ctx.fill();
    // Screw slot
    ctx.beginPath();
    ctx.moveTo(-r * 0.035, 0);
    ctx.lineTo(r * 0.035, 0);
    ctx.lineWidth = 0.4;
    ctx.strokeStyle = 'rgba(60, 55, 50, 0.8)';
    ctx.stroke();

    ctx.restore();
  }

  // Sunrise/sunset info display
  let sunInfoEl = null;
  let lastSunInfoUpdate = 0;

  function updateSunInfo(hours, minutes) {
    if (!sunInfoEl) sunInfoEl = document.getElementById('sunInfo');
    if (!sunInfoEl) return;

    // Only update every 30 seconds to avoid DOM thrashing
    const now = Date.now();
    if (now - lastSunInfoUpdate < 30000) return;
    lastSunInfoUpdate = now;

    const st = currentSunTimes;
    if (!st) return;

    const currentHour = hours + minutes / 60;
    const dayLen = st.sunset - st.sunrise;

    function fmtTime(h) {
      const hr = Math.floor(h);
      const mn = Math.round((h - hr) * 60);
      const ampm = hr >= 12 ? 'PM' : 'AM';
      const h12 = hr === 0 ? 12 : hr > 12 ? hr - 12 : hr;
      return h12 + ':' + String(mn).padStart(2, '0') + ' ' + ampm;
    }

    const riseStr = fmtTime(st.sunrise);
    const setStr = fmtTime(st.sunset);

    let statusStr;
    if (currentHour >= st.sunrise && currentHour < st.sunset) {
      const remaining = st.sunset - currentHour;
      const remH = Math.floor(remaining);
      const remM = Math.round((remaining - remH) * 60);
      statusStr = '<span class="daylight-rem">' + remH + 'h ' + remM + 'm daylight left</span>';
    } else {
      let untilSunrise;
      if (currentHour < st.sunrise) {
        untilSunrise = st.sunrise - currentHour;
      } else {
        untilSunrise = (24 - currentHour) + st.sunrise;
      }
      const untilH = Math.floor(untilSunrise);
      const untilM = Math.round((untilSunrise - untilH) * 60);
      statusStr = '<span class="daylight-rem">' + untilH + 'h ' + untilM + 'm until sunrise</span>';
    }

    sunInfoEl.innerHTML =
      '<span class="sun-rise">\u2600 ' + riseStr + '</span>' +
      ' \u00b7 <span class="sun-set">\ud83c\udf19 ' + setStr + '</span>' +
      ' \u00b7 ' + statusStr;
  }

  // ═══════════════════════════════════════════════════
  //  Equation of Time Complication
  //  Shows the difference between solar noon and clock noon.
  //  Ranges from about -14.2 min (Feb) to +16.4 min (Nov).
  //  Positive = sun is ahead (solar noon before 12:00)
  //  Negative = sun is behind (solar noon after 12:00)
  // ═══════════════════════════════════════════════════
  let eotInfoEl = null;
  let lastEotUpdate = 0;

  // Compute EoT in minutes using the standard two-term Fourier approximation.
  // Input: a Date object.  Returns minutes (positive = sundial fast).
  function getEquationOfTime(date) {
    const start = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date - start) / 86400000) + 1;
    // B parameter in radians
    const B = (2 * Math.PI / 365) * (dayOfYear - 81);
    // Spencer formula (simplified)
    const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
    return eot; // minutes
  }

  // ═══════════════════════════════════════════════════
  //  Home Time Dual Display
  //  Shows local time when viewing a foreign timezone
  // ═══════════════════════════════════════════════════
  const homeTimeDualEl = document.getElementById('homeTimeDual');

  function updateHomeTimeDual() {
    if (!homeTimeDualEl) return;
    const isAway = homeTimezone && homeTimezone !== getLocalTimezone();
    if (!isAway) {
      homeTimeDualEl.classList.remove('visible');
      return;
    }

    const now = new Date();
    const localH = now.getHours();
    const localM = now.getMinutes();
    const ampm = localH >= 12 ? 'PM' : 'AM';
    const h12 = localH % 12 || 12;
    const timeStr = String(h12) + ':' + String(localM).padStart(2, '0') + ' ' + ampm;

    const localTz = getLocalTimezone();
    const dayStr = now.toLocaleDateString('en-US', {
      timeZone: localTz,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    // Detect if the local date differs from the displayed city's date
    const cityDateStr = now.toLocaleDateString('en-US', {
      timeZone: homeTimezone,
      year: 'numeric', month: 'numeric', day: 'numeric'
    });
    const localDateStr = now.toLocaleDateString('en-US', {
      timeZone: localTz,
      year: 'numeric', month: 'numeric', day: 'numeric'
    });
    const dateDiffNote = cityDateStr !== localDateStr ? ' ⚠' : '';

    homeTimeDualEl.innerHTML =
      '<span class="home-label">🏠 Local</span> ' +
      '<span class="home-clock">' + timeStr + '</span> ' +
      '<span class="home-date">· ' + dayStr + dateDiffNote + '</span>';
    homeTimeDualEl.classList.add('visible');
  }

  function updateEquationOfTime() {
    if (!eotInfoEl) eotInfoEl = document.getElementById('eotInfo');
    if (!eotInfoEl) return;

    // Update once per minute — value barely changes
    const now = Date.now();
    if (now - lastEotUpdate < 60000) return;
    lastEotUpdate = now;

    const eot = getEquationOfTime(new Date());
    const absEot = Math.abs(eot);
    const sign = eot >= 0 ? '+' : '\u2212'; // − unicode minus
    const label = eot >= 0 ? 'fast' : 'slow';
    const colorClass = absEot < 1 ? 'near-zero' : (eot >= 0 ? 'fast' : 'slow');

    // Position needle: EoT ranges ~ -16.5 to +16.5. Map to 0%–100% of bar.
    const MAX_EOT = 17; // minutes — clamp range
    const clamped = Math.max(-MAX_EOT, Math.min(MAX_EOT, eot));
    const pct = 50 + (clamped / MAX_EOT) * 50; // 0% = -17m, 50% = 0, 100% = +17m

    // Fill bar from center to needle
    const fillLeft = eot >= 0 ? 50 : pct;
    const fillWidth = Math.abs(pct - 50);
    const fillColor = eot >= 0 ? '#e8a060' : '#6fa8dc';
    const needleColor = eot >= 0 ? '#e8a060' : '#6fa8dc';

    eotInfoEl.innerHTML =
      '<span class="eot-label">EoT</span>' +
      '<span class="eot-value ' + colorClass + '">' + sign + absEot.toFixed(1) + 'm</span>' +
      '<span class="eot-bar">' +
        '<span class="eot-bar-center"></span>' +
        '<span class="eot-bar-fill" style="left:' + fillLeft.toFixed(1) + '%;width:' + fillWidth.toFixed(1) + '%;background:' + fillColor + '"></span>' +
        '<span class="eot-bar-needle" style="left:calc(' + pct.toFixed(1) + '% - 1.5px);background:' + needleColor + '"></span>' +
      '</span>' +
      '<span class="eot-label">sun ' + label + '</span>';
  }

  function updatePowerReserve() {
    const now = Date.now();
    const dt = (now - lastPowerUpdate) / 1000; // seconds
    lastPowerUpdate = now;

    // Drain rate: faster when hidden, slow when visible
    const drainRate = document.hidden ? 0.003 : 0.0003; // per second
    powerLevel = Math.max(0, powerLevel - drainRate * dt);
  }

  function drawPowerReserve() {
    if (!powerCanvas) return;
    const ctx = powerCanvas.getContext('2d');
    const w = powerCanvas.width;
    const h = powerCanvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h * 0.85;
    const r = 30;
    const startAngle = Math.PI + 0.3;  // ~210 deg
    const endAngle = -0.3;             // ~-17 deg (sweep ~180 deg)
    const sweep = endAngle - startAngle; // negative = clockwise in canvas coords
    // Actually we want left-to-right arc: from ~210° to ~330°
    const arcStart = Math.PI * 1.15;
    const arcEnd = Math.PI * -0.15;
    const arcSweep = arcEnd - arcStart;

    // Background arc (dark track)
    ctx.beginPath();
    ctx.arc(cx, cy, r, arcStart, arcEnd, true);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Filled arc (color based on level)
    const fillAngle = arcStart + arcSweep * powerLevel;
    let color;
    if (powerLevel > 0.5) {
      color = '#4da6ff'; // blue = healthy
    } else if (powerLevel > 0.2) {
      color = '#ffa726'; // orange = getting low
    } else {
      color = '#ef5350'; // red = critical
    }

    ctx.beginPath();
    ctx.arc(cx, cy, r, arcStart, fillAngle, true);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Small needle
    const needleAngle = arcStart + arcSweep * powerLevel;
    const nx = cx + Math.cos(needleAngle) * (r + 4);
    const ny = cy + Math.sin(needleAngle) * (r + 4);
    const nb = cx + Math.cos(needleAngle) * (r - 8);
    const nb2 = cy + Math.sin(needleAngle) * (r - 8);
    ctx.beginPath();
    ctx.moveTo(nb, nb2);
    ctx.lineTo(nx, ny);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // Labels
    ctx.font = '7px ' + getComputedStyle(document.body).fontFamily;
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.textAlign = 'left';
    ctx.fillText('E', cx - r - 2, cy - r + 10);
    ctx.textAlign = 'right';
    ctx.fillText('F', cx + r + 2, cy - r + 10);

    // "WIND" indicator when power is critically low or depleted
    if (powerLevel < 0.03) {
      const blinkAlpha = 0.5 + 0.5 * Math.sin(Date.now() / 400);
      ctx.textAlign = 'center';
      ctx.font = 'bold 8px ' + getComputedStyle(document.body).fontFamily;
      ctx.fillStyle = `rgba(239, 83, 80, ${blinkAlpha.toFixed(2)})`;
      ctx.fillText('WIND', cx, cy - r + 22);
    } else if (powerLevel < 0.10) {
      ctx.textAlign = 'center';
      ctx.font = '6px ' + getComputedStyle(document.body).fontFamily;
      ctx.fillStyle = 'rgba(255, 167, 38, 0.6)';
      ctx.fillText('LOW', cx, cy - r + 22);
    }
  }

  updateClock();

  setInterval(() => {
    allCities = buildCityList();
    positionCities();
  }, 60000);

  const now = new Date();
  const msToMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
  setTimeout(() => {
    initSunTimes();
    setInterval(initSunTimes, 86400000);
  }, msToMidnight);

  // Responsive scaling — fit clock to viewport on small screens
  // Uses zoom (baseline in all modern browsers) instead of transform: scale()
  // because zoom doesn't break getBoundingClientRect() which positionCities() needs
  const CLOCK_NATIVE_SIZE = 520; // px — the designed size
  const worldTimerEl = document.querySelector('.world-timer');

  function fitClockToViewport() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = 24; // breathing room
    // Digital readouts + chrono below clock need ~120px, strap adds ~400px
    const availW = vw - pad;
    const availH = vh - pad - 120;
    // Account for the strap extending 200px above and below the clock
    const totalNativeH = CLOCK_NATIVE_SIZE + 400;
    const maxFitW = availW / CLOCK_NATIVE_SIZE;
    const maxFitH = availH / totalNativeH;
    const scale = Math.min(maxFitW, maxFitH);

    if (scale < 1) {
      worldTimerEl.style.zoom = Math.max(0.35, scale).toFixed(4);
    } else {
      worldTimerEl.style.zoom = '';
    }
    // Re-position cities after layout shift
    positionCities();
  }

  // ═══════════════════════════════════════════════════
  //  Moonphase Complication
  // ═══════════════════════════════════════════════════
  const moonCanvas = document.getElementById('moonCanvas');
  const moonCtx = moonCanvas ? moonCanvas.getContext('2d') : null;
  const moonTooltip = document.getElementById('moonphaseTooltip');

  const MOON_PHASE_NAMES = [
    'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
    'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'
  ];
  const MOON_PHASE_ICONS = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

  // Calculate moon phase (0..1) using Conway's approximation
  // Reference new moon: Jan 6, 2000 (known new moon)
  function getMoonPhase(date) {
    const SYNODIC_MONTH = 29.53058770576;
    const REF_NEW_MOON = new Date(Date.UTC(2000, 0, 6, 18, 14, 0)); // Jan 6 2000 18:14 UTC
    const daysSinceRef = (date.getTime() - REF_NEW_MOON.getTime()) / (1000 * 60 * 60 * 24);
    let phase = (daysSinceRef % SYNODIC_MONTH) / SYNODIC_MONTH;
    if (phase < 0) phase += 1;
    return phase; // 0 = new moon, 0.5 = full moon
  }

  function getMoonPhaseName(phase) {
    const idx = Math.round(phase * 8) % 8;
    return { name: MOON_PHASE_NAMES[idx], icon: MOON_PHASE_ICONS[idx], idx };
  }

  let lastMoonDay = -1;

  function updateMoonphase(now) {
    if (!moonCtx) return;

    // Only redraw once per day (moon doesn't change visibly faster)
    const dayKey = now.getFullYear() * 400 + now.getMonth() * 32 + now.getDate();
    if (dayKey === lastMoonDay) return;
    lastMoonDay = dayKey;

    const phase = getMoonPhase(now);
    const info = getMoonPhaseName(phase);
    const age = Math.round(phase * 29.53);
    const illum = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);

    // Update tooltip
    if (moonTooltip) {
      moonTooltip.textContent = `${info.icon} ${info.name} · ${illum}% · Day ${age}`;
    }

    // Draw moon on canvas
    const size = 64;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 3;

    moonCtx.clearRect(0, 0, size, size);

    // Night sky background with stars
    moonCtx.fillStyle = '#0a0e1a';
    moonCtx.beginPath();
    moonCtx.arc(cx, cy, r + 2, 0, Math.PI * 2);
    moonCtx.fill();

    // Tiny stars
    const starSeed = 42;
    for (let i = 0; i < 12; i++) {
      const sx = ((starSeed * (i + 1) * 7) % (size - 10)) + 5;
      const sy = ((starSeed * (i + 1) * 13) % (size - 10)) + 5;
      const distFromCenter = Math.hypot(sx - cx, sy - cy);
      if (distFromCenter < r - 2) {
        moonCtx.fillStyle = `rgba(255,255,255,${0.3 + (i % 3) * 0.15})`;
        moonCtx.fillRect(sx, sy, 1, 1);
      }
    }

    // Draw illuminated moon disc
    // Full lit circle first
    moonCtx.save();
    moonCtx.beginPath();
    moonCtx.arc(cx, cy, r, 0, Math.PI * 2);
    moonCtx.clip();

    // Lit surface: subtle grey gradient for crater texture
    const moonGrad = moonCtx.createRadialGradient(cx - 3, cy - 3, 0, cx, cy, r);
    moonGrad.addColorStop(0, '#e8e4d8');
    moonGrad.addColorStop(0.4, '#d4d0c4');
    moonGrad.addColorStop(0.8, '#b8b4a8');
    moonGrad.addColorStop(1, '#9a968a');
    moonCtx.fillStyle = moonGrad;
    moonCtx.beginPath();
    moonCtx.arc(cx, cy, r, 0, Math.PI * 2);
    moonCtx.fill();

    // Simple crater marks
    const craters = [
      { x: cx - 4, y: cy - 5, r: 3 },
      { x: cx + 6, y: cy + 2, r: 2.5 },
      { x: cx + 1, y: cy + 7, r: 2 },
      { x: cx - 7, y: cy + 4, r: 1.5 },
      { x: cx + 4, y: cy - 8, r: 1.8 },
    ];
    for (const cr of craters) {
      moonCtx.fillStyle = 'rgba(0,0,0,0.08)';
      moonCtx.beginPath();
      moonCtx.arc(cr.x, cr.y, cr.r, 0, Math.PI * 2);
      moonCtx.fill();
    }

    // Shadow overlay for phase
    // phase 0 = new moon (fully dark), 0.5 = full moon (fully lit)
    // Shadow comes from right during waxing (0-0.5), from left during waning (0.5-1)
    const shadowPhase = phase <= 0.5 ? phase * 2 : (1 - phase) * 2; // 0=fully dark, 1=fully lit
    const waxing = phase <= 0.5;

    if (shadowPhase < 0.98) { // skip drawing shadow if nearly full
      moonCtx.fillStyle = 'rgba(6, 8, 16, 0.92)';

      // Use terminator ellipse technique
      // The terminator is an ellipse whose semi-minor axis varies with phase
      const terminatorX = (1 - shadowPhase * 2) * r; // width of shadow ellipse

      moonCtx.beginPath();
      if (shadowPhase < 0.5) {
        // More than half in shadow
        // Draw shadow over the lit-side half + terminator ellipse
        if (waxing) {
          // Shadow on left, terminator curves right
          moonCtx.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2, false); // right half
          moonCtx.ellipse(cx, cy, Math.abs(terminatorX), r, 0, Math.PI / 2, -Math.PI / 2, terminatorX > 0);
        } else {
          // Shadow on right, terminator curves left
          moonCtx.arc(cx, cy, r, Math.PI / 2, -Math.PI / 2, false); // left half
          moonCtx.ellipse(cx, cy, Math.abs(terminatorX), r, 0, -Math.PI / 2, Math.PI / 2, terminatorX > 0);
        }
      } else {
        // Less than half in shadow
        if (waxing) {
          // Shadow on left side only
          moonCtx.arc(cx, cy, r, Math.PI / 2, -Math.PI / 2, false); // left half arc
          moonCtx.ellipse(cx, cy, Math.abs(terminatorX), r, 0, -Math.PI / 2, Math.PI / 2, terminatorX < 0);
        } else {
          // Shadow on right side only
          moonCtx.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2, false); // right half arc
          moonCtx.ellipse(cx, cy, Math.abs(terminatorX), r, 0, Math.PI / 2, -Math.PI / 2, terminatorX < 0);
        }
      }
      moonCtx.closePath();
      moonCtx.fill();
    }

    // Subtle earthshine on the dark side during crescent phases
    if (shadowPhase < 0.3) {
      const esAlpha = (0.3 - shadowPhase) / 0.3 * 0.06;
      moonCtx.fillStyle = `rgba(100, 140, 200, ${esAlpha})`;
      moonCtx.beginPath();
      moonCtx.arc(cx, cy, r, 0, Math.PI * 2);
      moonCtx.fill();
    }

    moonCtx.restore();
  }

  // ═══════════════════════════════════════════════════
  //  Open Heart Balance Wheel (12 o'clock)
  //  Oscillating escapement visible through dial cutout
  //  Syncs with the 8-beat/sec mechanical tick
  // ═══════════════════════════════════════════════════
  const balanceCanvas = document.getElementById('balanceCanvas');
  const balanceCtx = balanceCanvas ? balanceCanvas.getContext('2d') : null;

  function drawBalanceWheel(seconds, millis) {
    if (!balanceCtx) return;
    const ctx = balanceCtx;
    const size = 56;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 3;

    ctx.clearRect(0, 0, size, size);

    // Dark cavity background with depth
    const cavityGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r + 1);
    cavityGrad.addColorStop(0, '#111a28');
    cavityGrad.addColorStop(0.7, '#0d1520');
    cavityGrad.addColorStop(1, '#080c14');
    ctx.fillStyle = cavityGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 1, 0, Math.PI * 2);
    ctx.fill();

    // ── Automatic winding rotor (drawn behind tourbillon) ──
    drawRotor(ctx, cx, cy, r);

    // ── Tourbillon cage rotation: 360° per minute ──
    const t = seconds + millis / 1000;
    // ── Tourbillon cage rotation: 360° per minute (halts when stopped) ──
    let cageAngle;
    if (powerLevel < 0.03) {
      // Stopped — freeze at last position
      if (lastStoppedCageAngle === null) lastStoppedCageAngle = (t / 60) * Math.PI * 2;
      cageAngle = lastStoppedCageAngle;
    } else {
      lastStoppedCageAngle = null;
      cageAngle = (t / 60) * Math.PI * 2;
    }

    // Hairspring — concentric spiral (rotates with cage)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(cageAngle);
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = '#8090a0';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    const spiralTurns = 3;
    for (let i = 0; i <= 360 * spiralTurns; i += 3) {
      const a = (i * Math.PI) / 180;
      const sr = 3 + (i / (360 * spiralTurns)) * (r * 0.50);
      const px = Math.cos(a) * sr;
      const py = Math.sin(a) * sr;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();

    // ── Tourbillon cage frame ──
    // The cage is a Y-shaped bridge that rotates once per minute
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(cageAngle);

    // Outer cage ring — thin polished steel
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.92, 0, Math.PI * 2);
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = 'rgba(150, 148, 140, 0.45)';
    ctx.stroke();

    // Cage bridge arms — 3 arms at 120° (Y-shaped like a Breguet tourbillon)
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
      const innerR = r * 0.82;
      const outerR = r * 0.92;

      // Main bridge arm
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * innerR, Math.sin(a) * innerR);
      ctx.lineTo(Math.cos(a) * outerR, Math.sin(a) * outerR);
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = 'rgba(170, 165, 155, 0.55)';
      ctx.stroke();

      // Polished bevel highlight on bridge
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * (innerR + 1), Math.sin(a) * (innerR + 1));
      ctx.lineTo(Math.cos(a) * (outerR - 1), Math.sin(a) * (outerR - 1));
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.stroke();

      // Small screw at each bridge-cage junction
      const screwX = Math.cos(a) * outerR;
      const screwY = Math.sin(a) * outerR;
      ctx.beginPath();
      ctx.arc(screwX, screwY, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200, 195, 180, 0.7)';
      ctx.fill();
      // Screw slot
      ctx.beginPath();
      ctx.moveTo(screwX - 0.8, screwY);
      ctx.lineTo(screwX + 0.8, screwY);
      ctx.lineWidth = 0.4;
      ctx.strokeStyle = 'rgba(80, 75, 70, 0.8)';
      ctx.stroke();
    }

    ctx.restore();

    // ── Balance wheel oscillation inside the cage ──
    // Amplitude scales with power reserve — real watches lose amplitude as mainspring unwinds
    const FREQ = 4;
    let balanceAmplitude = 270; // degrees, full power
    if (powerLevel < 0.30 && powerLevel >= 0.10) {
      const degradePct = 1 - (powerLevel - 0.10) / 0.20;
      balanceAmplitude = 270 - degradePct * 90; // 270 → 180
    } else if (powerLevel < 0.10 && powerLevel >= 0.03) {
      const dyingPct = 1 - (powerLevel - 0.03) / 0.07;
      balanceAmplitude = 180 - dyingPct * 120; // 180 → 60
    } else if (powerLevel < 0.03) {
      balanceAmplitude = 0; // stopped
    }
    const phase = t * FREQ * Math.PI * 2;
    const swing = Math.sin(phase) * balanceAmplitude;

    ctx.save();
    ctx.translate(cx, cy);
    // Cage rotation + balance oscillation combined
    ctx.rotate(cageAngle + swing * Math.PI / 180);

    // Balance wheel rim — thin metallic ring
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = 'rgba(180, 175, 160, 0.7)';
    ctx.stroke();

    // Timing screws on the rim (8 small dots)
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const sx = Math.cos(a) * r * 0.72;
      const sy = Math.sin(a) * r * 0.72;
      ctx.beginPath();
      ctx.arc(sx, sy, 1.0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200, 195, 180, 0.75)';
      ctx.fill();
    }

    // Crossbar spokes (3 arms at 120° — Gyromax style)
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * r * 0.70, Math.sin(a) * r * 0.70);
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = 'rgba(160, 155, 140, 0.55)';
      ctx.stroke();
    }

    // Center jewel — ruby bearing
    ctx.beginPath();
    ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
    const jewelGrad = ctx.createRadialGradient(0.4, -0.4, 0, 0, 0, 2.2);
    jewelGrad.addColorStop(0, '#ff4466');
    jewelGrad.addColorStop(0.5, '#cc2244');
    jewelGrad.addColorStop(1, '#881133');
    ctx.fillStyle = jewelGrad;
    ctx.fill();
    // Jewel highlight
    ctx.beginPath();
    ctx.arc(-0.4, -0.4, 0.7, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 200, 210, 0.5)';
    ctx.fill();

    ctx.restore();

    // ── Upper bridge (fixed, doesn't rotate) ──
    // A horizontal bridge across the top, like the cock of a tourbillon
    ctx.save();
    ctx.translate(cx, cy);
    // Fixed upper bridge — polished steel
    ctx.beginPath();
    ctx.moveTo(-r * 0.5, -r * 0.1);
    ctx.quadraticCurveTo(-r * 0.3, -r * 0.95, 0, -r * 0.95);
    ctx.quadraticCurveTo(r * 0.3, -r * 0.95, r * 0.5, -r * 0.1);
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = 'rgba(160, 158, 150, 0.4)';
    ctx.stroke();
    // Bridge highlight
    ctx.beginPath();
    ctx.moveTo(-r * 0.45, -r * 0.15);
    ctx.quadraticCurveTo(-r * 0.25, -r * 0.88, 0, -r * 0.88);
    ctx.quadraticCurveTo(r * 0.25, -r * 0.88, r * 0.45, -r * 0.15);
    ctx.lineWidth = 0.4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.stroke();
    // Bridge screws at anchor points
    for (const bx of [-r * 0.5, r * 0.5]) {
      ctx.beginPath();
      ctx.arc(bx, -r * 0.1, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(190, 185, 175, 0.6)';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(bx - 0.9, -r * 0.1);
      ctx.lineTo(bx + 0.9, -r * 0.1);
      ctx.lineWidth = 0.4;
      ctx.strokeStyle = 'rgba(70, 65, 60, 0.7)';
      ctx.stroke();
    }
    ctx.restore();

    // Subtle metallic sheen on the aperture rim
    const sheenGrad = ctx.createRadialGradient(cx - 2, cy - 3, 0, cx, cy, r);
    sheenGrad.addColorStop(0, 'rgba(255,255,255,0.06)');
    sheenGrad.addColorStop(0.5, 'rgba(255,255,255,0)');
    sheenGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sheenGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // ═══════════════════════════════════════════════════
  //  Chronograph Stopwatch + Countdown Timer
  // ═══════════════════════════════════════════════════
  const chronoDisplay = document.getElementById('chronoDisplay');
  const chronoLapEl = document.getElementById('chronoLap');
  const chronoStartStop = document.getElementById('chronoStartStop');
  const chronoLapReset = document.getElementById('chronoLapReset');

  if (chronoDisplay && chronoStartStop && chronoLapReset) {
    let chronoRunning = false;
    let chronoStart = 0;
    let chronoElapsed = 0; // accumulated ms when paused
    let chronoRaf = null;
    let chronoLapStart = 0;
    let chronoLapCount = 0;

    // ── Countdown state ──
    let countdownMode = false;
    let countdownDurationMs = 300000; // default 5 min
    let countdownDone = false;
    const chronoModeToggle = document.getElementById('chronoModeToggle');
    const countdownPresetsEl = document.getElementById('countdownPresets');
    const countdownProgress = document.getElementById('countdownProgress');
    const countdownProgressFill = document.getElementById('countdownProgressFill');
    const countdownFlash = document.getElementById('countdownFlash');

    function formatChrono(ms) {
      const totalSec = ms / 1000;
      const min = Math.floor(totalSec / 60);
      const sec = Math.floor(totalSec % 60);
      const cs = Math.floor((ms % 1000) / 10);
      return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
    }

    function updateChronoDisplay() {
      const now = performance.now();
      const total = chronoElapsed + (chronoRunning ? now - chronoStart : 0);

      if (countdownMode) {
        const remaining = Math.max(0, countdownDurationMs - total);
        chronoDisplay.textContent = formatChrono(remaining);

        // Progress bar
        if (countdownProgress && countdownProgressFill) {
          const pct = remaining / countdownDurationMs;
          countdownProgressFill.style.width = (pct * 100).toFixed(1) + '%';
          countdownProgressFill.classList.toggle('critical', pct < 0.15);
        }

        // Color states
        const pctLeft = remaining / countdownDurationMs;
        chronoDisplay.classList.toggle('countdown-active', pctLeft > 0.15 && pctLeft <= 1);
        chronoDisplay.classList.toggle('countdown-critical', pctLeft <= 0.15 && remaining > 0);
        chronoDisplay.classList.toggle('countdown-done', remaining <= 0);

        // Timer reached zero
        if (remaining <= 0 && !countdownDone) {
          countdownDone = true;
          chronoRunning = false;
          if (chronoRaf) cancelAnimationFrame(chronoRaf);
          chronoStartStop.textContent = 'Start';
          chronoStartStop.classList.remove('running');
          chronoLapReset.textContent = 'Reset';
          chronoDisplay.textContent = '00:00.00';

          // Flash alert
          if (countdownFlash) {
            countdownFlash.classList.add('active');
            setTimeout(() => countdownFlash.classList.remove('active'), 1600);
          }
          // Audio beep (3 short tones)
          try {
            const actx = new (window.AudioContext || window.webkitAudioContext)();
            [0, 200, 400].forEach(delay => {
              const osc = actx.createOscillator();
              const gain = actx.createGain();
              osc.connect(gain);
              gain.connect(actx.destination);
              osc.frequency.value = 880;
              osc.type = 'sine';
              gain.gain.value = 0.15;
              osc.start(actx.currentTime + delay / 1000);
              osc.stop(actx.currentTime + delay / 1000 + 0.12);
            });
          } catch (e) { /* no audio context */ }
          return;
        }
      } else {
        chronoDisplay.textContent = formatChrono(total);
      }

      if (chronoRunning) {
        chronoRaf = requestAnimationFrame(updateChronoDisplay);
      }
    }

    // ── Mode toggle ──
    function setCountdownMode(enabled) {
      countdownMode = enabled;
      if (chronoModeToggle) {
        chronoModeToggle.textContent = enabled ? '⏳' : '⏱';
        chronoModeToggle.classList.toggle('countdown-mode', enabled);
        chronoModeToggle.title = enabled ? 'Switch to Stopwatch' : 'Switch to Countdown';
      }
      if (countdownPresetsEl) countdownPresetsEl.classList.toggle('visible', enabled);
      if (countdownProgress) countdownProgress.classList.toggle('visible', enabled);

      // Reset state when switching modes
      chronoRunning = false;
      chronoElapsed = 0;
      chronoLapCount = 0;
      countdownDone = false;
      if (chronoRaf) cancelAnimationFrame(chronoRaf);
      chronoStartStop.textContent = 'Start';
      chronoStartStop.classList.remove('running');
      chronoLapReset.disabled = true;
      chronoLapEl.textContent = '';
      chronoDisplay.className = 'chrono-display';

      if (enabled) {
        chronoDisplay.textContent = formatChrono(countdownDurationMs);
        chronoLapReset.textContent = 'Reset';
        if (countdownProgressFill) {
          countdownProgressFill.style.width = '100%';
          countdownProgressFill.classList.remove('critical');
        }
      } else {
        chronoDisplay.textContent = '00:00.00';
        chronoLapReset.textContent = 'Lap';
      }
    }

    if (chronoModeToggle) {
      chronoModeToggle.addEventListener('click', () => {
        if (chronoRunning) return; // don't switch while running
        setCountdownMode(!countdownMode);
      });
    }

    // ── Preset chips ──
    if (countdownPresetsEl) {
      countdownPresetsEl.addEventListener('click', (e) => {
        const chip = e.target.closest('.countdown-preset');
        if (!chip || chronoRunning) return;
        const secs = parseInt(chip.dataset.secs, 10);
        if (!secs) return;
        countdownDurationMs = secs * 1000;
        // Update active state
        countdownPresetsEl.querySelectorAll('.countdown-preset').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        // Reset display
        chronoElapsed = 0;
        countdownDone = false;
        chronoDisplay.textContent = formatChrono(countdownDurationMs);
        chronoDisplay.className = 'chrono-display';
        if (countdownProgressFill) {
          countdownProgressFill.style.width = '100%';
          countdownProgressFill.classList.remove('critical');
        }
      });
    }

    chronoStartStop.addEventListener('click', () => {
      if (!chronoRunning) {
        // Start
        if (countdownMode && countdownDone) {
          // Re-start after countdown finished — reset first
          chronoElapsed = 0;
          countdownDone = false;
          chronoDisplay.className = 'chrono-display';
          if (countdownProgressFill) {
            countdownProgressFill.style.width = '100%';
            countdownProgressFill.classList.remove('critical');
          }
        }
        chronoRunning = true;
        chronoStart = performance.now();
        if (chronoElapsed === 0) {
          chronoLapStart = chronoStart;
          chronoLapCount = 0;
        }
        chronoStartStop.textContent = 'Stop';
        chronoStartStop.classList.add('running');
        chronoLapReset.disabled = false;
        chronoLapReset.textContent = countdownMode ? 'Reset' : 'Lap';
        updateChronoDisplay();
      } else {
        // Stop
        chronoRunning = false;
        chronoElapsed += performance.now() - chronoStart;
        if (chronoRaf) cancelAnimationFrame(chronoRaf);
        chronoStartStop.textContent = 'Start';
        chronoStartStop.classList.remove('running');
        chronoLapReset.textContent = 'Reset';
      }
    });

    chronoLapReset.addEventListener('click', () => {
      if (chronoRunning && !countdownMode) {
        // Lap (stopwatch only)
        const now = performance.now();
        const lapTime = now - chronoLapStart;
        chronoLapCount++;
        chronoLapEl.textContent = `L${chronoLapCount} ${formatChrono(lapTime)}`;
        chronoLapStart = now;
      } else if (!chronoRunning) {
        // Reset
        chronoElapsed = 0;
        chronoLapCount = 0;
        countdownDone = false;
        chronoDisplay.className = 'chrono-display';
        chronoLapEl.textContent = '';
        chronoLapReset.disabled = true;

        if (countdownMode) {
          chronoDisplay.textContent = formatChrono(countdownDurationMs);
          chronoLapReset.textContent = 'Reset';
          if (countdownProgressFill) {
            countdownProgressFill.style.width = '100%';
            countdownProgressFill.classList.remove('critical');
          }
        } else {
          chronoDisplay.textContent = '00:00.00';
          chronoLapReset.textContent = 'Lap';
        }
      }
    });

    // ═══════════════════════════════════════════════════
    //  Keyboard Shortcuts for Chronograph & Navigation
    // ═══════════════════════════════════════════════════
    document.addEventListener('keydown', (e) => {
      // Ignore if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key.toLowerCase()) {
        case ' ':
          // Space = Start/Stop chronograph
          e.preventDefault();
          chronoStartStop.click();
          break;
        case 'l':
          // L = Lap (when running in stopwatch mode)
          if (chronoRunning && !countdownMode) {
            e.preventDefault();
            chronoLapReset.click();
          }
          break;
        case 'r':
          // R = Reset chrono (when stopped with elapsed time), or Minute Repeater (when chrono idle)
          if (!chronoRunning && (chronoElapsed > 0 || countdownDone)) {
            e.preventDefault();
            chronoLapReset.click();
          } else if (!chronoRunning && chronoElapsed === 0) {
            e.preventDefault();
            playMinuteRepeater();
          }
          break;
        case 'c':
          // C = Toggle countdown/stopwatch mode
          if (!chronoRunning) {
            e.preventDefault();
            setCountdownMode(!countdownMode);
          }
          break;
        case 'escape':
          // Esc = Reset home timezone to local
          if (homeTimezone) {
            e.preventDefault();
            resetToLocalTimezone();
          }
          break;
        case 'm':
          // M = Toggle hour chime
          e.preventDefault();
          chimeEnabled = !chimeEnabled;
          localStorage.setItem('wt_chime', chimeEnabled ? 'on' : 'off');
          chimeToggle.textContent = chimeEnabled ? '🔔' : '🔕';
          if (chimeEnabled) playChimeTone(554.37, 0.8, 0.06, 0);
          break;
        case 't':
          // T = Toggle mechanical tick sound
          e.preventDefault();
          tickEnabled = !tickEnabled;
          localStorage.setItem('wt_tick', tickEnabled ? 'on' : 'off');
          tickToggle.textContent = tickEnabled ? '⚙️' : '🔇';
          if (tickEnabled) playTickSound(); // audible confirmation
          break;
        case 'a':
          // A = Toggle alarm panel
          e.preventDefault();
          if (alarmRinging) {
            // Dismiss ringing alarm
            alarmRinging = false;
            const handEl = document.getElementById('alarmHand');
            if (handEl) handEl.classList.remove('ringing');
          } else {
            const ab = document.getElementById('alarmBar');
            if (ab) ab.classList.toggle('visible');
          }
          break;
        case 'n':
          // N = Toggle lume shot mode
          e.preventDefault();
          lumeMode = !lumeMode;
          localStorage.setItem('wt_lume', lumeMode ? 'on' : 'off');
          document.body.classList.toggle('lume-mode', lumeMode);
          if (lumeToggle) lumeToggle.textContent = lumeMode ? '☀️' : '🌙';
          break;
        case '?':
          // ? = Toggle keyboard shortcut hints
          e.preventDefault();
          toggleShortcutHints();
          break;
        case '/':
          // / = Open city search
          e.preventDefault();
          openCitySearch();
          break;
      }
    });

    // Shortcut hints overlay
    let hintsVisible = false;
    const hintsEl = document.createElement('div');
    hintsEl.className = 'shortcut-hints';
    hintsEl.innerHTML = [
      '<strong>Keyboard Shortcuts</strong>',
      '<span><kbd>Space</kbd> Start / Stop</span>',
      '<span><kbd>L</kbd> Lap</span>',
      '<span><kbd>R</kbd> Reset / Repeater</span>',
      '<span><kbd>C</kbd> Stopwatch / Countdown</span>',
      '<span><kbd>Esc</kbd> Reset timezone</span>',
      '<span><kbd>M</kbd> Toggle chime</span>',
      '<span><kbd>T</kbd> Toggle tick</span>',
      '<span><kbd>A</kbd> Alarm</span>',
      '<span><kbd>R</kbd> 🎵 Minute Repeater</span>',
      '<span><kbd>N</kbd> Lume shot mode</span>',
      '<span><kbd>Scroll</kbd> Crown winding</span>',
      '<span><kbd>/</kbd> Search cities</span>',
      '<span><kbd>?</kbd> Toggle this help</span>',
    ].join('');
    hintsEl.style.cssText = `
      position:fixed; bottom:60px; right:16px; background:var(--card-bg);
      border:1px solid var(--border); border-radius:8px; padding:12px 16px;
      font-family:var(--font-mono); font-size:0.7rem; color:var(--text-muted);
      display:none; flex-direction:column; gap:5px; z-index:9998;
      box-shadow:0 4px 12px rgba(0,0,0,0.15); max-width:220px;
    `;
    document.body.appendChild(hintsEl);

    // Style kbd elements
    const kbdStyle = document.createElement('style');
    kbdStyle.textContent = `
      .shortcut-hints kbd {
        display:inline-block; background:var(--bg); border:1px solid var(--border);
        border-radius:3px; padding:1px 5px; font-size:0.65rem; font-family:var(--font-mono);
        margin-right:6px; min-width:18px; text-align:center;
        box-shadow:0 1px 0 var(--border);
      }
      .shortcut-hints strong { color:var(--text); margin-bottom:4px; }
      .shortcut-hints span { display:flex; align-items:center; }
    `;
    document.head.appendChild(kbdStyle);

    function toggleShortcutHints() {
      hintsVisible = !hintsVisible;
      hintsEl.style.display = hintsVisible ? 'flex' : 'none';
    }
  }


  // ═══════════════════════════════════════════════════════════
  // Hour Chime (Sonnerie) Complication
  // Westminster-style bell strikes: 1-12 at each hour, single
  // softer tone at half hour. Toggle with 🔔 button or [M] key.
  // ═══════════════════════════════════════════════════════════

  function playChimeTone(freq, duration, gain, delay) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const t = ctx.currentTime + delay;
      // Bell fundamental
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.value = freq;
      // Bell overtone (minor third partial — church bell character)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.value = freq * 1.183;
      // Subtle shimmer partial (octave)
      const osc3 = ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.value = freq * 2.0;
      const g1 = ctx.createGain();
      const g2 = ctx.createGain();
      const g3 = ctx.createGain();
      // Bell envelope: quick attack, long exponential decay
      g1.gain.setValueAtTime(0, t);
      g1.gain.linearRampToValueAtTime(gain, t + 0.008);
      g1.gain.exponentialRampToValueAtTime(gain * 0.3, t + duration * 0.4);
      g1.gain.exponentialRampToValueAtTime(0.001, t + duration);
      g2.gain.setValueAtTime(0, t);
      g2.gain.linearRampToValueAtTime(gain * 0.35, t + 0.008);
      g2.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.7);
      g3.gain.setValueAtTime(0, t);
      g3.gain.linearRampToValueAtTime(gain * 0.12, t + 0.008);
      g3.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.5);
      osc1.connect(g1).connect(ctx.destination);
      osc2.connect(g2).connect(ctx.destination);
      osc3.connect(g3).connect(ctx.destination);
      osc1.start(t); osc1.stop(t + duration + 0.05);
      osc2.start(t); osc2.stop(t + duration + 0.05);
      osc3.start(t); osc3.stop(t + duration + 0.05);
      setTimeout(() => ctx.close(), (delay + duration + 0.2) * 1000);
    } catch (e) { /* no audio context */ }
  }

  function playHourChime(hour12) {
    const baseFreq = 440;
    const count = hour12 || 12;
    for (let i = 0; i < count; i++) {
      const wobble = (Math.random() - 0.5) * 4;
      playChimeTone(baseFreq + wobble, 1.8, 0.15, i * 0.7);
    }
  }

  function playHalfHourChime() {
    playChimeTone(554.37, 1.4, 0.08, 0);
  }

  function checkChime(hours, minutes, seconds) {
    if (!chimeEnabled) return;
    if (seconds > 2) return;
    if (minutes === 0) {
      const key = 'H' + hours;
      if (lastChimeKey === key) return;
      lastChimeKey = key;
      playHourChime(hours % 12);
    } else if (minutes === 30) {
      const key = 'M' + hours + ':30';
      if (lastChimeKey === key) return;
      lastChimeKey = key;
      playHalfHourChime();
    }

  // ═══════════════════════════════════════════════════
  // Minute Repeater Complication
  // The pinnacle of mechanical watchmaking: press the
  // button and the watch chimes the current time.
  //   - Low gongs for hours (1-12)
  //   - Ding-dong pairs for quarter hours (0-3)
  //   - High pings for remaining minutes (0-14)
  // Inspired by Patek Philippe Ref. 5078
  // ═══════════════════════════════════════════════════
  let repeaterPlaying = false;

  function playRepeaterTone(freq, duration, gain, delay, type) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const t = ctx.currentTime + delay;

      if (type === 'gong') {
        // Deep, rich gong — two detuned sines + sub-harmonic
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.value = freq;
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = freq * 1.003; // slight detune for warmth
        const osc3 = ctx.createOscillator();
        osc3.type = 'sine';
        osc3.frequency.value = freq * 0.5; // sub-harmonic body
        const g1 = ctx.createGain();
        const g2 = ctx.createGain();
        const g3 = ctx.createGain();
        g1.gain.setValueAtTime(0, t);
        g1.gain.linearRampToValueAtTime(gain, t + 0.01);
        g1.gain.exponentialRampToValueAtTime(gain * 0.4, t + duration * 0.3);
        g1.gain.exponentialRampToValueAtTime(0.001, t + duration);
        g2.gain.setValueAtTime(0, t);
        g2.gain.linearRampToValueAtTime(gain * 0.6, t + 0.01);
        g2.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.8);
        g3.gain.setValueAtTime(0, t);
        g3.gain.linearRampToValueAtTime(gain * 0.25, t + 0.015);
        g3.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.6);
        osc1.connect(g1).connect(ctx.destination);
        osc2.connect(g2).connect(ctx.destination);
        osc3.connect(g3).connect(ctx.destination);
        osc1.start(t); osc1.stop(t + duration + 0.05);
        osc2.start(t); osc2.stop(t + duration + 0.05);
        osc3.start(t); osc3.stop(t + duration + 0.05);
      } else if (type === 'ding' || type === 'dong') {
        // Ding = higher, brighter; Dong = lower, warmer
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const overtone = ctx.createOscillator();
        overtone.type = 'sine';
        overtone.frequency.value = freq * 2.76; // strike tone partial
        const g = ctx.createGain();
        const g2 = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(gain, t + 0.005);
        g.gain.exponentialRampToValueAtTime(gain * 0.3, t + duration * 0.25);
        g.gain.exponentialRampToValueAtTime(0.001, t + duration);
        g2.gain.setValueAtTime(0, t);
        g2.gain.linearRampToValueAtTime(gain * 0.15, t + 0.005);
        g2.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.4);
        osc.connect(g).connect(ctx.destination);
        overtone.connect(g2).connect(ctx.destination);
        osc.start(t); osc.stop(t + duration + 0.05);
        overtone.start(t); overtone.stop(t + duration + 0.05);
      } else {
        // Ping — bright, short, crystalline
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(gain, t + 0.003);
        g.gain.exponentialRampToValueAtTime(0.001, t + duration);
        osc.connect(g).connect(ctx.destination);
        osc.start(t); osc.stop(t + duration + 0.05);
      }

      setTimeout(() => ctx.close(), (delay + duration + 0.3) * 1000);
    } catch (e) { /* no audio */ }
  }

  function playMinuteRepeater() {
    if (repeaterPlaying) return;
    repeaterPlaying = true;

    const homeTime = getHomeTime(new Date());
    const h = homeTime.hours;
    const m = homeTime.minutes;

    const hour12 = h % 12 || 12;
    const quarters = Math.floor(m / 15);
    const remainMinutes = m % 15;

    let t = 0; // running delay accumulator

    // Phase 1: Hour gongs — deep C4 (262 Hz)
    for (let i = 0; i < hour12; i++) {
      const wobble = (Math.random() - 0.5) * 3;
      playRepeaterTone(262 + wobble, 2.0, 0.18, t, 'gong');
      t += 0.85;
    }

    // Brief pause between phases
    t += 0.4;

    // Phase 2: Quarter ding-dongs — ding (E5, 659 Hz) + dong (C5, 523 Hz)
    for (let i = 0; i < quarters; i++) {
      playRepeaterTone(659, 1.2, 0.14, t, 'ding');
      playRepeaterTone(523, 1.4, 0.14, t + 0.22, 'dong');
      t += 0.7;
    }

    if (quarters > 0) t += 0.3;

    // Phase 3: Minute pings — bright A5 (880 Hz)
    for (let i = 0; i < remainMinutes; i++) {
      const wobble = (Math.random() - 0.5) * 4;
      playRepeaterTone(880 + wobble, 0.8, 0.10, t, 'ping');
      t += 0.35;
    }

    // Visual feedback on the repeater button
    const btn = document.querySelector('.repeater-toggle');
    if (btn) {
      btn.style.opacity = '1';
      btn.style.borderColor = 'var(--accent)';
    }

    // Reset state after all chimes finish
    setTimeout(() => {
      repeaterPlaying = false;
      if (btn) {
        btn.style.opacity = '';
        btn.style.borderColor = '';
      }
    }, (t + 1.5) * 1000);
  }
  }

  // ═══════════════════════════════════════════════════
  // Dynamic Sapphire Crystal Reflection
  // The highlight tracks the mouse cursor like tilting
  // a real watch under a lamp. The primary reflection
  // follows the cursor; the secondary (AR coating bounce)
  // moves to the opposite side.
  // ═══════════════════════════════════════════════════
  (function initCrystalReflection() {
    let crystalX = 30, crystalY = 22; // current animated position (%)
    let targetX = 30, targetY = 22;   // target from mouse
    let rafId = null;

    function lerpCrystal() {
      // Smooth follow — 8% per frame ≈ 120ms lag at 60fps
      crystalX += (targetX - crystalX) * 0.08;
      crystalY += (targetY - crystalY) * 0.08;

      // Primary highlight follows cursor
      const px = crystalX.toFixed(1);
      const py = crystalY.toFixed(1);
      // Secondary reflection on the opposite side
      const sx = (100 - crystalX).toFixed(1);
      const sy = (100 - crystalY).toFixed(1);

      clockFace.style.setProperty('--crystal-x', px + '%');
      clockFace.style.setProperty('--crystal-y', py + '%');
      clockFace.style.setProperty('--crystal-x2', sx + '%');
      clockFace.style.setProperty('--crystal-y2', sy + '%');

      // Sync light source for hand shadows
      lightSourceX = crystalX;
      lightSourceY = crystalY;

      // Keep animating if still moving
      if (Math.abs(targetX - crystalX) > 0.1 || Math.abs(targetY - crystalY) > 0.1) {
        rafId = requestAnimationFrame(lerpCrystal);
      } else {
        rafId = null;
      }
    }

    document.addEventListener('mousemove', function(e) {
      const rect = clockFace.getBoundingClientRect();
      // Relative position within clock face (0-100%)
      const rx = ((e.clientX - rect.left) / rect.width) * 100;
      const ry = ((e.clientY - rect.top) / rect.height) * 100;

      // Clamp to a realistic range (15-85%) so the highlight
      // never goes to the very edge — real domed crystals
      // have a sweet spot in the inner 70%
      targetX = Math.max(15, Math.min(85, rx));
      targetY = Math.max(15, Math.min(85, ry));

      if (!rafId) rafId = requestAnimationFrame(lerpCrystal);
    });

    // When mouse leaves the watch area, drift back to default upper-left
    document.addEventListener('mouseleave', function() {
      targetX = 30;
      targetY = 22;
      if (!rafId) rafId = requestAnimationFrame(lerpCrystal);
    });
  })();

  // Chime toggle button
  chimeToggle = document.createElement('button');
  chimeToggle.className = 'chime-toggle';
  chimeToggle.textContent = chimeEnabled ? '🔔' : '🔕';
  chimeToggle.title = 'Toggle hour chime (M)';
  chimeToggle.style.cssText = `
    position:fixed; bottom:16px; left:16px; padding:6px 10px;
    font-size:1rem; background:var(--card-bg); color:var(--text-muted);
    border:1px solid var(--border); border-radius:var(--radius);
    cursor:pointer; z-index:9999; opacity:0.5;
    transition: opacity 0.15s, background 0.6s ease, border-color 0.6s ease;
    line-height:1; font-family:var(--font-mono);
  `;
  chimeToggle.addEventListener('mouseenter', function() { chimeToggle.style.opacity = '1'; });
  chimeToggle.addEventListener('mouseleave', function() { chimeToggle.style.opacity = '0.5'; });
  chimeToggle.addEventListener('click', function() {
    chimeEnabled = !chimeEnabled;
    localStorage.setItem('wt_chime', chimeEnabled ? 'on' : 'off');
    chimeToggle.textContent = chimeEnabled ? '🔔' : '🔕';
    if (chimeEnabled) playChimeTone(554.37, 0.8, 0.06, 0);
  });
  document.body.appendChild(chimeToggle);

  // Tick toggle button (next to chime)
  tickToggle = document.createElement('button');
  tickToggle.className = 'tick-toggle';
  tickToggle.textContent = tickEnabled ? '⚙️' : '🔇';
  tickToggle.title = 'Toggle tick sound (T)';
  tickToggle.style.cssText = `
    position:fixed; bottom:16px; left:56px; padding:6px 10px;
    font-size:1rem; background:var(--card-bg); color:var(--text-muted);
    border:1px solid var(--border); border-radius:var(--radius);
    cursor:pointer; z-index:9999; opacity:0.5;
    transition: opacity 0.15s, background 0.6s ease, border-color 0.6s ease;
    line-height:1; font-family:var(--font-mono);
  `;
  tickToggle.addEventListener('mouseenter', function() { tickToggle.style.opacity = '1'; });
  tickToggle.addEventListener('mouseleave', function() { tickToggle.style.opacity = '0.5'; });
  tickToggle.addEventListener('click', function() {
    tickEnabled = !tickEnabled;
    localStorage.setItem('wt_tick', tickEnabled ? 'on' : 'off');
    tickToggle.textContent = tickEnabled ? '⚙️' : '🔇';
    if (tickEnabled) playTickSound();
  });
  document.body.appendChild(tickToggle);

  // Lume Shot toggle button (next to tick)
  lumeToggle = document.createElement('button');
  lumeToggle.className = 'lume-toggle';
  lumeToggle.textContent = lumeMode ? '☀️' : '🌙';
  lumeToggle.title = 'Toggle lume shot mode (N)';
  lumeToggle.style.cssText = `
    position:fixed; bottom:16px; left:176px; padding:6px 10px;
    font-size:1rem; background:var(--card-bg); color:var(--text-muted);
    border:1px solid var(--border); border-radius:var(--radius);
    cursor:pointer; z-index:9999; opacity:0.5;
    transition: opacity 0.15s, background 0.6s ease, border-color 0.6s ease;
    line-height:1; font-family:var(--font-mono);
  `;
  lumeToggle.addEventListener('mouseenter', function() { lumeToggle.style.opacity = '1'; });
  lumeToggle.addEventListener('mouseleave', function() { lumeToggle.style.opacity = '0.5'; });
  lumeToggle.addEventListener('click', function() {
    lumeMode = !lumeMode;
    localStorage.setItem('wt_lume', lumeMode ? 'on' : 'off');
    document.body.classList.toggle('lume-mode', lumeMode);
    lumeToggle.textContent = lumeMode ? '☀️' : '🌙';
  });
  document.body.appendChild(lumeToggle);

  // ═══════════════════════════════════════════════════
  // Alarm Bar Wiring
  // ═══════════════════════════════════════════════════
  const alarmBar = document.getElementById('alarmBar');
  const alarmTimeInput = document.getElementById('alarmTimeInput');
  const alarmSetBtn = document.getElementById('alarmSetBtn');
  const alarmClearBtn = document.getElementById('alarmClearBtn');

  // Alarm toggle button (next to tick)
  const alarmToggle = document.createElement('button');
  alarmToggle.className = 'alarm-toggle';
  alarmToggle.textContent = alarmArmed ? '⏰' : '🔕';
  alarmToggle.title = 'Toggle alarm (A)';
  alarmToggle.style.cssText = `
    position:fixed; bottom:16px; left:96px; padding:6px 10px;
    font-size:1rem; background:var(--card-bg); color:var(--text-muted);
    border:1px solid var(--border); border-radius:var(--radius);
    cursor:pointer; z-index:9999; opacity:0.5;
    transition: opacity 0.15s, background 0.6s ease, border-color 0.6s ease;
    line-height:1; font-family:var(--font-mono);
  `;
  alarmToggle.addEventListener('mouseenter', function() { alarmToggle.style.opacity = '1'; });
  alarmToggle.addEventListener('mouseleave', function() { alarmToggle.style.opacity = '0.5'; });
  alarmToggle.addEventListener('click', function() {
    if (alarmBar) {
      alarmBar.classList.toggle('visible');
    }
  });
  document.body.appendChild(alarmToggle);

  // Minute Repeater button (next to alarm)
  const repeaterToggle = document.createElement('button');
  repeaterToggle.className = 'repeater-toggle';
  repeaterToggle.textContent = '🎵';
  repeaterToggle.title = 'Minute Repeater — chimes the current time (R)';
  repeaterToggle.style.cssText = `
    position:fixed; bottom:16px; left:136px; padding:6px 10px;
    font-size:1rem; background:var(--card-bg); color:var(--text-muted);
    border:1px solid var(--border); border-radius:var(--radius);
    cursor:pointer; z-index:9999; opacity:0.5;
    transition: opacity 0.15s, background 0.6s ease, border-color 0.6s ease;
    line-height:1; font-family:var(--font-mono);
  `;
  repeaterToggle.addEventListener('mouseenter', function() { repeaterToggle.style.opacity = '1'; });
  repeaterToggle.addEventListener('mouseleave', function() { if (!repeaterPlaying) repeaterToggle.style.opacity = '0.5'; });
  repeaterToggle.addEventListener('click', playMinuteRepeater);
  document.body.appendChild(repeaterToggle);

  // ═══════════════════════════════════════════════════════════
  // City Search — press / or click 🔍 to fuzzy-search all cities
  // in the pool and jump to any timezone instantly.
  // ═══════════════════════════════════════════════════════════
  let citySearchOpen = false;
  const citySearchPanel = document.createElement('div');
  citySearchPanel.className = 'city-search-panel';
  citySearchPanel.style.cssText = `
    position:fixed; bottom:60px; left:16px; width:260px;
    background:var(--card-bg); border:1px solid var(--border);
    border-radius:8px; padding:8px; z-index:10000;
    box-shadow:0 8px 24px rgba(0,0,0,0.25); display:none;
    flex-direction:column; gap:4px;
    font-family:var(--font-mono); font-size:0.75rem;
    transition: opacity 0.15s ease, transform 0.15s ease;
  `;
  const citySearchInput = document.createElement('input');
  citySearchInput.type = 'text';
  citySearchInput.placeholder = 'Search cities…';
  citySearchInput.style.cssText = `
    width:100%; box-sizing:border-box; padding:6px 8px;
    background:var(--bg); color:var(--text); border:1px solid var(--border);
    border-radius:4px; font-family:var(--font-mono); font-size:0.75rem;
    outline:none;
  `;
  const citySearchResults = document.createElement('div');
  citySearchResults.style.cssText = `
    max-height:200px; overflow-y:auto; display:flex; flex-direction:column; gap:1px;
  `;
  citySearchPanel.appendChild(citySearchInput);
  citySearchPanel.appendChild(citySearchResults);
  document.body.appendChild(citySearchPanel);

  function openCitySearch() {
    if (citySearchOpen) return;
    citySearchOpen = true;
    citySearchPanel.style.display = 'flex';
    citySearchInput.value = '';
    renderCitySearchResults('');
    setTimeout(function() { citySearchInput.focus(); }, 30);
  }

  function closeCitySearch() {
    if (!citySearchOpen) return;
    citySearchOpen = false;
    citySearchPanel.style.display = 'none';
    citySearchInput.blur();
  }

  function toggleCitySearch() {
    citySearchOpen ? closeCitySearch() : openCitySearch();
  }

  function renderCitySearchResults(query) {
    const q = query.toLowerCase().trim();
    // Deduplicate by city name — cityPool can have multiple entries for the same tz
    const seen = new Set();
    const matches = [];
    for (let i = 0; i < cityPool.length; i++) {
      const c = cityPool[i];
      if (seen.has(c.name)) continue;
      seen.add(c.name);
      if (q && c.name.toLowerCase().indexOf(q) === -1) continue;
      matches.push(c);
      if (matches.length >= 20) break;
    }
    let html = '';
    if (matches.length === 0) {
      html = '<div style="padding:6px 8px;color:var(--text-muted);text-align:center;">No cities found</div>';
    } else {
      const now = new Date();
      for (let i = 0; i < matches.length; i++) {
        const c = matches[i];
        let timeStr = '';
        try {
          timeStr = now.toLocaleTimeString('en-US', {
            timeZone: c.tz, hour: '2-digit', minute: '2-digit', hour12: false
          });
        } catch (e) { timeStr = '??:??'; }
        const off = getTimezoneOffset(c.tz);
        const offStr = off >= 0 ? 'UTC+' + off : 'UTC' + off;
        // Highlight matching substring
        const nameHtml = q ? c.name.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'i'), '<b style="color:var(--text);">$1</b>') : c.name;
        html += '<div class="city-search-item" data-tz="' + c.tz + '" data-name="' + c.name + '" style="' +
          'padding:5px 8px;cursor:pointer;border-radius:4px;display:flex;justify-content:space-between;align-items:center;' +
          'color:var(--text-muted);transition:background 0.1s;' +
          '" onmouseenter="this.style.background=\'var(--border)\'" onmouseleave="this.style.background=\'none\'">' +
          '<span>' + nameHtml + ' <span style="opacity:0.5;font-size:0.65rem;">' + offStr + '</span></span>' +
          '<span style="font-size:0.7rem;opacity:0.7;">' + timeStr + '</span>' +
          '</div>';
      }
    }
    citySearchResults.innerHTML = html;
    // Attach click handlers
    const items = citySearchResults.querySelectorAll('.city-search-item');
    items.forEach(function(item) {
      item.addEventListener('click', function() {
        const tz = item.getAttribute('data-tz');
        const name = item.getAttribute('data-name');
        setHomeTimezone(tz, name);
        closeCitySearch();
      });
    });
  }

  citySearchInput.addEventListener('input', function() {
    renderCitySearchResults(citySearchInput.value);
  });

  // Close on click outside
  document.addEventListener('mousedown', function(e) {
    if (citySearchOpen && !citySearchPanel.contains(e.target) && e.target !== searchToggle) {
      closeCitySearch();
    }
  });

  // Close on Esc (handled in the input specifically so it doesn't reset timezone)
  citySearchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      closeCitySearch();
    }
    // Enter selects first result
    if (e.key === 'Enter') {
      e.preventDefault();
      const first = citySearchResults.querySelector('.city-search-item');
      if (first) first.click();
    }
  });

  // 🔍 button
  const searchToggle = document.createElement('button');
  searchToggle.className = 'search-toggle';
  searchToggle.textContent = '🔍';
  searchToggle.title = 'Search cities (/)';
  searchToggle.style.cssText = `
    position:fixed; bottom:16px; left:216px; padding:6px 10px;
    font-size:1rem; background:var(--card-bg); color:var(--text-muted);
    border:1px solid var(--border); border-radius:var(--radius);
    cursor:pointer; z-index:9999; opacity:0.5;
    transition: opacity 0.15s, background 0.6s ease, border-color 0.6s ease;
    line-height:1; font-family:var(--font-mono);
  `;
  searchToggle.addEventListener('mouseenter', function() { searchToggle.style.opacity = '1'; });
  searchToggle.addEventListener('mouseleave', function() { if (!citySearchOpen) searchToggle.style.opacity = '0.5'; });
  searchToggle.addEventListener('click', toggleCitySearch);
  document.body.appendChild(searchToggle);

  if (alarmSetBtn) {
    alarmSetBtn.addEventListener('click', function() {
      if (!alarmTimeInput) return;
      const parts = alarmTimeInput.value.split(':');
      if (parts.length < 2) return;
      alarmHour = parseInt(parts[0], 10);
      alarmMinute = parseInt(parts[1], 10);
      alarmArmed = true;
      alarmFiredKey = '';
      alarmRinging = false;
      saveAlarm();
      updateAlarmUI();
      alarmToggle.textContent = '⏰';
    });
  }

  if (alarmClearBtn) {
    alarmClearBtn.addEventListener('click', function() {
      alarmArmed = false;
      alarmRinging = false;
      alarmFiredKey = '';
      saveAlarm();
      updateAlarmUI();
      alarmToggle.textContent = '🔕';
      const handEl = document.getElementById('alarmHand');
      if (handEl) handEl.classList.remove('ringing');
    });
  }

  // Initialize alarm UI on load
  updateAlarmUI();
  if (alarmArmed && alarmToggle) alarmToggle.textContent = '⏰';

  fitClockToViewport();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fitClockToViewport, 100);
  });
})();
