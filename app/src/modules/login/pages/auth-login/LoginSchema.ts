import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Login } from "../../models/Login";

const LoginSchema: Yup.SchemaOf<Login> = Yup.object().shape({
    username: Yup.string()
        .required("Informe o usuário.")
        .min(3, "Informe o usuário.")
        .max(60, "Usuário inválido!"),

    password: Yup.string()
        .required("Informe a senha.")
        .min(3, "Informe a senha.")
        .max(60, "Senha inválido!"),
});

export default yupResolver<Login>(LoginSchema);