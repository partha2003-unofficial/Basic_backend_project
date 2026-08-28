import mongoose from "mongoose";

const discordURL_schema = new mongoose.Schema({
    shortUrl: { type: String, required: true, unique: true },
    redirectURL: { type: String, required: true, unique: true },
    visitHistory: [{ timestamp: { type: String } }]
}, { timestamps: true })

const discoreURL_Model = mongoose.model('discord_URL', discordURL_schema);

export default discoreURL_Model;