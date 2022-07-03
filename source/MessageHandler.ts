import { Client, Message } from "discord.js";
import fs = require("fs");
import { CommandModel } from "./models/CommandModel";
import * as commandsUtil from "./commandsUtil"
export function messageHandler(msg: Message, client: Client) {
    const commandsModel: CommandModel = JSON.parse(fs.readFileSync("source/commands.json").toString());
    const content: String = msg.content;
    if (content.startsWith(commandsModel.prefix)) {
        switch (commandsUtil.getCommand(msg)[0]) {
            case commandsModel.commands.ping:
                commandsUtil.ping(msg);
                break;
            case commandsModel.commands.start:
                commandsUtil.start(msg, client)
                break;
            case commandsModel.commands.stop:
                commandsUtil.start(msg, client)
                break;
        }
    }
}