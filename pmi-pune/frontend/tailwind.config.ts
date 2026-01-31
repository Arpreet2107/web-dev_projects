import type { Config } from 'tailwindcss';
import { theme } from './lib/theme';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class'],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ...theme.colors,
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'primary-hover': 'hsl(var(--primary-hover))',
        'primary-active': 'hsl(var(--primary-active))',
        'secondary-hover': 'hsl(var(--secondary-hover))',
        'secondary-active': 'hsl(var(--secondary-active))',
        'accent-hover': 'hsl(var(--accent-hover))',
        'accent-active': 'hsl(var(--accent-active))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      lineHeight: theme.typography.lineHeight,
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      boxShadow: theme.boxShadow,
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'noise': "url('/images/noise.png')",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: theme.colors.accent[600],
              textDecoration: 'none',
              fontWeight: theme.typography.fontWeight.medium,
              '&:hover': {
                color: theme.colors.accent[700],
                textDecoration: 'underline',
              },
            },
            h1: {
              fontWeight: theme.typography.fontWeight.bold,
              fontSize: theme.typography.fontSize['4xl'],
              lineHeight: theme.typography.lineHeight.tight,
              color: theme.colors.primary[900],
            },
            h2: {
              fontWeight: theme.typography.fontWeight.bold,
              fontSize: theme.typography.fontSize['3xl'],
              lineHeight: theme.typography.lineHeight.tight,
              color: theme.colors.primary[900],
              marginTop: theme.spacing[12],
              marginBottom: theme.spacing[6],
            },
            h3: {
              fontWeight: theme.typography.fontWeight.semibold,
              fontSize: theme.typography.fontSize['2xl'],
              lineHeight: theme.typography.lineHeight.snug,
              color: theme.colors.primary[800],
              marginTop: theme.spacing[10],
              marginBottom: theme.spacing[4],
            },
            'h4, h5, h6': {
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.primary[800],
              marginTop: theme.spacing[8],
              marginBottom: theme.spacing[4],
            },
            p: {
              marginTop: theme.spacing[4],
              marginBottom: theme.spacing[4],
            },
            ul: {
              marginTop: theme.spacing[4],
              marginBottom: theme.spacing[4],
              paddingLeft: theme.spacing[6],
              listStyleType: 'disc',
            },
            ol: {
              marginTop: theme.spacing[4],
              marginBottom: theme.spacing[4],
              paddingLeft: theme.spacing[6],
              listStyleType: 'decimal',
            },
            li: {
              marginTop: theme.spacing[2],
              marginBottom: theme.spacing[2],
              paddingLeft: theme.spacing[2],
            },
            blockquote: {
              borderLeftWidth: '4px',
              borderLeftColor: theme.colors.primary[200],
              padding: `${theme.spacing[4]} ${theme.spacing[6]}`,
              margin: `${theme.spacing[6]} 0`,
              backgroundColor: theme.colors.primary[50],
              borderRadius: theme.borderRadius.lg,
              fontStyle: 'italic',
              '& > p': {
                margin: 0,
              },
            },
            code: {
              backgroundColor: theme.colors.primary[100],
              color: theme.colors.primary[800],
              padding: `${theme.spacing[1]} ${theme.spacing[1.5]}`,
              borderRadius: theme.borderRadius.md,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              fontFamily: 'var(--font-mono)',
            },
            'pre > code': {
              backgroundColor: 'transparent',
              padding: 0,
              borderRadius: 0,
            },
            pre: {
              backgroundColor: theme.colors.primary[900],
              color: theme.colors.primary[50],
              padding: theme.spacing[4],
              borderRadius: theme.borderRadius.lg,
              overflowX: 'auto',
              marginTop: theme.spacing[6],
              marginBottom: theme.spacing[6],
            },
            hr: {
              borderColor: theme.colors.primary[200],
              marginTop: theme.spacing[12],
              marginBottom: theme.spacing[12],
              borderTopWidth: '1px',
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: theme.spacing[6],
              marginBottom: theme.spacing[6],
              fontSize: theme.typography.fontSize.sm,
              lineHeight: theme.typography.lineHeight.relaxed,
              'th, td': {
                border: `1px solid ${theme.colors.primary[200]}`,
                padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                textAlign: 'left',
              },
              th: {
                backgroundColor: theme.colors.primary[50],
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.primary[900],
              },
              'tr:nth-child(even)': {
                backgroundColor: theme.colors.primary[50],
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
  ],
};

export default config;
