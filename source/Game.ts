import { SongModel } from "./models/SongModel";
import * as CommandsUtil from "./commandsUtil"
import { Player, Queue } from "discord-player";
import { DMChannel, Guild, Message, NewsChannel, PartialDMChannel, TextChannel, ThreadChannel, VoiceChannel } from "discord.js";
export class Game {
    player: Player;
    maxRounds: number;
    allSongs: SongModel[];
    songsList: SongModel[] = [];
    queue: Queue<DMChannel | PartialDMChannel | NewsChannel | TextChannel | ThreadChannel | VoiceChannel>;
    currentRound: number;
    guild: Guild
    author
    constructor(maxRounds: number, player: Player, message: Message) {
        this.maxRounds = maxRounds;
        this.allSongs = CommandsUtil.getSongs().songs;
        this.player = player;
        this.guild = message.guild;
        this.author = message.author;
        for (var index = 0; index < maxRounds; index++) {
            let randomIndex = Math.floor(Math.random() * (this.allSongs.length - 1));
            this.songsList.push(this.allSongs[randomIndex]);
            this.allSongs.splice(randomIndex, 1);
        }

        this.queue = this.player.createQueue(message.guild, {
            metadata: message.channel
        });
        this.queue.connect(message.member.voice.channel)
    }
    playSong(index = 0) {
        this.player.search(this.songsList[index].link.toString(), {
            requestedBy: this.author
        }).then(x => {
            this.queue.addTrack(x.tracks[0])
            console.log("playing " + this.queue.nowPlaying().title)
            if (index == 0) {
                this.queue.play();
            }
            if (index < this.maxRounds - 1) {
                this.playSong(index + 1)
            }
        })
    }
    startGame() {
        this.playSong();
    }
}