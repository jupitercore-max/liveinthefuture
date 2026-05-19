
(function(){
"use strict";
var cv=document.getElementById("c"),ctx=cv.getContext("2d"),W=600,H=600;

// ═══ AUDIO ═══
var audioCtx=null,bgmTimer=0,bgmMuted=false;
function initAudio(){if(audioCtx)return;audioCtx=new(window.AudioContext||window.webkitAudioContext)()}
var voiceQueue=[],voicePlaying=false;
var VF={intro:"audio/narrator-intro.mp3",engineering:"audio/narrator-engineering.mp3",kitchen:"audio/narrator-kitchen.mp3",server:"audio/narrator-server.mp3",conference:"audio/narrator-conference-trap.mp3",rankup:"audio/narrator-rankup.mp3",win:"audio/narrator-win.mp3",lose:"audio/narrator-lose.mp3",ceo_pivot:"audio/ceo-pivot.mp3",ceo_rto:"audio/ceo-rto.mp3",ceo_reorg:"audio/ceo-reorg.mp3",ceo_pip:"audio/ceo-pip.mp3",ceo_okr:"audio/ceo-okr.mp3",ceo_aiclone:"audio/ceo-ai-clone.mp3",ceo_tweet:"audio/ceo-tweet.mp3",ceo_karaoke:"audio/ceo-karaoke.mp3",ceo_standingdesk:"audio/ceo-standing-desk.mp3",ceo_wellnessapp:"audio/ceo-wellness-app.mp3",ceo_cfo:"audio/ceo-cfo.mp3",ceo_intern:"audio/ceo-intern.mp3",ceo_openplan:"audio/ceo-openplan.mp3",ceo_pingpong:"audio/ceo-pingpong.mp3",ceo_exitinterview:"audio/ceo-exit-interview.mp3",ceo_oatmilk:"audio/ceo-oat-milk.mp3",ceo_coldbrew:"audio/ceo-cold-brew.mp3",ceo_vision:"audio/ceo-vision.mp3",ceo_synergy:"audio/ceo-synergy.mp3",ceo_culture:"audio/ceo-culture.mp3",ceo_offsite:"audio/ceo-offsite.mp3",ceo_townhall:"audio/ceo-townhall.mp3",ceo_rebrand:"audio/ceo-rebrand.mp3",ceo_leak:"audio/ceo-leak.mp3",ceo_acquisition:"audio/ceo-acquisition.mp3",ceo_severance:"audio/ceo-severance.mp3",ceo_icebreaker:"audio/ceo-icebreaker.mp3",ceo_mentorship:"audio/ceo-mentorship.mp3",ceo_retreat:"audio/ceo-retreat.mp3",ceo_survey:"audio/ceo-survey.mp3",vp_aitransform:"audio/vp-ai-transform.mp3",vp_dogfood:"audio/vp-dogfood.mp3",vp_hackathon:"audio/vp-hackathon.mp3",vp_crossfunc:"audio/vp-crossfunc.mp3",vp_skiplvl:"audio/vp-skiplevel.mp3",event_depgone:"audio/event-dep-gone.mp3",event_aibot:"audio/event-ai-bot.mp3",event_cloudbill:"audio/event-cloud-bill.mp3",event_merger:"audio/event-merger.mp3",event_perfreview:"audio/event-perf-review.mp3",event_teamcoffee:"audio/event-team-coffee.mp3",event_foosball:"audio/event-foosball.mp3",event_stretch:"audio/event-stretch.mp3",event_trustfall:"audio/event-trust-fall.mp3",event_guestspeaker:"audio/event-guest-speaker.mp3",task_success:"audio/task-success.mp3",task_critical:"audio/task-critical.mp3",task_failure:"audio/task-failure.mp3",engineer_lost:"audio/engineer-lost.mp3",engineer_hired:"audio/engineer-hired.mp3",upgrade_buy:"audio/upgrade-buy.mp3",prod_incident:"audio/prod-incident.mp3",breakthrough:"audio/breakthrough.mp3",slots_spin:"audio/slots-spin.mp3"};
function playVoice(k){if(!VF[k])return;voiceQueue.push(k);if(!voicePlaying)pVQ()}
function pVQ(){if(!voiceQueue.length){voicePlaying=false;return}voicePlaying=true;var k=voiceQueue.shift();var a=new Audio(VF[k]);a.volume=0.8;a.onended=pVQ;a.onerror=pVQ;a.play().catch(pVQ)}
function tone(f,d,t,v){if(!audioCtx)return;var o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=t||"sine";o.frequency.value=f;g.gain.setValueAtTime(v||0.1,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+d);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+d)}
function playStep(){tone(200+Math.random()*80,0.06,"sine",0.04)}
function playGood(){tone(523,0.1,"sine",0.08);setTimeout(function(){tone(659,0.12,"sine",0.08)},100);setTimeout(function(){tone(784,0.15,"sine",0.08)},200)}
function playBad(){tone(220,0.3,"sawtooth",0.1);setTimeout(function(){tone(180,0.4,"sawtooth",0.08)},200)}
function playRankUp(){[523,659,784,1047].forEach(function(n,i){setTimeout(function(){tone(n,0.3,"triangle",0.1)},i*150)})}
function playWin(){[523,659,784,1047,1319].forEach(function(n,i){setTimeout(function(){tone(n,0.4,"sine",0.1)},i*120)})}
function playLose(){tone(200,0.5,"sawtooth",0.12);setTimeout(function(){tone(150,0.6,"sawtooth",0.1)},300);setTimeout(function(){tone(100,0.8,"sawtooth",0.08)},600)}
function playAbility(){tone(880,0.1,"square",0.1);tone(1100,0.15,"sine",0.08)}
function playSlotTick(){tone(400+Math.random()*200,0.04,"square",0.06)}
function playSlotWin(){tone(523,0.15,"sine",0.12);setTimeout(function(){tone(784,0.2,"sine",0.12)},100);setTimeout(function(){tone(1047,0.3,"sine",0.15)},200)}
function playSlotFail(){tone(200,0.3,"sawtooth",0.08);tone(150,0.4,"square",0.06)}
function playCritical(){for(var i=0;i<6;i++)(function(d){setTimeout(function(){tone(800+Math.random()*400,0.1,"sine",0.15)},d)})(i*60)}
function playBGM(){if(!audioCtx||bgmMuted)return;bgmTimer++;var b=261,sc=[1,1.125,1.25,1.333,1.5,1.667,1.875],m=Math.floor(bgmTimer/16)%4,bt=bgmTimer%16;if(bt%4===0)tone(b*sc[[0,4,2,5][m]],0.3,"sine",0.03);if(bt%8===4)tone(b*sc[[2,0,4,3][m]]*0.5,0.25,"triangle",0.02)}
var analyser=null,micSmooth=0;
function initMic(){try{navigator.mediaDevices.getUserMedia({audio:true}).then(function(s){if(!audioCtx)initAudio();var src=audioCtx.createMediaStreamSource(s);analyser=audioCtx.createAnalyser();analyser.fftSize=256;analyser.smoothingTimeConstant=0.85;src.connect(analyser)}).catch(function(){})}catch(e){}}
function updateMic(){if(!analyser)return;var d=new Uint8Array(analyser.frequencyBinCount);analyser.getByteFrequencyData(d);var s=0;for(var i=0;i<d.length;i++)s+=d[i];micSmooth+=(s/(d.length*255)-micSmooth)*0.08}


// ═══ CONSTANTS ═══
var ST_TITLE=0,ST_STANDUP=1,ST_WORK=2,ST_EVENT=3,ST_EOD=4,ST_RESULT=5,ST_SHOP=6;
var state=ST_TITLE;
var RANKS=[{name:"Acting VP of Connectivity",thr:0,mx:5,bonus:1},{name:"VP of Connectivity",thr:20,mx:6,bonus:1.1},{name:"SVP of Connectivity & Standards",thr:45,mx:7,bonus:1.25},{name:"Chief Connectivity Officer",thr:70,mx:8,bonus:1.4},{name:"Lord Bluetooth, Duke of Spectrum",thr:90,mx:10,bonus:1.6}];
var NAMES=["Sreya","Tanvi","Ming","Hiro","Sven","Priya","Carlos","Aisha","Dmitri","Fiona","Kwame","Lena","Raj","Yuki","Omar","Bea","Jin","Nina","Tomas","Zara","Wei","Anya","Kai","Sato","Luis","Mika","Chen","Olga","Devi","Axel"];
var QUIRKS=["runs K8s on a Smart Fridge","refactors in production","only talks via Git commits","has strong tab opinions","debates REST vs GraphQL at lunch","lives in standups","writes tests for tests","deploy-Fridays without fear","has a shrine to Dennis Ritchie","insists on 6 monitors","codes in vim, no plugins","ships before design review","production debugging tattoo","estimates everything in 2 weeks","replies-all to every email","thinks AI will replace us all","only drinks room-temp water","never missed a standup","names servers after pets","wrote their own framework"];
var SPECS=["Frontend","Backend","Infra","QA","AI/ML"];
var SP_C={Frontend:"#4CAF50",Backend:"#2196F3",Infra:"#FF9800",QA:"#9C27B0","AI/ML":"#FFEB3B"};
var TASKS=[{id:"feature",name:"Feature Dev",desc:"Ship product",icon:"\uD83D\uDE80",color:"#4CAF50"},{id:"bugs",name:"Bug Fixes",desc:"Lower incident risk",icon:"\uD83D\uDC1B",color:"#9C27B0"},{id:"techdebt",name:"Tech Debt",desc:"Future speed boost",icon:"\uD83D\uDD27",color:"#FF9800"},{id:"ai",name:"AI Integration",desc:"+Political Capital",icon:"\uD83E\uDD16",color:"#FFEB3B"},{id:"politics",name:"Office Politics",desc:"Defend team",icon:"\uD83D\uDC54",color:"#2196F3"}];
function genEng(){var sk=Math.random()<0.08?5:Math.random()<0.2?4:Math.random()<0.45?3:Math.random()<0.75?2:1;return{name:NAMES[0|Math.random()*NAMES.length],quirk:QUIRKS[0|Math.random()*QUIRKS.length],skill:sk,specialty:SPECS[0|Math.random()*SPECS.length],energy:70+(0|Math.random()*30),morale:55+(0|Math.random()*35),task:-1,alive:true}}

var EVENTS=[
{id:"synergy",cat:"meeting",title:"Synergy Alignment Standup",desc:"3 hours of synergy talk. Nothing decided.",voice:"ceo_synergy",choices:[{name:"Accept",mD:3,eD:15},{name:"Skip (10 PC)",pc:10,mG:2}]},
{id:"allhands",cat:"meeting",title:"All-Hands: CEO Vision 2.0",desc:"CEO pivots to blockchain/AI/metaverse.",voice:"ceo_vision",choices:[{name:"Sit through it",eD:10,mD:5,pD:10},{name:"Hide in bathroom (5 PC)",pc:5}]},
{id:"crossfunc",cat:"meeting",title:"Cross-Functional Sync",desc:"7 managers, 0 engineers attend.",voice:"vp_crossfunc",choices:[{name:"Attend",eD:20,mD:5},{name:"Send delegate (5 PC)",pc:5,eD:5}]},
{id:"okr",cat:"theater",title:"OKR Rewrite Season",desc:"All engineering stops to rewrite objectives.",voice:"ceo_okr",choices:[{name:"Comply",mD:5,pD:8},{name:"Copy-paste last Q (5 PC)",pc:5,mD:2}]},
{id:"reorg",cat:"theater",title:"Reorg Roulette",desc:"Your team is being restructured...",voice:"ceo_reorg",choices:[{name:"Accept fate",mD:10,sp:"lose_eng"},{name:"Fight (20 PC, 60%)",pc:20,mD:3,sp:"fight_reorg"},{name:"Sacrifice worst eng",mD:5,sp:"sac_worst"}]},
{id:"rto",cat:"theater",title:"Return to Office Mandate",desc:"Everyone must come in 5 days/week.",voice:"ceo_rto",choices:[{name:"Accept",mD:15},{name:"Negotiate (15 PC)",pc:15,mD:5},{name:"Secret remote",mD:3,sp:"rto_rebel"}]},
{id:"stackrank",cat:"theater",title:"Stack Ranking Season",desc:"You must PIP someone.",voice:"ceo_pip",choices:[{name:"PIP random eng",mD:20,sp:"lose_eng"},{name:"Redirect (15 PC)",pc:15,mD:5},{name:"PIP worst eng",mD:10,sp:"sac_worst"}]},
{id:"culture",cat:"theater",title:"Culture Values Refresh",desc:"Mandatory training on new corporate values.",voice:"ceo_culture",choices:[{name:"Endure it",eD:15,mD:10},{name:"Zone out (5 PC)",pc:5,eD:5,mD:5}]},
{id:"aiclone",cat:"leadership",title:"CEO's AI Clone Memo",desc:"AI version of CEO handles comms.",voice:"ceo_aiclone",choices:[{name:"Accept AI overlord",sp:"aiclone_on"},{name:"Sabotage (20 PC)",pc:20}]},
{id:"pivot",cat:"leadership",title:"The Pivot",desc:"CEO saw a competitor's demo.",voice:"ceo_pivot",choices:[{name:"Adapt",mD:10,pD:25},{name:"Argue (15 PC)",pc:15,mD:5,pD:10},{name:"Quietly ignore",mD:5,pD:5}]},
{id:"offsite",cat:"leadership",title:"Executive Offsite",desc:"All VPs go to a retreat.",voice:"ceo_offsite",choices:[{name:"Go & eat free food",mG:10,eG:10},{name:"Stay & work",mD:5,pG:10}]},
{id:"depgone",cat:"engineering",title:"Dependency Team Laid Off",desc:"Critical dependency gone.",voice:"event_depgone",choices:[{name:"Scramble",eD:5,mD:5,pD:15},{name:"Open source it (10 PC)",pc:10,eD:5,pD:5}]},
{id:"aibot",cat:"engineering",title:"AI Code Review Bot Rogue",desc:"Bot rejects all PRs as not AI-native.",voice:"event_aibot",choices:[{name:"Fight the bot",eD:5,mD:8,pD:5},{name:"Disable it (10 PC)",pc:10}]},
{id:"cloudbill",cat:"engineering",title:"Cloud Bill Shock",desc:"AWS bill 10x over budget.",voice:"event_cloudbill",choices:[{name:"Accept freeze",mD:5,pD:10},{name:"Negotiate (10 PC)",pc:10,pD:3}]},
{id:"tweet",cat:"satire",title:"Billionaire Founder 3am Tweet",desc:"Unhinged tweet crashes stock 4%.",voice:"ceo_tweet",choices:[{name:"Emergency meeting",eD:15,mD:3},{name:"Ignore it"}]},
{id:"severance",cat:"satire",title:"Severance Floor Activated",desc:"Nobody knows who still works here.",voice:"ceo_severance",choices:[{name:"Stay confused",mD:10,pD:3},{name:"Check badges (5 PC)",pc:5}]},
{id:"vpai",cat:"satire",title:"New VP of AI Transformation",desc:"Role created above you.",voice:"vp_aitransform",choices:[{name:"Accept overlord",mD:15,pD:5},{name:"Befriend (15 PC)",pc:15,mG:5,sp:"gain_ally"}]},
{id:"hackathon",cat:"satire",title:"Hackathon Week",desc:"Mandatory fun.",voice:"vp_hackathon",choices:[{name:"Participate",mG:10,pD:8},{name:"Use for real work",mD:5},{name:"Win it (+10 PC)",mD:5,sp:"hack_win"}]},
{id:"acquisition",cat:"satire",title:"Acquisition Integration",desc:"MEGACORP bought a startup.",voice:"ceo_acquisition",choices:[{name:"Integrate",mD:5,pD:20},{name:"Slow-walk (15 PC)",pc:15,pD:5}]},
{id:"townhall",cat:"satire",title:"Impromptu Town Hall",desc:"CEO reads blog comments for an hour.",voice:"ceo_townhall",choices:[{name:"Suffer",eD:12,mD:7},{name:"Leave early",eD:3,mD:2}]},
{id:"rebrand",cat:"satire",title:"Corporate Rebrand",desc:"New logo. New mission. Same product.",voice:"ceo_rebrand",choices:[{name:"Rebrand everything",eD:8,mD:8},{name:"Just update README",eD:2,mD:3}]}
];

var UPGRADES=[
{id:"coffee_machine",name:"Better Coffee Machine",cost:20,desc:"+20mg caffeine/coffee",icon:"\u2615"},
{id:"soundproof",name:"Soundproof Engineering",cost:30,desc:"Engineers 10% more effective",icon:"\uD83D\uDD07"},
{id:"dessert_budget",name:"Dessert Budget Increase",cost:25,desc:"Better morale recovery",icon:"\uD83C\uDF70"},
{id:"skiplvl",name:"Skip-Level Relationship",cost:40,desc:"Auto-block 1 event/week",icon:"\uD83E\uDD1D"},
{id:"microwave_shield",name:"Microwave Shield",cost:50,desc:"Immune to one reorg/game",icon:"\uD83D\uDEE1"},
{id:"emergency_fund",name:"Emergency Fund",cost:35,desc:"Save one fired eng/game",icon:"\uD83D\uDCB0"},
{id:"exec_bathroom",name:"Executive Bathroom Key",cost:60,desc:"+5 team morale/day",icon:"\uD83D\uDEBD"},
{id:"ai_works",name:"AI That Works",cost:80,desc:"Free breakthrough/week",icon:"\u2728"},
{id:"board_ally",name:"Board Member Ally",cost:100,desc:"Event damage -25%",icon:"\u265F"},
{id:"nuke",name:"Resignation Threat",cost:120,desc:"Full restore, once/game",icon:"\u2622"}
];

var MYTHS=[
{id:"staffed",icon:"\uD83C\uDFE2",title:"The Fully Staffed Team"},
{id:"replyall",icon:"\uD83D\uDCE7",title:"The Reply-All Apocalypse"},
{id:"freelunch",icon:"\uD83C\uDF55",title:"Free Lunch That Was Free"},
{id:"sensibleokr",icon:"\uD83C\uDFAF",title:"The OKR That Made Sense"},
{id:"competent",icon:"\uD83E\uDD1D",title:"The Competent Manager"},
{id:"cleanship",icon:"\uD83D\uDE80",title:"The Clean Ship"},
{id:"beyond800",icon:"\u2615",title:"Beyond 800mg"}
];

var ROOMS=[
{name:"Engineering",icon:"\u2699",color:"#4CAF50",desc:"Assign tasks"},
{name:"Coffee Shop",icon:"\u2615",color:"#6D4C41",desc:"Caffeine"},
{name:"HR",icon:"\uD83D\uDCCB",color:"#2196F3",desc:"Recruit"},
{name:"Exec Suite",icon:"\uD83D\uDC51",color:"#FFD700",desc:"Upgrades/PC"},
{name:"Kitchen",icon:"\uD83C\uDF55",color:"#FF9800",desc:"Morale boost"},
{name:"Server Room",icon:"\uD83D\uDDA5",color:"#9C27B0",desc:"Monitor"}
];


// ═══ GAME STATE ═══
var day,maxDays=30,progress,polCap,rankIdx,frame=0,lastTick=0;
var caffeine,peakCaffeine,allTimePeakCaffeine=0;
var prodRisk,prodIncidents,aiClonePenalty,energy;
var engineers=[],currentRoom=0;
var notification=null,notifTimer=0;
var shakeTimer=0,flashTimer=0,flashColor="#fff";
var currentEvent=null,eventChoice=0;
var phaseTimer=0;
var eodResults=[],eodScroll=0;
var score=0,gamesPlayed=0,bestScore=0;
var discoveries={},discoveryCount=0;
var mythCooldown=0,techDebtBonus=0;
var replyAllPeace=0,competentDays=0;
var upgrades={};
var upcomingEvents=[];
var nukeUsed=false,microwaveUsed=false,emergencyUsed=false;
var skiplvlReady=false,aiBreakReady=false;
var hrCooldown=0;
var shopCursor=0,engCursor=0,taskCursor=0;
var assignMode=false;
var keys={};

function loadStats(){try{var r=localStorage.getItem("lb_stats");if(r){var s=JSON.parse(r);gamesPlayed=s.gp||0;bestScore=s.bs||0;allTimePeakCaffeine=s.apc||0;discoveries=s.disc||{};discoveryCount=Object.keys(discoveries).length;upgrades=s.upg||{}}}catch(e){}}
function saveStats(){try{localStorage.setItem("lb_stats",JSON.stringify({gp:gamesPlayed,bs:bestScore,apc:allTimePeakCaffeine,disc:discoveries,upg:upgrades}))}catch(e){}}

function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v))}
function getRank(){return RANKS[rankIdx]}
function showNotif(t,d){notification=t;notifTimer=d||3}
function aliveEngs(){return engineers.filter(function(e){return e.alive})}
function hasUpg(id){return !!upgrades[id]}
function checkRankUp(){while(rankIdx<RANKS.length-1&&progress>=RANKS[rankIdx+1].thr){rankIdx++;playRankUp();playVoice("rankup");showNotif("RANK UP: "+RANKS[rankIdx].name+"!",4);shakeTimer=0.5;flashTimer=0.3;flashColor="#FFD700"}}

function genUpcoming(){
  upcomingEvents=[];
  var c=day<=5?0:day<=10?1:day<=20?1+(Math.random()<0.3?1:0):2;
  for(var i=0;i<c;i++)upcomingEvents.push(EVENTS[0|Math.random()*EVENTS.length]);
}

// ═══ CAFFEINE ═══
var CTIERS=[{mx:100,nm:"Drowsy",cl:"#888",m:0.85},{mx:400,nm:"Optimal",cl:"#4CAF50",m:1},{mx:600,nm:"Buzzing",cl:"#FFEB3B",m:1.15},{mx:800,nm:"LB Mode",cl:"#FF9800",m:1.3},{mx:99999,nm:"Transcendence",cl:"#FFD700",m:1}];
function getCaffTier(){for(var i=0;i<CTIERS.length;i++)if(caffeine<CTIERS[i].mx)return CTIERS[i];return CTIERS[CTIERS.length-1]}
function addCaff(mg){
  var old=caffeine;caffeine+=mg;
  if(caffeine>peakCaffeine)peakCaffeine=caffeine;
  if(caffeine>allTimePeakCaffeine){allTimePeakCaffeine=caffeine;saveStats()}
  if(old<800&&caffeine>=800){
    var burst=progress*0.5;progress=clamp(progress+burst,0,100);energy=clamp(energy-40,0,100);caffeine=0;
    showNotif("\u2615\u2728 TRANSCENDENCE! +"+Math.round(burst)+"%! Then crash.",5);
    shakeTimer=1;flashTimer=0.5;flashColor="#FFD700";playRankUp();
    discoveries.beyond800=true;discoveryCount=Object.keys(discoveries).length;saveStats();checkRankUp();
  }
}

// ═══ INIT ═══
function initGame(){
  day=1;progress=0;polCap=10;rankIdx=0;caffeine=0;peakCaffeine=0;
  prodRisk=0;prodIncidents=0;aiClonePenalty=0;energy=100;
  currentRoom=0;notification=null;notifTimer=0;shakeTimer=0;flashTimer=0;
  currentEvent=null;eventChoice=0;phaseTimer=8;
  eodResults=[];eodScroll=0;score=0;
  nukeUsed=false;microwaveUsed=false;emergencyUsed=false;
  skiplvlReady=hasUpg("skiplvl");aiBreakReady=hasUpg("ai_works");
  techDebtBonus=0;replyAllPeace=0;competentDays=0;
  hrCooldown=0;shopCursor=0;engCursor=0;taskCursor=0;assignMode=false;
  engineers=[];for(var i=0;i<3;i++)engineers.push(genEng());
  upcomingEvents=[];bgmTimer=0;mythCooldown=3;
  genUpcoming();
  state=ST_STANDUP;playVoice("intro");
}


// ═══ RESOLVE DAY ═══
function resolveDay(){
  eodResults=[];
  var tb=getRank().bonus;
  if(hasUpg("soundproof"))tb*=1.1;
  tb*=getCaffTier().m;
  if(techDebtBonus>0){tb*=1.05;techDebtBonus--}

  aliveEngs().forEach(function(eng){
    if(eng.task<0)return;
    var task=TASKS[eng.task];
    var roll=Math.random();
    var sf=eng.skill*0.12+eng.morale/250+eng.energy/300+(caffeine>200?0.05:0);
    var r={eng:eng,task:task,roll:roll};
    if(roll<0.05){
      r.type="crit_fail";r.text=eng.name+" had a disaster!";
      if(task.id==="feature"){progress=clamp(progress-3,0,100);r.efx="-3% progress"}
      else if(task.id==="bugs"){prodRisk=clamp(prodRisk+15,0,100);r.efx="+15% incident risk"}
      else if(task.id==="techdebt"){r.efx="Wasted day";eng.morale=clamp(eng.morale-5,0,100)}
      else if(task.id==="ai"){polCap=Math.max(0,polCap-3);r.efx="-3 PC"}
      else{r.efx="Office drama";eng.morale=clamp(eng.morale-8,0,100)}
      playSlotFail();
    } else if(roll<sf*0.5){
      r.type="crit_success";r.text=eng.name+" BREAKTHROUGH!";
      if(task.id==="feature"){var g=8*tb;progress=clamp(progress+g,0,100);r.efx="+"+Math.round(g)+"% progress!"}
      else if(task.id==="bugs"){prodRisk=clamp(prodRisk-20,0,100);r.efx="-20% risk!"}
      else if(task.id==="techdebt"){techDebtBonus+=3;r.efx="+3 days speed boost!"}
      else if(task.id==="ai"){polCap+=8;r.efx="+8 PC!"}
      else{polCap+=5;eng.morale=clamp(eng.morale+15,0,100);r.efx="+5 PC, +15 morale"}
      playCritical();playVoice("breakthrough");flashTimer=0.3;flashColor="#FFD700";shakeTimer=0.3;
    } else if(roll<sf+0.2){
      r.type="success";r.text=eng.name+" succeeded.";
      if(task.id==="feature"){var g=4*tb;progress=clamp(progress+g,0,100);r.efx="+"+Math.round(g)+"% progress"}
      else if(task.id==="bugs"){prodRisk=clamp(prodRisk-10,0,100);r.efx="-10% risk"}
      else if(task.id==="techdebt"){techDebtBonus++;r.efx="+1 day speed"}
      else if(task.id==="ai"){polCap+=4;r.efx="+4 PC"}
      else{polCap+=2;eng.morale=clamp(eng.morale+5,0,100);r.efx="+2 PC, +5 morale"}
      playSlotWin();
    } else {
      r.type="fail";r.text=eng.name+" struggled.";
      if(task.id==="feature")r.efx="No progress";
      else if(task.id==="bugs"){prodRisk=clamp(prodRisk+5,0,100);r.efx="+5% risk"}
      else r.efx="No effect";
      playSlotFail();
    }
    eodResults.push(r);
    eng.energy=clamp(eng.energy-10,0,100);eng.morale=clamp(eng.morale-2,0,100);
  });

  // AI breakthrough upgrade
  if(hasUpg("ai_works")&&day%7===0){
    progress=clamp(progress+10,0,100);
    eodResults.push({eng:{name:"AI System"},task:{name:"AI Boost",icon:"\u2728",color:"#FFD700"},type:"crit_success",text:"AI breakthrough! +10%",efx:"+10% (upgrade)"});
  }
  // Exec bathroom
  if(hasUpg("exec_bathroom"))aliveEngs().forEach(function(e){e.morale=clamp(e.morale+5,0,100)});
  // Skip-level
  if(skiplvlReady&&upcomingEvents.length>0&&Math.random()<0.3){
    var bl=upcomingEvents.shift();
    eodResults.push({eng:{name:"Ally"},task:{name:"Auto-Block",icon:"\uD83E\uDD1D",color:"#2196F3"},type:"success",text:"Ally blocked: "+bl.title,efx:"Event prevented!"});
    skiplvlReady=false;
  }
  // Production incident
  if(prodRisk>=100||(prodRisk>0&&Math.random()*100<prodRisk)){
    prodIncidents++;var loss=5+(0|Math.random()*5);progress=clamp(progress-loss,0,100);
    aliveEngs().forEach(function(e){e.morale=clamp(e.morale-5,0,100)});
    eodResults.push({eng:{name:"Production"},task:{name:"INCIDENT",icon:"\uD83D\uDEA8",color:"#F44336"},type:"crit_fail",text:"PRODUCTION INCIDENT!",efx:"- "+loss+"%, -5 morale"});
    playBad();playVoice("prod_incident");shakeTimer=0.5;flashTimer=0.3;flashColor="#F44336";prodRisk=clamp(prodRisk-40,0,100);
  }
  if(hasUpg("board_ally")&&progress<50)progress=clamp(progress+2,0,100);
  checkRankUp();
  engineers.forEach(function(e){e.task=-1});
  state=ST_EOD;eodScroll=0;
}

function startNextDay(){
  day++;if(checkEnd())return;
  energy=clamp(100-aiClonePenalty,0,100);
  caffeine=Math.max(0,caffeine-100);
  hrCooldown=Math.max(0,hrCooldown-1);
  if(competentDays>0)competentDays--;
  if(replyAllPeace>0)replyAllPeace--;
  if(hasUpg("skiplvl")&&day%7===1)skiplvlReady=true;
  aliveEngs().forEach(function(e){e.energy=clamp(e.energy+20,0,100);e.morale=clamp(e.morale+3,0,100)});
  if(hasUpg("exec_bathroom"))aliveEngs().forEach(function(e){e.morale=clamp(e.morale+5,0,100)});
  mythCooldown--;if(mythCooldown<=0){tryMyth();mythCooldown=3}
  genUpcoming();state=ST_STANDUP;phaseTimer=8;
}

function checkEnd(){
  if(progress>=100){state=ST_RESULT;score=calcScore();if(score>bestScore)bestScore=score;gamesPlayed++;saveStats();playWin();playVoice("win");return true}
  if(aliveEngs().length===0){state=ST_RESULT;score=0;gamesPlayed++;saveStats();playLose();playVoice("lose");return true}
  if(day>maxDays){state=ST_RESULT;score=Math.max(0,Math.round(progress*5));gamesPlayed++;saveStats();playLose();return true}
  return false;
}
function calcScore(){var s=(maxDays-day+1)*100+aliveEngs().length*150-prodIncidents*100+Math.round(peakCaffeine/5)+polCap*5+discoveryCount*200;if(prodIncidents===0)s+=500;if(rankIdx>=RANKS.length-1)s+=300;return Math.max(0,Math.round(s))}

// ═══ EVENT HANDLING ═══
function applyChoice(ev,ci){
  var ch=ev.choices[ci];
  if(ch.pc&&polCap<ch.pc){showNotif("Need "+ch.pc+" PC!",2);return false}
  if(ch.pc)polCap-=ch.pc;
  if(ch.eD)energy=clamp(energy-ch.eD,0,100);
  if(ch.eG)energy=clamp(energy+ch.eG,0,100);
  var ae=aliveEngs();
  if(ch.mD){var d=ch.mD;if(hasUpg("board_ally"))d=Math.ceil(d*0.75);ae.forEach(function(e){e.morale=clamp(e.morale-Math.ceil(d/ae.length),0,100)})}
  if(ch.mG)ae.forEach(function(e){e.morale=clamp(e.morale+Math.ceil(ch.mG/ae.length),0,100)});
  if(ch.pD)progress=clamp(progress-ch.pD,0,100);
  if(ch.pG)progress=clamp(progress+ch.pG,0,100);
  if(ch.sp==="lose_eng"){
    if(hasUpg("microwave_shield")&&!microwaveUsed){microwaveUsed=true;showNotif("\uD83D\uDEE1 Microwave Shield activated!",3)}
    else if(hasUpg("emergency_fund")&&!emergencyUsed&&ae.length<=1){emergencyUsed=true;showNotif("\uD83D\uDCB0 Emergency Fund saved your last eng!",3)}
    else{var t=ae[0|Math.random()*ae.length];if(t){t.alive=false;showNotif(t.name+" was lost!",3);playVoice("engineer_lost")}}
  }
  if(ch.sp==="fight_reorg"){
    if(hasUpg("microwave_shield")&&!microwaveUsed||Math.random()<0.6){showNotif("Reorg blocked!",3);playGood();if(hasUpg("microwave_shield")&&!microwaveUsed)microwaveUsed=true}
    else{var t=ae[0|Math.random()*ae.length];if(t){t.alive=false;showNotif("Failed! "+t.name+" lost!",3);playVoice("engineer_lost")}}
  }
  if(ch.sp==="sac_worst"){
    var worst=ae.sort(function(a,b){return a.skill-b.skill})[0];
    if(worst){worst.alive=false;showNotif(worst.name+" sacrificed (skill "+worst.skill+").",3);playVoice("engineer_lost")}
  }
  if(ch.sp==="aiclone_on")aiClonePenalty+=5;
  if(ch.sp==="gain_ally")polCap+=10;
  if(ch.sp==="hack_win")polCap+=10;
  if(ch.sp==="rto_rebel"&&Math.random()<0.2){energy=clamp(energy-20,0,100);showNotif("Caught! -20 energy",3)}
  checkRankUp();return true;
}

// ═══ MYTHS ═══
function tryMyth(){
  if(replyAllPeace>0)return;
  if(Math.random()>0.3)return;
  var unseen=MYTHS.filter(function(m){return!discoveries[m.id]});
  if(!unseen.length)return;
  var myth=unseen[0|Math.random()*unseen.length];
  discoveries[myth.id]=true;discoveryCount=Object.keys(discoveries).length;saveStats();
  switch(myth.id){
    case"staffed":aliveEngs().forEach(function(e){e.morale=clamp(e.morale+15,0,100)});break;
    case"replyall":replyAllPeace=2;break;
    case"freelunch":energy=clamp(energy+30,0,100);aliveEngs().forEach(function(e){e.morale=clamp(e.morale+20,0,100)});break;
    case"sensibleokr":progress=clamp(progress+10,0,100);break;
    case"competent":competentDays=3;break;
    case"cleanship":if(progress>=90&&prodIncidents===0)progress=100;break;
  }
  showNotif("\uD83D\uDCDC DISCOVERY: "+myth.icon+" "+myth.title+"! ("+discoveryCount+"/7)",5);playGood();checkRankUp();
}

// ═══ ROOM ACTIONS ═══
function doRoomAction(){
  if(energy<3){showNotif("No energy!",2);return}
  var room=ROOMS[currentRoom];
  if(currentRoom===0){
    // Engineering: toggle assign mode
    assignMode=!assignMode;
    if(assignMode){engCursor=0;taskCursor=0;showNotif("Assign mode: select engineer",2)}
    else showNotif("Assign mode off",2);
    return;
  }
  if(currentRoom===1){
    // Coffee
    var mg=150+(hasUpg("coffee_machine")?20:0);
    addCaff(mg);energy=clamp(energy+10,0,100);
    showNotif("\u2615 +"+mg+"mg caffeine, +10 energy",2);playGood();return;
  }
  if(currentRoom===2){
    // HR: recruit
    if(hrCooldown>0){showNotif("HR cooldown: "+hrCooldown+" days",2);return}
    if(aliveEngs().length>=getRank().mx){showNotif("Team full! ("+getRank().mx+" max)",2);return}
    var ne=genEng();engineers.push(ne);hrCooldown=2;
    showNotif("\uD83D\uDCDD Hired "+ne.name+" ("+ne.skill+"\u2605 "+ne.specialty+")!",3);playVoice("engineer_hired");playGood();return;
  }
  if(currentRoom===3){
    // Exec Suite: open shop or nuke
    if(hasUpg("nuke")&&!nukeUsed){
      nukeUsed=true;energy=100;aliveEngs().forEach(function(e){e.morale=clamp(e.morale+20,0,100)});
      showNotif("\u2622 RESIGNATION THREAT! Full restore!",4);playAbility();shakeTimer=0.5;flashTimer=0.5;flashColor="#FFD700";return;
    }
    state=ST_SHOP;shopCursor=0;return;
  }
  if(currentRoom===4){
    // Kitchen: morale boost
    var mb=8+(hasUpg("dessert_budget")?5:0);
    aliveEngs().forEach(function(e){e.morale=clamp(e.morale+mb,0,100)});
    energy=clamp(energy+15,0,100);
    showNotif("\uD83C\uDF55 Snacks! +"+mb+" team morale, +15 energy",2);playGood();return;
  }
  if(currentRoom===5){
    // Server Room: check prod risk, small progress
    energy=clamp(energy-3,0,100);
    if(Math.random()<0.3){prodRisk=clamp(prodRisk-5,0,100);showNotif("\uD83D\uDDA5 Quick hotfix! -5% incident risk",2);playGood()}
    else showNotif("\uD83D\uDDA5 Monitoring... all quiet.",1);
    return;
  }
}


// ═══ DRAWING: SPRITE ═══
function drawLordBluetooth(x,y,s){
  s=s||2;ctx.save();
  // Cape
  ctx.fillStyle="#7B1FA2";ctx.fillRect(x-6*s,y-3*s,12*s,14*s);
  ctx.fillStyle="#4A148C";ctx.fillRect(x-8*s,y-1*s,3*s,10*s);ctx.fillRect(x+5*s,y-1*s,3*s,10*s);
  ctx.fillStyle="#6A1B9A";ctx.fillRect(x-3*s,y+11*s,6*s,3*s);
  // Body
  ctx.fillStyle="#1a1a1a";ctx.fillRect(x-5*s,y-2*s,10*s,12*s);
  ctx.fillStyle="#222";ctx.fillRect(x-2*s,y-1*s,4*s,4*s);
  // Bluetooth symbol
  ctx.fillStyle="#42A5F5";ctx.fillRect(x-1*s,y+2*s,2*s,4*s);ctx.fillRect(x+1*s,y+4*s,1*s,1*s);ctx.fillRect(x-2*s,y+2*s,1*s,1*s);ctx.fillRect(x+1*s,y+2*s,1*s,1*s);ctx.fillRect(x-2*s,y+4*s,1*s,1*s);
  // Head
  ctx.fillStyle="#EDBA8A";ctx.fillRect(x-4*s,y-11*s,8*s,7*s);ctx.fillRect(x-5*s,y-10*s,10*s,5*s);
  // Hair
  ctx.fillStyle="#1a1a1a";ctx.fillRect(x-5*s,y-11*s,2*s,3*s);ctx.fillRect(x+3*s,y-11*s,2*s,3*s);
  ctx.fillRect(x-4*s,y-13*s,8*s,3*s);ctx.fillRect(x-3*s,y-15*s,6*s,2*s);ctx.fillRect(x-2*s,y-16*s,4*s,2*s);ctx.fillRect(x-1*s,y-17*s,2*s,1*s);
  ctx.fillRect(x+2*s,y-14*s,3*s,2*s);
  // Crown
  ctx.fillStyle="#FFD700";ctx.fillRect(x-5*s,y-18*s,10*s,2*s);ctx.fillRect(x-5*s,y-20*s,2*s,2*s);ctx.fillRect(x-2*s,y-21*s,2*s,3*s);ctx.fillRect(x+1*s,y-20*s,2*s,2*s);
  ctx.fillStyle="#2196F3";ctx.fillRect(x-4*s,y-18*s,1*s,1*s);ctx.fillRect(x+3*s,y-18*s,1*s,1*s);
  ctx.fillStyle="#F44336";ctx.fillRect(x-0.5*s,y-19*s,1*s,1*s);
  // Eyes
  ctx.fillStyle="#1a1a1a";ctx.fillRect(x-3*s,y-9*s,2*s,1.5*s);ctx.fillRect(x+1*s,y-9*s,2*s,1.5*s);
  ctx.fillStyle="#3a3a3a";ctx.fillRect(x-3*s,y-9*s,1*s,1*s);ctx.fillRect(x+1*s,y-9*s,1*s,1*s);
  // Eyebrows
  ctx.fillStyle="#222";ctx.fillRect(x-3*s,y-10.5*s,2.5*s,1*s);ctx.fillRect(x+0.5*s,y-10.5*s,2.5*s,1*s);
  // Smile
  ctx.fillStyle="#D4836A";ctx.fillRect(x-2*s,y-6*s,4*s,1*s);ctx.fillRect(x-3*s,y-6.5*s,1*s,1*s);ctx.fillRect(x+2*s,y-6.5*s,1*s,1*s);
  ctx.fillStyle="#fff";ctx.fillRect(x-1*s,y-6*s,2*s,0.8*s);
  // Ears
  ctx.fillStyle="#DDAA7A";ctx.fillRect(x-6*s,y-9*s,1.5*s,2*s);ctx.fillRect(x+4.5*s,y-9*s,1.5*s,2*s);
  // Feet
  ctx.fillStyle="#111";ctx.fillRect(x-4*s,y+12*s,3*s,2*s);ctx.fillRect(x+1*s,y+12*s,3*s,2*s);
  ctx.restore();
}

function drawEng(x,y,eng,selected){
  var s=1.5;
  // Body color by specialty
  ctx.fillStyle=SP_C[eng.specialty]||"#888";
  ctx.fillRect(x-2*s,y-6*s,4*s,8*s);
  // Head
  ctx.fillStyle="#EDBA8A";ctx.fillRect(x-2*s,y-10*s,4*s,4*s);
  // Hair
  ctx.fillStyle="#1a1a1a";ctx.fillRect(x-2*s,y-12*s,4*s,2.5*s);
  // Eyes
  ctx.fillStyle="#222";ctx.fillRect(x-1*s,y-8.5*s,1*s,1*s);ctx.fillRect(x+0.5*s,y-8.5*s,1*s,1*s);
  // Skill stars
  ctx.fillStyle="#FFD700";ctx.font="8px system-ui";ctx.textAlign="center";
  var stars="";for(var i=0;i<eng.skill;i++)stars+="\u2605";
  ctx.fillText(stars,x,y-13*s);
  // Task indicator
  if(eng.task>=0){
    ctx.fillStyle=TASKS[eng.task].color;ctx.fillRect(x-3*s,y+3*s,6*s,2*s);
    ctx.fillStyle="#fff";ctx.font="6px system-ui";ctx.fillText(TASKS[eng.task].icon,x,y+5*s);
  }
  // Morale bar
  ctx.fillStyle="#333";ctx.fillRect(x-3*s,y+5.5*s,6*s,1.5*s);
  ctx.fillStyle=eng.morale>50?"#4CAF50":eng.morale>25?"#FF9800":"#F44336";
  ctx.fillRect(x-3*s,y+5.5*s,6*s*(eng.morale/100),1.5*s);
  // Selection highlight
  if(selected){ctx.strokeStyle="#FFD700";ctx.lineWidth=1;ctx.strokeRect(x-4*s,y-14*s,8*s,22*s)}
}

// ═══ DRAW HUD ═══
function drawHUD(){
  ctx.fillStyle="#111";ctx.fillRect(0,0,W,50);
  // Day
  ctx.fillStyle="#888";ctx.font="10px system-ui";ctx.textAlign="left";ctx.fillText("DAY",8,12);
  ctx.fillStyle="#fff";ctx.font="bold 14px system-ui";ctx.fillText(day+"/"+maxDays,8,28);
  // Progress bar
  ctx.fillStyle="#888";ctx.font="10px system-ui";ctx.fillText("PRODUCT",80,12);
  ctx.fillStyle="#333";ctx.fillRect(80,17,100,10);
  ctx.fillStyle="#FFD700";ctx.fillRect(80,17,100*(progress/100),10);
  ctx.fillStyle="#fff";ctx.font="9px system-ui";ctx.fillText(Math.round(progress)+"%",85,26);
  // PC
  ctx.fillStyle="#888";ctx.font="10px system-ui";ctx.fillText("PC",195,12);
  ctx.fillStyle="#2196F3";ctx.font="bold 12px system-ui";ctx.fillText(polCap,195,28);
  // Caffeine
  ctx.fillStyle="#888";ctx.font="10px system-ui";ctx.fillText("CAFF",240,12);
  ctx.fillStyle="#333";ctx.fillRect(240,17,70,10);
  var ct=getCaffTier();ctx.fillStyle=ct.cl;ctx.fillRect(240,17,70*Math.min(caffeine/800,1),10);
  ctx.fillStyle="#fff";ctx.font="9px system-ui";ctx.fillText(Math.round(caffeine)+"mg",245,26);
  // Incident risk
  ctx.fillStyle="#888";ctx.font="10px system-ui";ctx.fillText("RISK",325,12);
  ctx.fillStyle="#333";ctx.fillRect(325,17,60,10);
  ctx.fillStyle=prodRisk>60?"#F44336":prodRisk>30?"#FF9800":"#4CAF50";
  ctx.fillRect(325,17,60*(prodRisk/100),10);
  ctx.fillStyle="#fff";ctx.font="9px system-ui";ctx.fillText(Math.round(prodRisk)+"%",330,26);
  // Team
  ctx.fillStyle="#888";ctx.font="10px system-ui";ctx.textAlign="right";ctx.fillText("TEAM",W-10,12);
  ctx.fillStyle="#fff";ctx.font="bold 12px system-ui";ctx.fillText(aliveEngs().length,W-10,28);
  // Rank
  ctx.fillStyle="#FFD700";ctx.font="bold 10px system-ui";ctx.textAlign="left";ctx.fillText(getRank().name,8,45);
  // Energy
  ctx.fillStyle="#888";ctx.font="10px system-ui";ctx.textAlign="right";ctx.fillText("NRG "+Math.round(energy),W-60,45);
  // Day phase
  var phaseLabel=state===ST_STANDUP?"STANDUP":state===ST_WORK?"WORK":state===ST_EOD?"EOD":"";
  if(phaseLabel){ctx.fillStyle="#FF9800";ctx.font="bold 10px system-ui";ctx.textAlign="center";ctx.fillText(phaseLabel+" ("+Math.ceil(phaseTimer)+"s)",W/2,45)}
}

// ═══ DRAW ROOMS ═══
function drawRoomBG(){
  var room=ROOMS[currentRoom];
  ctx.fillStyle="#1a1a2e";ctx.fillRect(0,50,W,H-50);
  // Room tabs
  var tw=W/ROOMS.length;
  for(var i=0;i<ROOMS.length;i++){
    ctx.fillStyle=i===currentRoom?ROOMS[i].color:"#222";
    ctx.fillRect(i*tw,50,tw,22);
    ctx.fillStyle=i===currentRoom?"#000":"#666";
    ctx.font=(i===currentRoom?"bold ":"")+"10px system-ui";ctx.textAlign="center";
    ctx.fillText(ROOMS[i].icon+" "+ROOMS[i].name,i*tw+tw/2,65);
  }
  ctx.fillStyle="#444";ctx.font="9px system-ui";ctx.textAlign="center";
  ctx.fillText("\u2190\u2192 Room | \u2191 Action | \u2193 End Day | Enter Assign(Eng)",W/2,84);
}

function drawEngRoom(){
  // Engineer cards
  var ae=aliveEngs();
  var startY=95;
  ctx.fillStyle="#fff";ctx.font="bold 11px system-ui";ctx.textAlign="left";
  ctx.fillText("YOUR TEAM ("+ae.length+"/"+getRank().mx+")",10,startY);
  var cardH=50;
  for(var i=0;i<ae.length;i++){
    var e=ae[i];var cy=startY+15+i*cardH;
    // Card bg
    ctx.fillStyle=assignMode&&engCursor===i?"#2a2a3e":"#1a1a2e";
    ctx.fillRect(5,cy,W-10,cardH-4);
    ctx.strokeStyle=assignMode&&engCursor===i?"#FFD700":"#333";ctx.lineWidth=1;ctx.strokeRect(5,cy,W-10,cardH-4);
    // Name & quirk
    ctx.fillStyle=SP_C[e.specialty]||"#fff";ctx.font="bold 11px system-ui";ctx.textAlign="left";
    ctx.fillText(e.name+" ("+e.specialty+", "+e.skill+"\u2605)",12,cy+14);
    ctx.fillStyle="#888";ctx.font="9px system-ui";
    ctx.fillText(e.quirk,12,cy+26);
    // Energy/morale bars
    ctx.fillStyle="#333";ctx.fillRect(12,cy+30,60,6);ctx.fillStyle="#4CAF50";ctx.fillRect(12,cy+30,60*(e.energy/100),6);
    ctx.fillStyle="#333";ctx.fillRect(80,cy+30,60,6);ctx.fillStyle="#2196F3";ctx.fillRect(80,cy+30,60*(e.morale/100),6);
    ctx.fillStyle="#888";ctx.font="7px system-ui";ctx.fillText("nrg:"+Math.round(e.energy),12,cy+44);ctx.fillText("mor:"+Math.round(e.morale),80,cy+44);
    // Task
    if(e.task>=0){
      ctx.fillStyle=TASKS[e.task].color;ctx.fillRect(200,cy+4,W-215,20);
      ctx.fillStyle="#fff";ctx.font="bold 11px system-ui";ctx.fillText(TASKS[e.task].icon+" "+TASKS[e.task].name,210,cy+18);
    } else {
      ctx.fillStyle="#333";ctx.fillRect(200,cy+4,W-215,20);
      ctx.fillStyle="#666";ctx.font="10px system-ui";ctx.fillText("Unassigned - press Enter to assign",210,cy+18);
    }
  }
  if(ae.length===0){ctx.fillStyle="#F44336";ctx.font="bold 14px system-ui";ctx.textAlign="center";ctx.fillText("No engineers left!",W/2,startY+60)}
}

function drawNotification(){
  if(!notification||notifTimer<=0)return;
  var a=Math.min(1,notifTimer);
  ctx.fillStyle="rgba(0,0,0,"+(0.8*a)+")";ctx.fillRect(20,86,W-40,24);
  ctx.strokeStyle="rgba(255,215,0,"+a+")";ctx.lineWidth=1;ctx.strokeRect(20,86,W-40,24);
  ctx.fillStyle="rgba(255,255,255,"+a+")";ctx.font="11px system-ui";ctx.textAlign="center";ctx.fillText(notification,W/2,102);
}


function wrapText(text,maxW){
  ctx.font="14px system-ui";
  var words=text.split(" "),lines=[],line="";
  for(var i=0;i<words.length;i++){
    var test=line+words[i]+" ";
    if(ctx.measureText(test).width>maxW){lines.push(line.trim());line=words[i]+" ";}
    else line=test;
  }
  if(line.trim())lines.push(line.trim());
  return lines;
}

function drawEventPopup(){
  if(!currentEvent)return;
  var ev=currentEvent;
  ctx.fillStyle="rgba(0,0,0,0.7)";ctx.fillRect(0,0,W,H);
  var x=45,y=105,w=510,h=385;
  ctx.fillStyle="#1a1a2e";ctx.fillRect(x,y,w,h);
  var cc=ev.cat==="meeting"?"#FF9800":ev.cat==="theater"?"#9C27B0":ev.cat==="leadership"?"#F44336":ev.cat==="engineering"?"#2196F3":"#FF5722";
  ctx.fillStyle=cc;ctx.fillRect(x,y,w,6);
  ctx.fillStyle="#FFD700";ctx.fillRect(x+16,y+16,38,28);
  ctx.fillStyle="#1a1a2e";ctx.fillRect(x+20,y+20,30,20);
  ctx.beginPath();ctx.moveTo(x+16,y+16);ctx.lineTo(x+35,y+31);ctx.lineTo(x+54,y+16);ctx.strokeStyle="#FFD700";ctx.stroke();
  ctx.fillStyle=cc;ctx.font="bold 20px system-ui";ctx.textAlign="left";ctx.fillText(ev.title,x+72,y+36);
  ctx.fillStyle="#888";ctx.font="10px system-ui";ctx.fillText(ev.cat.toUpperCase(),x+72,y+52);
  ctx.fillStyle="#ccc";ctx.font="13px system-ui";var lines=wrapText(ev.desc,w-40);for(var i=0;i<lines.length;i++)ctx.fillText(lines[i],x+20,y+82+i*18);
  var ey=y+150;
  if(ev.choices&&ev.choices[0]){
    ctx.fillStyle="#bbb";ctx.font="12px system-ui";ctx.fillText("Pick an outcome:",x+20,ey-18);
    for(var j=0;j<ev.choices.length&&j<3;j++){
      var ch=ev.choices[j],bx=x+20+j*160,by=y+260;
      ctx.fillStyle=eventChoice===j?cc:"#333";ctx.fillRect(bx,by,150,42);
      ctx.fillStyle="#fff";ctx.font="bold 12px system-ui";ctx.textAlign="center";ctx.fillText(ch.name,bx+75,by+25);
      if(eventChoice===j){ctx.strokeStyle="#fff";ctx.lineWidth=2;ctx.strokeRect(bx,by,150,42)}
    }
  }
  ctx.fillStyle="#666";ctx.font="11px system-ui";ctx.textAlign="center";
  ctx.fillText("← → choose | Enter/Space confirm",W/2,y+h-20);
}

function drawTitle(){
  ctx.fillStyle="#0d0d0d";ctx.fillRect(0,0,W,H);
  ctx.strokeStyle="rgba(123,31,162,0.12)";ctx.lineWidth=1;
  for(var i=0;i<20;i++){var yy=(i*40+frame*0.5)%H;ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(W,yy);ctx.stroke()}
  for(var j=0;j<15;j++){var xx=(j*50+frame*0.3)%W;ctx.beginPath();ctx.moveTo(xx,0);ctx.lineTo(xx,H);ctx.stroke()}
  ctx.fillStyle="#FFD700";ctx.font="bold 38px system-ui";ctx.textAlign="center";ctx.fillText("LORD BLUETOOTH",W/2,120);
  ctx.fillStyle="#7B1FA2";ctx.font="bold 16px system-ui";ctx.fillText("& MEGACORP ORG MANAGEMENT",W/2,145);
  drawLordBluetooth(W/2,220+Math.sin(frame*0.05)*5,4);
  ctx.fillStyle="#888";ctx.font="14px system-ui";ctx.fillText("Manage a team. Fight reorgs. Ship the product.",W/2,315);
  ctx.fillText("30 days. 3 phases. No mercy.",W/2,335);
  ctx.fillStyle="#555";ctx.font="12px system-ui";ctx.fillText("←→ rooms  |  ↑ action  |  ↓ end day  |  Enter assign",W/2,455);
  ctx.fillText("M mute  |  S espresso in Coffee Shop",W/2,475);
  if(bestScore>0){ctx.fillStyle="#FFD700";ctx.fillText("Best Score: "+bestScore+"  |  Games: "+gamesPlayed,W/2,390)}
  if(allTimePeakCaffeine>0){ctx.fillStyle="#FF9800";ctx.fillText("Peak Caffeine: "+allTimePeakCaffeine+"mg",W/2,410)}
  var myths=0;for(var k in discoveries)myths++;
  if(myths>0){ctx.fillStyle="#888";ctx.fillText("Myths: "+myths+"/7",W/2,430)}
  if(Math.sin(frame*0.08)>0){ctx.fillStyle="#FFD700";ctx.font="bold 18px system-ui";ctx.fillText("Press any key to start",W/2,540)}
}

function drawResult(){
  ctx.fillStyle="#0d0d0d";ctx.fillRect(0,0,W,H);
  var won=progress>=100;
  ctx.textAlign="center";
  ctx.fillStyle=won?"#FFD700":"#F44336";ctx.font="bold 34px system-ui";ctx.fillText(won?"PRODUCT SHIPPED!":"GAME OVER",W/2,92);
  drawLordBluetooth(W/2,165,4);
  ctx.fillStyle="#fff";ctx.font="14px system-ui";
  var reason=won?"Day "+day+" | Score: "+score:(aliveEngs().length===0?"Your team got obliterated by the org.":"Only "+Math.round(progress)+"% shipped.");
  ctx.fillText(reason,W/2,250);
  ctx.fillText("Rank: "+getRank().name,W/2,275);
  ctx.fillText("Engineers left: "+aliveEngs().length,W/2,298);
  ctx.fillText("Production incidents: "+prodIncidents,W/2,321);
  ctx.fillText("Peak caffeine: "+peakCaffeine+"mg",W/2,344);
  ctx.fillText("Political Capital: "+polCap,W/2,367);
  ctx.fillStyle="#888";ctx.font="12px system-ui";ctx.fillText("Myths discovered: "+discoveryCount+"/7",W/2,402);
  if(bestScore>0){ctx.fillStyle="#FFD700";ctx.fillText("Best Score: "+bestScore,W/2,430)}
  if(Math.sin(frame*0.08)>0){ctx.fillStyle="#666";ctx.font="16px system-ui";ctx.fillText("Press any key to continue",W/2,515)}
}

function drawShop(){
  ctx.fillStyle="rgba(0,0,0,0.86)";ctx.fillRect(0,0,W,H);
  ctx.fillStyle="#FFD700";ctx.font="bold 22px system-ui";ctx.textAlign="center";ctx.fillText("EXECUTIVE SHOP",W/2,42);
  ctx.fillStyle="#888";ctx.font="11px system-ui";ctx.fillText("Spend Political Capital on permanent upgrades",W/2,60);
  var startY=90;
  for(var i=0;i<UPGRADES.length;i++){
    var u=UPGRADES[i],owned=!!upgrades[u.id],y=startY+i*42;
    ctx.fillStyle=shopCursor===i?"#2a2a3e":"#1a1a2e";ctx.fillRect(20,y,560,36);
    ctx.strokeStyle=shopCursor===i?"#FFD700":"#333";ctx.strokeRect(20,y,560,36);
    ctx.fillStyle=owned?"#4CAF50":(polCap>=u.cost?"#fff":"#666");ctx.font="bold 12px system-ui";ctx.textAlign="left";ctx.fillText(u.icon+" "+u.name+"  ("+u.cost+" PC)",30,y+14);
    ctx.fillStyle="#888";ctx.font="10px system-ui";ctx.fillText(u.desc,30,y+28);
    ctx.textAlign="right";ctx.fillStyle=owned?"#4CAF50":(polCap>=u.cost?"#FFD700":"#666");ctx.fillText(owned?"OWNED":"BUY",565,y+22);
  }
  ctx.fillStyle="#666";ctx.textAlign="center";ctx.font="11px system-ui";ctx.fillText("↑↓ select | Enter buy | Esc back",W/2,560);
}

function update(dt){
  frame++;updateMic();
  if(notification&&notifTimer>0)notifTimer-=dt;
  if(shakeTimer>0)shakeTimer-=dt;
  if(flashTimer>0)flashTimer-=dt;
  if(state===ST_TITLE){
    if(frame%8===0)playBGM();
    return;
  }
  if(state===ST_STANDUP||state===ST_WORK){
    if(frame%8===0)playBGM();
    phaseTimer-=dt;
    if(state===ST_WORK){
      if(keys.ArrowDown){phaseTimer-=dt*0.25}
    }
    if(phaseTimer<=0){
      if(state===ST_STANDUP){state=ST_WORK;phaseTimer=34;showNotif("Work phase: assign tasks and manage the org",2)}
      else {endDay();phaseTimer=8}
    }
    if(state===ST_WORK&&Math.random()<0.02+micSmooth*0.08&&upcomingEvents.length&&!currentEvent){
      currentEvent=upcomingEvents.shift();eventChoice=0;state=ST_EVENT;playBad();playVoice(currentEvent.voice||"")
    }
    if(state===ST_WORK&&aliveEngs().length&&prodRisk<100){
      // passive morale drift / caffeine abuse
      if(caffeine>=600&&Math.random()<0.05){aliveEngs().forEach(function(e){e.morale=clamp(e.morale-1,0,100)});}
    }
    if(state===ST_WORK&&keys.ArrowDown&&phaseTimer>0){
      // end day early if holding down? no-op; keep to old familiarity
    }
    return;
  }
  if(state===ST_EVENT){
    if(currentEvent&&phaseTimer<=0)phaseTimer=8;
    if(keys.ArrowLeft||keys.ArrowRight){/* handled in input */}
    return;
  }
  if(state===ST_EOD){
    phaseTimer-=dt;
    if(phaseTimer<=0){startNextDay();phaseTimer=8}
    return;
  }
  if(state===ST_RESULT||state===ST_SHOP)return;
}

function render(){
  ctx.save();
  if(shakeTimer>0)ctx.translate((Math.random()-0.5)*8*shakeTimer,(Math.random()-0.5)*8*shakeTimer);
  if(state===ST_TITLE)drawTitle();
  else if(state===ST_SHOP){drawShop();}
  else if(state===ST_RESULT)drawResult();
  else {
    drawHUD();
    drawRoomBG();
    if(currentRoom===0)drawEngRoom();
    else {
      // room art
      ctx.fillStyle="#1a1a2e";ctx.fillRect(0,72,W,H-72);
      if(currentRoom===1){ctx.fillStyle="#3E2723";ctx.fillRect(40,220,200,90);ctx.fillStyle="#424242";ctx.fillRect(60,200,60,50)}
      if(currentRoom===2){ctx.fillStyle="#37474F";ctx.fillRect(40,220,120,50);ctx.fillStyle="#1565C0";ctx.fillRect(50,215,80,5)}
      if(currentRoom===3){ctx.fillStyle="#3E2723";ctx.fillRect(80,220,440,100);ctx.fillStyle="#5D4037";ctx.fillRect(100,240,400,60)}
      if(currentRoom===4){ctx.fillStyle="#5D4037";ctx.fillRect(20,220,200,80);ctx.fillStyle="#8D6E63";ctx.fillRect(25,240,60,50)}
      if(currentRoom===5){for(var k=0;k<5;k++){ctx.fillStyle="#1B5E20";ctx.fillRect(30+k*115,220,30,80)}}
      drawPlayer();
    }
    drawNotification();
    if(state===ST_EVENT)drawEventPopup();
  }
  if(flashTimer>0){ctx.fillStyle=flashColor;ctx.globalAlpha=flashTimer*0.3;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}
  ctx.restore();
}

// ═══ INPUT ═══
document.addEventListener("keydown",function(e){keys[e.key]=true;initAudio();initMic();
  if(state===ST_TITLE){initGame();e.preventDefault();return}
  if(state===ST_RESULT){if(e.key==="Enter"||e.key===" "){state=ST_TITLE}e.preventDefault();return}
  if(state===ST_SHOP){
    if(e.key==="ArrowUp"){shopCursor=Math.max(0,shopCursor-1);playStep()}
    if(e.key==="ArrowDown"){shopCursor=Math.min(UPGRADES.length-1,shopCursor+1);playStep()}
    if(e.key==="Enter"||e.key===" "){var u=UPGRADES[shopCursor];if(!upgrades[u.id]&&polCap>=u.cost){polCap-=u.cost;upgrades[u.id]=true;showNotif("Bought "+u.name,3);playVoice("upgrade_buy");playAbility();saveStats()}else showNotif(upgrades[u.id]?"Already owned":"Need more PC",2)}
    if(e.key==="Escape"){state=ST_STANDUP}
    e.preventDefault();return
  }
  if(state===ST_EVENT){
    if(e.key==="ArrowLeft"){eventChoice=Math.max(0,eventChoice-1);playStep()}
    if(e.key==="ArrowRight"){eventChoice=Math.min(currentEvent.choices.length-1,eventChoice+1);playStep()}
    if(e.key==="Enter"||e.key===" "){
      applyChoice(currentEvent,eventChoice);
      currentEvent=null;state=ST_WORK;phaseTimer=Math.max(phaseTimer,1)
    }
    e.preventDefault();return
  }
  if(e.key==="ArrowLeft"){currentRoom=Math.max(0,currentRoom-1);playStep();e.preventDefault()}
  if(e.key==="ArrowRight"){currentRoom=Math.min(ROOMS.length-1,currentRoom+1);playStep();e.preventDefault()}
  if(e.key==="ArrowUp"){doRoomAction();e.preventDefault()}
  if(e.key==="ArrowDown"){phaseTimer=0;e.preventDefault()}
  if(e.key==="Enter"||e.key==="a"){if(currentRoom===0){assignMode=!assignMode;showNotif(assignMode?"Assign mode on":"Assign mode off",2)}else doRoomAction();e.preventDefault()}
  if(e.key==="m"||e.key==="M")bgmMuted=!bgmMuted;
  if(e.key==="s"||e.key==="S"){if(currentRoom===1&&!emergencyUsed){addCaff(300);emergencyUsed=true;showNotif("\u2615\u26A1 Emergency Espresso!",3);playAbility()}}
});

// Touch basics
var touchX=0,touchY=0,lastTap=0;
cv.addEventListener("touchstart",function(e){initAudio();initMic();var t=e.touches[0];touchX=t.clientX;touchY=t.clientY;var now=Date.now();if(now-lastTap<300&&currentRoom===1&&!emergencyUsed){addCaff(300);emergencyUsed=true;showNotif("\u2615\u26A1 Emergency Espresso!",3);playAbility()}lastTap=now;e.preventDefault()},{passive:false});
cv.addEventListener("touchend",function(e){if(state===ST_TITLE){initGame();return}if(state===ST_RESULT){state=ST_TITLE;return}if(state===ST_EVENT){applyChoice(currentEvent,eventChoice);currentEvent=null;state=ST_WORK;return}var t=e.changedTouches[0],dx=t.clientX-touchX,dy=t.clientY-touchY;if(Math.abs(dx)>Math.abs(dy)){if(dx<0)currentRoom=Math.max(0,currentRoom-1);else currentRoom=Math.min(ROOMS.length-1,currentRoom+1)}else{if(dy<0)doRoomAction();else phaseTimer=0}e.preventDefault()},{passive:false});

// Main loop
loadStats();lastTick=Date.now();
function loop(){var now=Date.now(),dt=(now-lastTick)/1000;lastTick=now;dt=Math.min(dt,0.1);update(dt);render();requestAnimationFrame(loop)}
requestAnimationFrame(loop);cv.focus();

})();
