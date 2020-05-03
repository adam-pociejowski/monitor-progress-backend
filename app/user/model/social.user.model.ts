import { Provider } from "./provider.enum";

export class SocialUser {
    constructor(public id: string,
                public name: string,
                public email: string,
                public photoUrl: string,
                public firstName: string,
                public lastName: string,
                public authToken: string,
                public provider: Provider) {}
}
