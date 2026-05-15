/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:       'var(--c-bg)',
        surface:  'var(--c-surface)',
        surface2: 'var(--c-surface2)',
        accent:   'var(--c-accent)',
        accent2:  'var(--c-accent2)',
        danger:   'var(--c-danger)',
        muted:    'var(--c-muted)',
        border:   'var(--c-border)',
        ink:      'var(--c-ink)',
        inksoft:  'var(--c-inksoft)',
      },
      fontFamily: { syne: ['Syne', 'sans-serif'] },
    },
  },
  plugins: [],
};
