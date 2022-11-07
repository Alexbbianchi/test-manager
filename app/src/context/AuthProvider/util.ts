export const TOKEN_KEY = "TEST_MANAGER_TOKEN"; // chave usada no localStorage

// método para atualizar os valores do token no localStorage
export function setTokenLocalStorage (value: string | null) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(value));
}
// método para pegar o token no localStorage
export function getTokenLocalStorage () {
    // pega um valor no localStorage conforme a chave 'TOKEN_KEY'
    const json = localStorage.getItem(TOKEN_KEY);
    // se tiver valor continua, se não retorna null
    if (!json) {
        return null;
    }
    // converte de json para objeto e retorna
    return JSON.parse(json) ?? null;
}

 // para o localStorage, faz se necessario trabalhar com JSON, pois ele aceita e retorna apenas JSON