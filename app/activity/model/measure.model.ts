import { MeasureType } from "./measure.type.enum";

export class Measure {
    type: MeasureType;
    value: number;

    constructor(json : any) {
        this.type = json.type;
        this.value = json.value;
    }
}
