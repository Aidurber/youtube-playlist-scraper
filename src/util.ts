import path from "path";
import fs from "fs";

const basePath = path.join(__dirname, "../tmp");
export const dumpFile = (contents: any): void => {
  const dumpName = new Date().toISOString().replace(/[:-TZ]/, "");
  const fileName = path.join(basePath, `${dumpName}.html`);
  console.log(fileName);
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }
  console.log("writing file");
  fs.writeFileSync(fileName, contents, { encoding: "utf-8" });
};
