import { Provider } from "./provider.enum";

export class User {
    constructor(public username: string,
                public provider: Provider) {}
}
