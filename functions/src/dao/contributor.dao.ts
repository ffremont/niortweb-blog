import { AppUtil } from "../apputil";
import context, { Context } from "../context";
import { Contributor } from "../models/Contributor";

export class ContributorDao{
    public async add(contributor:Contributor): Promise<Contributor>{
        if(!contributor){ throw "update invalide"}

        await context.db().collection(Context.CONTRIBUTORS_COLLECTION).doc(contributor.id).set(contributor);
        return contributor;        
    }

    public async getContributionsOf(email:string){
        const snap = await context.db().collection(Context.CONTRIBUTORS_COLLECTION).where('email', '==', email).get();
        return AppUtil.arrOfSnap(snap) as Contributor[];
    }

    public async getRegistered(meetupId:string){
        const snap = await context.db().collection(Context.CONTRIBUTORS_COLLECTION).where('meetup.id', '==', meetupId).get();
        return AppUtil.arrOfSnap(snap) as Contributor[];
    }

    public async get(email:string): Promise<Contributor|null>{
        if(!email){ return null;}

        const customerDoc = await context.db().collection(Context.CONTRIBUTORS_COLLECTION).doc(email).get();
        if (customerDoc.exists) {
            return (customerDoc.data() as Contributor) || null;
        } else {
            return null;
        }
    }

}