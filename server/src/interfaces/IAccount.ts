export interface IDatabaseAccount {
    id: number;

    username: string;
    password: string;
    rankId: number;

    kills: number;
    deaths: number;

    createdAt: string;
    updatedAt: string;
}