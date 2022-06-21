// To connect with your mongoDB database
const mongoose = require('mongoose');
const path = require('path');
//can hide this if I didn't want it to be public...
const MONGO_URL =
  'mongodb+srv://Sealyoulater:Okayiguess123@cluster0.lctpx.mongodb.net/Wordelish?retryWrites=true&w=majority';
mongoose.connect(
  MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => (err ? console.log(err) : console.log('Connected to your database'))
);

// Schema for users of app
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  winStreak: {
    type: Number,
    required: true,
  },
  lowestWinStreak: {
    type: Number,
    required: true,
  },
});
const User = mongoose.model('highscorers', UserSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

// app.get('/', (req, resp) => {
//   resp.send('App is Working');
//   //get data for scoreboard
//     User.find().sort({ winStreak: -1 }).limit(10).then((data) => {
//       console.log(data);
//       resp.send(data);
// });

app.use(express.static(path.join(__dirname, '/front-end/dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front-end/dist', 'index.html'));
});

app.get('/', (req, resp) => {
  //get data for scoreboard
  User.find()
    .sort({ winStreak: -1 })
    .limit(5)
    .then((data) => {
      resp.send(data);
    });
});

app.post('/', async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();

    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    } else {
      console.log('User already register');
    }
  } catch (e) {
    resp.send('Something Went Wrong');
  }
});
app.listen(process.env.PORT || 5000, () => {
  console.log('Server is Running');
});
