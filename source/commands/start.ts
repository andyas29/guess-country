import { Player } from "discord-player";
import { Message } from "discord.js";
import * as CommandsUtil from "../commandsUtil"
import { Game } from "../game";
import { SongModel } from "../models/SongModel";
export function start(message: Message, player: Player) {
    const arg: string[] = CommandsUtil.getArguments(message)
    var trackNumber: number;
    if (Number.parseInt(arg[1])) {
        trackNumber = Number.parseInt(arg[1]);
    } else {
        trackNumber = 3;
    }
    const game: Game = new Game(trackNumber, player, message)
    game.startGame();
    return game;
}