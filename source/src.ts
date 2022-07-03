
import { Player } from "discord-player";
import { Message } from "discord.js";
import * as dotenv from "dotenv";
import { MessageHandler } from "./MessageHandler";
dotenv.config({ path: '.env' });
const { Client, Intents } = require('discord.js');

const client = new Client(
    { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, "GUILD_VOICE_STATES"] }
);
const player = new Player(client);
const messageHandler = new MessageHandler(client, player)

client.on('ready', function (e: Message) {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', function (msg: Message) {
    messageHandler.message(msg);
})
client.login(process.env.DISCORD_TOKEN)