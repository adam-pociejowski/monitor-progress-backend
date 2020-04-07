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

    constructor() {
        super();
        this.configMap = this.loadActivitiesConfigsFromFile();
    }

    getFitnessPointsPerDate = () => {
        return this.couchDb.get(this.dbName, '_design/activity_stats/_view/fitness-points-per-date', { group: true})
            .then(( result: any) => result.data.rows
                    .reduce((map: any, obj: any) =>
                        (map[obj.key] = obj.value, map), {}))
    };

    getStats = () => {
        return this.couchDb.get(this.dbName, '_design/activity_stats/_view/stats', { group: true})
            .then(( result: any) => result.data.rows
                    .reduce((map: any, obj: any) =>
                        (map[obj.key] = new DocumentStats(obj.value.sum, obj.value.count, obj.value.min, obj.value.max, obj.value.sumsqr), map), {}))
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

    private loadActivitiesConfigsFromFile = () =>
        this.getActivitiesConfigList()
            .reduce((map: any, obj: any) => (map[obj.name] = obj, map), {});

    private getActivitiesConfigList = () =>
        YAML
            .parse(fs.readFileSync('activity.config.yaml', 'utf8'))
            .map((obj: any) => new ActivityConfig(obj.name, obj.measureType, obj.fitnessPointsFactor));
}
