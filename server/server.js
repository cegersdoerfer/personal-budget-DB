// Budget API

const express = require('express');
const { get } = require('http');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');
const { cli } = require('webpack-dev-server');
const mongoose = require('mongoose');
const myBudgetSchema = require('./models/budget_schema');
var bodyParser = require('body-parser');



const url = 'mongodb://localhost:27017/personal_buget_db';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json());
app.use(cors());
var corsOptions = {
    origin: '*'
  }


async function postBudgetData(data) {
    // connect to database
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(
        () => {
            console.log('Database is connected');
            const newData = new myBudgetSchema(data);
            newData.save();
        }
    ).catch(
        (err) => {
            console.log('Can not connect to the database' + err);
        }
    );
}

  

async function getData() {
    // connect to database
    return mongoose.connect(url, { useUnifiedTopology: true }).then(
        () => {
            console.log('Database is connected');
            return myBudgetSchema.find({}).then(
                (data) => {
                    return data;
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            );
        }
    ).catch(
        (err) => {
            console.log('Can not connect to the database' + err);
        }
    );
}

app.post('/budget', cors(corsOptions), async (req, res) => {
    console.log('POST request received at /budget');
    const new_data = req.body;
    console.log(new_data);
    const budget = await postBudgetData(new_data);
    res.json(budget);
});

app.get('/budget', cors(corsOptions), async (req, res) => {
    await getData().then(
        (data) => {
            res.json(data);
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    );
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});

