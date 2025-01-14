import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Note } from '../types/Note';
import { useTheme } from '../theme/ThemeContext';
import { ThemeSelector } from './ThemeSelector';
import { BsEye, BsPencil } from 'react-icons/bs';

interface NoteEditorProps {
    note: Note | null;
    isPreview: boolean;
    onTitleChange: (value: string) => void;
    onContentChange: (value: string) => void;
    onTogglePreview: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
    note,
    isPreview,
    onTitleChange,
    onContentChange,
    onTogglePreview,
}) => {
    const { theme } = useTheme();
    const [editorTheme, setEditorTheme] = useState(theme === 'dark' ? 'vs-dark' : 'vs-light');

    useEffect(() => {
        if (theme === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setEditorTheme(isDark ? 'vs-dark' : 'vs-light');
        } else {
            setEditorTheme(theme === 'dark' ? 'vs-dark' : 'vs-light');
        }
    }, [theme]);

    if (!note) {
        return <div className="note-editor empty">Select a note or create a new one</div>;
    }

    const editorOptions = {
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        lineNumbers: 'off',
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 0,
        renderLineHighlight: 'none',
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
        fontFamily: 'inherit',
        suggest: {
            preview: true,
            showWords: true,
        },
        quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
        },
    };

    return (
        <main className="note-editor">
            <div className="editor-header">
                <div className="editor-title">
                    <input
                        type="text"
                        value={note.title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        placeholder="Note title..."
                        className="title-input"
                    />
                </div>
                <div className="editor-actions">
                    <ThemeSelector />
                    <button
                        className="icon-button"
                        onClick={onTogglePreview}
                        title={isPreview ? 'Edit' : 'Preview'}
                    >
                        {isPreview ? <BsPencil size={16} /> : <BsEye size={16} />}
                    </button>
                </div>
            </div>

            <div className="editor-content">
                {isPreview ? (
                    <div className="preview-content">
                        <ReactMarkdown
                            className="markdown-preview"
                            remarkPlugins={[remarkGfm]}
                        >
                            {note.content}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <div className="content-container">
                        <Editor
                            height="100%"
                            defaultLanguage="markdown"
                            value={note.content}
                            onChange={(value) => onContentChange(value || '')}
                            theme={editorTheme}
                            options={{
                                ...editorOptions,
                                fontSize: 14,
                                padding: { top: 20, bottom: 20, right: 40, left: 40 },
                                lineHeight: 20,
                            }}
                        />
                    </div>
                )}
            </div>
        </main>
    );
};
