import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                'cat-bg': '#0a0e15',
                'cat-surface': '#0f1520',
                'cat-card': '#131a26',
                'cat-line': '#1f2937',
                'cat-muted': '#8b98ab',
                'cat-cyan': '#00e5ff',
                'cat-green': '#34d399',
                // Security Cat Design System - from register.html
                'surface-container-lowest': '#0a0e18',
                'surface-container-low': '#171b26',
                'surface-container': '#1c1f2a',
                'surface-container-high': '#262a35',
                'surface-container-highest': '#313540',
                'surface-dim': '#0f131d',
                'surface-bright': '#353944',
                'surface-tint': '#00dbe9',

                'on-background': '#dfe2f1',
                'on-surface': '#dfe2f1',
                'on-surface-variant': '#b9cacb',
                'on-primary': '#00363a',
                'on-primary-container': '#006970',
                'on-primary-fixed': '#002022',
                'on-primary-fixed-variant': '#004f54',
                'on-secondary': '#00344d',
                'on-secondary-container': '#00344e',
                'on-secondary-fixed': '#001e2f',
                'on-secondary-fixed-variant': '#004c6e',
                'on-tertiary': '#003824',
                'on-tertiary-container': '#006d4a',
                'on-tertiary-fixed': '#002113',
                'on-tertiary-fixed-variant': '#005236',
                'on-error': '#690005',
                'on-error-container': '#ffdad6',

                primary: '#dbfcff',
                'primary-container': '#00f0ff',
                'primary-fixed': '#7df4ff',
                'primary-fixed-dim': '#00dbe9',
                'primary-fixed-dim-2': '#4edea3',

                secondary: '#89ceff',
                'secondary-container': '#00a2e6',
                'secondary-fixed': '#c9e6ff',
                'secondary-fixed-dim': '#89ceff',

                tertiary: '#d8ffe7',
                'tertiary-container': '#65f2b5',
                'tertiary-fixed': '#6ffbbe',
                'tertiary-fixed-dim': '#4edea3',

                error: '#ffb4ab',
                'error-container': '#93000a',

                outline: '#849495',
                'outline-variant': '#3b494b',
                'inverse-surface': '#dfe2f1',
                'inverse-on-surface': '#2c303b',
                'inverse-primary': '#006970',

                background: '#0f131d',
                surface: '#0f131d',
            },
            borderRadius: {
                DEFAULT: '0.25rem',
                lg: '0.5rem',
                xl: '0.75rem',
                '2xl': '1rem',
                full: '9999px',
            },
            spacing: {
                'margin-desktop': '2.5rem',
                'margin-tablet': '1.5rem',
                'margin-mobile': '1rem',
                'gutter-xs': '0.25rem',
                'gutter-sm': '0.5rem',
                'gutter-md': '1rem',
                'gutter-lg': '1.5rem',
                'gutter-xl': '2rem',
                'terminal-indent': '1.25rem',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                headline: ['Inter', ...defaultTheme.fontFamily.sans],
                body: ['Inter', ...defaultTheme.fontFamily.sans],
                code: ['JetBrains Mono', 'monospace'],
                label: ['JetBrains Mono', 'monospace'],
            },
            fontSize: {
                'display-hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
                'display-hero-mobile': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '800' }],
                'headline-lg': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
                'headline-lg-mobile': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
                'headline-md': ['1.5rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '700' }],
                'headline-sm': ['1.125rem', { lineHeight: '1.4', fontWeight: '700' }],
                'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
                'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
                'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
                'label-caps': ['0.75rem', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' }],
                'code-lg': ['1rem', { lineHeight: '1.6', fontFamily: 'JetBrains Mono', fontWeight: '500' }],
                'code-md': ['0.875rem', { lineHeight: '1.5', fontFamily: 'JetBrains Mono', fontWeight: '500' }],
                'code-sm': ['0.75rem', { lineHeight: '1.5', fontFamily: 'JetBrains Mono', fontWeight: '500' }],
            },
            boxShadow: {
                'glow-primary': '0 0 20px rgba(0, 240, 255, 0.25)',
                'glow-primary-hover': '0 0 28px rgba(0, 240, 255, 0.45)',
                'glow-tertiary': '0 0 16px rgba(0, 255, 207, 0.35)',
                'ambient-primary': '0 0 140px rgba(0, 240, 255, 0.1)',
                'ambient-secondary': '0 0 120px rgba(0, 162, 230, 0.1)',
                'card': '0 1px 8px rgba(0, 0, 0, 0.04)',
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(24px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },

    plugins: [forms],
};
