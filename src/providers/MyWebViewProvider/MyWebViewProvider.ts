import * as vscode from "vscode";
import * as path from "path";
import { createHtml } from "./createHtml";

export class MyWebviewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "my-webview";

  private static readonly jsPath = "media/main.js";

  private static readonly stylePath = "media/main.css";

  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly _extensionUri: vscode.Uri) {}

  /**
   * interface実装
   * @param webviewView {vscode.WebviewView}
   * @param context {vscode.WebviewViewResolveContext}
   * @param token {vscode.CancellationToken}
   */
  public resolveWebviewView(webviewView: vscode.WebviewView): void {
    webviewView.webview.options = {
      // scriptの実行を許可する
      enableScripts: true,
      // mediaディレクトリのアクセスのみを許可する
      localResourceRoots: [
        vscode.Uri.file(path.join(this._extensionUri.fsPath, "media")),
      ],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  /**
   * webviewに表示するhtmlを取得
   */
  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview
      .asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, MyWebviewProvider.jsPath)
      )
      .toString();
    const styleUri = webview
      .asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, MyWebviewProvider.stylePath)
      )
      .toString();

    return createHtml({
      cspSource: webview.cspSource,
      scriptUri,
      styleUri,
    });
  }
}
