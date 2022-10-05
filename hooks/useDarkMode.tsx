import Cookies from "js-cookie";

export const useDarkMode = [
    (setDarkMode: (mode: boolean) => any) => {
        setDarkMode(true);
        Cookies.set('darkMode', 'true');
        document.querySelector("body")!.classList.add("dark")
    },
    (setDarkMode: (mode: boolean) => any) => {
        setDarkMode(false)
        Cookies.set('darkMode', 'false');
        document.querySelector("body")!.classList.remove("dark")
    }
]