module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        retrobg: '#f8f5e4', // soft off-white
        retroaccent: '#ffb347', // muted orange
        retroblue: '#7ec4cf', // retro blue
        retrogreen: '#b5d99c', // retro green
        retroborder: '#e2d9c5', // subtle border
        retrotext: '#2d2d2d', // dark text
      },
      fontFamily: {
        retro: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}; 