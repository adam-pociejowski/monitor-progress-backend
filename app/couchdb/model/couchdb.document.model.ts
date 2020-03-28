export class CouchDbDocumentModel<T> {
    id: string;
    rev: string;
    value: T;

    constructor(id: string,
                rev: string,
                value: T) {
        this.id = id;
        this.rev = rev;
        this.value = value;
    }
}
