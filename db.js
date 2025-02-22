const mongoose = require('mongoose');
const Chat = require('./models/chatmodel');


ConnectToMongoDB().then(() => {console.log("connected to db")})
.catch(error => console.error(error));
// Connect to MongoDB
async function ConnectToMongoDB() {
    mongoose.connect('mongodb://localhost:27017/messenger');

}

allChats= [
    {
        from: 'Ali',
        to: 'Ahmed',
        message: 'Hello',
        createdAt: new Date()
    },
    {
        from: 'Ahmed',
        to: 'Ali',
        message: 'Hi',
        createdAt: new Date()
    },
    {
        from: 'Alina',
        to: 'Nancy',
        message: 'How are you?',
        createdAt: new Date()
    },
    {
        from: 'Ahmed',
        to: 'Ali',
        message: 'I am fine',
        createdAt: new Date()
    },
    {
        from: 'Alice',
        to: 'Bob',  
        message: 'Talking to bob',
    }
];

Chat.insertMany(allChats).then(() => {
    console.log('Chats inserted successfully');
}).catch(error => console.error(error));

