import {Measure} from "./measure.model";

export class Activity {
    name: string;
    datetime: string;
    type: ActivityType;
    measure: Measure;
    fitnessPoints: number = 0;
    metadata: any;

    constructor(json : any) {
        this.name = json.name;
        this.datetime = json.datetime;
        this.type = json.type;
        this.measure = new Measure(json.measure);
        this.metadata = json.metadata;
    }
}
