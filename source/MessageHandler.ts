import { Client, Message } from "discord.js";
import fs = require("fs");
import { CommandModel } from "./models/CommandModel";
import * as commandsUtil from "./commandsUtil"
import { Player } from "discord-player";
import { ping } from "./commands/ping";
import { start } from "./commands/start";
import { stop } from "./commands/stop";
import { Game } from "./Game";
export class MessageHandler {
    client: Client;
    player: Player;
    commandsModel: CommandModel;
    game: Game;

    constructor(client: Client, player: Player) {
        this.client = client;
        this.player = player;
        this.commandsModel = commandsUtil.getCommands();
        this.game = new Game(player);
        player.on("trackEnd", x => {
            this.game.songEnded();
        })
    }

    message(msg: Message) {
        if (this.game.isRunning) {
            let user = this.game.players.find(element => {
                return element.user.id == msg.author.id
            })
            if (user) {
                this.game.checkAnswer(msg)
            }
        }
        if (msg.content.startsWith(this.commandsModel.prefix)) {
            switch (commandsUtil.getArguments(msg)[0]) {
                case this.commandsModel.commands.ping:
                    ping(msg);
                    break;
                case this.commandsModel.commands.start:
                    this.game = start(msg, this.game)
                    this.game.listeners.push(this);
                    break;
                case this.commandsModel.commands.stop:
                    stop(this.game);
                    break;
            }
        }

    }
    gameEnd() {
        console.log("gata boss");
    }

}