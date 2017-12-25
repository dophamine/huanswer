
function huyanswer(word, debug) {
    const reactions = ["норм слово придумай, имбецил", "что это было? тебе плохо?", "ты шо, с балкона выпал", "меня не наебёшь", "иди нахуй с таким словом", "мамку так свою называй", "затяни лямку сынок", "решил меня сломать, шалун?"];
    function getReaction() {
      return reactions[Math.floor(Math.random() * reactions.length)];
    }
    try {
      if (!word) return getReaction();
      word = word.toString();
      word = word.trim().toLowerCase();
      const maxNonPrefixLength = 11;
      const minNonPrefixLength = 3;
      const origin = word;
      const vowelsDict = { "а": "уя", "и": "уи", "у": "ую", "э": "уе", "и": "уи", "е": "уе", "ё": "уё", "о": "уё", "ы": "уи", "я": "уя" };
      // const otherLetters = ["б", "в", "г", "д", "ж", "з", "й", "к", "л", "м", "н", "п", "р", "с", "т", "ф", "х", "ц", "ч", "ш", "щ", "ь", "ъ"];
      const prefixes = ["без", "бес", "разо", "рас", "роз", "про", "при", "пред", "пре", "раз", "надо", "над", "за", "до", "от", "из"];

      let wordPrefix;
      let prefixRegexp = new RegExp("^(" + prefixes.join("|") + ")");
      let npWord = word.replace(prefixRegexp, (match) => {
        wordPrefix = match;
        return "";
      });

      if (wordPrefix && npWord.length >= minNonPrefixLength) {
        word = npWord;
      } else {
        wordPrefix = "";
      }

      let vowels = Object.keys(vowelsDict);
      let existantVowelsIds = [];

      for (let i = 0; i < word.length; i++) {
        vowels.includes(word[i]) && existantVowelsIds.push(i);
      }
      debug && console.log(existantVowelsIds);

      // use first vowel
      let vowelIndex = 0;
      if (existantVowelsIds.length > 1 && existantVowelsIds[0] == 0 && word.length > 5) {
        ++vowelIndex;
      }

      let rootVowel = word[existantVowelsIds[vowelIndex]];
      let rootRegExp = new RegExp(`[^${rootVowel}]*([${rootVowel}])`);
      let answer = word.replace(
        rootRegExp,
        (match, p1, offset, initial) => {
          debug && console.log(match, p1, existantVowelsIds[vowelIndex]);
          return "х" + vowelsDict[p1];
        }
      );

      if (answer.length >= maxNonPrefixLength) {
        answer = wordPrefix + answer;
      }

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
