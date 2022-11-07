import { ExecutionStatus } from "../../models/ExecutionRecord";

export interface ExecutionLayoutProps {
    title: string;
    backPage: () => void;
    onSave: (value: ExecutionStatus) => void;
}