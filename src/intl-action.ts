import * as vscode from 'vscode';

export interface Context {
    document: vscode.TextDocument;
    range: vscode.Range;
    context: vscode.CodeActionContext;
    token: vscode.CancellationToken;
    text?: string
}


export class IntlAction {


    constructor() {
    }

    public provideCodeActions(document: vscode.TextDocument, range: vscode.Range,
        context: vscode.CodeActionContext, token: vscode.CancellationToken): Promise<vscode.Command[]> {

        let actionContext = this.createContext(document, range, context, token);


        return new Promise((resolve, reject) => {
            this.canHandleAction(actionContext).then((canHandle) => {
                if (canHandle) {
                    resolve(this.actionHandler(actionContext))
                } else {
                    resolve([])
                }
            })
        })


    }

    private canHandleAction(context: Context): Promise<boolean> {
        const startPosition = new vscode.Position(context.range.start.line, context.range.start.character - 5)
        const endPosition = new vscode.Position(context.range.start.line, context.range.start.character)
        const prefix = context.document.getText(new vscode.Range(startPosition, endPosition))
        const text = context.document.getText(context.range)

        const writeCnPath = vscode.workspace.rootPath + '/src/pages/language/locale/zh.ts';
        const writeCnUri = vscode.Uri.file(writeCnPath)

        return new Promise((resolve, reject) => {
            vscode.workspace.openTextDocument(writeCnUri).then((document) => {

                const zhText = document.getText(new vscode.Range(new vscode.Position(0, 22), new vscode.Position(document.lineCount - 1, 0)))
                const isAdded = new RegExp(text).test(zhText)
                if (prefix === 'site.' && !isAdded) {
                    context.text = text
                    resolve(true)
                } else {
                    resolve(false)
                }
            })

        })

    }

    private actionHandler(context: Context): vscode.Command[] {
        return [{
            title: `add Translation for ${context.text} `,
            command: 'extension.addTranslation',
            arguments: [context.document, context.range, context.context, context.token, context.text]
        }]
    }

    private createContext(document: vscode.TextDocument, range: vscode.Range,
        context: vscode.CodeActionContext, token: vscode.CancellationToken): Context {
        return {
            document, range, context, token
        }
    }
}