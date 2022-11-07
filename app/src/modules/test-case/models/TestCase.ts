import { Module } from "../../module/models/Module";
import { Product } from "../../product/models/Product";

export interface TestCase {
    id?: string;
    name: string;
    notes?: string | null;
    status: StatusType;
    priority: PriorityType;
    productId?: string | null;
    moduleId?: string | null;
    testCaseDocument: string;
}

export interface DetailTestCaseResult {
    id: string;
    name: string;
    notes: string;
    status: StatusType;
    priority: PriorityType;
    productId: string;
    moduleId: string;
    testCaseDocument: string;
}

export interface ListTestCasesResult {
    id: string;
    name: string;
    product: Product;
    productId: string;
    module: Module;
    moduleId: string;
    status: StatusType;
    priority: PriorityType;
}

export enum StatusType {
    PROPOSAL,
    DISABLED,
    CONFIRMED,
    NEED_TO_UPDATE
}

export enum PriorityType {
    URGENT,
    HIGH,
    AVERAGE,
    LOW
}