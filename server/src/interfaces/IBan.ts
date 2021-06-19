/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
*/
export default interface IBan {
    id: number;
    accountId: number;

    hwid: string;
    hwidEx: string;
    socialId: string;

    reason: string;
    adminId: number;

    createdAt: string;
    updatedAt: string;
}