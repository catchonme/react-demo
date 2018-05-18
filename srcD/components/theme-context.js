import React from 'react'

export const themes = {
    light: {
        foreground: '#ffffff',
        background: '#222222'
    },
    dark: {
        foreground: '#000000',
        background: '#eeeeee'
    }
}

export const ThemeContext = React.createContext(
    themes.dark
)

export const texts = {
    prev: 'prev text',
    next: 'next text'
}

export const TextContext = React.createContext(
    texts.prev
)