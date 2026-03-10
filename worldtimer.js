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

  // Time-lapse animation state
  let isAnimating = false;
  let animationStartTime = null;
  let animationStartOffset = 0;
  let secondHandStartAngle = 0;
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

  function bezelStart(clientX, clientY) {
    if (isAnimatingCities) return;
    if (!isInBezelRing(clientX, clientY)) return;
    bezelDragging = true;
    bezelDragMoved = false;
    bezelDragCurrentDelta = 0;
    bezelDragStartAngle = getAngleFromCenter(clientX, clientY);
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

    // Mechanical movement simulation: 8 beats per second with spring overshoot
    // Each beat: hand snaps to next 0.75° position, overshoots slightly, settles
    const BEATS_PER_SEC = 8;
    const beatIndex = Math.floor((seconds * BEATS_PER_SEC) + (millis / 1000 * BEATS_PER_SEC));
    const beatFrac = ((seconds * BEATS_PER_SEC) + (millis / 1000 * BEATS_PER_SEC)) % 1;
    const baseDeg = (beatIndex / BEATS_PER_SEC) * 6; // 6° per second, divided into beats

    // Spring physics: quick snap with slight overshoot then settle
    let springOffset = 0;
    if (beatFrac < 0.15) {
      // Snap phase: accelerate to target + overshoot
      const t = beatFrac / 0.15;
      springOffset = (1 + 0.12 * Math.sin(t * Math.PI)) * t;
      springOffset = Math.min(springOffset, 1.12);
    } else if (beatFrac < 0.35) {
      // Settle phase: overshoot decays back
      const t = (beatFrac - 0.15) / 0.2;
      springOffset = 1.12 - 0.12 * t;
    } else {
      // Rest phase: stationary at target
      springOffset = 1.0;
    }

    const nextBeatDeg = 6 / BEATS_PER_SEC; // degrees per beat
    const secondAngle = baseDeg + springOffset * nextBeatDeg;

    const minuteAngle = (minutes * 6) + (seconds * 0.1);
    const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);

    document.getElementById('hourHand').style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
    document.getElementById('minuteHand').style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
    document.getElementById('secondHand').style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;

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
    const finalGlow = hourForGlow >= 18 || hourForGlow <= 6 ? glowIntensity : glowIntensity * 0.3;
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

    // Power reserve
    updatePowerReserve();
    drawPowerReserve();
    updateSunInfo(hours, minutes);

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

    ctx.beginPath();
    ctx.arc(polarCenter, polarCenter, polarRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Initialize
  initSunTimes();
  positionCities();
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

  // Recharge on interaction
  function rechargePower() {
    powerLevel = Math.min(1.0, powerLevel + 0.15);
  }
  document.addEventListener('mousemove', rechargePower);
  document.addEventListener('keydown', rechargePower);
  document.addEventListener('click', rechargePower);
  document.addEventListener('touchstart', rechargePower);
  document.addEventListener('scroll', rechargePower);

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
    // Digital readouts + chrono below clock need ~120px
    const availW = vw - pad;
    const availH = vh - pad - 120;
    const maxFit = Math.min(availW, availH);

    if (maxFit < CLOCK_NATIVE_SIZE) {
      const scale = Math.max(0.45, maxFit / CLOCK_NATIVE_SIZE); // floor at 45%
      worldTimerEl.style.zoom = scale.toFixed(4);
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
          // R = Reset (when stopped with elapsed time)
          if (!chronoRunning && (chronoElapsed > 0 || countdownDone)) {
            e.preventDefault();
            chronoLapReset.click();
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
        case '?':
          // ? = Toggle keyboard shortcut hints
          e.preventDefault();
          toggleShortcutHints();
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
      '<span><kbd>R</kbd> Reset</span>',
      '<span><kbd>C</kbd> Stopwatch / Countdown</span>',
      '<span><kbd>Esc</kbd> Reset timezone</span>',
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

  fitClockToViewport();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fitClockToViewport, 100);
  });
})();
