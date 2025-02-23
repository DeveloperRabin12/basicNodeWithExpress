const express = require('express');
const Chat = require('./models/chatmodel');
const mongoose = require('mongoose');
const app = express();

// Method Override for using put patch delete
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

ConnectToMongoDB().then(() => {console.log("connected to db")})
.catch(error => console.error(error));
// Connect to MongoDB
async function ConnectToMongoDB() {
    mongoose.connect('mongodb://localhost:27017/messenger');

}



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');





app.get('/chats', async(req, res) => {
    let chats = await Chat.find()
    console.log(chats);
    res.render('index', {chats});

})


app.get('/chats/new', (req, res) => {
    res.render('new');
})

app.post('/chats/new', (req, res) => {
    let {from, message, to} = req.body;
    let nchat =  new Chat({
        from : from,
        message : message,
        to : to,
        createdAt : new Date()});
    nchat.save().then(() => {
        console.log('Chat inserted successfully');
    }).catch(error => console.error(error));
    res.redirect('/chats');
    });
 
//edit route
app.get('/chats/:id/edit', async(req, res) => {
    let {id} = req.params;
   let chato =await Chat.findById(id);
    res.render('edit', {chato});
})

app.put('/chats/:id', async(req, res) => {
    let {id} = req.params;
    let { message} = req.body;
    await Chat.findByIdAndUpdate(id, {message:message}, { runValidators:true, new:true});
    res.redirect('/chats');
})

//delete route
app.delete('/chats/:id', async(req, res) => {
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect('/chats');
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');

});

