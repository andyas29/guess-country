import { Message } from "discord.js";
import fs = require("fs");
const FILES_PATH = "./files"
export function getArguments(message: Message) {
    return message.content.substring(1).split(' ');
}
export function getCommands() {
    return JSON.parse(fs.readFileSync(FILES_PATH + "/commands.json").toString())
}
export function getSongs() {
    return JSON.parse(fs.readFileSync(FILES_PATH + "/songs.json").toString())
}