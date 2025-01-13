import React, { useState, useEffect } from 'react';
import { Note } from '../types/Note';

interface NoteListProps {
    notes: Note[];
    selectedNote: Note | null;
    onNoteSelect: (note: Note) => void;
    onNewNote: () => void;
}

export const NoteList: React.FC<NoteListProps> = ({
    notes,
    selectedNote,
    onNoteSelect,
    onNewNote,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);

    useEffect(() => {
        const filtered = notes.filter(note => 
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNotes(filtered);
    }, [searchQuery, notes]);

    return (
        <aside className="sidebar">
            <div className="note-search">
                <input
                    type="text"
                    placeholder="Search notes..."
                    className="note-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <ul className="note-list">
                {filteredNotes.map((note) => (
                    <li
                        key={note.id}
                        className={`note-list-item ${selectedNote?.id === note.id ? 'active' : ''}`}
                        onClick={() => onNoteSelect(note)}
                    >
                        <div className="note-list-item-title">{note.title || 'Untitled'}</div>
                        <div className="note-list-item-date">{note.date}</div>
                    </li>
                ))}
            </ul>
            <button className="new-note-button" onClick={onNewNote}>
                + New Note
            </button>
        </aside>
    );
};
