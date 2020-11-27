import { extractItems } from "../index";
import * as snapshot from "../__fixtures__/initial-data-0.json";
import * as snapshotHundredItems from "../__fixtures__/initial-data-1.json";
describe("Scraper", () => {
  describe("extractItems", () => {
    it("should return parsed items", () => {
      const result = extractItems(snapshot);
      expect(result).toHaveLength(17);
      const first = result[0];
      const last = result[result.length - 1];
      expect(first.name).toBe(
        "贪心的狮子 The Greedy Lion - Chinese Short Stories NO 17 | Chinese Reading and Listening"
      );
      expect(last.name).toBe(
        "20 Dollars 20块 - Chinese Short Stories NO 1 | Chinese Reading and Listening"
      );
    });
    it("should return parsed items when over 100 items", () => {
      const result = extractItems(snapshotHundredItems);
      expect(result).toHaveLength(100);
      const first = result[0];
      const last = result[result.length - 1];
      expect(first.name).toBe(
        "【那些年，我們一起追的女孩】電影主題曲《那些年》官方正式MV"
      );
      expect(last.name).toBe("陳奕迅 + 王菲 【因為愛情】MV");
    });
  });
});
