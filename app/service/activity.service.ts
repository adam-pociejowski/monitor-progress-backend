import { Activity } from "../model/activity.model";
import { CouchDbDocumentModel } from "../model/couchdb.document.model";
var Rx = require('rxjs');

const db = require('../configuration/couchdb.config');

export class ActivityService {

    generateUniqueId(): Promise<string[]> {
        return db
            .connection
            .uniqid();
    }

    insert(activity: Activity): Promise<CouchDbDocumentModel<Activity>> {
        return this.generateUniqueId()
            .then((ids: string[]) => {
                return db
                    .connection
                    .insert(db.dbname, {
                        _id: ids[0],
                        activity: activity
                    })
            });
    }
}
