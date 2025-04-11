import * as fontMapping from "../assets/fontMapping";

export const convertText = (text, fontFrom, fontTo) => {

    if (!fontFrom || !fontTo) {
        throw new Error("Font selection is incomplete");
    }

    if(fontFrom.toLowerCase() === fontTo.toLowerCase()){
        return text;
    }

    let unicodeText = "";
    if(fontFrom.toLowerCase() !== "unicode"){
        unicodeText = convertToUnicode(text, fontFrom);
        if(fontTo.toLowerCase() === "unicode"){
            return unicodeText;
        }
    }

    if(fontFrom.toLowerCase() === "unicode"){
        unicodeText = text;
    }

    let convertedText = "";
    convertedText = convertFromUnicode(unicodeText, fontTo)
    return convertedText;
};

const convertToUnicode = (text, fontFrom) => {
    const mapping = fontMapping[fontFrom.toLowerCase()];
    if (!mapping) throw new Error(`Unknown font: ${fontFrom}`);

    for (const regexStr in mapping) {
        const match = regexStr.match(/^\/(.+)\/([gimsuy]*)$/);
        if (!match) throw new Error(`Invalid regex string: ${regexStr}`);
        
        const [, pattern, flags] = match;
        const regex = new RegExp(pattern, flags);

        text = text.replace(regex, mapping[regexStr]);
    }

    return text;
};

const convertFromUnicode = (text, fontTo) => {
    const mapping = fontMapping[fontTo.toLowerCase()];
    if (!mapping) throw new Error(`Unknown font: ${fontTo}`);

    // Build reversed map: Unicode string → source font pattern string (not regex)
    const reverseMap = {};

    for (const [regexStr, unicodeValue] of Object.entries(mapping)) {
        const match = regexStr.match(/^\/(.+)\/([gimsuy]*)$/);
        if (!match) throw new Error(`Invalid regex string: ${regexStr}`);
        const [, pattern] = match;
        reverseMap[unicodeValue] = pattern;
    }

    // Sort by descending length of unicodeValue to avoid partial conflicts
    const sortedEntries = Object.entries(reverseMap).sort((a, b) => b[0].length - a[0].length);

    for (const [unicode, original] of sortedEntries) {
        const escapedUnicode = unicode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape if needed
        text = text.replace(new RegExp(escapedUnicode, "g"), original);
    }

    return text;
};



export default convertText;