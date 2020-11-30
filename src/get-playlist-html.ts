import fetch, { RequestInit } from "node-fetch";
import { mergeDeep } from "./utils";

const getPlaylistUrl = (id: string): string =>
  `https://www.youtube.com/playlist?list=${id}`;

const FETCH_DEFAULTS: RequestInit = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36",
  },
};
/**
 * Fetch the HTML for the given playlist ID
 * @param playlistId - ID of playlist
 */
export async function getPlaylistHtml(
  playlistId: string,
  fetchOptions?: RequestInit
): Promise<string> {
  const options: RequestInit = mergeDeep(FETCH_DEFAULTS, fetchOptions || {});
  const response = await fetch(getPlaylistUrl(playlistId), options);
  const html = await response.text();
  if (!response.ok) {
    throw new Error(`Unable to fetch playlist with ID: ${playlistId}`);
  }
  return html;
}
