import { ExecutionResult } from "../../models/ExecutionRecord";

export interface ExecutionResultProps {
    result: ExecutionResult;
    style?: React.CSSProperties | undefined;
}