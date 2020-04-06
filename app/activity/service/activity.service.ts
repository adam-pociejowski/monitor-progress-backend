import { Activity } from "../model/activity.model";
import { CouchDbService } from "../../couchdb/service/couchdb.service";
import fs from 'fs'
import { ActivityConfig } from "../model/activity.config.model";
// @ts-ignore
import YAML from 'yaml'
import { CouchDbDocumentModel } from "../../couchdb/model/couchdb.document.model";
import {DocumentStats} from "../../couchdb/model/document.stats.model";

export class ActivityService extends CouchDbService<Activity> {
    private sortField: string = 'value.datetime';
    private readonly configMap: any;
    private startKey = ['A'];
    private endKey = ['Z'];
    private co = { startKey: this.startKey, endKey: this.endKey, group: true};

    constructor() {
        super();
        this.configMap = this.loadActivitiesConfigsFromFile();
    }

    getStats = () => {
        return this.couchDb.get(this.dbName, '_design/activity_stats/_view/stats', this.co)
            .then(( result: any) => {
                let stats: any = {};
                result.data.rows
                    .forEach((row: any) => {
                        stats[row.key] = new DocumentStats(row.value.sum, row.value.count, row.value.min, row.value.max, row.value.sumsqr);
                    });
                return stats;
            })
    };

    getConfigList = () => {
        let configs = [];
        for (let config in this.configMap) {
            configs.push(this.configMap[config]);
        }
        return configs;
    };

    findOlderDocuments = (previous: string, limit: number) =>
        this.findNextDocuments(previous, this.sortField, 'desc', limit);

    findNewerDocuments = (previous: string, limit: number) =>
        this.findNextDocuments(previous, this.sortField, 'asc', limit);

    calculateFitnessPoints = (activities: CouchDbDocumentModel<Activity>[]) =>
        activities
            .map((activity) => this.calculate(activity));

    private calculate = (activity: CouchDbDocumentModel<Activity>) => {
        activity.value.fitnessPoints = activity.value.measure.value * this.configMap[activity.value.type].fitnessPointsFactor;
        return activity;
    };

    private loadActivitiesConfigsFromFile = () => {
        let map: any = {};
        this.getActivitiesConfigList()
            .forEach((config: ActivityConfig) => { map[config.name] = config });
        return map;
    };

    private getActivitiesConfigList = () =>
        YAML
            .parse(fs.readFileSync('activity.config.yaml', 'utf8'))
            .map((obj: any) => new ActivityConfig(obj.name, obj.measureType, obj.fitnessPointsFactor));
}
