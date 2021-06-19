import IDatabaseRank from "../interfaces/IRank";

/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
*/
export default class Rank {
    id: number;
    name: string;

    permissions: string[];

    constructor(data: IDatabaseRank) {
        this.id = data.id;
        this.name = data.name;

        this.permissions = JSON.parse(data.permissions);
    }
}