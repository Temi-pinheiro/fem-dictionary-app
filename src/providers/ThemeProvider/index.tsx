/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext<any>({});

const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState('light'); // You can set the default theme here
  const [font, setFont] = useState<'sans-serif' | 'serif' | 'mono'>(
    'sans-serif'
  ); // You can set the default theme here

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  const toggleFont = (style: 'sans-serif' | 'serif' | 'mono') => {
    setFont(style);
  };
  console.log('theme');
  const getFontFamily = () => {
    switch (font) {
      case 'sans-serif':
        return 'Inter, sans-serif';
      case 'serif':
        return 'Lora, serif';
      case 'mono':
        return 'Inconsolata, mono';
      default:
        return 'Inter, sans-serif';
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeControl: { toggleTheme, theme },
        fontControl: { toggleFont, font },
      }}
    >
      <div
        className='w-full h-full bg-white dark:bg-[#050505]'
        data-mode={theme}
        style={{ fontFamily: getFontFamily() }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const colorTheme = () => {
  const {
    themeControl,
  }: { themeControl: { toggleTheme: () => void; theme: string } } =
    useContext(ThemeContext);
  return themeControl;
};
export const fontTheme = () => {
  const {
    fontControl,
  }: {
    fontControl: {
      toggleFont: (v: 'sans-serif' | 'serif' | 'mono') => void;
      font: string;
    };
  } = useContext(ThemeContext);
  return fontControl;
};

export default ThemeProvider;
