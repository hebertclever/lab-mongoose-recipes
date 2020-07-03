const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// const NewRecipe = require('./models/Model.create');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const result = Recipe.create({
      title: 'Bife à Parmegiana',
      level: 'Amateur Chef',
      ingredients: ['cheese', 'farinha', 'alcatra', 'molho de tomate'],
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://abrilmdemulher.files.wordpress.com/2016/10/receita-bife-a-parmegiana.jpg?quality=90&strip=info',
      duration: 20,
      creator: 'Hebert Oliveira',
      created: '06/04/2019',
    
    })
    .then((data)=> console.log(data))
    .catch(error => console.log(error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // InsertMany
  const Title = mongoose.model('Title', { 
    title: { type: String }, 
    duration: { type: Number } 
}); 
  
  Title.insertMany([ 
    { title: 'Almondegas', duration: 20}, 
    { title: 'Pizza', duration: 20}, 
    { title: 'Salada', duration: 20} 
]).then(function(){ 
    console.log("Data inserted")  
}).catch(function(error){ 
    console.log(error)      
}); 


// findOneAndUpdate
const Creator = mongoose.model('Creator',{ 
  creator: { type: String }, 
  }); 

Creator.findOneAndUpdate({duration: {$gte:30} },  
  {title:"Pizza"}, null, function (err, docs) { 
  if (err){ 
      console.log(err) 
  } 
  else{ 
      console.log("Original Doc : ",docs); 
  } 
}); 


// deleteOne
Creator.deleteOne({ duration: { $gte: 30 } }).then(function(){ 
  console.log("Almondegas"); // Success 
}).catch(function(error){ 
  console.log(error); // Failure 
}); 