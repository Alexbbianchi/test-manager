import { UseFormMethods } from "react-hook-form";

export interface FormProps<TModel> {
    provider: UseFormMethods<TModel>; // segue a documanteção
    loading: boolean;
    handleSubmit?: (value: any) => Promise<void>; // Tipagem de função
}