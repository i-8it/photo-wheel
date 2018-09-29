const { Client } = require('pg');
var data = require('../userDBTest.json');

const client = new Client({
  user: 'arjunmehta',
  host: 'localhost',
  database: 'photowheel',
  password: '',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to da DB');
    // client.query(`COPY yelpusers from ${data}`, (err, res) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log('successfully inserted into DB');
    //   }
    // });
  }
});

for (let i = 0; i < data.length; i++) {
  const values = [data[i].name, data[i].elite, data[i].friends, data[i].reviews, data[i].avatar];
  client.query('INSERT INTO users (name, elite, friends, reviews, avatar) VALUES (?, ?, ?, ?, ?)', values, (err, res) => {
    if (err) {
      console.error(err);
      console.log(values);
    } else {
      console.log('Successfully inserted into DB ', i);
    }
  });
}
