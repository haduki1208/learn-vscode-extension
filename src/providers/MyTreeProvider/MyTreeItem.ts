import * as vscode from "vscode";

export class MyTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    private version: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${label}-${version}`;
    this.description = version;
  }
}
