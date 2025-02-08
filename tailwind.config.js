/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#F52618",
                "primary-hover": "#cc0f02",
                secondary: "#f4f4f4",
                third: "#262626",
                grey: "#eeeeee",
                dark: "#1A1A1A",
            },
            boxShadow: {
                custom: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                second: "rgba(100, 100, 111, 0.2) 0px 7px 20px 0px",
            },
            screens: {
                lg: "1050px",
                xl: "1350px",
            },
            animation: {
                "width-expand": "widthExpand 1s ease-out infinite",
                "fade-in-down": "fadeInDown 0.3s ease-out",
                "fade-out-up": "fadeOutUp 0.3s ease-in",
            },
            keyframes: {
                widthExpand: {
                    "0%": { width: "0%" },
                    "100%": { width: "100%" },
                },
                fadeInDown: {
                    "0%": { opacity: 0, transform: "translateY(-10px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
                fadeOutUp: {
                    "0%": { opacity: 1, transform: "translateY(0)" },
                    "100%": { opacity: 0, transform: "translateY(-10px)" },
                },
            },
        },
    },
    plugins: [],
};
