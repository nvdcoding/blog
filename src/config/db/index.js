const mongoose = require('mongoose');

module.exports = {
    connect: async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/blog', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } catch (error) {
            console.log(error);
        }
    }
}
