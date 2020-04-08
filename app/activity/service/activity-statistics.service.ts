import { CouchDbService } from "../../couchdb/service/couchdb.service";
import { DocumentStats } from "../../couchdb/model/document.stats.model";

export class ActivityStatisticsService extends CouchDbService<DocumentStats> {

    getFitnessPointsPerDate = (startKey: string, endKey: string) =>
        this.couchDb.get(this.dbName, '_design/activity_stats/_view/fitness-points-per-date', {
            start_key: '\"'+startKey+'\"',
            end_key: '\"'+endKey+'\"',
            group: true
        })
            .then(( result: any) => result.data.rows
                    .reduce((map: any, obj: any) =>
                        (map[obj.key] = obj.value, map), { }));

    getStats = () =>
        this.couchDb.get(this.dbName, '_design/activity_stats/_view/stats', { group: true })
            .then(( result: any) => result.data.rows
                    .reduce((map: any, obj: any) =>
                        (map[obj.key] = new DocumentStats(obj.value.sum, obj.value.count, obj.value.min, obj.value.max, obj.value.sumsqr), map), {}));
}
