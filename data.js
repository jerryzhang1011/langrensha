const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/jerry');

mongoose.connection.once('open', async () => {
    console.log("Success");

    const studentSchema = new mongoose.Schema({
        name: String,
        age: Number,
    });

    // Use 'test' as the collection name
    const model = mongoose.model('classes', studentSchema);
    
    const jerry = {
        name: 'otto',
        age: 69
    };


    const result = await model.updateOne({ name: 'oooppp' }, { name: 'otto' });
    console.log(result);
    mongoose.disconnect();
});

mongoose.connection.on('error', (err) => {
    console.error('Connection error:', err);
});

mongoose.connection.on('close', () => {
    console.log('Disconnected');
});
