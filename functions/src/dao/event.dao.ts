
import { AppUtil } from "../apputil";
import context, { Context } from "../context";
import * as My from '../models/v2/Event';

export class EventDao{
    public async set(event:My.Event): Promise<My.Event>{
        if(!event){ throw "update invalide"}

        await context.db().collection(Context.EVENTS_COLLECTION).doc(event.id).set(event);
        return event;        
    }

    public async get(id:string): Promise<My.Event|null>{
        if(!id){ return null;}

        const doc = await context.db().collection(Context.EVENTS_COLLECTION).doc(id).get();
        if (doc.exists) {
            return (doc.data() as My.Event) || null;
        } else {
            return null;
        }
    }

    public async getAll(): Promise<My.Event[]>{
        const snap = await context.db().collection(Context.EVENTS_COLLECTION).get();
        return AppUtil.arrOfSnap(snap) as My.Event[];
    }
}