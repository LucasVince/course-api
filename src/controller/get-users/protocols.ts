import { user } from "../../models/user";

export interface iGetUsersRepositoy {
    getUsers(): Promise<user[]>;
}