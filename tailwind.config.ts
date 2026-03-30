import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f5',
          100: '#ccefeb',
          200: '#99dfd7',
          300: '#66cfc3',
          400: '#33bfaf',
          500: '#2A9D8F',
          600: '#227e72',
          700: '#195e56',
          800: '#113f39',
          900: '#081f1d',
        },
        secondary: {
          50: '#fdf0ec',
          100: '#fbe1d9',
          200: '#f7c3b3',
          300: '#f3a58d',
          400: '#ef8767',
          500: '#E76F51',
          600: '#b95941',
          700: '#8b4331',
          800: '#5c2c21',
          900: '#2e1610',
        },
        accent: {
          50: '#fefaec',
          100: '#fdf5d9',
          200: '#fbebb3',
          300: '#f9e18d',
          400: '#f7d767',
          500: '#F4D35E',
          600: '#c3a94b',
          700: '#927f38',
          800: '#625426',
          900: '#312a13',
        },
        neutral: {
          50: '#FAFAF8',
          100: '#F5F5F0',
          200: '#E8E8E0',
          300: '#D4D4C8',
          400: '#A8A89C',
          500: '#7C7C70',
          600: '#5C5C52',
          700: '#3E3E36',
          800: '#2A2A24',
          900: '#1A1A16',
        },
      },
      fontFamily: {
        heading: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
