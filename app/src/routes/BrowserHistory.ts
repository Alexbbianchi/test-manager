import { createBrowserHistory } from 'history';

// com essa funcionalidade, conseguimos trocar de rota com mais facilidade
// basta chamar BrowserHistory.push(' rota desejada ')
// é possivel usar hitory.push(' rota ') porém não é possivel acessar fora do contexto principal
export const BrowserHistory = createBrowserHistory({
    basename: '/'
});

export default BrowserHistory;