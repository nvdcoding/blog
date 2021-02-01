const mongoose = require('mongoose');

module.exports = {
    connect: async () => {
        try {
            await mongoose.connect('mongodb+srv://duy-14:Duy14121920@cluster0.mr11q.mongodb.net/blog?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } catch (error) {
            console.log(error);
        }
    }
}
