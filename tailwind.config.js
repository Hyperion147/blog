module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        retrobg: '#EEEEEE', // background
        retroaccent: '#F79B72', // accent
        retroblue: '#7ec4cf', // retro blue
        retrogreen: '#b5d99c', // retro green
        retroborder: '#DDDDDD', // border
        retrotext: '#2A4759', // text
      },
      fontFamily: {
        retro: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      typography: ({ theme }) => ({
        retro: {
          css: {
            '--tw-prose-body': theme('colors.retrotext'),
            '--tw-prose-headings': theme('colors.retroaccent'),
            '--tw-prose-lead': theme('colors.retrotext'),
            '--tw-prose-links': theme('colors.retroblue'),
            '--tw-prose-bold': theme('colors.retrotext'),
            '--tw-prose-counters': theme('colors.retroaccent'),
            '--tw-prose-bullets': theme('colors.retroaccent'),
            '--tw-prose-hr': theme('colors.retroborder'),
            '--tw-prose-quotes': theme('colors.retrotext'),
            '--tw-prose-quote-borders': theme('colors.retroaccent'),
            '--tw-prose-captions': theme('colors.retrotext'),
            '--tw-prose-code': theme('colors.retroblue'),
            '--tw-prose-pre-code': theme('colors.retrobg'),
            '--tw-prose-pre-bg': theme('colors.retrotext'),
            '--tw-prose-th-borders': theme('colors.retroborder'),
            '--tw-prose-td-borders': theme('colors.retroborder'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 