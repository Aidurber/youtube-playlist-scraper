/**
 * Try and parse JSON
 * @param {*} str - JSON to parse
 */
const tryParseJson = (str) => {
  let data = null;
  try {
    data = JSON.parse(str);
  } catch {}
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
