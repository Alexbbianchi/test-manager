export interface Module {
    id?: string;
    name: string;
    description?: string | null;
}

export interface DetailModuleResult {
    id: string;
    name: string;
    description: string;
}

export interface ListModulesResult {
    id: string;
    name: string;
    description: string;
}