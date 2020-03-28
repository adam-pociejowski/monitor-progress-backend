export class CouchDbDataModel {
    ok: string;
    id: string;
    rev: string;

    constructor(ok: string, id: string, rev: string) {
        this.ok = ok;
        this.id = id;
        this.rev = rev;
    }
}
