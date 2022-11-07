import { PriorityType, StatusType } from "../../test-case/models/TestCase";

export interface DetailExecutionRecordResult {
    id: string;
    testExecutionId: string;
    testExecutionName: string;
    testPlanName: string;
    testPlanDescrition: string;
    estimatedStartDate: string;
    estimatedEndDate: string;
    productName: string;
    productVersion: number;
    startDate: string;
    endDate: string;
    userId: string;
    result: ExecutionResult;
    status: ExecutionStatus;
    executionVersion: number;
    executionTestCases: DetailExecutionTestCaseResult[];
}

export interface DetailExecutionTestCaseResult {
    id: string;
    testCaseId: string;
    executionId: string;
    testCaseName: string;
    testCaseDescription: string; 
    testCaseStatus: StatusType; 
    testCasePriority: PriorityType; 
    testCaseModuleName: string; 
    document: string;
    result: ExecutionResult;
}

export interface ListExecutionsHistoryResult {
    id: string;
    testExecutionId: string;
    testExecutionName: string;
    testPlanName: string;
    testPlanDescrition: string;
    estimatedStartDate: string;
    estimatedEndDate: string;
    productName: string;
    productVersion: number;
    startDate: string;
    endDate: string;
    userId: string;
    result: ExecutionResult;
    status: ExecutionStatus;
    executionVersion: number;
    executionTestCases: ListExecutionTestCaseResult[];
}

export interface ListExecutionTestCaseResult {
    id: string;
    testCaseId: string;
    executionId: string;
    testCaseName: string;
    testCaseDescription: string; 
    testCaseStatus: StatusType; 
    testCasePriority: PriorityType; 
    testCaseModuleName: string; 
    document: string;
    result: ExecutionResult;
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