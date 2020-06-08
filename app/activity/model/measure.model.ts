import { MeasureType } from "./measure.type.enum";

export class Measure {

    constructor(public type: MeasureType,
                public value: number) {}
}
