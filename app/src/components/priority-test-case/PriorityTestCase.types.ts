import { PriorityType } from "../../modules/test-case/models/TestCase";

export interface PriorityTestCaseProps {
    priority: PriorityType;
    style?: React.CSSProperties | undefined;
}