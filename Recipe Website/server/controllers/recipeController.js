require('../models/database')

const Category = require('../models/Category')
const Recipe = require('../models/Recipe')

//GET /
//Homepage

exports.homepage = async (req, res) => {

    try {
        const limitNumber = 5
        const categories = await Category.find({}).limit(limitNumber)
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber)
        const american = await Recipe.find({'category': 'American'}).limit(limitNumber)
        const turk = await Recipe.find({'category': 'Turk'}).limit(limitNumber)
 
        const food = { latest, american, turk }
        
        res.render('index', {title: 'Recipe Blog - Home', categories, food})
    } 
    
    catch (error) {
        res.status(500).send({message: error.message || 'Error occured.'})
    }
}

//GET /categories
//Categories

exports.exploreCategories = async (req, res) => {

    try {
        const limitNumber = 20
        const categories = await Category.find({}).limit(limitNumber)

        res.render('categories', {title: 'Recipe Blog - Categories', categories, categoryByID: []})
    } 
    
    catch (error) {
        res.status(500).send({message: error.message || 'Error occured.'})
    }
}

//GET /categories/:id
//Categories by ID

exports.exploreCategoriesByID = async (req, res) => {

    try {
        let categoryID = req.params.id
        const limitNumber = 20
        const categoryByID = await Recipe.find({'category': categoryID}).limit(limitNumber)

        res.render('categories', {title: 'Recipe Blog - Categories', categoryByID, categories:[]})
    } 
    
    catch (error) {
        res.status(500).send({message: error.message || 'Error occured.'})
    }
}

//GET /recipe/:id
//Recipe
exports.exploreRecipe = async (req, res) => {

    try {
        let recipeID = req.params.id
        const recipe = await Recipe.findById(recipeID)

        res.render('recipe', {title: 'Recipe Blog - Recipes', recipe})
    } 
    
    catch (error) {
        res.status(500).send({message: error.message || 'Error occured.'})
    }
}

//GET /explore-latest
//Explore Latest
exports.exploreLatest = async (req, res) => {

    try {
        const limitNumber = 20
        const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber)
        res.render('explore-latest', {title: 'Recipe Blog - Explore Latest', recipe})
    } 
    
    catch (error) {
        res.status(500).send({message: error.message || 'Error occured.'})
    }
}

//GET /explore-random
//Explore Random as JSON
exports.exploreRandom = async (req, res) => {

    try {
        let count = await Recipe.find().countDocuments()
        let random = Math.floor(Math.random() * count)
        let recipe = await Recipe.findOne().skip(random).exec()
        res.render('explore-random', {title: 'Recipe Blog - Explore Random', recipe})
    } 
    
    catch (error) {
        res.status(500).send({message: error.message || 'Error occured.'})
    }
}

//GET /submit-recipe
//Submit Recipe
exports.submitRecipe = async (req, res) => {

    try {
        const infoErrorMessage = req.flash('infoError')
        const infoSubmitMessage = req.flash('infoSubmit')
        res.render('submit-recipe', {title: 'Recipe Blog - Submit Recipe', infoErrorMessage, infoSubmitMessage})
    } 
    
    catch (error) {
        res.status(500).send({message: error.message || 'Error occured.'})
    }
}

//POST /submit-recipe
//Submit Recipe
exports.submitRecipeOnPost = async (req, res) => {

    try {

        let imageUploadFile
        let uploadPath
        let newImageName

        if(!req.files || Object.keys(req.files).length === 0) {
            console.log('No files where uploaded.')
        }
        
        else {
            imageUploadFile = req.files.file
            newImageName = Date.now() + imageUploadFile.name

            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName

            imageUploadFile.mv(uploadPath, function(error) {
                if(error) {return res.status(500).send(error)}
            })
        }

        const newRecipe = new Recipe({
            name: req.body.name,
            email: req.body.email,
            category: req.body.category,
            time: req.body.time + ' ' + req.body.unitOfTime,
            difficulty: req.body.difficulty,
            ingredients: req.body.ingredientData,
            steps: req.body.stepData,
            image: newImageName,
        })

        console.log(req.body)
        
        await newRecipe.save()

        req.flash('infoSubmit', 'Recipe has been added.')
        res.redirect('/submit-recipe')
    }
    
    catch (error) {
        console.log(error)
        req.flash('infoError', error)
        res.redirect('/submit-recipe')
    }
}

//POST /search
//Search
exports.searchRecipe = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm
        let recipe = await Recipe.find({ name: { $regex: searchTerm, $options: 'i' } });

        res.render('search', {title: 'Recipe Blog - Search', recipe})
    } 
    
    catch (error) {
        res.status(500).send({message: error.message || 'Error occured.'})
    }
}

// updateRecipe
/* 
    async function updateRecipe() {
    try {
        const res = await Recipe.updateOne({name: 'RecipeName'}, {name: 'RecipeName updated'})
        res.n
        res.nModified
    } 
    
    catch (error) {
        console.log(error)
    }
}
updateRecipe()
*/

// DeleteRecipe
/* 
    async function DeleteRecipe() {
    try {
        await Recipe.deleteOne({name: 'RecipeName'})
    } 
    
    catch (error) {
        console.log(error)
    }
}
DeleteRecipe()
*/

// async function insertCategoryData(){

//     try {
//         await Category.insertMany([
//             {
//                 "name": "Italian",
//                 "image": "italian-food.jpg"
//             },
//         ])} 

//     catch (error) {
//         console.log('error', + error)
//     }
// }

// insertCategoryData()

//GET /categories
//Recipes

// async function insertRecipeData(){

//     try {
//         await Recipe.insertMany([
//          {
//             "name": "Hamburger",
//             "email": "northeater@gmail.com",
//             "ingredients": [
//                 "1 pound ground lean (7% fat) beef",
//                 "1 large egg",
//                 "½ cup minced onion",
//                 "¼ cup fine dried bread crumbs",
//                 "1 tablespoon Worcestershire",
//                 "1 or 2 cloves garlic, peeled and minced",
//                 "About 1/2 teaspoon salt",
//                 "About 1/4 teaspoon pepper",
//                 "4 hamburger buns (4 in. wide), split",
//                 "About 1/4 cup mayonnaise",
//                 "About 1/4 cup ketchup",
//                 "4 iceberg lettuce leaves, rinsed and crisped",
//                 "1 firm-ripe tomato, cored and thinly sliced",
//                 "4 thin slices red onion"
//             ],
//             "steps": [
//                  "Preheat the oven to 400°.",
//                  "Cut the jalapeño peppers in half lengthwise. Use a spoon to scrape out and discard the seeds and ribs from the peppers. Set the halved peppers aside.",
//                  "Stir together the cheddar, cream cheese, mayonnaise, pimientos, onion, and 1/4 teaspoon each salt, paprika, and pepper In a medium bowl. Stir together the panko, the remaining 1/4 teaspoon each salt, paprika, and pepper, as well as olive oil in a small bowl.",
//                  "Fill each pepper half with some of the cheese mixture, and place on a parchment-lined rimmed baking sheet. Sprinkle the tops of the peppers evenly with the panko mixture.",
//                  "Bake until the tops are golden brown, about 15 minutes. Remove the peppers from the oven and top them with bacon and chives."
//                  ],
//             "category": "American",
//             "time": "1 Hour",
//             "difficulty": "Medium",
//             "image": "hamburger.jpg",
//         },
        
//     catch (error) {
//         console.log('error', + error)
//     }
// }

// insertRecipeData()