import { Player, Queue } from "discord-player";
import { DMChannel, Message, NewsChannel, PartialDMChannel, TextChannel, ThreadChannel, VoiceChannel } from "discord.js";
import ytdl = require('ytdl-core');
var player: Player
var queue: Queue<DMChannel | PartialDMChannel | NewsChannel | TextChannel | ThreadChannel | VoiceChannel>;
export function getCommand(message: Message) {
    return message.content.substring(1).split(' ');
}
export function ping(message: Message) {
    message.channel.send("pong");
    console.log(this);
}

export function start(message: Message, client) {
    player = new Player(client);

    queue = player.createQueue(message.guild, {
        metadata: message.channel
    });
    queue.connect(message.member.voice.channel)
    player.search("https://www.youtube.com/watch?v=9eBEix_Ltrw", {
        requestedBy: message.author
    }).then(x => { queue.addTrack(x.tracks[0]), queue.play() })
}
export function stop(message: Message) {
    queue.stop();
}