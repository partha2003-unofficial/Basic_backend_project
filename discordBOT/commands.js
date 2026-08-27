import { REST, Routes } from "discord.js";
import dotnet from 'dotenv'
dotnet.config()

const commands = [ //Here you are creating a JavaScript array containing your slash command definitions.
    {
        name: 'ping',
        description: 'replace with the pong!'
    },
    {
        name: 'hello',
        description: 'say hello'
    },
    {
        name: 'help',
        description: 'Shows available commands.'
    }
]

const rest = new REST({ version: '10' }).setToken(process.env.BOTTOKEN)
/*
  REST:  is use to communicate with the discord rest api
        You use it here because you want to send your command definition to Discord.
        {version:'10'}: You create a REST client configured to use Discord API v10.
        .setToken(TOKEN): Your bot/application needs to authenticate when making API requests.

  Routes: provides predefined functions for creating the correct Discord API
*/

try {
    console.log('Started refreshing application (/) commands.')
    await rest.put(Routes.applicationCommands(process.env.BOT_APPLICAION_ID), { body: commands })
    /*
     rest.put(...): Sends an HTTP PUT request to Discord's API. 
     A PUT request overwrites the existing list of commands with the new array provided,
     adding new commands, updating modified ones, and removing any that are no longer present in the array.
       rest.put(API endpoint,data) --> Make a HTTP PUT request to this Discord API endpoint.
       { body: commands }: This is the data you're sending to Discord.
    */
   console.log('Successfully reloaded application (/) commands.'); 

} catch (error) {
    console.error(error)
}
//create the custom commands