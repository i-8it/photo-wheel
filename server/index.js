var express = require('express');
var app = express();
var parser = require('body-parser');
var db = require('../database/index.js');
var cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:3005',
  optionsSuccessStatus: 200
};

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use('/:idOrName', express.static('./public'));

app.get('/:idOrName/restaurants', cors(corsOptions), (req, res) => {
  if (isNaN(parseInt(req.params.idOrName))) {
    db.getAllPicturesByName(req.params.idOrName, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    db.getAllPicturesById(req.params.idOrName, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  }
});

app.get('/:idOrName/users', cors(corsOptions), (req, res) => {
  db.getAllUsers(req.query.users, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/api/photos/:idOrName/restaurants', cors(corsOptions), (req, res) => {
  if (isNaN(parseInt(req.params.idOrName))) {
    db.getAllPicturesByName(req.params.idOrName, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    db.getAllPicturesById(req.params.idOrName, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  }
});

app.get('/api/photos/:idOrName/users', cors(corsOptions), (req, res) => {
  db.getAllUsers(req.query.users, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// CREATE USER
app.post('/api/photos/users', cors(corsOptions), (req, res) => {
  let valuesArray = Object.keys(req.body).map(k => req.body[k]);
  db.db.query('INSERT INTO users (name, elite, friends, reviews, avatar) VALUES (?, ?, ?, ?, ?)', valuesArray, (err, result) => {
    if (err) {
      res.send(err);
    }	else {
      res.send('Successfully inserted user into DB');
    }
  });
});

// CREATE PHOTO
app.post('/api/photos/restaurants', cors(corsOptions), (req, res) => {
  let valuesArray = Object.keys(req.body).map(k => req.body[k]);
  db.db.query('INSERT INTO pictures (url, postdate, caption, user, restaurant) VALUES (?, ?, ?, ?, ?)', valuesArray, (err, result) => {
    if (err) {
      res.send(err);
    }	else {
      res.send('Successfully inserted user into DB');
    }
  });
});

// DELETE USER
app.delete('/api/photos/users/:id', cors(corsOptions), (req, res) => {
  const id = req.params.id;
  db.db.query('DELETE FROM users WHERE user_id = ?', id, (err, result) => {
    if (err) {
      res.send(err);
    }	else {
      res.send('Successfully deleted user from DB');
    }
  });
});

// DELETE PHOTO
app.delete('/api/photos/restaurants/:id', cors(corsOptions), (req, res) => {
  const id = req.params.id;
  db.db.query('DELETE FROM pictures WHERE id = ?', id, (err, result) => {
    if (err) {
      res.send(err);
    }	else {
      res.send('Successfully deleted photo from DB');
    }
  });
});

// UPDATE USER
app.patch('/api/photos/users/:id', cors(corsOptions), (req, res) => {
  const key = (Object.keys(req.body)[0]);
  const val = req.body[Object.keys(req.body)[0]];
  const id = req.params.id;
  console.log(key, val, id);
  db.db.query('UPDATE users SET ?? = ? WHERE user_id = ?', [key, val, id], (err, result) => {
    if (err) {
      res.send(err);
    }	else {
      res.send('Successfully updated user in DB');
    }
  });
});

// UPDATE PHOTO
app.patch('/api/photos/restaurants/:id', cors(corsOptions), (req, res) => {
  const key = (Object.keys(req.body)[0]);
  const val = req.body[Object.keys(req.body)[0]];
  const id = req.params.id;
  console.log(key, val, id);
  db.db.query('UPDATE pictures SET ?? = ? WHERE id = ?', [key, val, id], (err, result) => {
    if (err) {
      res.send(err);
    }	else {
      res.send('Successfully updated photo in DB');
    }
  });
});


var port = process.env.PORT || 3001;

app.listen(port, () => console.log('Connected on port 3001'));

module.exports.app = app;
