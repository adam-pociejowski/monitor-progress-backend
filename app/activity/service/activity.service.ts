import { Activity } from "../model/activity.model";
import { CouchDbService } from "../../couchdb/service/couchdb.service";
import fs from 'fs'
import { ActivityConfig } from "../model/activity.config.model";
// @ts-ignore
import YAML from 'yaml'
import { CouchDbDocumentModel } from "../../couchdb/model/couchdb.document.model";
import {DocumentStats} from "../../couchdb/model/document.stats.model";
import { SocialUser } from "../../user/model/social.user.model";

export class ActivityService extends CouchDbService<Activity> {
    private sortField: string = 'value.datetime';
    private readonly configMap: any;

    constructor() {
        super();
        this.configMap = this.loadActivitiesConfigsFromFile();
    }

    getConfigList = () => {
        let configs = [];
        for (let config in this.configMap) {
            configs.push(this.configMap[config]);
        }
        return configs;
    };

    findOlderDocuments = (previous: string, limit: number, user: SocialUser) =>
        this.findNextDocuments(previous, this.sortField, 'desc', limit, user);

    findNewerDocuments = (previous: string, limit: number, user: SocialUser) =>
        this.findNextDocuments(previous, this.sortField, 'asc', limit, user);

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
