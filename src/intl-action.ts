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
        context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.Command[] {

        let actionContext = this.createContext(document, range, context, token);

        if (this.canHandleAction(actionContext)) {
            return this.actionHandler(actionContext);
        }
    }

    private canHandleAction(context: Context): boolean {
        const startPosition = new vscode.Position(context.range.start.line, context.range.start.character - 5)
        const endPosition = new vscode.Position(context.range.start.line, context.range.start.character )
        const prefix = context.document.getText(new vscode.Range(startPosition, endPosition))
        const text  = context.document.getText(context.range)
        if(prefix === 'site.') {
            context.text = text
            return true
        }
        return false
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