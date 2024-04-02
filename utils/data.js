const names = [
  'Aelin',
  'Chaol',
  'Dorian',
  'Rowan',
  'Manon',
  'Nehemia',
  'Lysandra',
  'Aedion',
  'Elide',
  'Lorcan',
  'Feyre',
  'Rhysand',
  'Tamlin',
  'Lucien',
  'Nesta',
  'Elain',
  'Cassian',
  'Azriel',
  'Morrigan',
  'Amren',
];

const thoughtDescriptions = [
  'Battling evil forces',
  'Fighting for justice',
  'Harnessing magical powers',
  'Training fierce warriors',
  'Commands ruthless armies',
  'Shapeshifts into animals',
  'Leading rebel forces',
  'Surviving against all odds and possibilities',
  'Hunting powerful enemies',
  'Exploring magical realms',
  'Protecting a court',
  'Guarding the realm',
  'Supporting your friends',
  'Confronting inner demons',
  'Embracing newfound powers',
  'Training elite soldiers',
  'Uncovering secrets',
  'Revealing ancient knowledge',
];

const postReactions = [
  '(✿◠‿◠)',
  '☆(❁‿❁)☆',
  '(∪ ◡ ∪)',
  ' ヽ(‘ ∇‘ )ノ',
  '(✖﹏✖)',
  '(╯_╰)',
  '(ㄒoㄒ)',
  'o(╥﹏╥)o',
  '(◣_◢)',
  '（￣へ￣）',
  '(￣。￣)～ｚｚｚ',
];


const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];


const getRandomName = () => getRandomArrayItem(names);


const getRandomThought = () => getRandomArrayItem(thoughtDescriptions);


const getRandomReaction = () => getRandomArrayItem(postReactions);

module.exports = { getRandomName, getRandomThought, getRandomReaction };