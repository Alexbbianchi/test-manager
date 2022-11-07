
export interface FormFieldsProps {
    label: string;
    name: string;
    required?: boolean;
    render?:(value:any) => string;
}