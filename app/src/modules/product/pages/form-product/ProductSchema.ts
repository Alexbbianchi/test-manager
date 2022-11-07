import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Product } from "../../models/Product";

const ProductSchema: Yup.SchemaOf<Product> = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .nullable()
        .required("Valor obrigatório"),
    description: Yup.string()
        .nullable()
        .optional(),
    modules: Yup.array()
        .nullable()
        .min(1, "Selecione ao menos um módulo")
        .required("Selecione ao menos um módulo"),
    versions: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.string(),
                value: Yup.number()
                    .nullable()
                    .positive("Valor deve ser maior que zero")
                    .integer("Valor deve ser do tipo inteiro")
                    .required("Informe um valor para versão")
            }).nullable().required("Informe um valor para versão")
        ).nullable().required("Crie ao menos uma versão"),
});

export default yupResolver<Product>(ProductSchema);