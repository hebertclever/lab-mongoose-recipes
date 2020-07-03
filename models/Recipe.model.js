const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const recipeSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
      minLength: 10,
      maxlength: 13,
    },
    
    ingredients: [{ type: String, minLength: 2 }],
    country: {
      type: String,
      match: /^[A-Z][A-Z]$/,
      
    cuisine: {
      type: String,
      required: true,
      },

      dishType: {
      type: String,
      enum: ['breakfast', 'main_course', 'UltraPro Chef', 'soup',
       'snack', 'drink', 'dessert'],
      },
          
    },
    image: {
      type: String,
      match: /^https?:\/\//,
      default:
        "https://images.media-allrecipes.com/images/75131.jpg",

    duration: {
      type: Number,
      min: 0,
      max: 30,
      },
      
    creator: {
      type: String,
    },

    created: { 
      type: Date,
      default: Date.now },
    },
  });


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
