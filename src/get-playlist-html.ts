import fetch from "node-fetch";

const getPlaylistUrl = (id: string): string =>
  `https://www.youtube.com/playlist?list=${id}`;

/**
 * Fetch the HTML for the given playlist ID
 * @param playlistId - ID of playlist
 */
export async function getPlaylistHtml(playlistId: string): Promise<string> {
  const response = await fetch(getPlaylistUrl(playlistId));
  const html = await response.text();
  if (!response.ok) {
    throw new Error(`Unable to fetch playlist with ID: ${playlistId}`);
  }
  return html;
}
