import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { TestPlan } from "../../models/TestPlan";

const TestPlanSchema: Yup.SchemaOf<TestPlan> = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .nullable()
        .required("Valor obrigatório"),
    productId: Yup.string()
        .nullable()
        .required("Selecione um produto"),
    versionId: Yup.string()
        .nullable()
        .required("Selecione uma versão do produto"),
    documentPlan: Yup.string()
        .nullable()
        .required("Campo documento é obrigatório")
        .min(20, "Campo descrição deve ter no mínimo 20 caracteres")
});

export default yupResolver<TestPlan>(TestPlanSchema);