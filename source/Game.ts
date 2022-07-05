import { SongModel } from "./models/SongModel";
import * as CommandsUtil from "./commandsUtil"
import { Player, Queue } from "discord-player";
import { DMChannel, EmojiIdentifierResolvable, Guild, Message, NewsChannel, PartialDMChannel, TextChannel, ThreadChannel, User, VoiceChannel } from "discord.js";
import { PlayerModel } from "./models/PlayerModel";
import { listeners } from "process";
export class Game {
    isRunning: boolean = false
    listeners: any[] = []
    player: Player;
    maxRounds: number;
    allSongs: SongModel[];
    songsList: SongModel[] = [];
    queue: Queue<DMChannel | PartialDMChannel | NewsChannel | TextChannel | ThreadChannel | VoiceChannel>;
    currentRound: number = 0;
    guild: Guild;
    author: User;
    players: PlayerModel[] = []
    skipVotes: number;
    constructor(player: Player) {
        this.player = player;
    }
    private playSong(index = 0) {
        this.player.search(this.songsList[index].link.toString(), {
            requestedBy: this.author
        }).then(x => {
            this.queue.addTrack(x.tracks[0])
            if (index == 0) {
                this.queue.play();
            }
            if (index < this.maxRounds - 1) {
                this.playSong(index + 1)
            } else {
                console.log(this.songsList)
            }
        })
    }
    startGame(maxRounds: number, message: Message) {
        this.skipVotes = 0;
        this.isRunning = true
        message.member.voice.channel.members.forEach(user => {
            this.players.push(new PlayerModel(user.user))
        })
        this.maxRounds = maxRounds;
        this.allSongs = CommandsUtil.getSongs().songs;
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
        this.playSong();
    }
    stopGame() {
        this.queue.clear();
        this.queue.stop();
        this.gameEnded();
    }
    checkAnswer(msg: Message<boolean>) {
        console.log(this.songsList[this.currentRound]);
        let user = this.players.find(element => {
            return element.user.id == msg.author.id
        })
        if (user && msg.content == this.songsList[this.currentRound].country) {
            this.correctAnswer(msg, user)

        } else {
            this.wrongAnswer(msg)
        }
    }
    songEnded() {
        this.skipVotes = 0;
        this.currentRound += 1;
        if (this.currentRound >= this.maxRounds) {
            this.gameEnded();
        }
    }
    private nextSong() {
        this.queue.skip();
    }
    private gameEnded() {
        this.isRunning = false
        this.listeners.forEach(element => {
            element.gameEnd(this.players);
        })
        this.listeners = []
        this.songsList = [];
        this.currentRound = 0;
        this.players = []
    }
    skip() {
        this.skipVotes += 1;
        if (this.skipVotes > this.players.length / 2) {
            this.nextSong();
        }
    }
    private correctAnswer(msg: Message<boolean>, user: PlayerModel) {
        msg.react('✅')
        user.score += 1;
        this.nextSong();
    }
    private wrongAnswer(msg: Message<boolean>) {
        msg.react('❌')
    }
}