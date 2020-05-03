import { SocialUser } from "../model/social.user.model";

export class SocialUserService {

    mapToSocialUser = (json: any) =>
        new SocialUser(
            json.id,
            json.name,
            json.email,
            json.photoUrl,
            json.firstName,
            json.lastName,
            json.authToken,
            json.provider);
}
