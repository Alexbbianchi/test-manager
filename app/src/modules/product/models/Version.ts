export interface Version {
    id?: string;
    key?: string | null;
    value: number;
}

export interface DetailVersionResult {
    id: string;
    value: number;
}

export interface ListVersionsResult {
    id: string;
    value: number;
}
