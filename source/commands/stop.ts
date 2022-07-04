import { Player } from "discord-player";
import { Message } from "discord.js";
import { Game } from "../Game";

export function stop(game: Game) {
    game.stopGame();
}