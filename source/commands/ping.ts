import { Message } from "discord.js";

export function ping(message: Message) {
    message.channel.send("pong");
    console.log(this);
}