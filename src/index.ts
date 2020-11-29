import { buildPlaylist } from "./build-playlist";
import { getPlaylistHtml } from "./get-playlist-html";
import parseData from "./parse-initial-data";
import { Playlist } from "./types";
export * from "./types";

/**
 * Try and scrape the playlist for a given ID
 *
 * @param playlistId - ID of the playlist we wish to scrape
 */
export async function scrapePlaylist(playlistId: string): Promise<Playlist> {
  const html = await getPlaylistHtml(playlistId);
  const data = parseData(html);
  if (data === null) {
    throw new Error("Unable to parse ytInitialData");
  }
  try {
    return buildPlaylist(data);
  } catch (error) {
    throw new Error("Unable to parse body");
  }
}
