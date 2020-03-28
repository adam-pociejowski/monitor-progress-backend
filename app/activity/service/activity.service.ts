import {Activity} from "../model/activity.model";
import {CouchDbService} from "../../couchdb/service/couchdb.service";

export class ActivityService extends CouchDbService<Activity> {
    private sortField: string = 'value.datetime';

    findOlderDocuments = (previous: string, limit: number) =>
        this.findNextDocuments(previous, this.sortField, 'desc', limit);

    findNewerDocuments = (previous: string, limit: number) =>
        this.findNextDocuments(previous, this.sortField, 'asc', limit);
}
