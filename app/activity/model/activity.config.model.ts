import { MeasureType} from './measure.type.enum'

export class ActivityConfig {

    constructor(public name: string,
                public measureType: MeasureType,
                public fitnessPointsFactor: number) {
    }
}
