
import { Message } from "discord.js";
import * as dotenv from "dotenv";
import { messageHandler } from "./MessageHandler";
dotenv.config({ path: '.env' });
const { Client, Intents } = require('discord.js');

const client = new Client(
    { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }
);
client.on('ready', function (e: Message) {
    console.log(`Logged in as ${client.user.tag}!`)
})


client.on('message', function (msg: Message) {
    messageHandler(msg);
})
client.login(process.env.DISCORD_TOKEN)