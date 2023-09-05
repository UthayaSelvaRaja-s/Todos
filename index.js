import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let users;
let week;
let newdata = [];
let newlist;

app.get('/', (req, res) => {
    res.render('page.ejs');
});
app.get('/submit',(req,res)=>{
    users = req.body.fname;
    res.render("index.ejs", { name: users, day: week, addnew: newdata, newdata:newdata})
})
// Change the route to '/add' to match the form action
app.get('/add', (req, res) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    week = today.toLocaleDateString("en-US", options);
    users = req.body.fname;
    newlist = req.body.newItem;
    newdata.push(newlist); // Push the new item to the array
    res.render('index.ejs', { name: users, day: week, addnew: newdata, newdata:newdata});
});

app.listen(port, () => {
    console.log(`Server Is Running On Port ${port}`);
});
