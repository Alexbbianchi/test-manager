export interface User {
    id?: string;
    name: string;
    status: UserStatus;
    email: string;
    username: string;
    password: string;
    permission: UserPermission;
}

export interface DetailUserResult {
    id: string;
    name: string;
    status: UserStatus;
    email: string;
    username: string;
    password: string;
    permission: UserPermission;
}

export interface ListUsersResult {
    id: string;
    name: string;
    status: UserStatus;
    email: string;
    permission: UserPermission;
    username: string;
}

export enum UserPermission {
    ADMIN,
    TECHNICIAN,
    VISITOR
}

export enum UserStatus {
	ACTIVE,
    INACTIVE
}