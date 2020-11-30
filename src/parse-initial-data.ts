/**
 * Try and parse JSON
 * @param {*} str - JSON to parse
 */
const tryParseJson = (str: string): object => {
  let data = null;
  try {
    data = JSON.parse(str);
  } catch (e) {
    console.log(e);
  }
  return data;
};

/**
 * Extract the YT Initial Data from the markup
 * @param html - HTML string
 */
export default function parseInitialData(html: string) {
  if (!html || !html.length) return null;
  var match = html.match(
    /(?:window\["ytInitialData"\]|var ytInitialData) = ([^\n]+);/m
  );
  if (!match || !match[1]) return null;
  return tryParseJson(match[1]) || null;
}
