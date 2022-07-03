import { Message } from "discord.js";
import fs = require("fs");
import { CommandModel } from "./models/CommandModel";
import * as commandsUtil from "./commandsUtil"
export function messageHandler(msg: Message) {
    const commandsModel: CommandModel = JSON.parse(fs.readFileSync("source/commands.json").toString());
    const content: String = msg.content;
    if (content.startsWith(commandsModel.prefix)) {
        switch (commandsUtil.getCommand(msg)[0]) {
            case "ping":
                commandsUtil.ping(msg);
                break
        }
    }
}