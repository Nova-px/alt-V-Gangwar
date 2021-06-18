/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
 */
import alt from 'alt-server';
import mysql from 'mysql';
 
class DatabaseController {
    private pool: mysql.Pool;

    constructor() {
        this.pool = mysql.createPool({ host: "localhost", user: "gangwar", password: "gangwar", database: "gangwar" });
    }

    async query(command: string, args: any[] = []): Promise<null | any[]> {
        return new Promise(resolve => {
            this.pool.query(command, args, (err, result) => {
                if(err) {
                    alt.logError(`[DatabaseController] ERROR: ${err}`);
                    return resolve(null);
                }

                resolve(result);
            });
        });
    }
}
 
export default new DatabaseController();