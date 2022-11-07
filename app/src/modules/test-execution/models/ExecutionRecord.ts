import { PriorityType, StatusType } from "../../test-case/models/TestCase";

export interface ExecutionRecord {
    id: string;
    testExecutionId: string;
    startDate: string;
    endDate?: string | null;
    result?: ExecutionResult | null;
    status: ExecutionStatus;
    executionVersion: number;
    executionTestCases: ExecutionRecordTestCase[];
}

export interface ExecutionRecordTestCase {
    id: string;
    testCaseId: string;
    executionId: string;
    document?: string | null;
    result?: ExecutionResult | null;
}

export interface DetailExecutionRecordResult {
    id: string;
    testExecutionId: string;
    testExecutionName: string; //somente leitura
    testPlanName: string; //somente leitura
    testPlanDescrition?: string | null; //somente leitura
    estimatedStartDate: string; //somente leitura
    estimatedEndDate: string; //somente leitura
    productName: string; //somente leitura
    productVersion: number; //somente leitura
    startDate: string | null;
    endDate?: string | null;
    result?: ExecutionResult | null;
    status?: ExecutionStatus;
    executionVersion: number;
    executionTestCases: DetailExecutionRecordTestCaseResult[];
}

export interface DetailExecutionRecordTestCaseResult {
    id: string;
    testCaseId: string;
    executionId: string;
    testCaseName: string;//somente leitura
    testCaseDescription?: string | null; //somente leitura
    testCaseStatus?: StatusType; //somente leitura
    testCasePriority?: PriorityType; //somente leitura
    testCaseModuleName?: string; //somente leitura
    document?: string | null;
    result?: ExecutionResult | null;
}

export enum ExecutionResult {
    ERROR, 
    FAILED, 
    OK, 
    BLOCKED
}

export enum ExecutionStatus {
    FINISHED, 
    IN_PROGRESS
}