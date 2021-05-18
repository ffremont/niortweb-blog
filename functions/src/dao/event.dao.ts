
import { AppUtil } from "../apputil";
import { Config } from "../config";
import context, { Context } from "../context";
import { Event } from "../models/v2/Event";
import { StateEnum } from "../models/v2/StateEnum";

export class EventDao{
    public async set(event:Event): Promise<Event>{
        if(!event){ throw "update invalide"}

        await context.db().collection(Context.EVENTS_COLLECTION).doc(event.id).set(event);
        return event;        
    }

    public async get(id:string): Promise<Event|null>{
        if(!id){ return null;}

        const doc = await context.db().collection(Context.EVENTS_COLLECTION).doc(id).get();
        if (doc.exists) {
            return (doc.data() as Event) || null;
        } else {
            return null;
        }
    }

    public async delete(id:string): Promise<void>{
        if(!id){ return }

        await context.db().collection(Context.EVENTS_COLLECTION).doc(id).delete();
    }

    /***
     * Retourne les événements dits attendus dans les SOON_EXPECTED ms .
     */
    public async soonExpected(nowTs:number) : Promise<Event[]>{
        const snap = await context.db()
            .collection(Context.EVENTS_COLLECTION)
            .where('state','==', StateEnum.OK)
            .where('scheduled', '<', nowTs + Config.SOON_EXPECTED)
            .get();
        return (AppUtil.arrOfSnap(snap) as Event[] || [])
        .filter((e:Event) => e.scheduled > nowTs)
        .filter((e:Event) => 
            e.scheduled > nowTs
            &&
            (!e.notifications || !e.notifications.remember));
    }

    /**
     * REtourne les demandes d'avis sous Xjours
     * @param nowTs 
     */
    public async askReview(nowTs:number) : Promise<Event[]>{
        const snap = await context.db()
            .collection(Context.EVENTS_COLLECTION)
            .where('state','==', StateEnum.OK)
            .where('scheduled', '>', nowTs - Config.ASK_REVIEW_IN)
            .get();
        return (AppUtil.arrOfSnap(snap) as Event[] || [])
        .filter((e:Event) => 
            e.scheduled < nowTs
            &&
            (!e.notifications || !e.notifications.review));
    }

    public async getAll(): Promise<Event[]>{
        const snap = await context.db().collection(Context.EVENTS_COLLECTION).get();
        return AppUtil.arrOfSnap(snap) as Event[];
    }
}