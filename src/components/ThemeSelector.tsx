import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import { BsSun, BsMoon, BsDisplay } from 'react-icons/bs';

export const ThemeSelector: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const handleThemeClick = () => {
        switch (theme) {
            case 'light':
                setTheme('dark');
                break;
            case 'dark':
                setTheme('system');
                break;
            case 'system':
                setTheme('light');
                break;
        }
    };

    const getThemeIcon = () => {
        switch (theme) {
            case 'light':
                return <BsSun size={16} />;
            case 'dark':
                return <BsMoon size={16} />;
            case 'system':
                return <BsDisplay size={16} />;
        }
    };

    return (
        <button
            onClick={handleThemeClick}
            className="icon-button"
            title={`Theme: ${theme}`}
        >
            {getThemeIcon()}
        </button>
    );
};
