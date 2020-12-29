export interface Meetup{
    id:string;
    label:string;
    webconf?: boolean;
    date: string;
    speaker: string;
    googleAgenda?:string;
}