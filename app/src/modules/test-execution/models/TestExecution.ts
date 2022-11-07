export interface TestExecution {
    id?: string;
    name: string | null;
    notes?: string | null;
    productId: string | null;
    userId: string | null;
    testPlanId: string | null;
    estimatedStartDate?: Date | null;
    estimatedEndDate?: Date | null;
    testCases: string[] | null;
}

export interface DetailTestExecutionResult {
    id: string;
    name: string;
    notes: string;
    productId: string;
    userId: string;
    testPlanId: string;
    estimatedStartDate: Date;
    estimatedEndDate: Date;
    testCases: string[];
}

export interface ListTestExecutionsResult {
    id: string;
    name: string;
    productName: string;
    userId: string;
    technicianName: string;
    testPlanName: string;
    estimatedStartDate: Date;
    estimatedEndDate: Date;
}