

export interface Contributor{
    email:string;
    fullName:string;

    /**
     * En quelques mots, je me présente
     */
    iam:string;

    /**
     * Indique si le contributeur viendra en présentiel
     */
    faceToFace: boolean;

    
    comment:string;

    /**
     * Note qualité générale
     */
    note:number;
    /**
     * En savoir plus
     */
    findOutMore:boolean;

    /**
     * Prochain sujet souhaité
     */
    nextTopic?:string;
}