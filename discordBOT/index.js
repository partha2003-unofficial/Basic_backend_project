import { Client, GatewayIntentBits, InteractionCallback } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client({
    intents: [ //intents means gatting the permission to the client
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})
client.on('messageCreate', (message) => {
    if (message.author.bot) return; // if the bot is reply then return it 
    message.reply({ content: 'hi form bot' })
    console.log(message.content)
})

client.on("interactionCreate", (interaction) => {

    if (!interaction.isChatInputCommand()) return;
    /*
    When an interactionCreate event fires, 
    it could be triggered by several different actions—such as a user clicking a button, 
    selecting a dropdown menu, submitting a modal, or using a context menu command. 
    
    interaction.isChatInputCommand(): checks whether the incoming interaction is a standard slash command (/ping, /help, etc.).
    */

    if (interaction.commandName === "ping") { interaction.reply("Pong! 🏓");}
    if (interaction.commandName === "hello") {interaction.reply("Hello! 👋");}
    if (interaction.commandName === "help") {interaction.reply("Available commands: /ping, /hello, /help");}

});
client.login(process.env.BOTTOKEN)