import { theme } from './theme';

type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

type ColorPalette = {
  [key in ColorShade | 'DEFAULT' | 'foreground' | 'hover' | 'active']?: string;
};

type ThemeColors = {
  primary: ColorPalette;
  secondary: ColorPalette;
  accent: ColorPalette;
  destructive: ColorPalette;
  muted: ColorPalette;
  success: ColorPalette;
  warning: ColorPalette;
  info: ColorPalette;
};

export const getThemeColor = (
  color: keyof ThemeColors,
  shade: ColorShade | 'DEFAULT' | 'foreground' | 'hover' | 'active' = 'DEFAULT'
): string => {
  const colorObj = theme.colors[color as keyof typeof theme.colors];
  
  if (typeof colorObj === 'object' && colorObj !== null) {
    const value = colorObj[shade as keyof typeof colorObj];
    if (typeof value === 'string') {
      return value;
    } else if (shade === 'DEFAULT' && '500' in colorObj) {
      return colorObj[500] as string;
    } else if (shade === 'foreground' && 'foreground' in colorObj) {
      return colorObj.foreground as string;
    } else if (shade === 'hover' && '600' in colorObj) {
      return colorObj[600] as string;
    } else if (shade === 'active' && '700' in colorObj) {
      return colorObj[700] as string;
    }
  }
  
  // Fallback to a default color if the requested shade is not found
  console.warn(`Color ${color}-${shade} not found in theme`);
  return '#000000';
};

export const getTextColor = (color: keyof ThemeColors, shade: ColorShade | 'DEFAULT' = 'DEFAULT'): string => {
  const colorValue = getThemeColor(color, shade);
  // Simple brightness check to determine if text should be light or dark
  const r = parseInt(colorValue.slice(1, 3), 16);
  const g = parseInt(colorValue.slice(3, 5), 16);
  const b = parseInt(colorValue.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? '#000000' : '#ffffff';
};

export const getGradient = (
  color1: keyof ThemeColors,
  color2: keyof ThemeColors,
  shade1: ColorShade | 'DEFAULT' = 'DEFAULT',
  shade2: ColorShade | 'DEFAULT' = 'DEFAULT',
  angle: number = 135
): string => {
  const color1Value = getThemeColor(color1, shade1);
  const color2Value = getThemeColor(color2, shade2);
  return `linear-gradient(${angle}deg, ${color1Value} 0%, ${color2Value} 100%)`;
};

export const getShadow = (size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md'): string => {
  const shadows = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  };
  return shadows[size];
};

export const getTransition = (property: string = 'all', duration: string = '200ms', timing: string = 'ease-in-out') => {
  return `${property} ${duration} ${timing}`;
};

// Utility function to generate CSS variables for a color palette
export const generateColorVariables = (prefix: string, palette: Record<string, string>): Record<string, string> => {
  const variables: Record<string, string> = {};
  
  Object.entries(palette).forEach(([key, value]) => {
    const varName = key === 'DEFAULT' ? `--${prefix}` : `--${prefix}-${key}`;
    variables[varName] = value;
  });
  
  return variables;
};

// Generate CSS variables for all theme colors
export const generateThemeVariables = (): Record<string, string> => {
  return {
    ...generateColorVariables('primary', theme.colors.primary as Record<string, string>),
    ...generateColorVariables('secondary', theme.colors.secondary as Record<string, string>),
    ...generateColorVariables('accent', theme.colors.accent as Record<string, string>),
    ...generateColorVariables('destructive', theme.colors.destructive as Record<string, string>),
    ...generateColorVariables('muted', theme.colors.muted as Record<string, string>),
    ...generateColorVariables('success', theme.colors.success as Record<string, string>),
    ...generateColorVariables('warning', theme.colors.warning as Record<string, string>),
    ...generateColorVariables('info', theme.colors.info as Record<string, string>),
  };
};

// Utility to apply theme to a specific element
export const applyThemeToElement = (element: HTMLElement, themeVars: Record<string, string>): void => {
  Object.entries(themeVars).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
};

// Create a theme context for React components
export const createThemeContext = (defaultTheme: 'light' | 'dark' = 'light') => {
  const themeContext = {
    currentTheme: defaultTheme,
    
    setTheme: (theme: 'light' | 'dark') => {
      themeContext.currentTheme = theme;
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    },
    
    toggleTheme: () => {
      themeContext.setTheme(themeContext.currentTheme === 'light' ? 'dark' : 'light');
    },
    
    initialize: () => {
      // Check for saved theme preference or use system preference
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
        themeContext.setTheme(savedTheme);
      } else if (systemPrefersDark) {
        themeContext.setTheme('dark');
      } else {
        themeContext.setTheme('light');
      }
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          themeContext.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  };
  
  return themeContext;
};

// Export the theme context instance
export const themeContext = createThemeContext();

// Helper function to get responsive value based on breakpoint
type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const getResponsiveValue = <T>(
  value: T | Partial<Record<BreakpointKey, T>>,
  breakpoint: BreakpointKey = 'md'
): T => {
  if (typeof value !== 'object' || value === null) {
    return value as T;
  }
  
  const breakpoints: BreakpointKey[] = ['sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpoints.indexOf(breakpoint);
  
  // Find the closest breakpoint value
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpoints[i];
    if (Object.prototype.hasOwnProperty.call(value, bp)) {
      const v = (value as Partial<Record<BreakpointKey, T>>)[bp];
      if (v !== undefined) return v;
    }
  }
  
  // Return the first value if no match found
  return Object.values(value as Partial<Record<BreakpointKey, T>>).find((v): v is T => v !== undefined) as T;
};
