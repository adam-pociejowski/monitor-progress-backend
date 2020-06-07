import { CouchDbService } from "../../couchdb/service/couchdb.service";
import { DocumentStats } from "../../couchdb/model/document.stats.model";
import { ReduceRequest } from "../../couchdb/model/reduce.request.model";
import { CouchDbView } from "../../couchdb/model/view.enum";
const db = require('../../couchdb/config/couchdb.config');

export class ActivityStatisticsService extends CouchDbService<DocumentStats> {

    constructor() {
        super(db.activityDbName);
    }

    getFitnessPointsMultiGroup = (reduceRequest: ReduceRequest) =>
        this.getMultiGroupResult(reduceRequest, CouchDbView.FITNESS_POINTS_MULTI_GROUP);

    getStatsMultiGroup = (reduceRequest: ReduceRequest) =>
        this.getMultiGroupResult(reduceRequest, CouchDbView.STATS_MULTI_GROUP);

    getMultiGroupResult = (reduceRequest: ReduceRequest,
                           view: CouchDbView) =>   this.couchDb.get(this.dbName, view.toString(), {
        startkey: reduceRequest.startKey,
        endkey: reduceRequest.endKey,
        group: true,
        group_level: reduceRequest.groupLevel,
        reduce: true
    })
        .then((result: any) =>
            result.data.rows
                .reduce((map: any, obj: any) =>
                    (map[obj.key] = obj.value, map), {}));
}
