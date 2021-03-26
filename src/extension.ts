import * as vscode from "vscode";
import { MyTreeProvider } from "./providers/MyTreeProvider/MyTreeProvider";
import { MyWebviewProvider } from "./providers/MyWebViewProvider/MyWebViewProvider";

// 拡張機能起動時に実行される
export function activate(context: vscode.ExtensionContext) {
  // my-activitybarアクティビティにtreeコンテンツを設定する
  // 関連: activationEvents onView:id
  // 関連: views.my-tree
  const myTreeDisposable = vscode.window.registerTreeDataProvider(
    MyTreeProvider.viewType,
    new MyTreeProvider()
  );
  context.subscriptions.push(myTreeDisposable);

  // my-activitybarアクティビティにwebviewコンテンツを設定する
  // 関連: activationEvents onView:id
  // 関連: views.my-tree
  const myWebviewDisposable = vscode.window.registerWebviewViewProvider(
    MyWebviewProvider.viewType,
    new MyWebviewProvider(context.extensionUri)
  );
  context.subscriptions.push(myWebviewDisposable);
}

// 拡張機能終了時に実行される
export function deactivate() {}
