export type HtmlParams = {
  // コンテンツセキュリティポリシー文字列 https://developer.mozilla.org/ja/docs/Web/HTTP/CSP
  cspSource: string;
  // https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Security-Policy/script-src
  nonce: string;
  scriptUri: string;
  styleUri: string;
};

/**
 * htmlを作成
 */
export function createHtml({
  cspSource,
  nonce,
  scriptUri,
  styleUri,
}: HtmlParams): string {
  // cspSource と nonce の設定を行うこと
  return `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'none'; style-src ${cspSource}; script-src 'nonce-${nonce}';"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="${styleUri}" rel="stylesheet" />
        <title>メインHTML</title>
      </head>
      <body>
        <div id="app"></div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
    </html>
  `;
}
