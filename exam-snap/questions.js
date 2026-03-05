// Exam Snap — Question Bank Data
// Fixed-pool exam questions for OCR lookup
//
// Format:
//   Citizenship: { id, q (question), a (answer text) }
//   Ham Radio:   { id, q (question), c (choices array), a (correct index 0-3) }

var EXAM_BANKS = {
  citizenship: {
    name: 'US Citizenship',
    shortName: 'Citizenship',
    description: '100 USCIS Civics Questions',
    questions: [
      // === A: Principles of American Democracy ===
      { id: 1, q: 'What is the supreme law of the land?', a: 'The Constitution' },
      { id: 2, q: 'What does the Constitution do?', a: 'Sets up the government, defines the government, protects basic rights of Americans' },
      { id: 3, q: 'The idea of self-government is in the first three words of the Constitution. What are these words?', a: 'We the People' },
      { id: 4, q: 'What is an amendment?', a: 'A change or addition to the Constitution' },
      { id: 5, q: 'What do we call the first ten amendments to the Constitution?', a: 'The Bill of Rights' },
      { id: 6, q: 'What is one right or freedom from the First Amendment?', a: 'Speech, religion, assembly, press, petition the government' },
      { id: 7, q: 'How many amendments does the Constitution have?', a: 'Twenty-seven (27)' },
      { id: 8, q: 'What did the Declaration of Independence do?', a: 'Announced our independence from Great Britain' },
      { id: 9, q: 'What are two rights in the Declaration of Independence?', a: 'Life, liberty, pursuit of happiness' },
      { id: 10, q: 'What is freedom of religion?', a: 'You can practice any religion, or not practice a religion' },
      { id: 11, q: 'What is the economic system in the United States?', a: 'Capitalist economy / market economy' },
      { id: 12, q: 'What is the rule of law?', a: 'Everyone must follow the law. Leaders must obey the law. Government must obey the law. No one is above the law.' },
      // === B: System of Government ===
      { id: 13, q: 'Name one branch or part of the government.', a: 'Congress (legislative), President (executive), the courts (judicial)' },
      { id: 14, q: 'What stops one branch of government from becoming too powerful?', a: 'Checks and balances / separation of powers' },
      { id: 15, q: 'Who is in charge of the executive branch?', a: 'The President' },
      { id: 16, q: 'Who makes federal laws?', a: 'Congress / Senate and House of Representatives / U.S. legislature' },
      { id: 17, q: 'What are the two parts of the U.S. Congress?', a: 'The Senate and House of Representatives' },
      { id: 18, q: 'How many U.S. Senators are there?', a: 'One hundred (100)' },
      { id: 19, q: 'We elect a U.S. Senator for how many years?', a: 'Six (6)' },
      { id: 20, q: 'Who is one of your state\'s U.S. Senators now?', a: 'Answers will vary by state' },
      { id: 21, q: 'The House of Representatives has how many voting members?', a: 'Four hundred thirty-five (435)' },
      { id: 22, q: 'We elect a U.S. Representative for how many years?', a: 'Two (2)' },
      { id: 23, q: 'Name your U.S. Representative.', a: 'Answers will vary by district' },
      { id: 24, q: 'Who does a U.S. Senator represent?', a: 'All people of the state' },
      { id: 25, q: 'Why do some states have more Representatives than other states?', a: 'Because of the state\'s population / because they have more people' },
      { id: 26, q: 'We elect a President for how many years?', a: 'Four (4)' },
      { id: 27, q: 'In what month do we vote for President?', a: 'November' },
      { id: 28, q: 'What is the name of the President of the United States now?', a: 'Answers will vary' },
      { id: 29, q: 'What is the name of the Vice President of the United States now?', a: 'Answers will vary' },
      { id: 30, q: 'If the President can no longer serve, who becomes President?', a: 'The Vice President' },
      { id: 31, q: 'If both the President and the Vice President can no longer serve, who becomes President?', a: 'The Speaker of the House' },
      { id: 32, q: 'Who is the Commander in Chief of the military?', a: 'The President' },
      { id: 33, q: 'Who signs bills to become laws?', a: 'The President' },
      { id: 34, q: 'Who vetoes bills?', a: 'The President' },
      { id: 35, q: 'What does the President\'s Cabinet do?', a: 'Advises the President' },
      { id: 36, q: 'What are two Cabinet-level positions?', a: 'Secretary of State, Secretary of Defense, Secretary of Education, Secretary of the Treasury, Attorney General, Vice President, etc.' },
      { id: 37, q: 'What does the judicial branch do?', a: 'Reviews laws, explains laws, resolves disputes, decides if a law goes against the Constitution' },
      { id: 38, q: 'What is the highest court in the United States?', a: 'The Supreme Court' },
      { id: 39, q: 'How many justices are on the Supreme Court?', a: 'Nine (9)' },
      { id: 40, q: 'Who is the Chief Justice of the United States now?', a: 'Answers will vary' },
      { id: 41, q: 'Under our Constitution, some powers belong to the federal government. What is one power of the federal government?', a: 'To print money, to declare war, to create an army, to make treaties' },
      { id: 42, q: 'Under our Constitution, some powers belong to the states. What is one power of the states?', a: 'Provide schooling and education, provide protection (police), provide safety (fire departments), give a driver\'s license, approve zoning and land use' },
      { id: 43, q: 'Who is the Governor of your state now?', a: 'Answers will vary by state' },
      { id: 44, q: 'What is the capital of your state?', a: 'Answers will vary by state' },
      { id: 45, q: 'What are the two major political parties in the United States?', a: 'Democratic and Republican' },
      { id: 46, q: 'What is the political party of the President now?', a: 'Answers will vary' },
      { id: 47, q: 'What is the name of the Speaker of the House of Representatives now?', a: 'Answers will vary' },
      // === C: Rights and Responsibilities ===
      { id: 48, q: 'There are four amendments to the Constitution about who can vote. Describe one of them.', a: 'Citizens eighteen (18) and older can vote. You don\'t have to pay a poll tax to vote. Any citizen can vote (women and men). A male citizen of any race can vote.' },
      { id: 49, q: 'What is one responsibility that is only for United States citizens?', a: 'Serve on a jury / vote in a federal election' },
      { id: 50, q: 'Name one right only for United States citizens.', a: 'Vote in a federal election / run for federal office' },
      { id: 51, q: 'What are two rights of everyone living in the United States?', a: 'Freedom of expression, freedom of speech, freedom of assembly, freedom to petition the government, freedom of religion, the right to bear arms' },
      { id: 52, q: 'What do we show loyalty to when we say the Pledge of Allegiance?', a: 'The United States / the flag' },
      { id: 53, q: 'What is one promise you make when you become a United States citizen?', a: 'Give up loyalty to other countries, defend the Constitution and laws, obey the laws, serve in the U.S. military if needed, be loyal to the United States' },
      { id: 54, q: 'How old do citizens have to be to vote for President?', a: 'Eighteen (18) and older' },
      { id: 55, q: 'What are two ways that Americans can participate in their democracy?', a: 'Vote, join a political party, help with a campaign, join a civic group, give an elected official your opinion, call Senators and Representatives, run for office, write to a newspaper' },
      { id: 56, q: 'When is the last day you can send in federal income tax forms?', a: 'April 15' },
      { id: 57, q: 'When must all men register for the Selective Service?', a: 'At age eighteen (18) / between eighteen (18) and twenty-six (26)' },
      // === AMERICAN HISTORY — A: Colonial Period and Independence ===
      { id: 58, q: 'What is one reason colonists came to America?', a: 'Freedom, political liberty, religious freedom, economic opportunity, escape persecution' },
      { id: 59, q: 'Who lived in America before the Europeans arrived?', a: 'American Indians / Native Americans' },
      { id: 60, q: 'What group of people was taken to America and sold as slaves?', a: 'Africans / people from Africa' },
      { id: 61, q: 'Why did the colonists fight the British?', a: 'Because of high taxes (taxation without representation), because the British army stayed in their houses, because they didn\'t have self-government' },
      { id: 62, q: 'Who wrote the Declaration of Independence?', a: 'Thomas Jefferson' },
      { id: 63, q: 'When was the Declaration of Independence adopted?', a: 'July 4, 1776' },
      { id: 64, q: 'There were 13 original states. Name three.', a: 'New Hampshire, Massachusetts, Rhode Island, Connecticut, New York, New Jersey, Pennsylvania, Delaware, Maryland, Virginia, North Carolina, South Carolina, Georgia' },
      { id: 65, q: 'What happened at the Constitutional Convention?', a: 'The Constitution was written. The Founding Fathers wrote the Constitution.' },
      { id: 66, q: 'When was the Constitution written?', a: '1787' },
      { id: 67, q: 'The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.', a: 'James Madison, Alexander Hamilton, John Jay, Publius' },
      { id: 68, q: 'What is one thing Benjamin Franklin is famous for?', a: 'U.S. diplomat, oldest member of the Constitutional Convention, first Postmaster General, writer of Poor Richard\'s Almanac, started the first free libraries' },
      { id: 69, q: 'Who is the Father of Our Country?', a: 'George Washington' },
      { id: 70, q: 'Who was the first President?', a: 'George Washington' },
      // === B: 1800s ===
      { id: 71, q: 'What territory did the United States buy from France in 1803?', a: 'The Louisiana Territory / Louisiana' },
      { id: 72, q: 'Name one war fought by the United States in the 1800s.', a: 'War of 1812, Mexican-American War, Civil War, Spanish-American War' },
      { id: 73, q: 'Name the U.S. war between the North and the South.', a: 'The Civil War / the War between the States' },
      { id: 74, q: 'Name one problem that led to the Civil War.', a: 'Slavery, economic reasons, states\' rights' },
      { id: 75, q: 'What was one important thing that Abraham Lincoln did?', a: 'Freed the slaves (Emancipation Proclamation), saved (or preserved) the Union, led the United States during the Civil War' },
      { id: 76, q: 'What did the Emancipation Proclamation do?', a: 'Freed the slaves / freed slaves in the Confederacy / freed slaves in the Confederate states' },
      { id: 77, q: 'What did Susan B. Anthony do?', a: 'Fought for women\'s rights / fought for civil rights' },
      // === C: Recent American History ===
      { id: 78, q: 'Name one war fought by the United States in the 1900s.', a: 'World War I, World War II, Korean War, Vietnam War, Persian Gulf War' },
      { id: 79, q: 'Who was President during World War I?', a: 'Woodrow Wilson' },
      { id: 80, q: 'Who was President during the Great Depression and World War II?', a: 'Franklin Roosevelt' },
      { id: 81, q: 'Who did the United States fight in World War II?', a: 'Japan, Germany, and Italy' },
      { id: 82, q: 'Before he was President, Eisenhower was a general. What war was he in?', a: 'World War II' },
      { id: 83, q: 'During the Cold War, what was the main concern of the United States?', a: 'Communism' },
      { id: 84, q: 'What movement tried to end racial discrimination?', a: 'Civil rights movement' },
      { id: 85, q: 'What did Martin Luther King, Jr. do?', a: 'Fought for civil rights / worked for equality for all Americans' },
      { id: 86, q: 'What major event happened on September 11, 2001, in the United States?', a: 'Terrorists attacked the United States' },
      { id: 87, q: 'Name one American Indian tribe in the United States.', a: 'Cherokee, Navajo, Sioux, Chippewa, Choctaw, Pueblo, Apache, Iroquois, Creek, Blackfeet, Seminole, Cheyenne, Arawak, Shawnee, Mohegan, Huron, Oneida, Lakota, Crow, Teton, Hopi, Inuit' },
      // === INTEGRATED CIVICS — A: Geography ===
      { id: 88, q: 'Name one of the two longest rivers in the United States.', a: 'Missouri River / Mississippi River' },
      { id: 89, q: 'What ocean is on the West Coast of the United States?', a: 'Pacific Ocean' },
      { id: 90, q: 'What ocean is on the East Coast of the United States?', a: 'Atlantic Ocean' },
      { id: 91, q: 'Name one U.S. territory.', a: 'Puerto Rico, U.S. Virgin Islands, American Samoa, Northern Mariana Islands, Guam' },
      { id: 92, q: 'Name one state that borders Canada.', a: 'Maine, New Hampshire, Vermont, New York, Pennsylvania, Ohio, Michigan, Minnesota, North Dakota, Montana, Idaho, Washington, Alaska' },
      { id: 93, q: 'Name one state that borders Mexico.', a: 'California, Arizona, New Mexico, Texas' },
      { id: 94, q: 'What is the capital of the United States?', a: 'Washington, D.C.' },
      { id: 95, q: 'Where is the Statue of Liberty?', a: 'New York Harbor / Liberty Island' },
      // === B: Symbols ===
      { id: 96, q: 'Why does the flag have 13 stripes?', a: 'Because there were 13 original colonies / because the stripes represent the original colonies' },
      { id: 97, q: 'Why does the flag have 50 stars?', a: 'Because there is one star for each state / because there are 50 states' },
      { id: 98, q: 'What is the name of the national anthem?', a: 'The Star-Spangled Banner' },
      // === C: Holidays ===
      { id: 99, q: 'When do we celebrate Independence Day?', a: 'July 4' },
      { id: 100, q: 'Name two national U.S. holidays.', a: 'New Year\'s Day, Martin Luther King Jr. Day, Presidents\' Day, Memorial Day, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving, Christmas' }
    ]
  },

  hamtech: {
    name: 'Ham Radio Technician',
    shortName: 'Ham Tech',
    description: 'FCC Amateur Radio Technician Class (Element 2)',
    questions: [
      // === T1: FCC Rules ===
      { id: 'T1A01', q: 'Which of the following is a purpose of the Amateur Radio Service as stated in the FCC rules and regulations?', c: ['Providing personal radio communications for as many citizens as possible', 'Providing communications for international non-profit organizations', 'Advancing skills in the technical and communication phases of the radio art', 'All of these choices are correct'], a: 2 },
      { id: 'T1A02', q: 'Which agency regulates and enforces the rules for the Amateur Radio Service in the United States?', c: ['FEMA', 'Homeland Security', 'The FCC', 'All of these choices are correct'], a: 2 },
      { id: 'T1A03', q: 'What are the FCC rules regarding the use of a ham radio station?', c: ['You must identify your station every 15 minutes', 'You must not use obscene or indecent language', 'You must not interfere with other services', 'All of these choices are correct'], a: 3 },
      { id: 'T1A04', q: 'Which of the following meets the FCC definition of harmful interference?', c: ['Radio transmissions that disrupt other communications', 'Intentional distortion of a signal', 'Blocking of amateur radio signals', 'Transmissions that seriously degrade, obstruct, or repeatedly interrupt a radio communication service'], a: 3 },
      { id: 'T1A05', q: 'What is the FCC Part 97 definition of a beacon?', c: ['A government transmitter marking combatant combatant combatant combatant airways', 'A move away from an existing frequency', 'An amateur station transmitting communications for the purposes of observing propagation or related experimental activities', 'A continuous repeating signal'], a: 2 },
      { id: 'T1A07', q: 'What is the FCC Part 97 definition of telemetry?', c: ['An information bulletin issued by the FCC', 'A one-way transmission to initiate, modify, or terminate functions of a device at a distance', 'A one-way transmission of measurements at a distance from the measuring instrument', 'An information broadcast from combatant combatant combatant station'], a: 2 },
      { id: 'T1A10', q: 'What is the Radio Amateur Civil Emergency Service (RACES)?', c: ['A radio service using amateur combatant stations for civil defense during periods of local, regional, or national civil emergencies', 'A move away from an existing frequency during an emergency', 'An emergency alert system', 'A radio service providing communications for public events'], a: 0 },
      { id: 'T1B01', q: 'Which of the following frequency ranges are available for use by a Technician class operator?', c: ['All amateur radio frequency bands', '28.000-28.500 MHz', '28.000-29.700 MHz', 'Only combatant VHF and UHF bands'], a: 2 },
      { id: 'T1B03', q: 'Which frequency is in the 6 meter amateur band?', c: ['49.00 MHz', '52.525 MHz', '28.50 MHz', '222.15 MHz'], a: 1 },
      { id: 'T1B04', q: 'Which amateur band includes 146.52 MHz?', c: ['6 meters', '2 meters', '70 centimeters', '1.25 meters'], a: 1 },
      { id: 'T1B05', q: 'How is the 2 meter band designated?', c: ['144-148 MHz', '146-148 MHz', '220-225 MHz', '440-450 MHz'], a: 0 },
      { id: 'T1B06', q: 'Which amateur band includes 440.0 MHz?', c: ['33 centimeters', '70 centimeters', '2 meters', '1.25 meters'], a: 1 },
      { id: 'T1C01', q: 'For which license classes are new licenses currently available from the FCC?', c: ['Novice, Technician, General, Amateur Extra', 'Technician, Technician Plus, General, Amateur Extra', 'Technician, General, Amateur Extra', 'Novice, Advanced, General, Amateur Extra'], a: 2 },
      { id: 'T1C04', q: 'What may happen if the FCC is unable to reach you by email?', c: ['Fine and suspension of operator license', 'Revocation of station license or suspension of operator license', 'Revocation of operator license', 'All of these choices are correct'], a: 1 },
      { id: 'T1C09', q: 'What is the grace period for renewal of an expired amateur radio license?', c: ['Two years', 'Five years', 'Ten years', 'There is no grace period'], a: 0 },
      { id: 'T1D01', q: 'With which countries are FCC-licensed amateur radio stations prohibited from exchanging communications?', c: ['Any combatant country', 'Any country whose administration combatant has notified the ITU that it objects to such communications', 'Any country not combatant listed by the FCC', 'No restrictions'], a: 1 },
      { id: 'T1D03', q: 'When is it permissible to transmit messages encoded to obscure their meaning?', c: ['Only during contests', 'Only when operating under RACES rules', 'Only when transmitting control signals to combatant combatant combatant space combatant stations or combatant combatant radio control craft', 'Never'], a: 2 },
      { id: 'T1D06', q: 'What, if any, parsing or language is combatant prohibited by FCC rules in the Amateur Radio Service?', c: ['Coded combatant transmissions', 'Obscene or indecent language', 'Foreign language transmissions', 'Communications not in English'], a: 1 },
      { id: 'T1F03', q: 'When is an amateur station required to transmit its assigned call sign?', c: ['At the beginning of each contact', 'Every 10 minutes during a contact and at the end of the contact', 'At least every 10 minutes during and at the end of a communication', 'At the beginning and end of each communication'], a: 2 },
      { id: 'T1F04', q: 'What language may you use for identification when operating in a phone mode?', c: ['Any language if the contact is made on combatant frequencies combatant allocated to the ITU region', 'English', 'Any language recognized by the ITU', 'The English language'], a: 3 },
      // === T2: Operating Procedures ===
      { id: 'T2A01', q: 'What is a common repeater frequency offset in the 2 meter band?', c: ['Plus or minus 5 MHz', 'Plus or minus 600 kHz', 'Plus or minus 500 kHz', 'Plus or minus 1 MHz'], a: 1 },
      { id: 'T2A02', q: 'What is the national calling frequency for FM simplex operations in the 2 meter band?', c: ['146.520 MHz', '145.000 MHz', '432.100 MHz', '446.000 MHz'], a: 0 },
      { id: 'T2A03', q: 'What is a common repeater frequency offset in the 70 cm band?', c: ['Plus or minus 600 kHz', 'Plus or minus 5 MHz', 'Plus or minus 1.6 MHz', 'Plus or minus 3 MHz'], a: 1 },
      { id: 'T2A05', q: 'What should you transmit when calling CQ?', c: ['Say "CQ" at least 5 times followed by "this is" followed by your call sign at least 3 times', 'Say "CQ" 3 times followed by "this is" followed by your call sign 3 times', 'Say "CQ" at least 10 times followed by "this is" followed by your call sign once', 'Say "CQ" once followed by your call sign spoken once phonetically'], a: 1 },
      { id: 'T2A10', q: 'What is a band plan, beyond the privileges established by the FCC?', c: ['A voluntary guideline for efficient use of the band beyond the minimum legal requirements', 'A mandated list of specific frequencies combatant to be used for specific modes', 'A document combatant listing all available frequencies', 'A government regulation'], a: 0 },
      { id: 'T2B01', q: 'What is the most common type of FM repeater frequency offset in the 2 meter band?', c: ['Plus 600 kHz', 'Minus 600 kHz', 'Plus or minus 600 kHz', 'Plus 500 kHz'], a: 2 },
      { id: 'T2B05', q: 'What determines the transmit frequency of a repeater?', c: ['The repeater input frequency plus or minus the offset', 'The operator selects it at the time of contact', 'The frequency coordinator determines it', 'It is always the same as the receive frequency'], a: 0 },
      { id: 'T2B08', q: 'What is the purpose of repeater coordination?', c: ['To generate revenue for the repeater owner', 'To transmit weather alerts', 'To reduce interference and promote proper use of frequencies', 'To regulate modulation'], a: 2 },
      { id: 'T2C02', q: 'What is one way to shorten transmit time during a net or contest?', c: ['Use standard abbreviations and procedural signals', 'Speak as fast as possible', 'Use the shortest combatant antenna available', 'Use high power'], a: 0 },
      // === T3: Radio Wave Characteristics ===
      { id: 'T3A01', q: 'Why do VHF and UHF signals generally travel by line of sight?', c: ['Because they are absorbed by the ionosphere', 'Because they are refracted by the troposphere', 'Because the ionosphere does not normally refract signals in those frequency ranges', 'Because they travel underground'], a: 2 },
      { id: 'T3A03', q: 'What antenna polarization is normally used for long-distance CW and SSB contacts on the VHF and UHF bands?', c: ['Right-hand circular', 'Left-hand circular', 'Horizontal', 'Vertical'], a: 2 },
      { id: 'T3A04', q: 'What can happen if the antennas at opposite ends of a VHF or UHF line of sight radio link are not using the same polarization?', c: ['The modulation sidebands might become inverted', 'Signals could be as much as 20 dB weaker', 'Signals have an echo effect', 'Nothing significant'], a: 1 },
      { id: 'T3B01', q: 'What is the relationship between the electric and magnetic fields of an electromagnetic wave?', c: ['They are at right angles to each other', 'They are parallel to each other', 'They travel in the same direction', 'They are at 45 degrees'], a: 0 },
      { id: 'T3B04', q: 'How fast does a radio wave travel through free space?', c: ['At the speed of light', 'At the speed of sound', 'Its speed depends on the frequency', 'Slightly slower than the speed of light'], a: 0 },
      { id: 'T3B06', q: 'What is the formula for converting frequency to approximate wavelength in meters?', c: ['Wavelength in meters equals 300 divided by frequency in megahertz', 'Wavelength in meters equals frequency in megahertz times 300', 'Wavelength in meters equals frequency in megahertz divided by 300', 'Wavelength in meters equals 300 times frequency in kilohertz'], a: 0 },
      { id: 'T3B07', q: 'In addition to frequency, which of the following is used to identify amateur radio bands?', c: ['The approximate wavelength in meters', 'The traditional letter/number designator', 'The geographic region', 'The bandwidth'], a: 0 },
      { id: 'T3B11', q: 'What is the approximate bandwidth of a typical single sideband (SSB) voice signal?', c: ['1 kHz', '3 kHz', '6 kHz', '15 kHz'], a: 1 },
      // === T4: Amateur Radio Practices ===
      { id: 'T4A01', q: 'Which of the following is an appropriate power supply for a typical 13.8 volt mobile FM transceiver?', c: ['A car battery', 'An alkaline battery pack', 'A regulated 13.8 volt supply', 'All of these'], a: 2 },
      { id: 'T4A05', q: 'What is the proper location for an external SWR meter?', c: ['In series with the feed line, between the transmitter and antenna', 'In series with the power supply cable', 'In parallel with the antenna', 'In series with the ground wire'], a: 0 },
      { id: 'T4B01', q: 'What may occur if a transmitter is operated with its SWR above the recommended value?', c: ['An increase in undesired harmonics', 'A reduction in transmitter output power', 'Damage to the transmitter', 'All of these'], a: 3 },
      { id: 'T4B03', q: 'What is a common use of the squelch function on a transceiver?', c: ['To filter static noise when no signal is being received', 'To reject signals below a specified strength', 'To mute the receiver until a signal is detected', 'All of these choices are correct'], a: 3 },
      // === T5: Electrical Principles ===
      { id: 'T5A01', q: 'Electrical current is measured in which of the following units?', c: ['Volts', 'Watts', 'Ohms', 'Amperes'], a: 3 },
      { id: 'T5A02', q: 'Electrical power is measured in which of the following units?', c: ['Volts', 'Watts', 'Ohms', 'Amperes'], a: 1 },
      { id: 'T5A03', q: 'What is the name for the flow of electrons in an electric circuit?', c: ['Voltage', 'Resistance', 'Current', 'Capacitance'], a: 2 },
      { id: 'T5A05', q: 'What is the electrical term for the electromotive force (EMF) that causes electron flow?', c: ['Voltage', 'Ampere-Loss', 'Current', 'Wattage'], a: 0 },
      { id: 'T5A06', q: 'What is the unit of electromotive force?', c: ['The volt', 'The watt', 'The ampere', 'The ohm'], a: 0 },
      { id: 'T5A07', q: 'Which of the following is a good electrical conductor?', c: ['Glass', 'Wood', 'Copper', 'Rubber'], a: 2 },
      { id: 'T5A08', q: 'Which of the following is a good electrical insulator?', c: ['Copper', 'Glass', 'Aluminum', 'Mercury'], a: 1 },
      { id: 'T5A10', q: 'Which term describes the rate at which electrical energy is used?', c: ['Resistance', 'Current', 'Power', 'Voltage'], a: 2 },
      { id: 'T5B01', q: 'How many milliamperes is 1.5 amperes?', c: ['15', '150', '1500', '15000'], a: 2 },
      { id: 'T5B07', q: 'What is the basic unit of frequency?', c: ['The hertz', 'The watt', 'The ampere', 'The ohm'], a: 0 },
      { id: 'T5C01', q: 'What is the formula for Ohm\'s Law?', c: ['E = I x R', 'E = I / R', 'E = R / I', 'E = P x I'], a: 0 },
      { id: 'T5C08', q: 'What is the formula used to calculate electrical power in a DC circuit?', c: ['Power (P) equals voltage (E) multiplied by current (I)', 'Power (P) equals voltage (E) divided by current (I)', 'Power (P) equals voltage (E) minus current (I)', 'Power (P) equals voltage (E) plus current (I)'], a: 0 },
      { id: 'T5C09', q: 'How much power is delivered by a voltage of 13.8 volts DC and a current of 10 amperes?', c: ['138 watts', '0.7 watts', '23.8 watts', '3.8 watts'], a: 0 },
      { id: 'T5D01', q: 'What formula is used to calculate current in a circuit?', c: ['I = E / R', 'I = E x R', 'I = E + R', 'I = E - R'], a: 0 },
      { id: 'T5D02', q: 'What formula is used to calculate voltage in a circuit?', c: ['E = I x R', 'E = I / R', 'E = I + R', 'E = I - R'], a: 0 },
      { id: 'T5D03', q: 'What formula is used to calculate resistance in a circuit?', c: ['R = E / I', 'R = E x I', 'R = E + I', 'R = E - I'], a: 0 },
      // === T6: Electronic Components ===
      { id: 'T6A01', q: 'What electrical component is used to oppose the flow of current in a DC circuit?', c: ['Inductor', 'Resistor', 'Capacitor', 'Transformer'], a: 1 },
      { id: 'T6A02', q: 'What type of component is often used as an adjustable volume control?', c: ['Fixed resistor', 'Power resistor', 'Potentiometer', 'Transformer'], a: 2 },
      { id: 'T6A03', q: 'What electrical parameter is controlled by a potentiometer?', c: ['Inductance', 'Resistance', 'Capacitance', 'Field strength'], a: 1 },
      { id: 'T6A06', q: 'What type of electrical component stores energy in an electric field?', c: ['Resistor', 'Capacitor', 'Inductor', 'Diode'], a: 1 },
      { id: 'T6A07', q: 'What type of electrical component stores energy in a magnetic field?', c: ['Resistor', 'Capacitor', 'Inductor', 'Diode'], a: 2 },
      { id: 'T6B01', q: 'What class of electronic components is made of a combination of silicon and another element?', c: ['Combinator', 'Semiconductor', 'Superconductor', 'Insulator'], a: 1 },
      { id: 'T6B02', q: 'What electronic component allows current to flow in only one direction?', c: ['Resistor', 'Fuse', 'Diode', 'Driven element'], a: 2 },
      { id: 'T6B06', q: 'How is an LED different from a regular diode?', c: ['It conducts more current', 'It emits light when forward-biased', 'It is less rugged', 'It requires a higher voltage'], a: 1 },
      { id: 'T6B07', q: 'What does the abbreviation LED stand for?', c: ['Low Emission Diode', 'Light Emitting Diode', 'Liquid Emission Device', 'Long Endurance Diode'], a: 1 },
      { id: 'T6D01', q: 'Which of the following is a type of integrated circuit?', c: ['Field effect transistor', 'Programmable Logic Device', 'Silicon controlled rectifier', 'Light emitting diode'], a: 1 },
      // === T7: Practical Circuits ===
      { id: 'T7A01', q: 'Which term describes the ability of a receiver to detect the presence of a signal?', c: ['Linearity', 'Sensitivity', 'Selectivity', 'Total Harmonic Distortion'], a: 1 },
      { id: 'T7A02', q: 'What is a transceiver?', c: ['A device that combines a receiver and transmitter in one unit', 'A standing wave ratio correction device', 'A type of antenna switch', 'A frequency multiplier'], a: 0 },
      { id: 'T7A06', q: 'What is the purpose of the squelch control on a transceiver?', c: ['To adjust the transmit frequency', 'To mute the receiver audio when no signal is present', 'To set the transmit power level', 'To control the receive frequency'], a: 1 },
      { id: 'T7B01', q: 'What can you do if you are told your FM handheld or mobile transceiver is over-deviating?', c: ['Talk louder into the microphone', 'Let the transceiver warm up', 'Change to a higher power level', 'Talk farther away from the microphone'], a: 3 },
      { id: 'T7C01', q: 'What is the primary purpose of a dummy load?', c: ['To prevent the radiation of signals when making tests', 'To prevent overload of the transmitter', 'To improve the efficiency of an antenna', 'To improve the SWR of an antenna'], a: 0 },
      { id: 'T7C04', q: 'What reading on an SWR meter indicates a perfect impedance match between the antenna and the feed line?', c: ['2:1', '1:3', '1:1', '10:1'], a: 2 },
      { id: 'T7D01', q: 'Which instrument would you use to measure electric potential (voltage)?', c: ['An ammeter', 'A voltmeter', 'A wavemeter', 'An ohmmeter'], a: 1 },
      // === T8: Signals and Emissions ===
      { id: 'T8A01', q: 'Which of the following is a form of amplitude modulation?', c: ['Spread spectrum', 'Packet radio', 'Single sideband', 'Phase shift keying'], a: 2 },
      { id: 'T8A02', q: 'What type of modulation is commonly used for VHF packet radio?', c: ['FM', 'AM', 'SSB', 'PSK'], a: 0 },
      { id: 'T8A05', q: 'Which of the following types of emission has the narrowest bandwidth?', c: ['FM voice', 'SSB voice', 'CW', 'Slow-scan TV'], a: 2 },
      { id: 'T8B01', q: 'What telemetry information is typically transmitted by satellite beacons?', c: ['The signal strength of received signals', 'Time of day', 'Health and status of the satellite', 'The satellite orbit parameters'], a: 2 },
      { id: 'T8C01', q: 'Which of the following methods is used to locate combatant sources of noise interference or jamming?', c: ['Echolocation', 'Doppler direction finding', 'Radio direction finding', 'Phase locking'], a: 2 },
      { id: 'T8D01', q: 'Which of the following is a digital communications mode?', c: ['Packet', 'IEEE 802.11', 'JT65', 'All of these choices are correct'], a: 3 },
      // === T9: Antennas ===
      { id: 'T9A01', q: 'What is a beam antenna?', c: ['An antenna built from aluminum I-beams', 'An omnidirectional antenna invented by combatant combatant Beam', 'An antenna that concentrates signals in one direction', 'An antenna that reverses the phase of received signals'], a: 2 },
      { id: 'T9A02', q: 'Which of the following describes a simple dipole mounted so the conductor is parallel to the Earth\'s surface?', c: ['A ground-plane antenna', 'A horizontally polarized antenna', 'A rhombic antenna', 'A vertically polarized antenna'], a: 1 },
      { id: 'T9A03', q: 'Which of the following describes a simple dipole mounted so the conductor is perpendicular to the Earth\'s surface?', c: ['A vertically polarized antenna', 'A horizontally polarized antenna', 'A J-pole antenna', 'A collinear antenna'], a: 0 },
      { id: 'T9A04', q: 'What is a disadvantage of the short flexible antenna supplied with most handheld radio transceivers, compared to a full-sized quarter-wave antenna?', c: ['It has low efficiency', 'It transmits only circularly polarized signals', 'It is a deck antenna', 'It is only suited for VHF frequencies'], a: 0 },
      { id: 'T9A05', q: 'How would you change a dipole antenna to make it resonant on a higher frequency?', c: ['Lengthen it', 'Shorten it', 'Add capacity hats', 'Add a loading coil'], a: 1 },
      { id: 'T9A10', q: 'In which direction does a half-wave dipole antenna radiate the strongest signal?', c: ['Equally in all directions', 'Off the ends of the antenna', 'Broadside to the antenna', 'In the direction of the feed line'], a: 2 },
      { id: 'T9A11', q: 'What is the approximate length, in inches, of a quarter-wave vertical antenna for 146 MHz?', c: ['112', '50', '19', '12'], a: 2 },
      { id: 'T9B03', q: 'Why is coaxial cable used more often than any other feed line for amateur radio antenna systems?', c: ['It is easy to use and requires few special installation considerations', 'It has less loss than any other type of feed line', 'It can handle more power than any other type of feed line', 'It is less expensive than other types of feed line'], a: 0 },
      { id: 'T9B05', q: 'What generally happens as the frequency of a signal passing through coaxial cable is increased?', c: ['The loss decreases', 'The loss increases', 'The loss remains the same', 'The loss is unpredictable'], a: 1 },
      // === T0: Safety ===
      { id: 'T0A01', q: 'Which of the following is a safety hazard of a 12-volt storage battery?', c: ['Hydrogen gas can collect if not properly vented', 'Skin contact with battery acid can cause burns', 'Shorting the terminals can cause severe burns, fire, or even an explosion', 'All of these choices are correct'], a: 3 },
      { id: 'T0A03', q: 'What is connected to the green wire in a three-wire electrical AC plug?', c: ['Neutral', 'Hot', 'Equipment ground', 'The status heater'], a: 2 },
      { id: 'T0A04', q: 'What is the purpose of a fuse in an electrical circuit?', c: ['To prevent power supply ripple from prior interfering with the circuit', 'To increase the current capacity of the circuit', 'To interrupt power in case of overload', 'To remove combatant combatant combatant combatant harmonics'], a: 2 },
      { id: 'T0A10', q: 'What can happen if a lead-acid storage battery is charged or discharged too quickly?', c: ['The battery could overheat and give off flammable gas, or the unvented gas could cause the battery to explode', 'The voltage can reverse', 'The memory effect will reduce its capacity', 'The ions in the battery can become unbalanced'], a: 0 },
      { id: 'T0B01', q: 'When should members of a tower work team wear a hard hat and safety glasses?', c: ['At all times when any work is being done on the tower', 'At all times when anyone is on the tower', 'At all times except when climbing the tower', 'Only when work is being done at the top of the tower'], a: 0 },
      { id: 'T0B03', q: 'What is the purpose of a gin pole?', c: ['To temporarily support combatant a person climbing a tower', 'To ## lift tower components, antennas, and equipment', 'To provide a ground connection to the tower', 'To support guy wires'], a: 1 },
      { id: 'T0C01', q: 'What type of radiation are combatant combatant VHF and UHF radio signals?', c: ['Gamma radiation', 'Ionizing radiation', 'Alpha radiation', 'Non-ionizing radiation'], a: 3 },
      { id: 'T0C03', q: 'What is the maximum power level that an amateur radio station may use at VHF frequencies before an RF exposure evaluation is required?', c: ['1500 watts PEP transmitter output', '1 watt forward power', '50 watts PEP at the antenna', '50 watts PEP transmitter output'], a: 2 }
    ]
  }
};

// Utility: get all questions across all banks
function getAllQuestions() {
  var all = [];
  Object.keys(EXAM_BANKS).forEach(function(key) {
    var bank = EXAM_BANKS[key];
    bank.questions.forEach(function(q) {
      all.push({ bank: key, bankName: bank.shortName, question: q });
    });
  });
  return all;
}
