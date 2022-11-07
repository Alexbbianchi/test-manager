import { useContext } from "react"
import { AuthContext } from "./AuthProvider"

// foi criado um hook para trabalhar com as chamdas dos contextos, 
// assim não é necessário instanciar sempre o useContext, apenas nosso hook
export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}