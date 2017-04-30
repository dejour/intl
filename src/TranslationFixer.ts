import * as vscode from 'vscode'
import * as path from 'path';


export class TranslationFixer {


    constructor() {

    }

    public add(document: vscode.TextDocument, range: vscode.Range,
        context: vscode.CodeActionContext, token: vscode.CancellationToken, text: string): void {

        let edit1: vscode.WorkspaceEdit = new vscode.WorkspaceEdit()
        let edit2: vscode.WorkspaceEdit = new vscode.WorkspaceEdit()
        const writeCnPath = vscode.workspace.rootPath + '/src/pages/language/locale/zh.ts';
        const writeEnPath = vscode.workspace.rootPath + '/src/assets/lang/en.json';
        const writeCnUri = vscode.Uri.file(writeCnPath)
        const writeEnUri = vscode.Uri.file(writeEnPath)
        vscode.workspace.openTextDocument(writeCnUri).then((document) => {
            edit1.insert(writeCnUri, new vscode.Position(document.lineCount - 3, 0),
                `\t"${text}": "${text}",\n`);
            vscode.workspace.applyEdit(edit1);
            vscode.workspace.saveAll()
        })
        vscode.workspace.openTextDocument(writeEnUri).then((document) => {
            edit2.insert(writeEnUri, new vscode.Position(document.lineCount - 2, 0),
                `\t\t"${text}",\n`);
            vscode.workspace.applyEdit(edit2);
            vscode.workspace.saveAll()
        })
    }

}