export const TOKEN_KEY = "TEST_MANAGER_TOKEN"; // chave usada no localStorage

export function setTokenLocalStorage (value: string | null) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(value));
}

export function getTokenLocalStorage () {
    const json = localStorage.getItem(TOKEN_KEY);

    if (!json) {
        return null;
    }
    return JSON.parse(json) ?? null;
}