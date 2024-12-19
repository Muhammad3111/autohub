/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#F62518",
                secondary: "#f4f4f4",
            },
            boxShadow: {
                custom: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                second: "0 10px 16px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
            },
        },
    },
    plugins: [],
};
