
function huyanswer(word, config = {}) {
    let defaults = {
      debug: false,
      mainReplacer: 'ху',
      // some random reactions
      reactions: ["норм слово придумай", "что это было? тебе плохо?", "меня не обманешь, я программист", "меня не проведешь", "попрошу Вас любезно выйти", "затяни лямку, сынок", "решил меня сломать, шалун?"],
      // replacer rules as for the default mainReplacer 
      vowelsDict: { "а": "я", "и": "и", "у": "ю", "э": "е", "и": "и", "е": "е", "ё": "ё", "о": "ё", "ы": "и", "я": "я" },
      // predefined word prefixes
      prefixes: ["без", "бес", "разо", "рас", "роз", "про", "при", "пред", "пре", "раз", "надо", "над", "за", "до", "от", "из"],
      // not needed
      /* otherLetters: ["б", "в", "г", "д", "ж", "з", "й", "к", "л", "м", "н", "п", "р", "с", "т", "ф", "х", "ц", "ч", "ш", "щ", "ь", "ъ"], */

      // how long can be a word without prefix concatenation in result
      maxNonPrefixLength: 11,
      // how short can be a word without prefix
      minNonPrefixLength: 4,
      // word length without prefix which seems complicated (used for finding correct word root)
      complicatedWordMinLength: 5
    };
    config = Object.assign(defaults, config);

    function getReaction() {
      return config.reactions[Math.floor(Math.random() * config.reactions.length)];
    };

    try {
      if (!word) return getReaction();
      // validate input
      word = word.toString();
      word = word.trim().toLowerCase();
      const origin = word;

      // search for word prefix
      let wordPrefix;
      let prefixRegexp = new RegExp("^(" + config.prefixes.join("|") + ")");
      // get non-prefixed word
      let npWord = word.replace(prefixRegexp, match => {
        wordPrefix = match;
        return "";
      });

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
      // or use next vowel in a word if this word
      //    have more than {1} vowels, 
      //    starts with vowel, 
      //    too long (length > {5})
      if (existantVowelsIds.length > 1 && existantVowelsIds[0] == 0 && word.length > config.complicatedWordMinLength) {
        ++vowelIndex;
      }

      // get the main vowel as root
      let rootVowel = word[existantVowelsIds[vowelIndex]];
      let rootRegExp = new RegExp(`[^${rootVowel}]*([${rootVowel}])`);
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
      debug && console.log(e);
      return getReaction();
    }
}
