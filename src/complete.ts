import {
	CompletionItem,
	CompletionItemKind,
	CompletionItemProvider,
	Position,
	Range,
	TextDocument,
} from 'vscode';

export class GoCompletionItemProvider implements CompletionItemProvider {
	public provideCompletionItems(
		document: TextDocument,
		position: Position,
	): Thenable<CompletionItem[]> {
		const { line, character } = position;

		// cant prepend "var("
		if (character < 4) {
			return Promise.resolve([]);
		}

		const endPosition = position;
		const startPosition = new Position(line, character - 4);
		const range = new Range(startPosition, endPosition);
		const word = document.getText(range);
		if (word !== 'var(') {
			return Promise.resolve([]);
		}

		const tmp = ['--f-space-2', '--d-space-3', '--aesd4'];
		const tmp2 = tmp.map((str) => {
			const item = new CompletionItem(str, CompletionItemKind.Enum);
			item.detail = 'details';

			return item;
		});

		return Promise.resolve(tmp2);
	}
}