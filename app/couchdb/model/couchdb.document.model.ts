export class CouchDbDocumentModel<T> {
    constructor(public id: string,
                public rev: string,
                public value: T) {}
}
