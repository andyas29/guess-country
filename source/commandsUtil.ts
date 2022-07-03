import { Message } from "discord.js";

export function getCommand(message: Message) {
    return message.content.substring(1).split(' ');
}
export function ping(message: Message) {
    message.channel.send("pong");
}
