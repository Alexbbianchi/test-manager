import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from "../../models/User";

const UserSchema: Yup.SchemaOf<User> = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .nullable()
        .required("Valor obrigatório"),
    status: Yup.mixed().nullable(),
    email: Yup.string()
        .nullable()
        .email("Dígite um e-mail válido")
        .required("E-mail é obrigatório"),
    username: Yup.string()
        .nullable()
        .matches(/^[A-Za-z]+(?:[.][A-Za-z]+)*$/,"Usuário do sistema deve corresponder [a-z .]")
        .required("Usuário do sistema é obrigatório"),
    password: Yup.string()
        .nullable()
        .required("Dígite uma senha")
        .min(6, "Mínimo de 6 caracteres"),
    permission: Yup.mixed()
        .nullable()
        .required("Campo status é obrigatório"),
});

export default yupResolver<User>(UserSchema);