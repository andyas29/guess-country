import { Client, Message } from "discord.js";
import fs = require("fs");
import { CommandModel } from "./models/CommandModel";
import * as commandsUtil from "./commandsUtil"
import { Player } from "discord-player";
import { ping } from "./commands/ping";
import { start } from "./commands/start";
import { stop } from "./commands/stop";
export class MessageHandler {
    client: Client;
    player: Player;
    commandsModel: CommandModel;


    constructor(client: Client, player: Player) {
        this.client = client;
        this.player = player;
        this.commandsModel = commandsUtil.getCommands();
    }

    message(msg: Message) {
        if (msg.content.startsWith(this.commandsModel.prefix)) {
            switch (commandsUtil.getArguments(msg)[0]) {
                case this.commandsModel.commands.ping:
                    ping(msg);
                    break;
                case this.commandsModel.commands.start:
                    start(msg, this.player)
                    break;
                case this.commandsModel.commands.stop:
                    stop(msg, this.player)
                    break;
            }
        }

    }

}