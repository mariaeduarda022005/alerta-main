const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors());

app.get('/teste', (req, res) => {
    res.status(200).send({teste:"TESTE"})
});

//rota para envio de SMS
app.get('/sendSMS', async (req, res) => {
  client.messages
  .create({
     body: 'Olá, alerta de enchente',
     from: '+18026365560',
     to: '+5548991951524'
   })
  .then(message => console.log(message.sid));
});


app.get('/data', async(req, res) => {

    //implemente sua solução aqui
    const thingSpeakChannelId = '2572799';
    const thingSpeakApiKey = 'EODTIHIUB9KBEFYI';

    // Number of results to retrieve
    const numResults = 100;

    // Make a GET request to ThingSpeak to fetch the latest data
    const response = await axios.get(
      `https://api.thingspeak.com/channels/2572799/feeds.json?results=100`,
      {
        headers: {
          Authorization: `Bearer ${thingSpeakApiKey}`,
        },
      }
    );

    const data = response.data;
    const results = [];

    // Extract the relevant data from the ThingSpeak response
    for (let d of data.feeds) {
      results.push({
        created_at: d.created_at,
        value: d.field1,
      });
    }

    // Send the results as JSON response
    res.status(200).send(results)
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});