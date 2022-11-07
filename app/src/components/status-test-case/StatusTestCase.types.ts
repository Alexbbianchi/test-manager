import { StatusType } from "../../modules/test-case/models/TestCase";

export interface StatusTestCaseProps {
    status: StatusType;
    style?: React.CSSProperties | undefined;
}