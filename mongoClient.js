import mongoose from "mongoose"

const URI = `mongodb+srv://tomdesvignes031:Cocacola69@cluster0.7fzvspl.mongodb.net/
`

const MongoDBClient = {
    initialize: () => {
        try {
            const client = mongoose.connect(URI,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
            client.then(() => console.log(`🎉 🎉 successfully connected to DB:`))
        } catch (e) {
            throw Error(e)
        }
    }
}

export default MongoDBClient;