export interface NoteStore {
	notes: Note[];
	selectedNote: Note | null;
	actions: {
		addNote: (note: Note) => void;
		updateNote: (id: string, content: string) => void;
		deleteNote: (id: string) => void;
	};
}

export interface Note {
	id: string;
	title: string;
	content: string;
	date: string;
}
