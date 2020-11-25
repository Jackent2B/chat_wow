const express = require('express');
const app = express();
var path = require('path');
const { mongoURL } = require('./config/keys');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');
var dotenv = require('dotenv');
dotenv.config();

//connecting to database
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('connected to mongodb atlas');
});
mongoose.connection.on('error', (error) => {
  console.log('error connecting to database' + error);
});
mongoose.set('useFindAndModify', false);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
//accessing routes
app.use(authRoute);
app.use(postRoute);
app.use(userRoute);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'success-client', 'build', 'index.html')
    );
  });
}

var PORT = process.env.PORT || 3000;

app.listen(PORT, process.env.IP, () => {
  console.log('Server Has Started');
});
