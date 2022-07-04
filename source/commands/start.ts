import { Player } from "discord-player";
import { Message } from "discord.js";
import * as CommandsUtil from "../commandsUtil"
import { Game } from "../game";
import { SongModel } from "../models/SongModel";
export function start(message: Message, game: Game) {
    const arg: string[] = CommandsUtil.getArguments(message)
    var rounds: number;
    if (Number.parseInt(arg[1])) {
        rounds = Number.parseInt(arg[1]);
    } else {
        rounds = 3;
    }
    game.startGame(rounds, message);
    return game;
}