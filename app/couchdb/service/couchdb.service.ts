import { CouchDbDocumentModel } from "../model/couchdb.document.model";
import { DocumentType } from "../model/document.type.enum";
import { SocialUser } from "../../user/model/social.user.model";
import { User } from "../../user/model/user.model";
const db = require('../../couchdb/config/couchdb.config');

export abstract class CouchDbService<T> {
    protected couchDb = db.connection;
    protected readonly dbName: string;

    protected constructor(dbName: string) {
        this.dbName = dbName;
    }

    public abstract mapToObject(obj: any, insert: boolean): T;

    delete = (id: string,
              rev: string) =>
        this.couchDb
            .del(this.dbName, id, rev);

    update = (model: CouchDbDocumentModel<T>,
              socialUser: SocialUser) =>
        this.couchDb
            .update(this.dbName,
                {
                    _id: model.id,
                    _rev: model.rev,
                    value: model.value,
                    user: model.user
                })
            .then((result: any) => new CouchDbDocumentModel<T>(result.data.id, result.data.rev, model.value, CouchDbService.toUser(socialUser), model.type));

    insert = (value: T,
              type: DocumentType,
              socialUser: SocialUser) =>
         this.generateUniqueId()
            .then((ids: string[]) =>
                this.couchDb
                    .insert(this.dbName, {
                        _id: ids[0],
                        value: value,
                        user: CouchDbService.toUser(socialUser),
                        type: type
                    })
                    .then((result: any) => new CouchDbDocumentModel<T>(result.data.id, result.data.rev, value, CouchDbService.toUser(socialUser), type)));

    findNextDocuments = (previousValue: any,
                         sortField: string,
                         sortMethod: string,
                         limit: number,
                         socialUser: SocialUser) =>
        this.couchDb
                .mango(
                    this.dbName, {
                        selector: CouchDbService.prepareSelector(previousValue, sortField, sortMethod, CouchDbService.toUser(socialUser)),
                        sort: [CouchDbService.prepareSortObject(sortField, sortMethod)],
                        limit: +limit
                    }, {}
                ).then((obj : any) => this.mapToDocuments(obj, socialUser));

    findAll = (socialUser: SocialUser) => {
        let user = CouchDbService.toUser(socialUser);
        return this.couchDb
            .mango(
                this.dbName, {
                    selector: {
                        'user.username': user.username,
                        'user.provider': user.provider,
                    },
                    sort: [
                        CouchDbService.prepareSortObject('_id', 'desc')
                    ]
                }, {}
            ).then((obj : any) => this.mapToDocuments(obj, socialUser));
    }

    generateUniqueId = () =>
        this
            .couchDb
            .uniqid();

    private mapToDocuments = (obj: any, socialUser: SocialUser) =>
        obj.data
            .docs
            .map((doc: any) => new CouchDbDocumentModel<T>(
                doc._id,
                doc._rev,
                this.mapToObject(doc.value, false),
                CouchDbService.toUser(socialUser), doc.type));

    private static toUser = (socialUser: SocialUser) =>
        new User(socialUser.email, socialUser.provider);

    private static prepareSelector = (previousValue: any,
                                      sortField: string,
                                      sortMethod: string,
                                      user: User) => {
        if (previousValue === 'null')
            previousValue = null;
        let selector: any = {};
        selector[sortField] = (sortMethod === 'desc') ?
            {$lt: previousValue} :
            {$gt: previousValue};
        selector['user.username'] = user.username;
        selector['user.provider'] = user.provider;
        return selector;
    };

    private static prepareSortObject = (sortField: string,
                                        sortMethod: string) => {
        let sort: any = {};
        sort[sortField] = sortMethod;
        return sort;
    }
}
