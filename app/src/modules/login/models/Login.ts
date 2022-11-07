export interface Login {
    username: string;
    password: string;
}

export interface LoginResult {
    succeeded: boolean;
    username: string;
}