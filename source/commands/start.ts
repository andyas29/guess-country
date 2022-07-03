import { Player } from "discord-player";
import { Message } from "discord.js";
import * as CommandsUtil from "../commandsUtil"
export function start(message: Message, player: Player) {
    const arg: string[] = CommandsUtil.getArguments(message)

    for (var index = 0; index <= Number.parseInt(arg[1]); index++) {
        let randomIndex = Math.floor(Math.random() * 10);
    }

    const queue = player.createQueue(message.guild, {
        metadata: message.channel
    });
    queue.connect(message.member.voice.channel)
    player.search("https://www.youtube.com/watch?v=9eBEix_Ltrw", {
        requestedBy: message.author
    }).then(x => { queue.addTrack(x.tracks[0]), queue.play() })

}
