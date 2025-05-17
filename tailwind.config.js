/** @type {import('tailwindcss').Config} */
import scrollbarPlugin from "tailwind-scrollbar";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        screens: {
            phone: {max: "500px"},
            tab: "1024px",
            desktop: "1280px",
            smallPhone: {max: "360px"},
        },
    },
    plugins: [scrollbarPlugin()],
};