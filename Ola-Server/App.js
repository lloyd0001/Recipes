

//Variables
const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());


//Recipes
const recipes = [
    {
        id: 1,
        name: "Pasta Carbonara",
        ingredients: ["Spaghetti", "Bacon", "Eggs"],
        category:"Diner",
        instructions:["1. Use about 4 quarts of water for every 1 lb of pasta. ", "2. Never forget to salt the water.", "3. Do not break the pasta! It will only take 30 seconds for your pasta to soften up and sink into the pot.", "4. Stir the pasta well using tongs to avoid the noodles form sticking to the pot.", "5. Do not hesitate to taste the pasta. For about 5 minutes beofre the end of the cooking duration, test if the pasta is already al dante (sticks to the tooth, chewy).", "6. Just because its already cooked doesn't mean you can leave it for good. Drain the pasta immediately, and be sure to add the sauce right away. "],
    },
    {
        id: 2,
        name: "Cheesy Bacsilog",
        ingredients: ["Bacon", "Eggs","Rice", "Cheese"],
        category:"Breakfast",
        instructions:["1. Cook over low heat", "mixing continuously", "until the cheese melts and the mixture is thick."," 2. Assemble your bacsilog by grabbing some bowls and filling them with a serving of rice, bacon, and egg.","3. Drizzle each bowl with the bacsilog cheese.", "4. Enjoy your bacsilog as is or add extra Knorr Liquid Seasoning for a deeper" ," unamiu-taste."],
    },
    {
        id: 3,
        name: "Chickselog",
        ingredients: ["Chiken", "Eggs", "Rice", "Calamansi", "Pepper"],
        category:"Breakfast",
        instructions:["1. In a bowl, season chiwcken with salt, pepper and calamansi extract. Cover and marinate in the fridge for 30 minutes. Set aside","2. Heat oil in a frying pan. Fry 4 eggs then remove from the pan. Set aside.","3. In a bowl, beat an egg usinng a fork.","4. Then pour the flour in a flat plate.", "5. Get the chicken then dip in the beaten egg and dredge in the flour.", "6. In the same pan (you used in cookiong the egg), gently fry the chicken for 6-8 minutes per side or until crispy brown over low medium heat.", "7. Then remove the chicken from the pan and let it sit until dry. Set aside.", "8. In another pan, heat cooking oil then saute garlic until brown.", "9. Add the cooked rice and season with salt. Mix well for 10 minutes. Set aside."],
    },
    {
        id: 4,
        name: "Perfect Spinach Salad",
        ingredients: ["3 whole eggs", "Ice", "7 slices thick-cut peppered bacon", "1 small whole red onion", "1 package white button mushrooms", "3 table spoons red wine vinegar", "2 teaspoons sugar", "1/2 teaspoon Dijon mustard", "1 dash salt", " 8 ounces baby spinach, washed, dried and steams removed"],
        category:"Breakfast",
        instructions:["1. Place the eggs in a saucepan, cover with water and bring to a boil. Then turn off the heat and allow to sit  in the water for 20 minutes. Drain off the water and ice on top of the eggs.", "2. Fry the bacon in a skillet until crispy/chewy. Remove to a paper towel. Drain the fat into a bowl and reserve. Give the skillet a wipe with a kitchen paper.", "3. Slice the red onion very thinly, and then add to the skillet. Cook slowly until the onions are caramelized and reduced. Remove to a plate and set aside.", "4. Slice the Mushrooms and add them to the same skillet with a little of the reserved bacon fat if needed. Cook slowly until caramelized and brown. Remove to a plate and set aside. Chop the bacon. Peel and slice the eggs.", "5. Make the hot bacon dressing.", "6. Add 3 tablespoons of the reserved bacon fat, vinegar, sugar, Dijon and salt to a small saucepan or skillet over medium-low heat. Whisk together and heat thoroughly until bubbly. Add the spinach to a large bowl, Arrage the onions, mushrooms and bacon on top. Pour the hot dressing over the top; toss to combine. Arrange the eggs over the top and serve", "7. Per serving: Calories 270; Total Fat 22.5 grams; Saturated Fat 7.5 grams; Protein 10 grams; Total Carbohydrate 7 grams; Sugar: 2 grams; Fiber 2 grams; Cholesterol 123 miligrams; Sodium 526 milligrams."],
    },
    {
        id: 5,
        name: "Berry Overnight Oats",
        ingredients: ["1/2 cup old fashioned rolled oats", "1/2 cup nonfat greek yogut", "1/2 cup almond milk", "1/2 teaspoon cinnamon", "1/4 teaspoon ground ginger", "1/3 cup berries - I used mix of blueberries, raspberries and chopped strawberries", "1 teaspoon maple syrup - optional8"],
        category:"Dessert",
        instructions:["1. Pour all ingredients in a mason jar or sealable container. Shake/stir until all ingredients are mixed.", "2. Place oats in refrigerator to chill overnight. When ready to eat, enjoy hot or cold.", "3. Note: I prefer breakfast to be lower in sugar, so this might not be sweet enough for your tastes. You can add more maple syrup or fruit to taste!"],
    },
    {
        id: 6,
        name: "Gluten Free Banana Oat Waffles",
        ingredients: ["2 cups old fashioned rolled oats, gluten free as needed", "1 cup unsweetened vanilla almond milk or other milk product", "1 1/2 teaspoons pure vanilla extract", "2 large eggs", "1 medium ripe banana", "1 teaspoon cinnamon", "1 teaspoon baking powder", "1 packet stevia or other preffered sweetener (optional)", "Optional toppings: almond/peanut butter, coconut butter, coconut oil, honey, maple syrup and/or fresh fruit"],
        category:"Dessert",
        instructions:["1. Preheat waffle iron and spray with cooking spray.", "2. Blend all ingredients in a blender until almost smooth.", "3. Pour about 3/4 cup iron. Allow waffle to cook. I cook mine on the highest setting and a little longer from when the waffle iron goes off, so the waffles are a little crispier, otherwise these will be very soft waffles.", "4. Continue with the rest of the batter. Depending on the size of your waffle iron, recipe should make about 4 waffles. Enjoy with your favorite toppings!"],
    },
]


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
{
    console.log('Listening on     http://localhost:${port}...')
}
);


//Get
app.get('/api/recipes', (req, res) =>  
{
    res.send(recipes);
});
    // Send back the list of all available recipes as a response to GET request at

app.get('/api/recipes/:id', (req, res) => {
  const recipe = recipes.find((c) => c.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
  res.send(recipe);
});
// Send back one specific recipe based on its ID as a response to a GET request at

app.get('/api/recipes', (req, res) => {
  if(req.query.sortBy === 'name') {
    recipes.sort ((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
  });
}
res.send(recipes);
});

app.post('/api/users', (req, res) => {
  const recipe = {
    id: recipes.length + 1,
    name: req.body.name,    
  };
  recipes.push(recipe);
  res.send(recipe);
});


//Post
app.post('/api/recipes', (req, res) => {
  if (!req.body.name || req.body.name.length < 3)
  {
    res
        .status(400)
        .send('Name is required and should be minimum 3 characters.');
    return;
  }

const schema = Joi.object({
    name: Joi.string().min(3).required(),
});

const result = schema.validate(req.body);
if(result.error)
{
    res.status(400).send(result.error.details[0].message);
    return;
}

});

app.put('/api/recipes/:id', (req, res) => {
    const recipe = recipes.find((c) => c.id === parseInt(req.params.id));
        if(!recipe)
            return res.status(404).send('The recipe was not found.');
    
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
        });
    
        const result = schema.validate(req.body);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        }
    
        recipe.name = req.body.name;
        res.send(recipe);
});
    

// Delete
// Delete
app.delete('/api/recipes/:id', (req, res) => {
    // Find the index of the recipe with the given ID
    const index = recipes.findIndex((c) => c.id === parseInt(req.params.id));
  
    // If the recipe with the given ID is not found, return a 404 error
    if (index === -1) {
      return res.status(404).send('Recipe not found.');
    }
  
    // Remove the recipe from the array
    const deletedRecipe = recipes.splice(index, 1);
  
    // Send the message and the deleted recipe as a response
    res.send(`This is the Deleted Recipe: \n${JSON.stringify(deletedRecipe[0])}`);
  });

