//jhint esversion:6
//
// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");
//
// //Connection URL
// const url = 'mongodb://localhost:27017';
//
// //Database Name
// const dbName = "fruitsDB";
//
// //Create A New Mongo Client
// const client = new MongoClient(url, { useUnifiedTopology: true });
//
// //Use connect method to connect to the server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   // insertDocuments(db, function() {
//   //   client.close();
//   // });
//   findDocuments(db, function() {
//     client.close();
//   });
// });
//
// const insertDocuments = function(db,callback) {
//   //Get the documents collection
//   const collection = db.collection('fruits');
//   //Insert some documents
//   collection.insertMany([
//     {
//       name: "Apple",
//       score: 8,
//       review: "Great fruit"
//     },
//     {
//       name: "Orange",
//       score: 6,
//       review: "Kinda sour"
//     },
//     {
//       name: "Banana",
//       score: 9,
//       review: "Great stuff!"
//     }
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// };
//
// const findDocuments = function(db, callback) {
//   //Get the documents collection
//   const collection = db.collection("fruits");
//   //Find some documents
//   collection.find({}).toArray(function(err, fruits) {
//     assert.equal(err,null);
//     console.log("Found the following records");
//     console.log(fruits);
//     callback(fruits);
//   });
// };

//Setting up Mongoose Database

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: {
    type: Number,
    min:1,
    max:10
  },
  review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

// const fruit = new Fruit({
//   name: "Apple",
//   rating:7,
//   review: "Pretty solid as a fruit."
// });

// fruit.save();

// const kiwi = new Fruit ({
//   name: "Kiwi",
//   rating: 10,
//   review: "The best fruit."
// });
//
// const orange = new Fruit ({
//   name: "Orange",
//   rating: 4,
//   review: "Too sour for me"
// });
//
// const banana = new Fruit ({
//   name: "Banana",
//   rating: 3,
//   review: "Weird texture"
// });
//You can keep your data clean and validated with a set of preset rules through utilization of the "Validation" feature of Mongoose.
// const fruit = new Fruit ({
//   rating:10,
//   review:"Peaches are so yummy!"
// });

// fruit.save();

// Fruit.insertMany([kiwi,orange,banana], function(err) {
//   if(err)
//      console.log(err);
//   else
//      console.log("Successfully saved all the fruits to fruitsDB");
// });
//Establishing relationships and embedding documents using Mongoose.
const personSchema=new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

// const pineapple = new Fruit ({
//   name:"Pineapple",
//   rating:9,
//   review:"Great fruit!"
// });

// pineapple.save();

const grapes = new Fruit ({
   name: "Grapes",
   rating:9,
   review: "Sweet taste in general but sometimes sour as well!"
});

grapes.save();

const Person = mongoose.model("Person", personSchema);

// const person = new Person ({
//   name: "Amy",
//   age:12,
//   favouriteFruit: pineapple
// });

// person.save();

//Reading from your database with Mongoose
//Close the MongoDB database connection once you are done with your work.
Fruit.find(function(err, fruits) {
  if(err)
     console.log(err);
  else
  {
    // console.log(fruits);
    mongoose.connection.close();
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});
//Updating and deleting data using Mongoose
// Fruit.updateOne({_id: "6042ab5e760cee69406ed8a9"}, {name: "Peach"}, function(err) {
//   if(err)
//      console.log(err);
//   else
//      console.log("Successfully updated the document.");
// });

// Person.deleteOne({_id: "6042b276710bb587acea7f42"}, function(err) {
//   if(err)
//      console.log(err);
//   else
//      console.log("Successfully deleted the document");
// });

// Person.deleteMany({_id: {$ne: "60429d278b1f870eb07f9899"} }, function(err) {
//   if(err)
//      console.log(err);
//   else
//      console.log("Successfully deleted many documents.");
// });

Person.updateOne({_id:"60429d278b1f870eb07f9899"},{favouriteFruit: grapes}, function(err) {
  if(err)
     console.log(err);
  else
     console.log("Successfully modified the document.");
});
