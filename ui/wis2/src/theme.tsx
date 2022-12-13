import {createContext, useMemo, useState} from "react";
import {createTheme} from "@mui/material/styles";
import {PaletteMode} from "@mui/material";
import {Theme} from "@emotion/react";

export const tokens = (mode: PaletteMode) => ({
    ...(mode === "light"
        ? {
            'Primary': {
                '50': '#ebecee',
                '100': '#c7cace',
                '200': '#a3a8af',
                '300': '#7f8590',
                '400': '#5b6370',
                '500': '#374151',
                '600': '#2d3542',
                '700': '#2d3542',
                '800': '#191e25',
                '900': '#0f1217',
            },
            'Secondary': {
                '50': '#e6f5ff',
                '100': '#b8e2fe',
                '200': '#8acffd',
                '300': '#5cbcfc',
                '400': '#2ea9fc',
                '500': '#0096fb',
                '600': '#007bce',
                '700': '#0060a1',
                '800': '#004573',
                '900': '#002a46'
            },
            'Third': {
                '50': '#FFFFFF',
                '100': '#FFFFFF',
                '200': '#FFFFFF',
                '300': '#F6F6F6',
                '400': '#E1E1E1',
                '500': '#CDCDCD',
                '600': '#B1B1B1',
                '700': '#959595',
                '800': '#797979',
                '900': '#5D5D5D'
            },
            'Last': {
                '50': '#fefefd',
                '100': '#fbfbf8',
                '200': '#f9f9f4',
                '300': '#f6f6ef',
                '400': '#f4f4eb',
                '500': '#f1f1e6',
                '600': '#c6c6bd',
                '700': '#9a9a93',
                '800': '#6f6f6a',
                '900': '#434340'
            }
        } : {
            'Primary': {
                '900': '#ebecee',
                '800': '#E0E5E8',
                '700': '#a3a8af',
                '600': '#a3a8af',
                '500': '#a3a8af',
                '400': '#7f8590',
                '300': '#a3a8af',
                '200': '#7f8590',
                '100': '#191e25',
                '50': '#0f1217'
            },
            'Secondary': {
                '900': '#e6f5ff',
                '800': '#b8e2fe',
                '700': '#8acffd',
                '600': '#5cbcfc',
                '500': '#2ea9fc',
                '400': '#0096fb',
                '300': '#007bce',
                '200': '#0060a1',
                '100': '#004573',
                '50': '#002a46'
            },
            'Third': {
                '900': '#FFFFFF',
                '800': '#FFFFFF',
                '700': '#FFFFFF',
                '600': '#F6F6F6',
                '500': '#E1E1E1',
                '400': '#CDCDCD',
                '300': '#B1B1B1',
                '200': '#959595',
                '100': '#797979',
                '50': '#5D5D5D'
            },
            'Last': {
                '900': '#fefefd',
                '800': '#fbfbf8',
                '700': '#f9f9f4',
                '600': '#f6f6ef',
                '500': '#f4f4eb',
                '400': '#f1f1e6',
                '300': '#c6c6bd',
                '200': '#9a9a93',
                '100': '#6f6f6a',
                '50': '#434340'
            }
        }),
});

export const themeSettings = (mode: PaletteMode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === 'light'
                    ? {
                        primary: {
                            main: colors.Primary[900],
                        },
                        secondary: {
                            main: colors.Secondary[600],
                        },
                        neutral: {
                            dark: colors.Third[900],
                            main: colors.Third[500],
                            light: colors.Third[100],
                        },
                        background: {
                            default: colors.Primary[50],
                        },
                    } : {
                        primary: {
                            main: colors.Primary[300],
                        },
                        secondary: {
                            main: colors.Secondary[500],
                        },
                        neutral: {
                            dark: colors.Third[700],
                            main: colors.Third[500],
                            light: colors.Third[100],
                        },
                        background: {
                            default: colors.Primary[50],
                        },
                    }),
            typography: {
                fontFamily: ["montserrat", "sans-serif"].join(","),
                fontSize: 12,
                h1: {
                    fontFamily: ["montserrat", "sans-serif"].join(","),
                    fontSize: 40,
                },
                h2: {
                    fontFamily: ["montserrat", "sans-serif"].join(","),
                    fontSize: 32,
                },
                h3: {
                    fontFamily: ["montserrat", "sans-serif"].join(","),
                    fontSize: 24,
                },
                h4: {
                    fontFamily: ["montserrat", "sans-serif"].join(","),
                    fontSize: 20,
                },
                h5: {
                    fontFamily: ["montserrat", "sans-serif"].join(","),
                    fontSize: 16,
                },
                h6: {
                    fontFamily: ["montserrat", "sans-serif"].join(","),
                    fontSize: 12,
                },
                subtitle1: {
                    fontFamily: ["montserrat", "sans-serif"].join(","),
                    fontSize: 12,
                },
            },
        },
    }
}

export const ColorModeContext = createContext<any>({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState<PaletteMode>('light');

    const colorMode = useMemo<any>(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo<Theme>(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};