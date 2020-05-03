export class ReduceRequest {
    public groupLevel: number;
    public startKey: string[];
    public endKey: string[];

    constructor(json: any) {
        this.groupLevel = json.groupLevel;
        this.startKey = json.startKey;
        this.endKey = json.endKey;
    }
}
