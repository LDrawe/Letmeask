import { useState, ChangeEvent } from 'react';

import '../styles/themebutton.scss';

type CheckBoxType = ChangeEvent<HTMLInputElement>;

export default function ThemeToggle () {
    const defaultTheme = localStorage.getItem('@letmeask:darkMode');

    const [dark, setDark] = useState(defaultTheme === 'true');

    function switchTheme (event: CheckBoxType) {
        if (event.target.checked) {
            setDark(true);
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('@letmeask:darkMode', 'true');
        } else {
            setDark(false);
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('@letmeask:darkMode', 'false');
        }
    }

    return (
        <div className="theme-switch-wrapper">
            <label className="theme-switch" htmlFor="checkbox">
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={dark}
                    value={dark ? 'dark' : 'light'}
                    onChange={switchTheme}
                />
                <div className="slider round" />
            </label>
            <label>
                {dark ? '🌜' : '☀️'}
            </label>
        </div>
    );
}
