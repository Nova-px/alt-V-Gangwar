import IDatabaseAccount from "../interfaces/IAccount";

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

    character: {
        colorOverlays: {
            color1: number,
            color2: number,
            opacity: number,
            id: number,
            value: number
        }[],
        eyebrows: number,
        eyeborwsColor1: number,
        eyes: number,
        eyebrowsOpacity: number,
        facialHairOpacity: number,
        faceFather: number,
        faceMix: number,
        faceMother: number,
        facialHair: number,
        facialHairColor1: number,
        hair: number,
        hairColor1: number,
        hairColor2: number,
        hairOverlay: {
            collection: string,
            overlay: string
        },
        opacityOverlays: {
            id: number,
            opacity: number,
            value: number
        }[],
        sex: number,
        skinFather: number,
        skinMix: number,
        skinMother: number,
        structure: number[]
    };

    createdAt: Date;
    updatedAt: Date;

    constructor(data: IDatabaseAccount) {
        this.id = data.id;

        this.username = data.username;
        this.password = data.password;
        this.rankId = data.rankId;
        
        this.kills = data.kills;
        this.deaths = data.deaths;
        
        this.character = JSON.parse(data.characterData);

        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
    }
}