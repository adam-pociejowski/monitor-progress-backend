import { User } from "../../user/model/user.model";

export class CouchDbDocumentModel<T> {
    constructor(public id: string,
                public rev: string,
                public value: T,
                public user: User,
                public type: string) {}
}
