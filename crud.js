const mongoDBClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/personal_buget_db';


const client = new mongoDBClient(url);

client.connect()
.then(client => {
    console.log('Connected...');
    const collection = client.db("personal_budget_db").collection("budget");
    // perform actions on the collection object
    client.close();
})
.catch(error => {
    console.log(error);
}
);