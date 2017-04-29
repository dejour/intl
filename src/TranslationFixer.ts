import * as vscode from 'vscode'
import * as path from 'path';


export class TranslationFixer {


    constructor() {

    }

    public add(document: vscode.TextDocument, range: vscode.Range,
        context: vscode.CodeActionContext, token: vscode.CancellationToken, text: string): void {

        let edit: vscode.WorkspaceEdit = new vscode.WorkspaceEdit()
        const writePath = vscode.workspace.rootPath+'/cn.ts';
        const writeUri = vscode.Uri.file(writePath)
        vscode.workspace.openTextDocument(writeUri).then((document)=> {
            edit.insert(writeUri, new vscode.Position(document.lineCount-1, 0),
                `\t${text}: '${text}'\n`);
                vscode.workspace.applyEdit(edit);
            vscode.workspace.saveAll()
        })
        console.log(writePath, document)
    }

}