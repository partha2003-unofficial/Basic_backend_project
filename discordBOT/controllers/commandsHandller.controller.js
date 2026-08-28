import shortid from "shortid";
import discoreURL_Model from "../models/discordURL.model.js";

async function createCommandHandller(message) {

    try {
        const url = message.content.split('create')[1]?.trim();
        if (!url) return message.reply('please enter a valid url')

        //create shortID
        const shortId = shortid()
        /*
        NOTE(split): If the separator is at the very beginning of the string → you get an empty string '' 
        as the first element (because there's "nothing" before it). 
        */
        if (await discoreURL_Model.findOne({ redirectURL: url })) {
            /*findOne() returns a Mongoose Query object (a thenable), not the actual document — and not synchronously. Without await, you're checking the truthiness of the Query object itself, not its result. A Query object is always truthy (it's a non-null object), so this condition always evaluates to true, regardless of whether a matching document actually exists in the database.
            This means for https://instagram.com/, even on the very first run (when nothing exists in the DB yet), it goes into the if block — never the else. Your "create new short URL" logic never runs, ever*/
            await discoreURL_Model.updateOne({ redirectURL: url }, { $push: { visitHistory: { timestamp: Date.now() } } })

        }
        else {
            await discoreURL_Model.create({
                shortUrl: shortId,
                redirectURL: url,
                visitHistory: []
            })
        }

        //reply the short url
        return message.reply({ content: 'this the url : ' + url })
    } catch (error) {
        return message.reply({ content: 'there are some error' + error })
    }


}

export { createCommandHandller }