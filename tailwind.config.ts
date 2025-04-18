import { heroui } from "@heroui/theme"

module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        header: "var(--font-header)",
        primary: "var(--font-primary)",
        brand: "var(--font-brand)",
        yeet: "var(--font-yeet)",
        saasy: "var(--font-saasy)",
        mono: "var(--font-mono)",
      },
    }
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px",
        disabledOpacity: 0.5,
        fontSize: {
          tiny: "0.70rem",
          small: "0.80rem",
          medium: "0.90rem",
          large: "1rem",
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.5rem",
          medium: "1.75rem",
          large: "2rem",
        },
        radius: {
          small: "1px",
          medium: "1px",
          large: "1px",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
      themes: {
        light: {
          layout: {
            hoverOpacity: 0.7,
            boxShadow: {
              small:
                "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
              medium:
                "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
              large:
                "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
            },
          },
          colors: {
            background: "#f0f0f0",
            foreground: "#161818",
            primary: {
              100: '#FFFFFF',
              200: '#FFFFFF',
              300: '#FFFFFF',
              400: '#FCEEFE',
              500: '#F5C7FC',
              600: '#EFA0FB',
              700: '#E879F9',
              800: '#DF43F7',
              900: '#D60EF4',
              foreground: "#f0f0f0",
              DEFAULT: "#DF43F7",
            },
            secondary: {
              100: '#FFFFFF',
              200: '#F8FAFF',
              300: '#D0E1FE',
              400: '#A8C7FD',
              500: '#80AEFC',
              600: '#498BFB',
              700: '#1268F9',
              800: '#0550CF',
              900: '#043B98',
              foreground: "#f0f0f0",
              DEFAULT: "#80AEFC",
            },
            success: {
              100: '#C4FAE8',
              200: '#9EF7D9',
              300: '#79F3CB',
              400: '#53F0BC',
              500: '#2EEDAE',
              600: '#13DF9B',
              700: '#10B981',
              800: '#0C855D',
              900: '#075239',
              foreground: "#f0f0f0",
              DEFAULT: "#2EEDAE",
            },
            warning: {
              100: '#FFFBF6',
              200: '#FDECCF',
              300: '#FBDCA8',
              400: '#FACD81',
              500: '#F8BD59',
              600: '#F7AE32',
              700: '#F59E0B',
              800: '#C07C08',
              900: '#8A5906',
              foreground: "#f0f0f0",
              DEFAULT: "#F8BD59",
            },
            danger: {
              100: '#FFFFFF',
              200: '#FFFFFF',
              300: '#FCDADA',
              400: '#F9B5B5',
              500: '#F58F8F',
              600: '#F26A6A',
              700: '#EF4444',
              800: '#E71414',
              900: '#B30F0F',
              foreground: "#f0f0f0",
              DEFAULT: "#F58F8F",
            }
          },
        },
        dark: {
          layout: {
            hoverOpacity: 0.8,
            boxShadow: {
              small:
                "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
              medium:
                "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
              large:
                "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
            },
          },
          colors: {
            background: "#161818",
            foreground: "#f0f0f0",
            primary: {
              100: '#FFFFFF',
              200: '#FFFFFF',
              300: '#FFFFFF',
              400: '#FCEEFE',
              500: '#F5C7FC',
              600: '#EFA0FB',
              700: '#E879F9',
              800: '#DF43F7',
              900: '#D60EF4',
              foreground: "#161818",
              DEFAULT: "#F5C7FC",
            },
            secondary: {
              100: '#FFFFFF',
              200: '#F8FAFF',
              300: '#D0E1FE',
              400: '#A8C7FD',
              500: '#80AEFC',
              600: '#498BFB',
              700: '#1268F9',
              800: '#0550CF',
              900: '#043B98',
              foreground: "#161818",
              DEFAULT: "#A8C7FD",
            },
            success: {
              100: '#C4FAE8',
              200: '#9EF7D9',
              300: '#79F3CB',
              400: '#53F0BC',
              500: '#2EEDAE',
              600: '#13DF9B',
              700: '#10B981',
              800: '#0C855D',
              900: '#075239',
              foreground: "#f0f0f0",
              DEFAULT: "#79F3CB",
            },
            warning: {
              100: '#FFFBF6',
              200: '#FDECCF',
              300: '#FBDCA8',
              400: '#FACD81',
              500: '#F8BD59',
              600: '#F7AE32',
              700: '#F59E0B',
              800: '#C07C08',
              900: '#8A5906',
              foreground: "#161818",
              DEFAULT: "#FBDCA8",
            },
            danger: {
              100: '#FFFFFF',
              200: '#FFFFFF',
              300: '#FCDADA',
              400: '#F9B5B5',
              500: '#F58F8F',
              600: '#F26A6A',
              700: '#EF4444',
              800: '#E71414',
              900: '#B30F0F',
              foreground: "#161818",
              DEFAULT: "#FCDADA",
            }
          },
        },
      },
    }),
    require("tailwindcss-animated"),
  ],
}
