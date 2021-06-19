import { IDatabaseAccount } from "../interfaces/IAccount";

/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
 */
export default class Account {
    id: number;

    username: string;
    password: string;
    rankId: number;

    kills: number;
    deaths: number;

    createdAt: Date;
    updatedAt: Date;

    constructor(data: IDatabaseAccount) {
        this.id = data.id;

        this.username = data.username;
        this.password = data.password;
        this.rankId = data.rankId;
        
        this.kills = data.kills;
        this.deaths = data.deaths;

        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
    }
}