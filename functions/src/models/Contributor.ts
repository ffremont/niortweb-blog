import { Meetup } from "./Meetup";

export interface Contributor{
    id:string;
    email:string;
    fullName:string;
    comment:string;
    meetup:Meetup;
}