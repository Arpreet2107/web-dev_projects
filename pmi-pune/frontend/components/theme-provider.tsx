'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps, useTheme as useNextTheme } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

// Theme toggle component
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent/10 transition-colors"
      aria-label="Toggle theme"
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

// Icons
function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

// Hook to use the theme
export function useTheme() {
  const { theme, setTheme, systemTheme, resolvedTheme, themes } = useNextTheme();
  
  const toggleTheme = React.useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);
  
  const isDark = resolvedTheme === 'dark';
  
  return {
    theme,
    setTheme,
    systemTheme,
    resolvedTheme,
    themes,
    toggleTheme,
    isDark,
  };
}

// Theme-aware component that changes based on the current theme
type ThemedComponentProps = {
  lightClassName?: string;
  darkClassName?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export function ThemedComponent({
  lightClassName = '',
  darkClassName = '',
  children,
  as: Component = 'div',
  className = '',
  ...props
}: ThemedComponentProps) {
  const { resolvedTheme } = useTheme();
  
  const themeClass = resolvedTheme === 'dark' ? darkClassName : lightClassName;
  
  return (
    <Component className={`${themeClass} ${className}`} {...props}>
      {children}
    </Component>
  );
}
