import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Module } from "../../models/Module";

const ModuleSchema: Yup.SchemaOf<Module> = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .nullable()
        .required("Valor obrigatório"),
    description: Yup.string()
        .nullable()
        .optional()
});

export default yupResolver<Module>(ModuleSchema);