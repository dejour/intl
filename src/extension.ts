'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { IntlAction } from './intl-action';
import { TranslationFixer } from './TranslationFixer'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "intl" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    let codeActionFixer = vscode.languages.registerCodeActionsProvider('javascriptreact', new IntlAction());
    let translationFixer = vscode.commands.registerCommand('extension.addTranslation', (d, r, c, t, i) => {
        new TranslationFixer().add(d, r, c, t, i);
    });


}

// this method is called when your extension is deactivated
export function deactivate() {
}