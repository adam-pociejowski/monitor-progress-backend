import {CouchDbDataModel} from "./couchdb.data.model";

export class CouchDbDocumentModel<T> {
    data: CouchDbDataModel;
    object: T;
    status: number;
    headers: any;


    // constructor(data: CouchDbDataModel, headers: any, status: number, object: T) {
    //     console.log(data, headers, status);
    //     this.data = data;
    //     this.headers = headers;
    //     this.status = status;
    //     this.object = object;
    // }

    constructor(obj: any, object: T) {
        console.log(obj);
        this.data = obj.data;
        this.headers = obj.headers;
        this.status = obj.status;
        this.object = object;
    }
}
