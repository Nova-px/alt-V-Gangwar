export interface IDatabaseAccount {
    id: number;

    username: string;
    password: string;
    rankId: number;

    kills: number;
    deaths: number;

    character: string;

    createdAt: string;
    updatedAt: string;
}