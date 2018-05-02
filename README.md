# Huanswer
Script-joke just for fun (18+). 

Replaces given word with some interesting rules.

[DEMO](https://dophamine.github.io/huanswer/)

## Usage
```javascript
huanswer("слово");
// -> "ху#во"

huanswer("собака", {
  mainReplacer: "улы",
  reactForFails: false,
  ignoreVowelsLinkingRules: true
});
// -> "улыбака"

huanswer("собака", {
  mainReplacer: "кот",
  reactForFails: false,
  vowelsDict: { "а": "а", "и": "и", "у": "у", "э": "э", "и": "и", "е": "е", "ё": "ё", "о": "о", "ы": "ы", "я": "я" },
  complicatedWordMinLength: 4
});
// -> "котобака"
```
---
[Details and explanation here](https://github.com/dophamine/huanswer/blob/master/huanswer.js)
