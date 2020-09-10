const port=8000;//a constant port

//Require Statements
const express=require("express");
const app=express();
const path=require("path");// used for getting path(no npm included in  express)
const bodyParser=require("body-parser");
const methodOverride=require("method-override");


app.set("view engine", "ejs"); //for setting up view engine
app.set("views", path.join(__dirname, "views"));//Setting Path of views, making it acessible
app.use(bodyParser.urlencoded({extended:true}));//using body-parser url endoded reading
app.use(methodOverride("_method"));// for put and del routes
app.use(express.static("assets"));// express will look for static files in assets folder

//for database
const db=require('./config/mongoose');
const Todo=require('./models/todo');

//Routes goes here (following RESTFUL Routes Convention)
app.get("/",function(req,res){
	res.redirect("/todos");
});

app.get("/todos", function(req, res) {

    Todo.find({},function(err, todos){
      if(err){
        console.log('error');
        return;
      }
      return res.render("todo", {
        title:"Todo App",
        todos: todos
      });
    });
});

app.post('/todos', (req, res) => {
  //console.log("Date"+req.body.due_date);
  Todo.create({
    description: req.body.description,
    category: req.body.category,
    due_date: req.body.due_date,
  }, function(err, newTodo){
    if(err){
      console.log('error',err);
      return;
    }
    return  res.redirect("/todos");
  })

});
app.post('/delete-item',function(req,res){
  //console.log(req.body.id);
  var temp=req.body.id;
  if(Array.isArray(temp))
  {
    temp.forEach(function(key){
      Todo.findByIdAndDelete(key,function(err){
          if(err){
              console.log('Error in deleting an list from database',err);
              return;
          }
          // console.log('One list is deleted');

      });
    });
  }
  else
  {
    Todo.findByIdAndDelete(temp,function(err){
      if(err){
          console.log('Error in deleting an list from database',err);
          return;
      }
      // console.log('One list is deleted');

    });
  }

  return res.redirect('/todos');

});
// app.get("/todos",function(req, res){
//     res.render("todo");
// });
//app trigger
app.listen(port, function(err) {
    if (err) {
      console.log("Error: ", err);
    }
    console.log("Server Running on port", port);
    console.log("Visit: http://localhost:"+port);
}); 