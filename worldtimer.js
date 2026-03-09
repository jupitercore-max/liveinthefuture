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
    tick.className = 'clock-tick' + (isMajor ? ' major' : '');
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

    const secondAngle = (seconds + millis / 1000) * 6;
    const minuteAngle = (minutes * 6) + (seconds * 0.1);
    const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);

    document.getElementById('hourHand').style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
    document.getElementById('minuteHand').style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
    document.getElementById('secondHand').style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;

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

    const gradient = ctx.createLinearGradient(
      polarCenter, polarCenter - polarRadius,
      polarCenter, polarCenter + polarRadius
    );
    gradient.addColorStop(0, 'rgba(255, 255, 200, 0.25)');
    gradient.addColorStop(0.35, 'rgba(255, 255, 220, 0.1)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.65, 'rgba(0, 0, 40, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 20, 0.65)');

    ctx.beginPath();
    ctx.arc(polarCenter, polarCenter, polarRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
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
  // clockContainer already declared above
  const CLOCK_NATIVE_SIZE = 520; // px — the designed size

  function fitClockToViewport() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = 32; // breathing room
    // Digital readouts below clock need ~80px
    const availW = vw - pad;
    const availH = vh - pad - 80;
    const maxFit = Math.min(availW, availH);

    if (maxFit < CLOCK_NATIVE_SIZE) {
      const scale = maxFit / CLOCK_NATIVE_SIZE;
      clockContainer.style.transform = `scale(${scale.toFixed(4)})`;
      clockContainer.style.transformOrigin = 'top center';
      // Keep layout flow correct — shrink the box the container occupies
      clockContainer.style.marginBottom = `-${Math.round(CLOCK_NATIVE_SIZE * (1 - scale))}px`;
    } else {
      clockContainer.style.transform = '';
      clockContainer.style.transformOrigin = '';
      clockContainer.style.marginBottom = '';
    }
  }

  fitClockToViewport();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fitClockToViewport, 100);
  });
})();
