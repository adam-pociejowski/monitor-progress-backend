import {CouchDbDocumentModel} from "../model/couchdb.document.model";
import {DocumentType} from "../model/document.type.enum";

const db = require('../../couchdb/config/couchdb.config');

export abstract class CouchDbService<T> {
    protected couchDb = db.connection;
    protected dbName = db.activityDbName;

    delete = (id: string, rev: string) =>
        this.couchDb
            .del(this.dbName, id, rev);

    update = (model: CouchDbDocumentModel<T>) =>
        this.couchDb
            .update(this.dbName,
                {
                    _id: model.id,
                    _rev: model.rev,
                    value: model.value
                })
            .then((result: any) => new CouchDbDocumentModel<T>(result.data.id, result.data.rev, model.value));

    insert = (value: T, type: DocumentType) =>
         this.generateUniqueId()
            .then((ids: string[]) =>
                this.couchDb
                    .insert(this.dbName, {
                        _id: ids[0],
                        value: value,
                        type: type
                    })
                    .then((result: any) => new CouchDbDocumentModel<T>(result.data.id, result.data.rev, value)));

    findNextDocuments = (previousValue: any, sortField: string, sortMethod: string, limit: number) =>
        this.couchDb
                .mango(
                    this.dbName, {
                        selector: CouchDbService.prepareSelector(previousValue, sortField, sortMethod),
                        sort: [CouchDbService.prepareSortObject(sortField, sortMethod)],
                        limit: +limit
                    }, {}
                ).then((obj : any) =>
                    obj.data
                        .docs
                        .map((doc: any) => new CouchDbDocumentModel<T>(doc._id, doc._rev, doc.value)));

    generateUniqueId = (): Promise<string[]> =>
        this
            .couchDb
            .uniqid();

    private static prepareSelector(previousValue: any, sortField: string, sortMethod: string) {
        if (previousValue === 'null')
            previousValue = null;
        let selector: any = {};
        selector[sortField] = (sortMethod === 'desc') ?
            {$gt: previousValue} :
            {$lt: previousValue};
        return selector;
    }

    private static prepareSortObject(sortField: string, sortMethod: string) {
        let sort: any = {};
        sort[sortField] = sortMethod;
        return sort;
    }
}
