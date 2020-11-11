import got from "got";
import get from "lodash.get";
import parseData from "./parseInitialData";

export type Video = {
  id: string;
  title: string;
  name: string;
};
export type Playlist = {
  title: string;
  playlist: Video[];
};

const getPlaylistUrl = (id: string): string =>
  `https://www.youtube.com/playlist?list=${id}`;

// No way I'm typing the ytInitialData
const extractItems = (data: object): Video[] => {
  const items = get(
    data,
    "contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents"
  );

  return items.map((item: any) => {
    const body = item.playlistVideoRenderer;
    const id = body.videoId;
    return {
      id,
      name: get(body, "title.runs[0].text") || "",
      url: `https://youtube.com/watch?v=${id}`,
    };
  });
};
export default async function scrapePlaylist(
  playlistId: string
): Promise<Playlist> {
  const url = getPlaylistUrl(playlistId);
  const { body: html } = await got(url);
  const data = parseData(html);
  if (data === null) {
    throw new Error("Unable to parse ytInitialData");
  }
  const maybeTitle = get(data, "metadata.playlistMetadataRenderer.title") || "";
  let payload: Playlist | null = null;
  try {
    payload = {
      title: maybeTitle.trim(),
      playlist: extractItems(data) || [],
    };
  } catch (error) {
    throw new Error("Unable to parse body");
  }
  return payload;
}