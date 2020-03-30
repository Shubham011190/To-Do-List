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

mongoose.connect("mongodb+srv://admin-Shubham:imshubham1619@cluster0-yeunf.mongodb.net/todoListDB",{ useNewUrlParser: true, useUnifiedTopology: true  });

var Schema = mongoose.Schema;
var ItemSchema = new Schema({
  name: String
});

const Item = mongoose.model("Item",ItemSchema);

const item1 = new Item({
  name : "Welcome to To-do List"
})

const item2 = new Item({
  name : "Press '+' to add new items"
})

const item3 = new Item({
  name : "<-- Press to delete"
})

const defItems =[item1, item2, item3];


app.get("/",function(req,res){
  Item.find({},function(err, founditems){
    if(founditems.length ==0){
      Item.insertMany(defItems, function(err){
        if(err){
          console.log(err);
        }
        else {
          console.log("Default Items added successfully");
        }
      })
      res.redirect("/");
    }
    else{
      res.render("list",{title:"Today", listItem : founditems});
    }
    console.log(founditems);
  })
})

app.post("/", function(req,res){
  let item = req.body.inputval;
  // let choice = req.body.buttonVal;
  // // console.log(req.body);
  // if(choice == "Work"){
  //   workItems.push(item);
  //   res.redirect("/work");
  // }
  // else{
  //   items.push(item);
  const itemNew = new Item({
    name:item
  });
  itemNew.save();
    res.redirect("/");
})

app.get("/work", function(req,res){
  res.render("list",{title:"Work List", listItem : workItems});
})

app.post("/work", function(req,res){
  let item = req.body.inputval;
  workItems.push(item);
  res.redirect("/work");
})

app.post("/delete", function(req,res){
  const id = req.body.checkbox;
  Item.findByIdAndRemove(id,function(err){
    if(!err){
      console.log("Item deleted successfully");
      res.redirect("/");
    }
  })
})

let port = process.env.PORT;
if(port ==null || port ==""){
  port = 3000;
}

app.listen(port,function(req,res){
  console.log("Server started successfully");
})
