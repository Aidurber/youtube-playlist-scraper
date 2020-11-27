import fetch from "node-fetch";
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
export const extractItems = (data: object): Video[] => {
  const items = get(
    data,
    "contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents"
  );

  return items.reduce((acc: Video[], item: any) => {
    if (typeof item.playlistVideoRenderer === "undefined") return acc;
    const body = item.playlistVideoRenderer;
    const id = body.videoId;
    return [
      ...acc,
      {
        id,
        name: get(body, "title.runs[0].text") || "",
        url: `https://youtube.com/watch?v=${id}`,
      },
    ];
  }, []);
};

export const createPayload = (data: object): Playlist => {
  const maybeTitle = get(data, "metadata.playlistMetadataRenderer.title") || "";
  let payload: Playlist | null = null;

  payload = {
    title: maybeTitle.trim(),
    playlist: extractItems(data) || [],
  };
  return payload;
};
export default async function scrapePlaylist(
  playlistId: string
): Promise<Playlist> {
  const url = getPlaylistUrl(playlistId);
  const response = await fetch(url);
  const html = await response.text();
  if (!response.ok) {
    throw new Error(`Unable to fetch playlist with ID: ${playlistId}`);
  }
  const data = parseData(html);
  if (data === null) {
    throw new Error("Unable to parse ytInitialData");
  }
  try {
    return createPayload(data);
  } catch (error) {
    throw new Error("Unable to parse body");
  }
}
