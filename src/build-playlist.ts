import get from "lodash.get";
import { Playlist, Video } from "./types";

export const buildPlaylistVideos = (data: object): Video[] => {
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
        name: get(body, "title.runs[0].text", ""),
        url: `https://youtube.com/watch?v=${id}`,
      },
    ];
  }, []);
};

export const buildPlaylist = (data: object): Playlist => {
  const maybeTitle = get(data, "metadata.playlistMetadataRenderer.title", "");
  return {
    title: maybeTitle.trim(),
    playlist: buildPlaylistVideos(data),
  };
};
