const express = require('express');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// let items = [];
// let workItems = [];    Using MongoDB instead.

mongoose.connect("mongodb://localhost:27017/todoListDB",{ useNewUrlParser: true, useUnifiedTopology: true  });
const itemSchema = {
  name: String
}

const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
  name : "Welcome to To-do List"
})

const item2 = new Item({
  name : "Press '+' to add new items"
})

const item3 = new Item({
  name : "Press to delete"
})

const defItems =[item1, item2, item3];
Item.insertMany(defItems, function(err){
  if(err){
    console.log(err);
  }
  else {
    console.log("Default Items added successfully");
  }
})

app.get("/",function(req,res){
  // let dayval = dateVal.datesend( );
  Item.find({},function(err, founditems){
    console.log(founditems);
    res.render("list",{title:"Today", listItem : founditems});
  })
})

app.post("/", function(req,res){
  let item = req.body.inputval;
  let choice = req.body.buttonVal;
  // console.log(req.body);
  if(choice == "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
})

app.get("/work", function(req,res){
  res.render("list",{title:"Work List", listItem : workItems});
})

app.post("/work", function(req,res){
  let item = req.body.inputval;
  workItems.push(item);
  res.redirect("/work");
})

app.listen(3000,function(req,res){
  console.log("Server started at port 3000");
})
