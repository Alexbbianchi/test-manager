import { UseFormMethods } from "react-hook-form";

export interface FormProps<TModel> {
    provider: UseFormMethods<TModel>;
    loading: boolean;
    handleSubmit?: (value: any) => Promise<void>;
}