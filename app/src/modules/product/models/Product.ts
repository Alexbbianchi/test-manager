import { Version } from "./Version";

export interface Product {
    id?: string;
    name: string;
    description?: string | null;
    modules: string[] | null;
    versions: Version[] | null;
}

export interface DetailProductResult {
    id: string;
    name: string;
    description: string;
    modules: string[];
    versions: Version[];
}
export interface ListProductsResult {
    id: string;
    name: string;
    description: string;
    modules: string[];
    versions: Version[];
}