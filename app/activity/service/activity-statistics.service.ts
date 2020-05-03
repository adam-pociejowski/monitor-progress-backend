import { CouchDbService } from "../../couchdb/service/couchdb.service";
import { DocumentStats } from "../../couchdb/model/document.stats.model";
import { ReduceRequest } from "../../couchdb/model/reduce.request.model";
import { CouchDbView } from "../../couchdb/model/view.enum";

export class ActivityStatisticsService extends CouchDbService<DocumentStats> {

    getFitnessPointsPerDate = (startKey: string, endKey: string) =>
        this.couchDb.get(this.dbName, '_design/activity_stats/_view/fitness-points-per-date', {
            start_key: '\"' + startKey + '\"',
            end_key: '\"' + endKey + '\"',
            group: true
        })
            .then((result: any) => result.data.rows
                .reduce((map: any, obj: any) =>
                    (map[obj.key] = obj.value, map), {}));

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

    getStats = () =>
        this.couchDb.get(this.dbName, '_design/activity_stats/_view/stats', {group: true})
            .then((result: any) => result.data.rows
                .reduce((map: any, obj: any) =>
                    (map[obj.key] = new DocumentStats(obj.value.sum, obj.value.count, obj.value.min, obj.value.max, obj.value.sumsqr), map), {}));

    getStatsPerDate = () =>
        this.couchDb.get(this.dbName, '_design/activity_stats/_view/stats-per-date', {group: true})
            .then((result: any) => {
                let stats: any = {};
                for (let obj of result.data.rows) {
                    let split = obj.key.split('#');
                    let date = split[0];
                    let activityType = split[1];
                    if (typeof (stats[activityType]) === "undefined") {
                        stats[activityType] = {};
                    }
                    stats[activityType][date] = obj.value;
                }
                return stats;
            });

    getStatsPerWeek = () =>
        this.couchDb.get(this.dbName, '_design/activity_stats/_view/stats-per-week', {group: true})
            .then((result: any) => {
                let stats: any = {};
                for (let obj of result.data.rows) {
                    let split = obj.key.split('#');
                    let startWeek = split[0];
                    let endWeek = split[1];
                    let activityType = split[2];
                    if (typeof (stats[activityType]) === "undefined") {
                        stats[activityType] = {};
                    }
                    stats[activityType][`${startWeek}-${endWeek}`] = obj.value;
                }
                return stats;
            });
}
