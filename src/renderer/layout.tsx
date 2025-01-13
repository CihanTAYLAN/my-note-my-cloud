import React, { useState } from 'react';
import { NoteList } from '../components/NoteList';
import { NoteEditor } from '../components/NoteEditor';
import { Note } from '../types/Note';

const Layout: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: '1',
            title: 'Welcome to My Notes',
            content: '# Welcome to My Notes\n\n## Getting Started\n\nThis is a markdown editor. You can:\n\n- Write in **bold** or *italic*\n- Create lists and checkboxes\n- Add [links](https://example.com)\n- Insert code blocks\n\n```javascript\nconsole.log("Hello World!");\n```',
            date: '1/13/2025',
        },
        {
            id: '2',
            title: 'Quick Tips',
            content: '# Quick Tips\n\n- Use markdown syntax for formatting\n- Preview your notes with the preview button\n- Create new notes with the + button',
            date: '1/13/2025',
        },
    ]);

    const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
    const [isPreview, setIsPreview] = useState(false);

    const handleNewNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: 'Untitled',
            content: '',
            date: new Date().toLocaleDateString(),
        };
        setNotes([newNote, ...notes]);
        setSelectedNote(newNote);
        setIsPreview(false);
    };

    const handleTitleChange = (value: string) => {
        if (!selectedNote) return;
        const updatedNote = { ...selectedNote, title: value };
        setSelectedNote(updatedNote);
        setNotes(notes.map((note) => (note.id === selectedNote.id ? updatedNote : note)));
    };

    const handleContentChange = (value: string) => {
        if (!selectedNote) return;
        const updatedNote = { ...selectedNote, content: value };
        setSelectedNote(updatedNote);
        setNotes(notes.map((note) => (note.id === selectedNote.id ? updatedNote : note)));
    };

    return (
        <div className="container">
            <NoteList
                notes={notes}
                selectedNote={selectedNote}
                onNoteSelect={setSelectedNote}
                onNewNote={handleNewNote}
            />
            <NoteEditor
                note={selectedNote}
                isPreview={isPreview}
                onTitleChange={handleTitleChange}
                onContentChange={handleContentChange}
                onTogglePreview={() => setIsPreview(!isPreview)}
            />
        </div>
    );
};

export default Layout;
