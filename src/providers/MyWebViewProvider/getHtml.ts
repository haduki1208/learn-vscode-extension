import * as fs from "fs";

/**
 * htmlファイルを取得
 */
export function getHtml(path: string): string {
  return fs.readFileSync(path, { encoding: "utf-8" });
}
