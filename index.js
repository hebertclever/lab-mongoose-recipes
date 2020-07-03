const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");

// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Bife à Parmegiana",
      level: "Amateur Chef",
      ingredients: ["cheese", "farinha", "alcatra", "molho de tomate"],
      cuisine: "Italian",
      dishType: "main_course",
      image:
        "https://abrilmdemulher.files.wordpress.com/2016/10/receita-bife-a-parmegiana.jpg?quality=90&strip=info",
      duration: 20,
      creator: "Hebert Oliveira",
      created: "06/04/2019",
    })
      .then((data) => {
        console.log(data);
        // InsertMany
        Recipe.insertMany([
          { title: "Almondegas", duration: 20 },
          { title: "Pizza", duration: 20 },
          { title: "Salada", duration: 20 },
        ])
          .then(function (res) {
            // deleteOne
            Recipe.deleteOne({ title: "Almondegas" })
              .then(function (res) {
                console.log(res); // Success
              })
              .catch(function (error) {
                console.log(error); // Failure
              });

            // Console de InsertMany
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);

            // findOneAndUpdate
            Recipe.findOneAndUpdate(
              { title: "Asian Glazed Chicken Thighs" },
              { duration: 10 }
            )
              .then(function () {
                console.log("Deu certo"); // sucesso
              })
              .catch(function (error) {
                console.log(error); // error
              });
          });
      }) // resposta de sucesso que o servidor recebe (padrão)
      .catch((error) => console.log(error));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
