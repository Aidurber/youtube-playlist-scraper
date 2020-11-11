/**
 * Try and parse JSON
 * @param {*} str - JSON to parse
 * @param {*} doubleParse - Data could be doubly escaped JSON
 */
const tryParseJson = (str, doubleParse = false) => {
  let data = null;
  try {
    data = JSON.parse(str);
  } catch (error) {
    if (doubleParse === false) {
      data = tryParseJson(str, true);
    } else {
      throw error;
    }
  }
  return data;
};

module.exports = function (html) {
  if (!html || !html.length) return {};
  var match = html.match(
    /(?:window\["ytInitialData"\]|var ytInitialData) = ([^\n]+);/
  );
  if (!match && !match[1]) return null;
  return tryParseJson(match[1]) || {};
};
