"use strict";

function huanswer(word, config = {}) {
  const DEFAULTS = {
    // turn on/off debug messages
    debug: false,
    // turn on/off reactions for errors, validatings fails, etc.
    reactForFails: true,
    // this letters will be as replacer
    mainReplacer: 'ху',
    // some random reactions
    reactions: ["норм слово придумай", "что это было? тебе плохо?", "меня не обманешь, я программист", "меня не проведешь", "затяни лямку, сынок", "решил меня сломать, шалун?"],
    // replacer rules as for the default mainReplacer 
    vowelsDict: { "а": "я", "и": "и", "у": "ю", "э": "е", "и": "и", "е": "е", "ё": "ё", "о": "ё", "ы": "и", "я": "я" },
    // predefined word prefixes
    prefixes: ["без", "бес", "разо", "рас", "роз", "про", "при", "пред", "пре", "раз", "надо", "над", "за", "до", "от", "из"],
    // how long can be a word without prefix concatenation in result
    maxNonPrefixLength: 11,
    // how short can be a word without prefix
    minNonPrefixLength: 4,
    // word length without prefix which seems complicated (used for finding correct word root)
    complicatedWordMinLength: 5
  };

  config = Object.assign({}, DEFAULTS, config);

  function getReaction() {
    if (config.reactForFails) {
      return config.reactions[Math.floor(Math.random() * config.reactions.length)];
    } else {
      return "";
    }
  };

  try {
    if (!word) return getReaction();
    // validate input and store origin
    word = word.toString().trim().toLowerCase();
    const origin = word;

    // search for word prefix
    let wordPrefix;
    let prefixRegExp = new RegExp("^(" + config.prefixes.join("|") + ")");
    // get non-prefixed word
    let npWord = word.replace(prefixRegExp, match => (wordPrefix = match, ""));

    // validate prefix
    if (wordPrefix && npWord.length >= config.minNonPrefixLength) {
      word = npWord;
    } else {
      wordPrefix = "";
    }

    // get vowels list for search
    let vowels = Object.keys(config.vowelsDict);
    let existantVowelsIds = [];

    // collect all vowels indexes from word
    for (let i = 0; i < word.length; i++) {
      vowels.includes(word[i]) && existantVowelsIds.push(i);
    }
    config.debug && console.log(existantVowelsIds);

    // use first vowel
    let vowelIndex = 0;
    // or use next vowel in a word if this word:
    //    have more than {1} vowels, 
    //    starts with vowel, 
    //    too long (length > {config.complicatedWordMinLength})
    if (existantVowelsIds.length > 1 && existantVowelsIds[0] == 0 && word.length > config.complicatedWordMinLength) {
      ++vowelIndex;
    }

    // get the main vowel as root
    let rootVowel = word[existantVowelsIds[vowelIndex]];
    const rootRegExp = new RegExp(`[^${rootVowel}]*([${rootVowel}])`);
    // replace unnecessary letters by config.mainReplacer
    let answer = word.replace(
      rootRegExp,
      (match, p1, offset, initial) => {
        config.debug && console.log(match, p1, existantVowelsIds[vowelIndex]);
        return config.mainReplacer + config.vowelsDict[p1];
      }
    );

    // decide to concat the prefix with answer or not
    if (answer.length >= config.maxNonPrefixLength) {
      answer = wordPrefix + answer;
    }

    // validate answer
    if (answer === origin) {
      return getReaction();
    } else {
      return answer;
    }
  } catch (e) {
    config.debug && console.error(e);
    return getReaction();
  }
}
