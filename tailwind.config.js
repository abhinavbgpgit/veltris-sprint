/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Jira-inspired palette using CSS variables for light/dark mode
        col: {
          primary: 'var(--color-col-primary)',      // e.g. blue
          secondary: 'var(--color-col-secondary)',  // e.g. teal
          accent: 'var(--color-col-accent)',        // e.g. purple
          background: 'var(--color-col-bg)',        // main background
          surface: 'var(--color-col-surface)',      // card/panel backgrounds
          border: 'var(--color-col-border)',        // border color
          text: 'var(--color-col-text)',            // main text
          muted: 'var(--color-col-muted)',          // muted/secondary text
        },
      },
    },
  },
  plugins: [],
}