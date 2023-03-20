const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },

    email: {
        type: String,
        required: 'This field is required.'
    },

    ingredients: {
        type: Array,
        required: 'This field is required.'
    },

    steps: {
        type: Array,
        required: 'This field is required.'
    },

    category: {
        type: String,
        enum: ['Italian', 'American', 'Chinese', 'Japanese', 'Turk', 'Korean', 'Mexican', 'Spanish', 'French', 'Indian'],
        required: 'This field is required.'
    },

    time: {
        type: String,
        required: 'This field is required.'
    },

    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: 'This field is required.'
    },

    image: {
        type: String,
        required: 'This field is required.'
    },
})

recipeSchema.index({ name: 'text' }, { default_language: 'none' }, {weights: { name: 2 }})

module.exports = mongoose.model('Recipe', recipeSchema)