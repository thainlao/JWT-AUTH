import $api from "../http";
import { IUser } from "../response/AuthResponse";

export default class UserService {
    static FetchUsers(): Promise<IUser[]> {
        return $api.get('/users')
    }
}