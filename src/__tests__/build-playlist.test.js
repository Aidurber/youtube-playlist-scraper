import { buildPlaylistVideos, buildPlaylist } from "../build-playlist";
import * as snapshot from "../__fixtures__/initial-data-0.json";
import * as snapshotHundredItems from "../__fixtures__/initial-data-1.json";
describe("Scraper", () => {
  describe("buildPlaylist", () => {
    it("should build the playlist payload", () => {
      const result = buildPlaylist(snapshot);
      expect(result.title).toEqual(
        "Chinese mini-stories | Chinese reading and listening (HSK Level 3&4)"
      );
    });
  });
  describe("buildPlaylistVideos", () => {
    it("should return parsed items", () => {
      const result = buildPlaylistVideos(snapshot);
      expect(result).toHaveLength(17);
      expect(result[0].name).toBe(
        "贪心的狮子 The Greedy Lion - Chinese Short Stories NO 17 | Chinese Reading and Listening"
      );
      expect(result[result.length - 1].name).toBe(
        "20 Dollars 20块 - Chinese Short Stories NO 1 | Chinese Reading and Listening"
      );
    });
    it("should return parsed items when over 100 items", () => {
      const result = buildPlaylistVideos(snapshotHundredItems);
      expect(result).toHaveLength(100);
      expect(result[0].name).toBe(
        "【那些年，我們一起追的女孩】電影主題曲《那些年》官方正式MV"
      );
      expect(result[result.length - 1].name).toBe(
        "陳奕迅 + 王菲 【因為愛情】MV"
      );
    });
  });
});
