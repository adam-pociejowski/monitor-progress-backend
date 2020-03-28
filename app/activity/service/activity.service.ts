import { Activity } from "../model/activity.model";
import { CouchDbDocumentModel } from "../../couchdb/model/couchdb.document.model";

const db = require('../../couchdb/config/couchdb.config');

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
