
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },

  () => {
    console.log("Connected to MongoDB");
  }
);
