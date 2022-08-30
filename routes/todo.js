const router = require("express").Router();
const Todo = require("../models/Todo");



// routes
router.post("/add", (req, res) => {
    const { todo } = req.body;
    const newtodo = new Todo({
        todo: todo
    })
    //save
    newtodo.save().then(() => {
        console.log("Successfully Added");;
        res.redirect("/api");
    })

    console.log(todo);

})


router.put("/update", async (req, res) => {
    const { todo } = req.body;
    let id = req.body.todoId;
    const updatetodo = {
        todo: todo
    }
    //save
    let response = await Todo.findOneAndUpdate(id, updatetodo);
    res.json(response);


})


router.get("/delete/:_id", (req, res) => {
    const { _id } = req.params;
    Todo.deleteOne({ _id }).then(() => {
        console.log("deleted Successfully");
        res.redirect("/api");

    })


})


router.delete("/delete", (req, res) => {
    let id = req.query.deleteTodoId;
    // const { _id } = req.params;
    Todo.deleteOne({ id }).then(() => {
        console.log("deleted Successfully");
        res.redirect("/api");

    })


})















module.exports = router;
