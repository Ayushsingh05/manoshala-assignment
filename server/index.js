const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cron = require('node-cron');
const cors = require('cors');
const configFilePath = './config.json';

const app = express();
app.use(bodyParser.json());
app.use(cors())

let isToggleOn = false;
let isExecutingFlow = false;

app.post('/toggle', (req, res) => {
  isToggleOn = req.body.isToggleOn;

  if (isToggleOn) {
    readConfigFile();
  }

  res.status(200).send();
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
const readConfigFile = () => {
    axios.get(configFilePath)
      .then(response => {
        const config = response.data;
  
        for (let key in config) {
          const { time, status } = config[key];
  
          if (status === 'UPCOMING') {
            scheduleJob(time, () => {
              executeHttpFlow();
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  