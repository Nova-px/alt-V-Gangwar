/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
*/
export default interface IDatabaseAccount {
    id: number;

    username: string;
    password: string;
    rankId: number;

    kills: number;
    deaths: number;
    level: number;
    xp: number;

    characterData: string;

    createdAt: string;
    updatedAt: string;
}