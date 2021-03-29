export type HtmlParams = {
  cspSource: string;
  scriptUri: string;
  styleUri: string;
};

/**
 * htmlを作成。link, scriptには cspSource の設定をする。
 * https://developer.mozilla.org/ja/docs/Web/HTTP/CSP
 * https://code.visualstudio.com/api/extension-guides/webview#content-security-policy
 */
export function createHtml({
  cspSource,
  scriptUri,
  styleUri,
}: HtmlParams): string {
  const csp = [
    `default-src 'none'`,
    `script-src ${cspSource}`,
    `style-src ${cspSource}`,
    `img-src ${cspSource}`,
  ].join("; ");

  return `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Security-Policy" content="${csp}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>メインHTML</title>
        <link href="${styleUri}" rel="stylesheet">
      </head>
      <body>
        <div id="app"></div>
        <script src="${scriptUri}"></script>
      </body>
    </html>
  `;
}
