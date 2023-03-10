const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const FoodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://olga:Mkssosnowiec5@cluster0.6bqt7.mongodb.net/food?retryWrites=true&w=majority", {
  useNewUrlParser: true,
});

app.post('/insert', async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;

  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });

  try {
    await food.save();
    res.send("inserted data")
  } catch(error) {
    console.log(error)
  }
});

app.get('/read', async (req, res) => {
  const result = await FoodModel.find({})
    
  if (!result) {
    res.send(error)
  }
    res.send(result)
  }
);

app.put('/update', async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    const result = await FoodModel.findByIdAndUpdate(id, { foodName: newFoodName });
    res.send('updated')
  } catch(error) {
    console.log(error);
  }
  }
);

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  await FoodModel.findByIdAndRemove(id).exec();
  res.send('deleted item')
})

app.listen(3001, () => {
  console.log('Server runs on port 3001')
})