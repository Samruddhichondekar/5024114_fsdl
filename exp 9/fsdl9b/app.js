const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// ✅ Ensure uploads folder exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// ✅ MongoDB connect
mongoose.connect('mongodb://127.0.0.1:27017/chatDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schemas
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const msgSchema = new mongoose.Schema({
    user: String,
    text: String,
    image: String,
    time: String
});

const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', msgSchema);

// File upload
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage });

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
        user = new User({ username, password });
        await user.save();
    }

    res.send("Login success");
});

// Upload image
app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ image: req.file.filename });
});

// Socket
io.on('connection', (socket) => {
    console.log("User connected");

    socket.on('sendMessage', async (data) => {
        const msg = new Message({
            user: data.user,
            text: data.text,
            image: data.image || "",
            time: new Date().toLocaleTimeString()
        });

        await msg.save();
        io.emit('message', msg);
    });
});

// Start server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});