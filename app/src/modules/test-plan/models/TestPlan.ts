import { Product } from "../../product/models/Product";
import { Version } from "../../product/models/Version";

export interface TestPlan {
    id?: string;
    name: string;
    productId: string;
    versionId: string;
    documentPlan: string;
}

export interface DetailTestPlanResult {
    id: string;
    name: string;
    productId: string;
    versionId: string;
    documentPlan: string;
}

export interface ListTestPlansResult {
    id: string;
    name: string;
    productId: string;
    product: Product;
    versionId: string;
    version: Version;
}