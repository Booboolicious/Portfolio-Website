tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": {
                    DEFAULT: "#135bec",
                    dark: "#0f4bc5",
                    light: "#e7effd"
                },
                "background": {
                    light: "#f6f6f8",
                    dark: "#0f172a"
                },
                "surface": {
                    light: "#ffffff",
                    dark: "#1e293b"
                },
                "border": {
                    light: "#e2e8f0",
                    dark: "#334155"
                }
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "0.75rem",
                "xl": "1rem",
                "2xl": "1.5rem",
                "full": "9999px"
            },
        },
    },
}
