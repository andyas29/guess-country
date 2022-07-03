import { Player } from "discord-player";
import { Message } from "discord.js";

export function stop(message: Message, player: Player) {
    const queue = player.getQueue(message.guild);
    queue.clear();
    queue.stop();
}