const got = require("got");
const get = require("lodash.get");
const parseData = require("./parseInitialData");
const getPlaylistUrl = (id) => `https://www.youtube.com/playlist?list=${id}`;

const extractItems = (data) => {
  const items = get(
    data,
    "contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents"
  );

  return items.map((item) => {
    const body = item.playlistVideoRenderer;
    const id = body.videoId;
    return {
      id,
      name: get(body, "title.runs[0].text") || "",
      url: `https://youtube.com/watch?v=${id}`,
    };
  });
};
module.exports = async (playlistId) => {
  const url = getPlaylistUrl(playlistId);
  const { body: html } = await got(url);
  const data = parseData(html);
  console.log(data);
  const maybeTitle = get(data, "metadata.playlistMetadataRenderer.title") || "";

  let payload = null;
  try {
    payload = {
      title: maybeTitle.trim(),
      playlist: extractItems(data) || [],
    };
  } catch (error) {
    throw new Error("Unable to parse body");
  }
  return payload;
};
