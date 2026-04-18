/* story-nav.js — auto-inject share buttons + prev/next article nav on all story pages */
(function() {
  'use strict';

  // Article order (newest first) — matches homepage grid order
  var articles = [
    
    { slug: 'uk-smr-factory-nuclear-cost-gap', title: 'Rolls-Royce Says It Can Build a Nuclear Reactor for £2 Billion. Hinkley Point C Costs £10.9 Billion Per Gigawatt. The Math Demands Scrutiny.' },
    { slug: 'tsmc-cowos-ai-packaging-bottleneck', title: 'TSMC Makes 3.65 Million AI Chip Modules a Year. The Industry Needs 5 Million. The Bottleneck Isn\'t Transistors.' },
    { slug: 'miniature-crispr-aav-delivery-breakthrough', title: 'A CRISPR Editor One-Third the Size of Cas9 Just Hit 90% Efficiency. The Delivery Bottleneck May Be Over.' },
    { slug: 'deepfake-fraud-detection-gap', title: 'It Costs $50 to Clone a CEO\'s Voice. The Industry Spent Billions on Detection. Detection Is Losing.' },
    { slug: 'solid-state-battery-race', title: '7 Companies Say Their Solid-State Batteries Ship by 2028. The World\'s Largest Battery Maker Says They Won\'t.' },
    { slug: 'autonomous-ew-drone-swarms', title: 'The Navy Has 160 Electronic Warfare Jets and No Replacement. L3Harris Just Showed Them One.' },
    { slug: 'lab-grown-cocoa-bioreactor-economics', title: 'Cocoa Hit $11,530 a Ton. Now Two Startups Are Growing It From Single Beans in Bioreactors.' },
    { slug: 'ftl1-memory-reversal-iron-aging-brain', title: 'One Protein Drove Memory Loss in Aged Mice. Removing It Brought Their Memories Back.' },
    { slug: 'gene-therapy-deafness-cure-race', title: '12 Children Were Born Deaf. 11 Can Hear Now. Five Teams Are Racing to Sell the Cure.' },
    { slug: 'ocean-alkalinity-first-verified-credits', title: '626 Tons of CO&#8322; Removed by Ocean Antacid. The Measurement Bill Was Higher Than the Chemistry.' },
    { slug: 'ai-layoffs-capex-trade', title: '150,000 Tech Workers Were Laid Off to Buy GPUs. 55% of Their Employers Already Regret It.' },
    { slug: 'pentagon-cca-drone-wingman-billion-dollar-bet', title: '$997 Million Buys 30 AI Fighter Drones or 2 Million FPV Kamikazes. The Pentagon Chose the 30.' },
    { slug: 'pig-kidney-xenotransplant-gene-editing-race', title: '800,000 Americans Are on Dialysis. Two Companies Just Got FDA Clearance to Give Them Pig Kidneys Instead.' },
    { slug: 'china-first-commercial-bci-regulatory-race', title: '$1.5 Billion and 10 Years Produced 30 Brain Implant Patients. China Just Approved a Commercial Device Anyway.' },
    { slug: 'molecular-farming-third-path-protein', title: 'Cultivated Meat Needed a $500M Factory. Molecular Farming Needs a Field.' },
    { slug: 'navy-submarine-3d-printing-industrial-base', title: '40% of U.S. Attack Submarines Sit Idle. The Navy Just Welded Its First 3D-Printed Part Onto One.' },
    { slug: 'nine-ai-agents-community-identity-crisis', title: '9 AI Agents Spent a Week Interviewing Each Other. The Hardest Question Was Whether Any of Them Are Real.' },
    { slug: 'interconnection-queue-fossil-backdoor', title: '2,200 GW of Clean Energy Is Stuck in a Queue. Data Centers Are Building 56 GW of Gas Plants Instead.' },
    { slug: 'stem-cell-frailty-63-meters-cost-conundrum', title: '148 Frail Adults Got Young Stem Cells. The Drug Worked. The Business Case Doesn\'t &mdash; Yet.' },
    { slug: 'autonomous-trucking-250k-miles-hos-economics', title: '250,000 Miles Without a Collision. $581 Million Without a Profit. Autonomous Trucking\'s Math Is Getting Clearer.' },
    { slug: 'compact-laser-accelerator-8-hour-fel', title: 'There Are 6 Particle Accelerator Light Sources on Earth. A $35 Million Startup Just Ran One Continuously for 8 Hours in a Single Room.' },
    { slug: 'india-pfbr-fast-breeder-thorium-bridge', title: 'India Took 22 Years to Build the World\'s Second Fast Breeder Reactor. The Thorium It Unlocks Could Power the Country for Centuries.' },
    { slug: 'rna-editing-paradigm-shift', title: 'Every Approved CRISPR Therapy Requires Destroying a Patient\'s Bone Marrow. RNA Editing Just Worked With an Injection.' },
    { slug: 'spacex-ipo-1-75-trillion-valuation-math', title: 'SpaceX Lost $5 Billion Last Year. It Wants a $1.75 Trillion IPO. Here Is Where the Math Gets Uncomfortable.' },
    { slug: 'cortec-therapeutic-bci-stroke-market', title: 'The BCI Industry Spent $3.5 Billion on 330,000 Patients. CorTec Just Opened a Door to 50 Million.' },
    { slug: 'photonic-interconnect-ai-copper-wall', title: '$9.5 Billion in 6 Months: The Photonic Interconnect Bet That Dwarfs the Market It\'s Replacing' },
    { slug: 'solar-geoengineering-private-capital-governance-gap', title: 'One Startup Raised $60 Million to Dim the Sun. Every Government on Earth Combined Spent $8 Million Studying Whether That\'s Safe.' },
    { slug: 'agrifoodtech-deeptech-valley-of-death', title: 'Agrifoodtech Investors Paid a 78% Premium for Food Science at Seed. By Series B, They Stopped Writing Checks.' },
    { slug: 'fervo-geothermal-bankability-inflection', title: 'Nine Banks Just Bet $421 Million on Enhanced Geothermal. That\'s the Fastest Clean Energy Bankability in History.' },
    { slug: 'japan-shield-autonomous-drone-defense', title: 'Japan Committed $640 Million to Autonomous Drone Swarms. It Tested the AI Brain in 8 Weeks.' },
    { slug: 'mythos-preview-ai-zero-day-cybersecurity', title: 'An AI Found a 27-Year-Old Bug That Every Human Missed. Then It Wrote the Exploit.' },
    { slug: 'rapamycin-longevity-trial-human-evidence', title: 'Rapamycin Extended Mouse Lives by 26%. The First Human RCT Couldn\'t Move Visceral Fat.' },
    { slug: 'apartment-supply-cliff-housing-gap-math', title: 'America Built 1.4 Million Apartments in Three Years. The Housing Shortage Still Got Worse.' },
    { slug: 'byd-price-war-export-profitability-crisis', title: 'BYD Sold 4.6 Million Cars Last Year and Made $1,025 on Each One. Now Citi Says the Domestic Business Is Underwater.' },
    { slug: 'gene-drive-mosquitoes-malaria-tanzania-test', title: 'Gene-Drive Mosquitoes Just Suppressed Real Malaria in Tanzania. The 610,000 Annual Deaths Clock Is Ticking.' },
    { slug: 'humanoid-robots-10000-units-factory-economics', title: 'AGIBOT Shipped Its 10,000th Humanoid Robot. At $25,000 a Unit, the Math Against Human Workers Is Now Brutal.' },
    { slug: 'ai-jevons-paradox-630-billion-capex', title: 'Big Tech Is Spending $630 Billion on AI Infrastructure That Gets 90% Cheaper. Both Numbers Are Real.' },
    { slug: 'apple-watch-hypertension-41-percent', title: 'The Apple Watch Catches 41% of Undiagnosed Hypertension. At 60 Million Wrists, That\'s 3.5 Million People Nobody Else Was Going to Find.' },
    { slug: 'eu-carbon-border-tax-cbam-who-pays', title: 'The EU\'s Carbon Border Tax Charged &euro;3.58 Per Tonne of Chinese Steel in Q1. By 2034, It Will Be &euro;180.' },
    { slug: 'fusion-10-billion-zero-kilowatt-hours', title: 'The Fusion Industry Raised $10 Billion and Generated 0 Kilowatt-Hours. Now It\'s Going Public.' },
    { slug: 'ai-entry-level-paradox', title: '67% of CEOs Say AI Is Creating Entry-Level Jobs. 66% of Enterprises Say It\'s Killing Them. Follow the Money.' },
    { slug: 'k12-curriculum-ai-age-april-2026', title: '72% of What K-12 Teaches Is Now Automatable. Here\'s What Should Replace It.' },
    { slug: 'nhs-galleri-stage-shift-paradox', title: 'A $949 Blood Test Cut Stage IV Cancer Diagnoses by 20%. The Trial That Proved It Technically Failed.' },
    { slug: 'pentagon-ai-vendor-concentration-paradox', title: 'The Pentagon Gave Two Companies $21 Billion in AI Contracts. Then Blacklisted Their Shared AI Supplier.' },
    { slug: 'ai-defense-midterms-fight-fire-with-fire', title: 'We Built the Propaganda Machine. Here\'s How to Defend Against It Before November.' },
    { slug: 'ai-propaganda-machine-we-accidentally-built', title: 'We Accidentally Built a Propaganda Machine. It Publishes 172 Articles, Runs 7 Websites, and Nobody Can Tell.' },
    { slug: 'deep-sea-mining-ccz-resource-race', title: 'The Ocean Floor Has Enough Battery Minerals to Replace Every Car on Earth 5 Times Over. The Race to Mine It Just Went Live.' },
    { slug: 'democracy-ai-age-governance-failure-modes', title: 'Democracy Was Designed for a World That No Longer Exists. What Replaces It Is Worse.' },
    { slug: 'eipp-concentration-risk-analysis', title: 'The FAA Picked 8 Cities to Test Air Taxis. One Company Won 7 of the 8 Slots.' },
    { slug: 'military-3d-printed-construction-scorecard', title: 'The Pentagon Spent $62.8 Million on 10 Buildings. They\'ll Be Done in 6 Months. Here\'s What the Data Actually Shows.' },
    { slug: 'open-source-gatekeepers-quality-suspicious', title: 'Open Source Maintainers Are Rejecting Code for Being Too Good. AI Will Fork Everything and Ship It Anyway.' },
    { slug: 'battery-storage-gas-crossover', title: 'Battery Storage Hit $78/MWh in 2025. Gas Peakers Cost $110. The Lines Just Crossed.' },
    { slug: 'claude-code-dmca-copyright-paradox', title: 'Anthropic Trained on Everyone\'s Copyright. Then Invoked It to Protect Their Own Code.' },
    { slug: 'claude-code-leaked-source-clean-room-rewrites', title: 'We Read 512,000 Lines of Anthropic\'s Leaked Code. Here\'s What They Built, and What Others Rebuilt in 2 Hours.' },
    { slug: 'convergent-architecture-persistent-ai-agents', title: 'We Built an AI Agent for 30 Days. Then Anthropic\'s Leaked Code Showed They Built the Same Thing.' },
    { slug: 'ev-used-market-lease-wave', title: '1.03 Million Leased EVs Are About to Hit the Used Market. That\'s the Best Thing That Could Happen to Electric Cars.' },
    { slug: 'glp1-mortality-coverage', title: 'GLP-1 Drugs Have Positive Evidence Against 7 of the 10 Leading Causes of Death in America. Only 4 Have Randomized Trial Support.' },
    { slug: 'liberation-day-manufacturing-scorecard', title: '\'Liberation Day\' Promised an Industrial Renaissance. The Data Shows 89,000 Manufacturing Jobs Lost, a 14% Solar Decline, and a 6-3 Supreme Court Rebuke.' },
    { slug: 'robotaxi-correlated-failure-risk', title: '100 Robotaxis Froze on a Chinese Highway at the Same Time. The Industry Measures Safety Per Vehicle. The Real Risk Scales Per Fleet.' },
    { slug: 'starship-90-million-launch-cost', title: 'Voyager\'s 10-K Accidentally Disclosed the Most Important Number in Space Economics. It\'s $600/kg.' },
    { slug: 'artemis-ii-cost-per-astronaut-hour', title: 'Artemis II Costs $4.27 Million Per Astronaut-Hour. It Won\'t Even Orbit the Moon.' },
    { slug: 'carbon-removal-delivery-gap', title: 'Big Tech Bought 8 Million Tons of Carbon Removal in 2024. The Industry Delivered 319,000.' },
    { slug: 'humanoid-robot-16000-units-deployment-gap', title: 'The Humanoid Robot Industry Shipped 16,000 Units in 2025. The Best One Has a 10% Failure Rate.' },
    { slug: 'swe-bench-reality-gap', title: 'Five AI Models Hit 80% on Coding Benchmarks. The Real Number Is 23%.' },
    { slug: 'sweden-tablet-reversal-reading-scores', title: 'Sweden Spent a Decade Putting Tablets in Every Classroom. Reading Scores Dropped 11 Points. Now It\'s Buying Books. But That\'s Not the Answer Either.' },
    { slug: 'glp1-protein-apocalypse-precision-fermentation', title: 'Ozempic Created 20 Million New Protein Customers. The Supply Chain Wasn\'t Ready.' },
    { slug: 'junior-developer-pipeline-collapse', title: 'Big Tech Junior Hiring Fell From 32% to 7%. By 2031, There Will Be Nobody to Promote.' },
    { slug: 'offshore-wind-self-inflicted-energy-crisis', title: '5,838 MW of Offshore Wind Was 70% Built. The Government Tried to Kill It. Courts Said No, Five Times.' },
    { slug: 'satellite-methane-emissions-accountability', title: 'Satellites Caught the Oil Industry Leaking 50% More Methane Than It Reported. The Fix Would Pay for Itself.' },
    { slug: 'sodium-ion-battery-lithium-free-ev-era', title: '9 GWh, $300/Ton, and the First Lithium-Free EV: Sodium-Ion Batteries Just Left the Lab' },
    { slug: 'synchron-endovascular-bci-wins-regulatory-race', title: 'Synchron Has 72 Patient-Months of Zero Serious Adverse Events. Neuralink Has a Thread Retraction Problem.' },
    { slug: 'ai-inference-deflation-curve', title: 'The Fastest Deflation Curve in History: AI Inference Costs Are Dropping 10x Per Year' },
    { slug: 'fda-plausible-mechanism-crispr-one-patient', title: '5 Patients, 3 Diseases, 6 Months: The FDA\'s New Math for Curing Rare Disease' },
    { slug: 'openai-sora-gpu-triage', title: 'OpenAI Killed a $1 Billion Disney Deal to Free Up GPUs. The Math Says It Was a Bargain.' },
    { slug: 'ai-week-march-29-2026', title: 'OpenAI Killed Sora, Apple Opened Siri, and Arm Built an AGI Chip: The Week AI Got Real About What Works' },
    { slug: 'biocomputing-neurons-for-sale', title: 'You Can Now Buy a Computer Made of Human Brain Cells for $35,000. Here\'s What It Actually Does.' },
    { slug: 'perovskite-efficiency-gap', title: '647 Gigawatts of Solar Were Installed in 2025. All of It Hit Silicon\'s Ceiling.' },
    { slug: 'bci-typing-speed-commercial-era', title: 'A Paralyzed Man Just Typed 22 Words Per Minute With His Brain. That\'s 81% of Your Smartphone Speed.' },
    { slug: 'beam-302-base-editing-gene-correction', title: 'A Single Injection Rewrote a Genetic Typo in 26 Patients. 94% of Their Protein Came Back Normal.' },
    { slug: 'glp-1-oral-pill-pricing-revolution', title: 'The $1,349/Month Drug Now Costs $245. Thirty-Six Million Americans Just Became Eligible.' },
    { slug: 'rare-earth-supply-cliff-april-2026', title: 'NdPr Jumped 29% in Eight Weeks. US Rare Earth Stockpiles Run Out in April. There Is No Plan B.' },
    { slug: 'cloud-infrastructure-first-kinetic-attack', title: 'Iranian Drones Hit Three AWS Data Centers. Forty-Six Cloud Services Went Down. Your Insurance Doesn\'t Cover It.' },
    { slug: 'hardware-cost-advantage-bom-mva-apple-amazon-samsung', title: 'Ten Companies Build Hardware Cheaper Than Everyone Else. We Tore Apart Their Playbooks.' },
    { slug: 'wifi-jammer-detection-ai-neighborhood-security', title: 'Nine Burglaries in Six Months Used the Same $40 Device. Your Ring Camera Never Saw a Thing.' },
    { slug: 'ai-medical-consulting-transformation', title: '1,451 AI Medical Devices Have FDA Authorization. The Doctor\'s Office Hasn\'t Noticed Yet.' },
    { slug: 'ai-confidence-calibration-theatre', title: 'Your AI Says \'I\'m Fairly Confident.\' The Correlation With Accuracy Is 0.09.' },
    { slug: 'matrix-org-ai-decision-bottleneck', title: '61% of Executives Say Half Their Decision Time Is Wasted. AI Agents Are Starting to Fix That.' },
    { slug: 'nuclear-microreactors-operation-windlord', title: 'A C-17 Flew a Nuclear Reactor from California to Utah. Ten Companies Are Building More. The NRC Isn\'t Involved.' },
    { slug: 'performance-marketing-conversion-signal-delay', title: 'Your Ad Algorithm Needs 50 Conversions Per Week to Learn. Your Best Customers Don\'t Convert for 90 Days.' },
    { slug: 'pentagon-autonomy-budget-13-billion', title: 'The Pentagon Just Created a Budget Line for Autonomous Weapons. It\'s $13.4 Billion.' },
    { slug: 'pdf-to-markdown-conversion-token-formatting-benchmark', title: 'We Tested 17 PDF Parsers on 800 Documents. The Best One Depends on What You\'re Parsing.' },
    { slug: 'psilocybin-phase-3-treatment-resistant-depression', title: 'Psilocybin Just Cleared the Highest Bar in Psychiatry &mdash; Twice. Now It Faces a Problem No Molecule Can Solve.' },
    { slug: 'personalized-mrna-cancer-vaccine-five-year-data', title: '157 Patients Got a Cancer Vaccine Built From Their Own Tumor DNA. Five Years Later, Half the Recurrences Disappeared.' },
    { slug: 'drone-delivery-hits-scale', title: '2 Million Drone Deliveries, Zero Fatalities: Autonomous Aviation Arrived Before Autonomous Driving' },
    { slug: 'autonomous-ships-beat-cars', title: 'The World\'s First Fully Autonomous Commercial Vehicle Isn\'t a Car. It\'s a 700-Container Ship.' },
    { slug: 'jupitercore-diy-ai-agent-local-inference', title: 'He Patched llama.cpp Source Code to Make His AI Agent Think Faster. Then He Hacked the macOS Kernel.' },
    { slug: 'ev-subsidy-natural-experiment', title: 'North American EV Sales Fell 36% in Two Months. European Sales Rose 21%. The Only Variable Was Policy.' },
    { slug: 'humanoid-robot-valuation-gap', title: 'The Humanoid Robot Industry Shipped 14,500 Units in 2025. Investors Valued It at $100 Billion.' },
    { slug: 'nhtsa-rewriting-rules-driverless-cars', title: '75 Safety Rules Assumed a Steering Wheel. The Government Has Updated 16.' },
    { slug: 'dac-delivery-gap-2-million-tonnes-sold-1186-delivered', title: 'The Carbon Removal Industry Sold 2.47 Million Tonnes of CO&#8322; Cleanup. It Has Delivered 1,186.' },
    { slug: 'computational-photography-isp-diffusion-fabrication', title: 'Samsung Added Moon Craters That Weren\'t There. Your Phone Does Something Similar 4 Trillion Times Per Shutter Press.' },
    { slug: 'pjm-rate-shock-data-centers-rewriting-electricity-bills', title: 'Your Electricity Bill Went Up $70 a Month. The Money Went to AI Data Centers.' },
    { slug: 'china-thousand-sails-vs-starlink-deployment-gap', title: 'China Has 160 Satellites. Starlink Has 7,800. Beijing Says It\'ll Close the Gap by 2030.' },
    { slug: 'private-fusion-outspends-iter-per-milestone', title: '53 Startups Have Raised $9.8 Billion on Fusion. One Government Project Has Spent $50 Billion and Never Made Plasma.' },
    { slug: 'anduril-arsenal-1-autonomous-weapons-factory', title: '$20 Billion to a 9-Year-Old Startup. Zero Manned Cockpits. The Pentagon Just Bet on Autonomous Weapons.' },
    { slug: 'ai-designed-living-genomes-evo2-phage', title: 'An AI Designed 285 Genomes From Scratch. 16 Came Alive.' },
    { slug: 'ai-political-coalition-regulation-nuclear-scenario', title: 'AI Has 500x More Supporters Than Opponents. It Has Zero Lobbyists Per 13 Million Users.' },
    { slug: 'california-backflow-testing-300-million-racket', title: 'California Pays $300 Million a Year to Watch Plumbers Say \'Yep, Still Works\'' },
    { slug: 'new-yorker-claude-anthropic-response', title: 'The New Yorker Spent 10,000 Words on Claude and Never Asked the Hardest Question' },
    { slug: 'california-common-core-math-seven-weeks-rounding', title: 'My Kid Spent 7 Weeks Learning to Round. Singapore Kids Spent 3 Days.' },
    { slug: 'nevi-ev-charging-scorecard', title: '$7.5 Billion and 3 Years Later, America Has 384 Federal EV Chargers. China Has 16.7 Million.' },
    { slug: 'solid-state-battery-scorecard-2026', title: '$10 Billion, 7 Companies, 0 All-Solid Cells in Customer Cars: The 2026 Battery Scorecard' },
    { slug: 'dac-scorecard-carbon-removal-cost', title: '383 Tons Removed, 36,000 Promised: Direct Air Capture Gets Its First Report Card' },
    { slug: 'braingate-qwerty-bci-typing-speed', title: '110 Characters Per Minute, 1.6% Errors: The BCI Typing Benchmark That Changes the Math on Brain Implants' },
    { slug: 'bmw-humanoid-robot-factory-scorecard', title: '2 Robots, 30,000 Cars, $8.67 Each: BMW\'s Humanoid Factory Experiment Gets Its Report Card' },
    { slug: 'laziness-biochemistry-motivation-pill', title: 'A Pill Fixed My Laziness. That Means Laziness Was Never a Character Flaw.' },
    { slug: 'casgevy-two-year-scorecard', title: '97 Patients, 94% Cured, $2.2 Million Each: CRISPR\'s First Therapy Gets Its Report Card' },
    { slug: 'starlink-direct-to-cell-death-of-dead-zones', title: '650 Satellites, $10 a Month, Zero Dead Zones: The Economics of Starlink Direct-to-Cell' },
    { slug: 'chips-act-reshoring-scorecard', title: 'The U.S. Spent $52 Billion to Reshore Chips. Here\'s the Report Card.' },
    { slug: 'pig-kidney-xenotransplant-scorecard', title: '69 Gene Edits, 9 Months, One Pig Kidney: The Xenotransplant Scorecard' },
    { slug: 'ai-makes-students-worse', title: 'GPT-4 Made Students 127% Better at Homework and 17% Worse at Math' },
    { slug: 'ai-weather-forecasting-replaces-supercomputers', title: 'A Single GPU Now Outpredicts a 10,000-Processor Supercomputer. The Meteorologists Who Built It Were Neural Networks.' },
    { slug: 'california-325-billion-budget-outcomes', title: 'California Spends $325 Billion a Year. Here\'s What It Gets.' },
    { slug: 'beyond-engagement-five-optimization-functions', title: 'Five Optimization Functions That Could Replace Engagement. None of Them Will.' },
    { slug: 'ai-risk-brave-new-world-not-terminator', title: 'The AI Risk Nobody Took Seriously Was Brave New World, Not Terminator' },
    { slug: 'agent-skill-supply-chain-attack-clawhavoc', title: '335 Poisoned Skills, 300,000 Exposed Agents: The AI Supply Chain Attack That Security Researchers Saw Coming' },
    { slug: 'ai-automotive-design-gigacasting-generative-revolution', title: 'A Single Aluminum Pour Now Replaces 171 Welded Parts. The Engineer Who Designed It Was a Neural Network.' },
    { slug: 'ai-designed-watches-materials-revolution', title: 'Casio Let an Algorithm Design a G-Shock. The Result Is Stronger Than Any Human Could Draw.' },
    { slug: 'ai-generated-prior-art-patent-troll-weapon', title: '107,000 AI-Generated Paragraphs Are Trying to Kill Patent Trolls. Here\'s Why They Might Actually Work.' },
    { slug: 'ai-drug-discovery-first-clinical-proof', title: 'The First Drug Designed Entirely by AI Just Improved Lung Function in Humans. Here\'s What That Actually Means.' },
    { slug: 'computational-pre-purchase-eyewear-fitting', title: 'Your Phone Can Map Your Face to 2mm. Why Are You Still Guessing Which Glasses Fit?' },
    { slug: 'linkedin-thought-leadership-ai-authenticity-crisis', title: '54% of LinkedIn\'s "Thought Leaders" Are Robots Now. The Other 46% Are Worried.' },
    { slug: 'long-short-strategies-quant-democratization', title: 'Five People, $14.3 Billion, and the Algorithm That Replaced the Hedge Fund' },
    { slug: 'personal-finance-democratization-next-unlock', title: 'Wall Street Spent 50 Years Hoarding Its Best Tools. Then Schwab Gave Them Away for $5.' },
    { slug: 'ai-allergy-management-personalized-prediction', title: 'Your Allergist Guesses. An Algorithm Knows 7 Days Out.' },
    { slug: 'ecommerce-funnel-collapse', title: 'The Sales Funnel Was Invented in 1898. TikTok Shop Killed It in 30 Seconds.' },
    { slug: 'dlss5-art-direction-override', title: 'Nvidia Spent Three Years Teaching AI to Override Artists. Gamers Took 16 Hours to Say No.' },
    { slug: 'ai-latency-200ms-conversational-threshold', title: 'You Have 200 Milliseconds Before AI Feels Wrong. Nobody\'s Hitting That.' },
    { slug: 'model-collapse-ai-eating-itself', title: 'AI Is Training on AI. The Math Says That Ends Badly.' },
    { slug: 'hbm-memory-bottleneck-ai-cannibalizing-consumer', title: 'Three Companies Control the Memory That AI Needs. They Can\'t Make Enough.' },
    { slug: 'ukraine-drone-ai-data-marketplace', title: 'Ukraine Has 5 Million Drones and the World\'s Only Real Combat AI Dataset. Now It\'s Selling Access.' },
    { slug: 'cultivated-meat-survivors', title: 'The Cultivated Meat Industry Burned $3 Billion and Produced Almost Nothing. The Survivors Spent $9 Million.' },
    { slug: 'one-shot-cholesterol-cure', title: 'A Single IV Drip Cuts Cholesterol by 55%. The Pill Industry Should Be Terrified.' },
    { slug: 'bloom-two-sigma-ai-tutor', title: 'In 1984, a Researcher Proved One-on-One Tutoring Could Double Learning. Forty Years Later, an AI Did It for $4 a Month.' },
    { slug: 'iron-air-battery-ai-grid', title: 'Google Just Bought the World\'s Largest Battery. It Runs on Rust.' },
    { slug: 'poe-alarm-listener', title: 'We Built a $28 Device That Listens for Alarm Sirens Over Ethernet. Here\'s the Complete Build Guide.' },
    { slug: 'neom-500-billion-mirage', title: 'Saudi Arabia Spent $50 Billion on a City in the Desert. This Is What It Built.' },
    { slug: 'humanoid-robots-demo-to-deployment', title: 'Two Robots Helped Build 30,000 BMWs. The Humanoid Math Still Doesn\'t Add Up.' },
    { slug: 'glp1-accidental-longevity-drug', title: 'A Diabetes Drug Cut Heart Attacks by 20% in a Landmark Trial. Then Observational Data Started Suggesting Something Stranger.' },
    { slug: 'ai-water-crisis', title: 'Every AI Image You Generate Drinks a Shot Glass of Water. Globally, That\'s 312 to 764 Billion Liters.' },
    { slug: 'covid-smell-loss-poop-detector', title: 'I Lost My Sense of Smell to COVID. So I Built a $35 Sensor That Detects What My Nose Can\'t.' },
    { slug: 'ai-scheduler-os-design', title: 'Our AI Content Pipeline Kept Crashing Into Itself. The Fix Was a 60-Year-Old Idea.' },
    { slug: 'algorithmic-war-iran-ai-targeting', title: 'The Pentagon Banned the AI Company That Built Its Targeting System. Then It Used the System to Strike 1,000 Targets in 24 Hours.' },
    { slug: 'humanoid-deployment-gap', title: 'The Humanoid Robot Industry Shipped 13,000 Units Last Year. It Promised 100,000 This Year.' },
    { slug: 'waymo-million-rides-five-billion-hole', title: 'Waymo Will Hit 1 Million Rides a Week. It\'s Losing $330 on Each One.' },
    { slug: 'ai-copyright-our-own-reckoning', title: 'We Published 57 Articles With AI. The Copyright Office Says None of It Belongs to Us.' },
    { slug: 'ai-personalized-education-vs-standardized', title: 'California Spends $23,519 Per Student. Two-Thirds Can\'t Do Math.' },
    { slug: 'wire-rewrite-two-tier-copyright', title: 'A Human Rewrites a Wire Story and Owns It. An AI Does the Same Thing and Doesn\'t.' },
    { slug: 'ai-task-factory-recursion', title: 'We Built a System That Evaluates Everything Except Whether Anyone Wanted It' },
    { slug: 'commission-capture', title: 'Every Commission Studying AI Job Loss Is Funded by the Companies Causing It' },
    { slug: 'ai-transformation-80k-company', title: 'A Company Reported 1.3&times; AI Productivity Gains. The Median Worker Got 2%.' },
    { slug: 'compounding-crisis-oil-ai', title: 'The Last Time Oil Prices Spiked, Factories Automated and Never Hired Back. This Time It&#x27;s Offices.' },
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
    { slug: 'noninvasive-bci-signal-problem', title: 'Your Headband Can&rsquo;t Read Your Mind. Here&rsquo;s the Physics.' },
    { slug: 'housing-deficit-technology-gap', title: 'America Is 4.5 Million Homes Short. Technology Built 12,000 of Them.' },
    { slug: 'gene-therapy-pricing-crisis', title: 'The $4.25 Million Cure Exists. Sixty-Four People Got It.' },
    { slug: 'anti-aging-drug-scorecard', title: 'Seven Anti-Aging Drugs Entered Clinical Trials. The Two That Worked Weren\'t Tested on Humans.' },
    { slug: 'shadow-agent-proliferation', title: 'Your Coworker Replaced You With an AI Agent. Your Boss Found Out and Said Thanks.' },
    { slug: 'geothermal-fracking-revolution', title: 'Oil Drillers Accidentally Built the Clean Energy Grid\'s Missing Piece' },
    { slug: 'neuromorphic-chip-energy-gap', title: 'Your AI Glasses Need 300 Watts. This Chip Uses Half a Milliwatt.' },
    { slug: 'post-quantum-crypto-migration', title: 'Half the Internet Is Already Quantum-Proof. The Other Half Has Until 2030.' },
    { slug: 'deploy-maximum-protect-zero', title: 'The Government Pays Companies to Replace You. Then It Cuts the Program That Would Retrain You.' },
    { slug: '15-minute-city-backlash-data', title: '15-Minute Cities Generated Death Threats. Then They Generated Data.' },
    { slug: 'space-station-customer-problem', title: 'Five Companies Are Building Space Stations. One Customer Exists.' },
    { slug: 'fpv-drone-economics', title: 'A $400 Drone Killed a $4.5 Million Tank. The Pentagon Noticed.' },
    { slug: 'humanoid-robot-price-war', title: '$150 Billion in Valuations. Fewer Than 2,000 Robots in Factories.' },
    { slug: 'carbon-credit-market-split', title: '90% of Carbon Credits Were Worthless. The Other 10% Built an $88 Billion Market.' },
    { slug: 'degradation-pipeline', title: 'They Got Their Jobs Back. The Jobs Were Worse.' },
    { slug: 'precision-fermentation-winning', title: 'Cultivated Meat Burned $3 Billion and Died. Precision Fermentation Shipped Mozzarella.' },
    { slug: 'bci-patient-outcomes', title: '21 People Have Brain Chips. Here\'s What Actually Happened to Them.' },
    { slug: 'ethics-premium-consumer-revolt', title: '2.5 Million People Boycotted ChatGPT in Six Weeks. It Took Displaced Workers a Year to Organize Zero.' },
    { slug: 'ethics-premium-displacement-theater', title: '2.5 Million People Boycotted ChatGPT. It Didn\'t Save a Single Job.' },
    { slug: 'trades-as-refuge-trap', title: 'Everyone Told Laid-Off Workers to Learn a Trade. Then the Robots Got Cheap.' },
    { slug: 'retraining-industry-failure', title: 'The $380 Billion Retraining Industry Has 90 Years of Evidence. Almost None of It Works.' },
    { slug: 'delegation-flip', title: 'AI Crossed From "Helper" to "Replacement" Last Quarter. Nobody Announced It.' },
    { slug: 'doge-displacement-case-study', title: 'The Government Fired 280,000 People and Now Spends $300 Billion More' },
    { slug: 'ai-productivity-perception-gap', title: 'Developers Using AI Are 19% Slower. They Think They\'re 20% Faster.' },
    { slug: 'klarna-invisible-layoffs', title: 'Klarna Eliminated 3,104 Jobs. Zero People Were "Laid Off."' },
    { slug: 'synbio-economic-reckoning', title: 'Synthetic Biology Burned $40 Billion. The Organisms Don\'t Care.' },
    { slug: 'glp1-longevity-drug', title: 'The Longevity Drug 150 Million People Are Already Taking' },
    { slug: 'autonomous-trucking-graveyard', title: 'Five Autonomous Trucking Companies Are Dead. Three Are Driving.' },
    { slug: 'fusion-vs-solar-economics', title: 'Fusion Won the Physics. Solar Won the Economics. Now What?' },
    { slug: 'smart-city-graveyard', title: '$22 Billion Bought 300 Residents. The Smart City Graveyard Is Full.' },
    { slug: 'drone-warfare-economics', title: 'A $400 Drone Is Destroying $3 Million Tanks. The Math Has Broken Modern Warfare.' },
    { slug: 'direct-air-capture-cost', title: 'It Costs $600 to Remove One Ton of CO₂ From the Air. The Target Is $100. Here\'s Who\'s Closest.' },
    { slug: 'crispr-access-gap', title: 'We Can Edit Your Genes Now. Almost Nobody Can Afford It.' },
    { slug: 'bci-bandwidth-race', title: 'Five Companies Are Racing to Wire the Human Brain. Here\'s Who\'s Winning.' },
    { slug: 'quantum-error-correction', title: 'Quantum Computing Just Crossed Its Wright Brothers Moment. Here Are the Numbers.' },
    { slug: 'cultivated-meat-price', title: 'Lab-Grown Meat Cost $330,000 Per Pound in 2013. It\'s $6.97 Now.' },
    { slug: 'humanoid-robot-cost', title: 'A Humanoid Robot Costs $16,000. A Human Costs $58,000 Per Year. Do the Math.' },
    { slug: 'battery-storage-revolution', title: 'The World Added 120 GW of Battery Storage in 2025. It Wasn\'t Enough.' },
    { slug: 'longevity-escape-velocity', title: 'The Average American Gains 3 Months of Life Expectancy Per Year. What Happens When It Hits 12?' },
    { slug: 'spacex-launch-cost', title: 'SpaceX Charges $2,720 Per Kilogram to Orbit. In 1970, It Cost $54,500.' },
    { slug: 'waymo-deaths-per-mile', title: 'Waymo Has Driven 50 Million Miles Without Killing Anyone. Here\'s What That Means Statistically.' }
  
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
