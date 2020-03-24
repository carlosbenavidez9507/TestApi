var express=require('express');
var fs=require('fs');
var app=express();
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

var todoList=[
   {
      "id":1,
      "item":"clean kitchen"
   },
   {
      "id":2,
      "item":"wash dishes"
   },
   {
      "id":3,
      "item":"Cook"
   }
];

//Get List all todolist
app.get('/',function(request,response)
{
   response.status(200).send({
    success:'true',
    message:'todo retrieved Succesfully',
    todods:todoList
   });
   
  
});
//Post Insert a new item into todolist
app.post('/',function(request,response)
{
   if(!request.param('item')) {
      return response.status(400).send({
        success: 'false',
        message: 'item is required'
      });
    } 
   const todo={
      "id":todoList.length+1,
      "item":request.param('item')
   }

   todoList.push(todo);
   return response.status(201).send({
      success:'true',
      message:"item added successfully"
   })

});
//Delete an item according its id
app.delete('/:id',function(request,response)
{
   
    const id = parseInt(request.params.id, 10);
    todoList.map(function(todo,index)
   {
     if(todo.id===id)
     {
        todoList.splice(index,1);
        return response.status(200).send({
         success: 'True',
         message: 'Iteme deleted succesfully'
        });
     }
   });
    
});


const PORT=5000;
app.listen(PORT,function()
{
   console.log('Server running on port'+PORT)
});