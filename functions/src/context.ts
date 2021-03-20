import * as admin from 'firebase-admin';

export class Context{
    public static CONTRIBUTORS_COLLECTION: string = 'contributors';
    public static EVENTS_COLLECTION: string = 'events';
    private _db: admin.firestore.Firestore|null = null;

    db(db :admin.firestore.Firestore|null = null): admin.firestore.Firestore{
        if(db){
            this._db = db;
        }
        return this._db as any;
    }
}

export default new Context();