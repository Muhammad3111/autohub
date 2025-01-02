/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#F62518",
                secondary: "#f4f4f4",
                third: "#262626",
            },
            boxShadow: {
                custom: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                second: "rgba(100, 100, 111, 0.2) 0px 7px 20px 0px",
            },
            screens: {
                lg: "1050px",
                xl: "1350px",
            },
        },
    },
    plugins: [],
};
