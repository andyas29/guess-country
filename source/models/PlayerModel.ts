import { User } from "discord.js";

export class PlayerModel {
    user: User;
    score: number = 0;
    constructor(user: User) {
        this.user = user
    }
    toString() {
        return this.user.username + ":" + this.score;
    }
}