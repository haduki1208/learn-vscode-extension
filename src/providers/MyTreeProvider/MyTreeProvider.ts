import * as vscode from "vscode";
import { MyTreeItem } from "./MyTreeItem";

export class MyTreeProvider implements vscode.TreeDataProvider<MyTreeItem> {
  public static readonly viewType = "my-tree";

  /**
   * interface実装
   * @param element {MyTreeItem}
   */
  public getTreeItem(element: MyTreeItem): vscode.TreeItem {
    return element;
  }

  /**
   * interface実装
   * @param element {MyTreeItem}
   */
  public getChildren(): vscode.ProviderResult<Array<MyTreeItem>> {
    return Promise.resolve(this._getListItems());
  }

  private _getListItems(): Array<MyTreeItem> {
    return [
      new MyTreeItem("foo", "1.0.0", vscode.TreeItemCollapsibleState.None),
      new MyTreeItem("bar", "0.1.0", vscode.TreeItemCollapsibleState.None),
      new MyTreeItem("baz", "0.0.1", vscode.TreeItemCollapsibleState.None),
    ];
  }
}
