#!/bin/env node

const fs = require('fs');
const emojis = require("emoji-datasource/emoji.json")


const extractEmojiData = emoji => {
  return {
    name: emoji.name,
    short_name: emoji.short_name,
    short_names: emoji.short_names,
    unified: emoji.unified,
    non_qualified: emoji.non_qualified,
    category: emoji.category,
    sort_order: emoji.sort_order,
    skin_variations: extractSkinVariations(emoji),
  }
}

const compareSortOrder = (a,b) => {
	if ( a.sort_order < b.sort_order ){
		return -1;
	}
	if ( a.sort_order > b.sort_order ){
		return 1;
	}
	return 0;
}

const extractSkinVariations = emoji => {
  if (emoji.skin_variations) {
    var res = {}
    Object.entries(emoji.skin_variations).forEach(entry => {
      const [key, value] = entry
      res[key] = value.unified
    })
    return res
  }
}

const genUnicodeEntry = (codepoint, category, sort_order) => {
  return {
    "name": String.fromCodePoint(codepoint),
    "short_name": unicodeNames.get(codepoint),
    "short_names": [],
    "unified": codepoint.toString(16).toUpperCase(),
    "non_qualified": null,
    "category": category,
    "sort_order": sort_order
  }
}

const unicodeNames = require('@unicode/unicode-13.0.0/Names');

var filtered_emojis = emojis.sort(compareSortOrder).map(extractEmojiData)

// Fractions
filtered_emojis.push(genUnicodeEntry(0xBD,   "Unicode Numbers", 1)) // ½
filtered_emojis.push(genUnicodeEntry(0xBC,   "Unicode Numbers", 2)) // ¼
filtered_emojis.push(genUnicodeEntry(0xBE,   "Unicode Numbers", 3)) // ¾
filtered_emojis.push(genUnicodeEntry(0x2150, "Unicode Numbers", 3)) // ⅐
filtered_emojis.push(genUnicodeEntry(0x2151, "Unicode Numbers", 5)) // ⅑
filtered_emojis.push(genUnicodeEntry(0x2152, "Unicode Numbers", 6)) // ⅒
filtered_emojis.push(genUnicodeEntry(0x2153, "Unicode Numbers", 7)) // ⅓
filtered_emojis.push(genUnicodeEntry(0x2154, "Unicode Numbers", 8)) // ⅔
filtered_emojis.push(genUnicodeEntry(0x2155, "Unicode Numbers", 10)) // ⅕
filtered_emojis.push(genUnicodeEntry(0x2156, "Unicode Numbers", 11)) // ⅖
filtered_emojis.push(genUnicodeEntry(0x2157, "Unicode Numbers", 12)) // ⅗
filtered_emojis.push(genUnicodeEntry(0x2158, "Unicode Numbers", 13)) // ⅘
filtered_emojis.push(genUnicodeEntry(0x2159, "Unicode Numbers", 14)) // ⅙
filtered_emojis.push(genUnicodeEntry(0x215A, "Unicode Numbers", 15)) // ⅚
filtered_emojis.push(genUnicodeEntry(0x215B, "Unicode Numbers", 16)) // ⅛
filtered_emojis.push(genUnicodeEntry(0x215C, "Unicode Numbers", 17)) // ⅜
filtered_emojis.push(genUnicodeEntry(0x215D, "Unicode Numbers", 18)) // ⅝
filtered_emojis.push(genUnicodeEntry(0x215E, "Unicode Numbers", 19)) // ⅞
filtered_emojis.push(genUnicodeEntry(0x215F, "Unicode Numbers", 19)) // ⅟

// superscript numbers
filtered_emojis.push(genUnicodeEntry(0x2070, "Unicode Numbers", 20)) // ⁰
filtered_emojis.push(genUnicodeEntry(0xB9,   "Unicode Numbers", 21)) // ¹
filtered_emojis.push(genUnicodeEntry(0xB2,   "Unicode Numbers", 22)) // ²
filtered_emojis.push(genUnicodeEntry(0xB3,   "Unicode Numbers", 23)) // ³
filtered_emojis.push(genUnicodeEntry(0x2074, "Unicode Numbers", 24)) // ⁴
filtered_emojis.push(genUnicodeEntry(0x2075, "Unicode Numbers", 25)) // ⁵
filtered_emojis.push(genUnicodeEntry(0x2076, "Unicode Numbers", 26)) // ⁶
filtered_emojis.push(genUnicodeEntry(0x2077, "Unicode Numbers", 27)) // ⁷
filtered_emojis.push(genUnicodeEntry(0x2078, "Unicode Numbers", 28)) // ⁸
filtered_emojis.push(genUnicodeEntry(0x2079, "Unicode Numbers", 29)) // ⁹

// Misc symbols
filtered_emojis.push(genUnicodeEntry(0x2103, "Unicode Symbols", 1)) // ℃
filtered_emojis.push(genUnicodeEntry(0x2109, "Unicode Symbols", 2)) // ℉
filtered_emojis.push(genUnicodeEntry(0x2122, "Unicode Symbols", 3)) // ™

fs.writeFileSync('emoji-selector@maestroschan.fr/data/emoji.js', "var ALL = " + JSON.stringify(filtered_emojis, null, 2));
console.log("Wrote emoji data to: emoji-selector@maestroschan.fr/data/emoji.js")

