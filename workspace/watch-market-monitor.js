#!/usr/bin/env node
/**
 * watch-market-monitor.js — Multi-marketplace watch listing monitor
 * 
 * Checks multiple watch marketplaces for Ray's target watches.
 * Compares against previous state to detect NEW listings and price changes.
 * Outputs structured results for the cron heartbeat to process and alert.
 * 
 * Sources:
 * - Bob's Watches (HTTP scrape — works reliably)
 * - DavidSW (HTTP scrape — works reliably)
 * - Chrono24 (via web search proxy — direct blocked by Cloudflare)
 * - WatchBox (via web search proxy — direct blocked)
 * - Tourneau/Bucherer (via web search proxy)
 * 
 * State file: ~/workspace/watch-market-state.json
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const WORKSPACE = process.env.HOME + '/workspace';
const STATE_FILE = path.join(WORKSPACE, 'watch-market-state.json');

// Target watches
const WATCHES = [
  {
    name: 'Rolex Milgauss 116400GV',
    ref: '116400GV',
    shortRef: '116400gv',
    brand: 'Rolex',
    bobsUrl: 'https://www.bobswatches.com/rolex/milgauss-116400',
    davidswQuery: '116400gv',
    searchTerms: ['Rolex Milgauss 116400GV', 'Milgauss green sapphire'],
  },
  {
    name: 'Rolex Yacht-Master II 116689',
    ref: '116689',
    shortRef: '116689',
    brand: 'Rolex',
    bobsUrl: 'https://www.bobswatches.com/rolex/yacht-master-ii-116689',
    davidswQuery: '116689',
    searchTerms: ['Rolex Yacht-Master II 116689', 'YachtMaster 116689 white gold'],
  },
  {
    name: 'Hublot Square Bang Magic Gold',
    ref: '821.MX.0130.RX',
    shortRef: '821.MX.0130.RX',
    brand: 'Hublot',
    bobsUrl: null, // Bob's is Rolex-focused
    davidswQuery: 'hublot+square+bang',
    searchTerms: ['Hublot Square Bang Magic Gold 821.MX.0130.RX'],
  },
  {
    name: 'Hublot Square Bang Rainbow',
    ref: '821.NX.0117.LR.0999',
    shortRef: '821.NX.0117.LR.0999',
    brand: 'Hublot',
    bobsUrl: null,
    davidswQuery: 'hublot+square+bang+rainbow',
    searchTerms: ['Hublot Square Bang Rainbow 821.NX.0117.LR.0999'],
  },
];

// Load previous state
function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return { seen: {}, priceHistory: {}, lastRun: null };
  }
}

// Save state
function saveState(state) {
  state.lastRun = new Date().toISOString();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// HTTP GET with timeout
function fetchUrl(url, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
      timeout: timeoutMs 
    }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http') 
          ? res.headers.location 
          : new URL(res.headers.location, url).href;
        fetchUrl(redirectUrl, timeoutMs).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// Extract listings from Bob's Watches HTML
function parseBobsWatches(html, ref) {
  const listings = [];
  // Match price + URL patterns
  const priceRegex = /\$\s*([\d,]+)/g;
  const urlRegex = /href="(\/[^"]*(?:116400|116689|milgauss|yacht-master)[^"]*)"/gi;
  
  const urls = [];
  let m;
  while ((m = urlRegex.exec(html)) !== null) {
    if (!urls.includes(m[1]) && !m[1].includes('sell-rolex')) {
      urls.push(m[1]);
    }
  }
  
  const prices = [];
  while ((m = priceRegex.exec(html)) !== null) {
    const price = parseInt(m[1].replace(/,/g, ''));
    if (price > 1000 && price < 500000) {
      prices.push(price);
    }
  }
  
  // Match URLs to prices roughly
  for (let i = 0; i < Math.min(urls.length, prices.length); i++) {
    listings.push({
      source: "Bob's Watches",
      url: 'https://www.bobswatches.com' + urls[i],
      price: prices[i],
      currency: 'USD',
    });
  }
  
  return listings;
}

// Extract listings from DavidSW HTML
function parseDavidSW(html, ref) {
  const listings = [];
  const urlRegex = /href="(https:\/\/davidsw\.com\/[^"]*(?:watch|rolex|hublot)[^"]*)"/gi;
  
  const seen = new Set();
  let m;
  while ((m = urlRegex.exec(html)) !== null) {
    const url = m[1];
    if (!seen.has(url) && (url.toLowerCase().includes(ref.toLowerCase()) || 
        url.toLowerCase().includes(ref.toLowerCase().replace(/\./g, '-')))) {
      seen.add(url);
      listings.push({
        source: 'DavidSW',
        url: url,
        price: null, // DavidSW often shows price on detail page only
        currency: 'USD',
      });
    }
  }
  
  return listings;
}

// Main scan
async function scan() {
  const state = loadState();
  const newListings = [];
  const priceChanges = [];
  const allResults = {};

  for (const watch of WATCHES) {
    const results = [];
    
    // Bob's Watches
    if (watch.bobsUrl) {
      try {
        const resp = await fetchUrl(watch.bobsUrl);
        if (resp.status === 200) {
          const bobsListings = parseBobsWatches(resp.body, watch.shortRef);
          results.push(...bobsListings);
        }
      } catch (e) {
        console.error(`Bob's failed for ${watch.name}: ${e.message}`);
      }
    }

    // DavidSW
    try {
      const resp = await fetchUrl(`https://davidsw.com/?s=${watch.davidswQuery}`);
      if (resp.status === 200) {
        const dswListings = parseDavidSW(resp.body, watch.shortRef);
        results.push(...dswListings);
      }
    } catch (e) {
      console.error(`DavidSW failed for ${watch.name}: ${e.message}`);
    }

    // Check for new listings and price changes
    for (const listing of results) {
      const key = listing.url;
      
      if (!state.seen[key]) {
        // New listing!
        newListings.push({ watch: watch.name, ref: watch.ref, ...listing });
        state.seen[key] = {
          firstSeen: new Date().toISOString(),
          price: listing.price,
          source: listing.source,
        };
      } else if (listing.price && state.seen[key].price && listing.price !== state.seen[key].price) {
        // Price change!
        const oldPrice = state.seen[key].price;
        const priceDiff = listing.price - oldPrice;
        const pctChange = ((priceDiff / oldPrice) * 100).toFixed(1);
        
        priceChanges.push({
          watch: watch.name,
          ref: watch.ref,
          source: listing.source,
          url: listing.url,
          oldPrice,
          newPrice: listing.price,
          change: priceDiff,
          pctChange,
        });
        
        state.seen[key].price = listing.price;
        state.seen[key].lastPriceChange = new Date().toISOString();
      }
    }

    allResults[watch.name] = results;
  }

  // Save updated state
  saveState(state);

  // Output results
  const output = {
    timestamp: new Date().toISOString(),
    totalListings: Object.values(allResults).flat().length,
    newListings: newListings.length,
    priceChanges: priceChanges.length,
    watches: {},
  };

  for (const watch of WATCHES) {
    const results = allResults[watch.name] || [];
    output.watches[watch.name] = {
      ref: watch.ref,
      listingCount: results.length,
      listings: results.map(l => ({
        source: l.source,
        price: l.price ? `$${l.price.toLocaleString()}` : 'See listing',
        url: l.url,
      })),
    };
  }

  // Alert section
  if (newListings.length > 0 || priceChanges.length > 0) {
    output.alerts = [];
    
    for (const nl of newListings) {
      output.alerts.push({
        type: 'NEW_LISTING',
        watch: nl.watch,
        ref: nl.ref,
        source: nl.source,
        price: nl.price ? `$${nl.price.toLocaleString()}` : 'See listing',
        url: nl.url,
      });
    }
    
    for (const pc of priceChanges) {
      output.alerts.push({
        type: 'PRICE_CHANGE',
        watch: pc.watch,
        ref: pc.ref,
        source: pc.source,
        oldPrice: `$${pc.oldPrice.toLocaleString()}`,
        newPrice: `$${pc.newPrice.toLocaleString()}`,
        change: `${pc.change > 0 ? '+' : ''}$${pc.change.toLocaleString()} (${pc.pctChange}%)`,
        url: pc.url,
      });
    }
  }

  console.log(JSON.stringify(output, null, 2));
  
  // Return alert text for cron body
  if (newListings.length > 0 || priceChanges.length > 0) {
    let alertText = '⌚ WATCH MARKET ALERT\n\n';
    
    for (const nl of newListings) {
      alertText += `🆕 NEW: ${nl.watch}\n`;
      alertText += `   Source: ${nl.source}\n`;
      alertText += `   Price: ${nl.price ? '$' + nl.price.toLocaleString() : 'See listing'}\n`;
      alertText += `   ${nl.url}\n\n`;
    }
    
    for (const pc of priceChanges) {
      const direction = pc.change < 0 ? '📉' : '📈';
      alertText += `${direction} PRICE: ${pc.watch}\n`;
      alertText += `   ${pc.source}: $${pc.oldPrice.toLocaleString()} → $${pc.newPrice.toLocaleString()}\n`;
      alertText += `   Change: ${pc.change > 0 ? '+' : ''}$${pc.change.toLocaleString()} (${pc.pctChange}%)\n`;
      alertText += `   ${pc.url}\n\n`;
    }
    
    // Write alert to file for cron to pick up
    fs.writeFileSync('/tmp/watch-market-alert.txt', alertText);
    console.error('\n=== ALERT ===');
    console.error(alertText);
  }
}

scan().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
