import allRegExData from 'tamil-language-tools-and-assets';

/**
 * Helper: extract literal string from regex (handles escaped characters like \@)
 */
function getLegacyStringFromRegex(regex: RegExp): string {
  return regex.source.replace(/\\(.)/g, '$1'); // unescape \@ -> @
}

/**
 * Converts any legacy font → Unicode using cluster-first replacement
 */
const convertLegacyToUnicode = (text: string, fontFrom: string) => {
  const rawMapping = (allRegExData as Record<string, (RegExp | string)[][]>)[
    fontFrom
  ];
  if (!rawMapping) throw new Error(`Unknown font: ${fontFrom}`);

  // Build mapping: [legacy string, Unicode string]
  const mapping: [string, string][] = rawMapping
    .filter(
      (entry): entry is [RegExp, string] =>
        Array.isArray(entry) &&
        entry.length === 2 &&
        entry[0] instanceof RegExp &&
        typeof entry[1] === 'string'
    )
    .map(([regex, unicode]) => [regex.source.replace(/\\(.)/g, '$1'), unicode]);

  // Cluster by first legacy character
  const clusters: Record<string, [string, string][]> = {};
  for (const [legacyStr, unicodeStr] of mapping) {
    const firstChar = legacyStr[0]; // cluster by legacy first char
    if (!clusters[firstChar]) clusters[firstChar] = [];
    clusters[firstChar].push([legacyStr, unicodeStr]);
  }

  // Sort clusters by legacy string length descending
  for (const key in clusters) {
    clusters[key].sort((a, b) => b[0].length - a[0].length);
  }

  // Flatten clusters
  const orderedMapping: [string, string][] = [];
  Object.values(clusters).forEach((cluster) => orderedMapping.push(...cluster));

  // Multi-level scanning replacement
  let result = '';
  let i = 0;
  while (i < text.length) {
    const currentChar = text[i];
    const clusterGroup = clusters[currentChar] || [];
    let matched = false;

    for (const [legacyStr, unicodeStr] of clusterGroup) {
      if (text.startsWith(legacyStr, i)) {
        result += unicodeStr;
        i += legacyStr.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result += text[i];
      i++;
    }
  }

  return result;
};

/**
 * Converts Unicode → any legacy font using cluster-first replacement
 */
const convertUnicodeToLegacy = (text: string, fontTo: string) => {
  const rawMapping = (allRegExData as Record<string, (RegExp | string)[][]>)[
    fontTo
  ];
  if (!rawMapping) throw new Error(`Unknown font: ${fontTo}`);

  // Build mapping: [legacy string, Unicode string]
  const mapping: [string, string][] = rawMapping
    .filter(
      (entry): entry is [RegExp, string] =>
        Array.isArray(entry) &&
        entry.length === 2 &&
        entry[0] instanceof RegExp &&
        typeof entry[1] === 'string'
    )
    .map(([regex, unicode]) => [getLegacyStringFromRegex(regex), unicode]);

  // Build clusters by first Unicode character
  const clusters: Record<string, [string, string][]> = {};
  for (const [legacyStr, unicodeStr] of mapping) {
    const firstChar = unicodeStr[0];
    if (!clusters[firstChar]) clusters[firstChar] = [];
    clusters[firstChar].push([legacyStr, unicodeStr]);
  }

  // Sort clusters by Unicode length descending
  for (const key in clusters) {
    clusters[key].sort((a, b) => b[1].length - a[1].length);
  }

  // Flatten clusters
  const orderedMapping: [string, string][] = [];
  Object.values(clusters).forEach((cluster) => orderedMapping.push(...cluster));

  // Multi-level scanning replacement
  let result = '';
  let i = 0;
  while (i < text.length) {
    const currentChar = text[i];
    const clusterGroup = clusters[currentChar] || [];
    let matched = false;

    for (const [legacyStr, unicodeStr] of clusterGroup) {
      if (text.startsWith(unicodeStr, i)) {
        result += legacyStr;
        i += unicodeStr.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result += text[i];
      i++;
    }
  }

  return result;
};

/**
 * Main universal converter
 */
export const convertText = (text: string, fontFrom: string, fontTo: string) => {
  if (!fontFrom || !fontTo) throw new Error('Font selection is incomplete');
  if (fontFrom.toLowerCase() === fontTo.toLowerCase()) return text;

  // Convert source to Unicode if necessary
  const unicodeText =
    fontFrom.toLowerCase() === 'unicode'
      ? text
      : convertLegacyToUnicode(text, fontFrom);

  if (fontTo.toLowerCase() === 'unicode') return unicodeText;

  // Convert Unicode → target legacy font
  return convertUnicodeToLegacy(unicodeText, fontTo);
};

export default convertText;
