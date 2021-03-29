import * as vscode from "vscode";
import { getNonce } from "./getNonce";
import { createHtml } from "./createHtml";

export class MyWebviewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "my-webview";

  private _view?: vscode.WebviewView;

  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly _extensionUri: vscode.Uri) {}

  /**
   * interface実装
   * @param webviewView {vscode.WebviewView}
   * @param context {vscode.WebviewViewResolveContext}
   * @param token {vscode.CancellationToken}
   */
  public resolveWebviewView(webviewView: vscode.WebviewView): void {
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
    const scriptUri = webview
      .asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media/main.js"))
      .toString();
    const styleUri = webview
      .asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media/main.css"))
      .toString();
    const nonce = getNonce();

    return createHtml({
      cspSource: webview.cspSource,
      nonce,
      scriptUri,
      styleUri,
    });
  }
}
