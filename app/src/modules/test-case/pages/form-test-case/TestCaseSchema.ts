import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { TestCase } from "../../models/TestCase";

const TestCaseSchema: Yup.SchemaOf<TestCase> = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .nullable()
        .required("Valor obrigatório"),
    notes: Yup.string()
        .nullable()
        .optional(),
    status: Yup.mixed()
        .nullable()
        .required("Campo status é obrigatório"),
    priority: Yup.mixed()
        .nullable()
        .required("Campo prioridade é obrigatório"),
    productId: Yup.string()
        .nullable()
        .optional(),
    moduleId: Yup.string().when("productId", {
        is: null,
        then: Yup.string().nullable().optional(),
        otherwise: Yup.string().nullable().required("Módulo é obrigatório")
    }),
    testCaseDocument: Yup.string()
        .nullable()
        .required("Campo documento é obrigatório")
        .min(20, "Campo descrição deve ter no mínimo 20 caracteres")
});

export default yupResolver<TestCase>(TestCaseSchema);