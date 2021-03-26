import * as vscode from "vscode";
import { getNonce } from "./getNonce";
import { getHtml } from "./getHtml";
import { bindParamsHtml } from "./bindParamsHtml";

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
