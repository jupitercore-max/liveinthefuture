/* story-nav.js — auto-inject share buttons + prev/next article nav on all story pages */
(function() {
  'use strict';

  // Article order (newest first) — matches homepage grid order
  var articles = [
    { slug: 'ai-transformation-80k-company', title: 'A Company Reported 1.3\u00d7 AI Productivity Gains. The Median Worker Got 2%.' },
    { slug: 'compounding-crisis-oil-ai', title: 'The Last Time Oil Prices Spiked, Factories Automated and Never Hired Back. This Time It\'s Offices.' },
    { slug: 'monetary-policy-blind-spot', title: 'The Fed Meets Tuesday to Set Interest Rates. Its Models Can\'t See 10 Million Displaced Workers.' },
    { slug: 'solid-state-battery-verification-year', title: 'Solid-State Batteries Spent a Decade as Vaporware. Seven Companies Just Built Cells.' },
    { slug: 'reprogramming-race-first-human', title: '$4.6 Billion Says Your Cells Can Be Made Younger. The First Human Just Got the Injection.' },
    { slug: 'great-decoupling-permanent', title: 'The Economy Grew 2.2% Last Year. It Created Fewer Jobs Than a Single Amazon Warehouse.' },
    { slug: 'china-robot-takeover', title: 'China Built More Factory Robots Than the Rest of the World Combined. Now It\'s Exporting Them.' },
    { slug: 'nuclear-ai-datacenter-gap', title: 'Big Tech Signed $30 Billion in Nuclear Deals for AI. The Reactors Don\'t Exist Yet.' },
    { slug: 'evtol-air-taxi-reckoning', title: '$14 Billion in Market Cap. Zero Passengers. The eVTOL Industry\'s Reckoning.' },
    { slug: 'two-wave-displacement', title: 'Half the People Getting Fired for AI Are Getting Fired for Nothing. The Other Half Should Be Terrified.' },
    { slug: 'small-launch-graveyard', title: '$8 Billion Built 11 Rockets. One Company Launched 623.' },
    { slug: 'space-debris-cleanup-market', title: '40,000 Pieces of Junk Are Orbiting Earth at 17,000 mph. Six Companies Want to Clean It Up.' },
    { slug: 'chip-sanctions-scorecard', title: 'The U.S. Banned China From Buying Advanced Chips. China Spent $41 Billion on Chip Equipment Anyway.' },
    { slug: 'vertical-farming-financial-reckoning', title: 'Vertical Farming Raised $4 Billion. It Grows Lettuce.' },
    { slug: 'marine-cloud-brightening', title: 'Someone Is Spraying Salt Water Into the Sky Off the California Coast. It Might Be Working.' },
    { slug: 'noninvasive-bci-signal-problem', title: 'Your Headband Can\'t Read Your Mind. Here\'s the Physics.' },
    { slug: 'housing-deficit-technology-gap', title: 'America Is 4.5 Million Homes Short. Technology Built 12,000 of Them.' },
    { slug: 'gene-therapy-pricing-crisis', title: 'The $4.25 Million Cure Exists. Sixty-Four People Got It.' },
    { slug: 'anti-aging-drug-scorecard', title: 'Seven Anti-Aging Drugs Entered Clinical Trials. The Two That Worked Weren\'t Tested on Humans.' },
    { slug: 'shadow-agent-proliferation', title: 'Your Coworker Replaced You With an AI Agent. Your Boss Found Out and Said Thanks.' },
    { slug: 'geothermal-fracking-revolution', title: 'Oil Drillers Accidentally Built the Clean Energy Grid\'s Missing Piece.' },
    { slug: 'drone-warfare-economics', title: 'A $400 Drone Is Destroying $3 Million Tanks. The Math Has Broken Modern Warfare.' },
    { slug: 'post-quantum-crypto-migration', title: 'Half the Internet Is Already Quantum-Proof. The Other Half Has Until 2030.' },
    { slug: 'deploy-maximum-protect-zero', title: 'The Government Pays Companies to Replace You. Then It Cuts the Program That Would Retrain You.' },
    { slug: '15-minute-city-backlash-data', title: '15-Minute Cities Generated Death Threats. Then They Generated Data.' },
    { slug: 'space-station-customer-problem', title: 'Five Companies Are Building Space Stations. One Customer Exists.' },
    { slug: 'humanoid-robot-price-war', title: '$150 Billion in Valuations. Fewer Than 2,000 Robots in Factories.' },
    { slug: 'carbon-credit-market-split', title: '90% of Carbon Credits Were Worthless. The Other 10% Built an $88 Billion Market.' },
    { slug: 'bci-patient-outcomes', title: '21 People Have Brain Chips. Here\'s What Actually Happened to Them.' },
    { slug: 'ethics-premium-consumer-revolt', title: 'Consumers Say They\'ll Pay More for Human-Made. The Receipt Says Otherwise.' },
    { slug: 'trades-as-refuge-trap', title: '\'Learn a Trade\' Is the New \'Learn to Code.\' The Math Doesn\'t Work Either.' },
    { slug: 'retraining-industry-failure', title: 'The $340 Billion Retraining Industry Has a 4% Success Rate.' },
    { slug: 'delegation-flip', title: 'Your Boss Used to Delegate Down. Now They Delegate to a Model.' },
    { slug: 'doge-displacement-case-study', title: 'The US Government Fired 322,000 Workers to Save Money. It Cost $135 Billion More.' },
    { slug: 'degradation-pipeline', title: 'AI-Generated Content Is Getting Worse. The Platforms Don\'t Care.' },
    { slug: 'ai-productivity-perception-gap', title: 'Developers Think AI Makes Them 24% Faster. They\'re Actually 19% Slower.' },
    { slug: 'klarna-invisible-layoffs', title: 'Klarna Eliminated 3,104 Jobs Without a Single Layoff Notice.' },
    { slug: 'synbio-economic-reckoning', title: 'Synthetic Biology Burned $40 Billion. The Organisms Don\'t Care.' },
    { slug: 'glp1-longevity-drug', title: 'The $1,300/Month Weight Loss Drug Is Quietly Becoming the First Anti-Aging Pill.' },
    { slug: 'autonomous-trucking-graveyard', title: 'Five Autonomous Trucking Companies Are Dead. Three Are Driving.' },
    { slug: 'fusion-vs-solar-economics', title: 'Fusion Won the Physics. Solar Won the Economics. Now What?' },
    { slug: 'smart-city-graveyard', title: '$22 Billion Bought 300 Residents. The Smart City Graveyard Is Full.' },
    { slug: 'precision-fermentation-winning', title: 'Cultivated Meat Burned $3 Billion and Died. Precision Fermentation Shipped Mozzarella.' },
    { slug: 'neuromorphic-chip-energy-gap', title: 'Your AI Glasses Need 300 Watts. This Chip Uses Half a Milliwatt.' },
    { slug: 'fpv-drone-economics', title: 'A $400 Drone Killed a $4.5 Million Tank. The Pentagon Noticed.' },
    { slug: 'quantum-error-correction', title: 'Quantum Computing Just Crossed Its Wright Brothers Moment. Here Are the Numbers.' },
    { slug: 'cultivated-meat-price', title: 'The $330,000 Burger Is Now $6. Nobody\'s Buying.' },
    { slug: 'direct-air-capture-cost', title: 'Sucking Carbon from the Sky Costs $600/Ton. The Target Is $100.' },
    { slug: 'battery-storage-revolution', title: 'The Battery That Changes Everything Ships in Containers.' },
    { slug: 'bci-bandwidth-race', title: 'The Race to 1 Million Electrodes in Your Brain.' },
    { slug: 'crispr-access-gap', title: 'CRISPR Can Cure Sickle Cell. Good Luck Getting It.' },
    { slug: 'ethics-premium-displacement-theater', title: 'Companies Replaced Workers. Then They Branded It as Ethics.' },
    { slug: 'humanoid-robot-cost', title: 'The $16,000 Humanoid Robot Is Here. The Job It\'s Doing Costs $12/Hour.' },
    { slug: 'longevity-escape-velocity', title: 'Longevity Escape Velocity: The Math Behind Living to 150.' },
    { slug: 'spacex-launch-cost', title: 'SpaceX Launches Cost 97% Less Than the Shuttle. Nobody\'s Caught Up.' },
    { slug: 'waymo-deaths-per-mile', title: 'Waymo Has Driven 25.3 Million Miles. Zero Pedestrians Killed.' }
  ];

  // Find current article
  var path = window.location.pathname;
  var match = path.match(/stories\/([^\/]+)\.html/);
  if (!match) return;
  var currentSlug = match[1];
  var currentIdx = -1;
  for (var i = 0; i < articles.length; i++) {
    if (articles[i].slug === currentSlug) { currentIdx = i; break; }
  }

  // --- Share buttons ---
  var existingShare = document.querySelector('.share-bar');
  if (!existingShare) {
    var title = document.querySelector('.story-title');
    var meta = document.querySelector('.story-byline') || document.querySelector('.story-meta');
    if (title && meta) {
      var url = encodeURIComponent(window.location.href);
      var text = encodeURIComponent(title.textContent.trim());
      var shareHtml = '<div class="share-bar">' +
        '<span class="share-label">Share</span>' +
        '<a class="share-btn" href="https://twitter.com/intent/tweet?url=' + url + '&text=' + text + '" target="_blank" rel="noopener" title="Share on 𝕏">𝕏</a>' +
        '<a class="share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=' + url + '" target="_blank" rel="noopener" title="Share on LinkedIn">in</a>' +
        '<a class="share-btn" href="https://reddit.com/submit?url=' + url + '&title=' + text + '" target="_blank" rel="noopener" title="Share on Reddit">R</a>' +
        '<a class="share-btn" href="https://news.ycombinator.com/submitlink?u=' + url + '&t=' + text + '" target="_blank" rel="noopener" title="Share on Hacker News">Y</a>' +
        '<button class="share-btn share-copy" onclick="navigator.clipboard.writeText(window.location.href).then(function(){this.textContent=\'✓\';var b=this;setTimeout(function(){b.textContent=\'🔗\'},1500)}.bind(this))" title="Copy link">🔗</button>' +
        '</div>';
      meta.insertAdjacentHTML('afterend', shareHtml);
    }
  }

  // --- Prev/Next navigation ---
  if (currentIdx === -1) return;

  var newer = currentIdx > 0 ? articles[currentIdx - 1] : null;
  var older = currentIdx < articles.length - 1 ? articles[currentIdx + 1] : null;

  var navHtml = '<nav class="article-nav">';
  if (older) {
    navHtml += '<a href="' + older.slug + '.html" class="nav-link nav-older">' +
      '<span class="nav-dir">← Older</span>' +
      '<span class="nav-title">' + older.title + '</span></a>';
  } else {
    navHtml += '<span class="nav-link nav-placeholder"></span>';
  }
  if (newer) {
    navHtml += '<a href="' + newer.slug + '.html" class="nav-link nav-newer">' +
      '<span class="nav-dir">Newer →</span>' +
      '<span class="nav-title">' + newer.title + '</span></a>';
  } else {
    navHtml += '<span class="nav-link nav-placeholder"></span>';
  }
  navHtml += '</nav>';

  // Insert before the closing </article> or at the end of the story page
  var article = document.querySelector('.story-page');
  if (article) {
    article.insertAdjacentHTML('beforeend', navHtml);
  }
})();
