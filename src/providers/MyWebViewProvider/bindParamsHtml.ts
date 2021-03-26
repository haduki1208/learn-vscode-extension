export type HtmlParams = {
  // コンテンツセキュリティポリシー文字列 https://developer.mozilla.org/ja/docs/Web/HTTP/CSP
  cspSource: string;
  // https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Security-Policy/script-src
  nonce: string;
  scriptUri: string;
  styleUri: string;
};

/**
 * htmlにpathを埋め込む
 * @param html 文字列を埋め込むhtml文字列
 * @param params scriptのsrc, cssのhrefなど埋め込む予定の文字列
 */
export function bindParamsHtml(html: string, params: HtmlParams): string {
  const cspSourceRegExp = /\$\{cspSource\}/g;
  const nonceRegExp = /\$\{nonce\}/g;
  const scriptUriRegExp = /\$\{scriptUri\}/g;
  const styleUriRegExp = /\$\{styleUri\}/g;

  return html
    .replace(cspSourceRegExp, params.cspSource)
    .replace(nonceRegExp, params.nonce)
    .replace(scriptUriRegExp, params.scriptUri)
    .replace(styleUriRegExp, params.styleUri);
}
