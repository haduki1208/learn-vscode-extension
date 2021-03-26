import * as vscode from "vscode";
import * as fs from "fs";
import { getNonce } from "./getNonce";

export class MyWebviewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "my-webview";

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // scriptの実行を許可する
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  /**
   * webviewに表示するhtmlを取得
   */
  private _getHtmlForWebview(webview: vscode.Webview) {
    const htmlUri = vscode.Uri.joinPath(this._extensionUri, "media/main.html");
    const htmlTemplate = getHtml(htmlUri.fsPath);
    const scriptUri = webview
      .asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media/main.js"))
      .toString();
    const styleUri = webview
      .asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media/main.css"))
      .toString();
    const nonce = getNonce();

    return bindParamsHtml(htmlTemplate, {
      cspSource: webview.cspSource,
      nonce,
      scriptUri,
      styleUri,
    });
  }
}

/**
 * htmlファイルを取得
 */
function getHtml(path: string): string {
  return fs.readFileSync(path, { encoding: "utf-8" });
}

type HtmlParams = {
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
function bindParamsHtml(html: string, params: HtmlParams): string {
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
