import shortid from "shortid";
import urlModel from "../models/url.model.js"

async function handlGenerateNewShortID(request, response) {
    const body = request.body;
    if (!body) return response.status(404).json({ message: 'body is not found' })

    const shortIdgenerator = shortid();
    await urlModel.create({
        shortId: shortIdgenerator,
        redirectURL: body.url,
        visitHistory: []
    })
    return response.render('index.views.ejs', { id: shortIdgenerator })
}

async function handleByShortId(request, response) {
    const shortId = request.params.shortid;
    const entry = await urlModel.findOneAndUpdate({ shortId }, { $push: { visitHistory: { timestamp: Date.now() } } })
    await response.redirect(entry.redirectURL)
    console.log('redirect is successful')
}

async function handelAnaliticsURL(request, response) {
    const shortId = request.params.shortId;
    const result = await urlModel.findOne({ shortId })
    return response.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}

export { handlGenerateNewShortID, handelAnaliticsURL, handleByShortId }