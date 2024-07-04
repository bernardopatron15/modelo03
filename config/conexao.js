const mongoose = require('mongoose');

mongoose.connect("mongodb://patronn:patronn@ac-jq27sim-shard-00-00.8yxwiys.mongodb.net:27017,ac-jq27sim-shard-00-01.8yxwiys.mongodb.net:27017,ac-jq27sim-shard-00-02.8yxwiys.mongodb.net:27017/?ssl=true&replicaSet=atlas-tzqool-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")

module.exports = mongoose