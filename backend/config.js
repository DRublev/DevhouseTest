const config = {
    mongo: {
        url: 'mongodb+srv://admin:root@cluster0-2jtqa.mongodb.net/devhouse?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    token: {
        secret: '7fJxtyFQ',
        expiresIn: 86400 //24h
    },
}

module.exports = config;