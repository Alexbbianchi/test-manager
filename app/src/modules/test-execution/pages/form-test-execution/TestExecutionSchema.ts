import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { TestExecution } from "../../models/TestExecution";

const TestExecutionSchema: Yup.SchemaOf<TestExecution> = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .nullable()
        .required("Valor obrigatório"),
    notes: Yup.string()
        .nullable()
        .optional(),
    productId: Yup.string()
        .nullable()
        .required("Selecione um produto"),
    userId: Yup.string()
        .nullable()
        .required("Selecione um usuário"),
    testPlanId: Yup.string()
        .nullable()
        .required("Selecione uma plano de teste"),
    estimatedStartDate: Yup.date()
        .nullable()
        .required("Selecione uma data de início"),
    estimatedEndDate: Yup.date()
        .nullable()
        .required("Selecione uma data de término")
        .when(
            'estimatedStartDate',
            (estimatedStartDate: Date, schema: any) => 
                (estimatedStartDate && schema.min(estimatedStartDate, "A Data de término estimado deve ser maior do que a data de início estimado")
            )
          ),
    testCases: Yup.array()
        .nullable()
        .min(1, "Selecione ao menos um caso de teste")
        .required("Selecione ao menos um caso de teste"),
});

export default yupResolver<TestExecution>(TestExecutionSchema);