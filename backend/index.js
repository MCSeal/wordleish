// To connect with your mongoDB database
const mongoose = require('mongoose');

const mongoAtlasUri =
  'mongodb+srv://Sealyoulater:Okayiguess123@cluster0.lctpx.mongodb.net/Wordelish?retryWrites=true&w=majority';
mongoose.connect(
  mongoAtlasUri,
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
console.log('App listen at port 5000');
app.use(express.json());
app.use(cors());

// app.get('/', (req, resp) => {
//   resp.send('App is Working');
//   //get data for scoreboard
//     User.find().sort({ winStreak: -1 }).limit(10).then((data) => {
//       console.log(data);
//       resp.send(data);
// });

app.get('/', (req, resp) => {
  //get data for scoreboard
  User.find()
    .sort({ winStreak: -1 })
    .limit(10)
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
app.listen(5000);
