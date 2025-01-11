import React, { useState } from 'react';
const Layout: React.FC = () => {
    const [notes, setNotes] = useState([
        {
            id: 'uuid-1234-5678-9101',
            title: 'Note 1',
            content: 'This is the content of note 1.'
        },
        {
            id: 'uuid-1234-5678-9121',
            title: 'Note 2',
            content: 'This is the content of note 2.'
        },
        {
            id: 'uuid-1234-5678-91041',
            title: 'Note 3',
            content: 'This is the content of note 3.'
        },
        {
            id: 'uuid-1234-5678-91601',
            title: 'Note 4',
            content: 'This is the content of note 4.'
        },
        {
            id: 'uuid-1234-5678-910111',
            title: 'Note 5',
            content: 'This is the content of note 5.'
        }
    ]);

    const [filteredNotes, setFilteredNotes] = useState(notes);

    const [selectedNote, setSelectedNote] = useState(notes[0]);

    const handleNoteClick = (note: { id: string, title: string; content: string }) => {
        setSelectedNote(note);
    };

    return (
        <div className="container m-0">
            <div className='row'>
                <div className="col-4 sidebar">
                    <div className='note-search'>
                        <input
                            type="text"
                            placeholder='Search'
                            className='note-search-input'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setFilteredNotes(notes.filter(note => note.title.includes(e.currentTarget.value)));
                                }
                            }}
                        />
                    </div>
                    <ul className='note-list'>
                        {notes.map((note, index) => (
                            <li
                                key={index}
                                className={selectedNote.title === note.title ? 'active note-list-item' : 'note-list-item'}
                                onClick={() => handleNoteClick(note)}
                            >
                                {note.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-8 note-editor">
                    <h2 contentEditable>{selectedNote.title}</h2>
                    <p contentEditable>{selectedNote.content}</p>
                </div>
            </div>
        </div>
    );
};

export default Layout;
