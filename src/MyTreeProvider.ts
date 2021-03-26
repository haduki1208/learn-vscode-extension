import * as vscode from "vscode";
import * as path from "path";

export class MyTreeProvider implements vscode.TreeDataProvider<MyTreeItem> {
  public static readonly viewType = "my-tree";

  public getTreeItem(element: MyTreeItem): vscode.TreeItem {
    return element;
  }

  public getChildren(element?: MyTreeItem): Thenable<MyTreeItem[]> {
    return Promise.resolve(this._getListItems());
  }

  private _getListItems(): MyTreeItem[] {
    return [
      new MyTreeItem("foo", "1.0.0", vscode.TreeItemCollapsibleState.None),
      new MyTreeItem("bar", "0.1.0", vscode.TreeItemCollapsibleState.None),
      new MyTreeItem("baz", "0.0.1", vscode.TreeItemCollapsibleState.None),
    ];
  }
}

class MyTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    private version: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}-${this.version}`;
    this.description = this.version;
  }
}
