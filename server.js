const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')

const app = express();
const blogRoutes = require('./routes/blogRoutes');

//connection to mongo-db
const dbURI = 'hahhahaha'
mongoose.connect(dbURI , {useNewUrlParser : true , useUnifiedTopology : true})
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err))


//view engine = ejs (alt = handlebars)
app.set('view engine','ejs');


// app.use((req,res,next) => {
// 	console.log(`1we got a new request ${req.path}`);
// 	next();
// });

// creating a link to public stylesheet
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));

app.use('/blogs',blogRoutes);


app.get('/',(req,res) => {
	// res.send('<p>Home</p>')
	
	res.redirect('/blogs');
});

app.get('/about',(req,res) => {
	res.render('about',{title: 'About'})

})
app.get('/about-us',(req,res) => {
	res.redirect('/about', { title: "About" })
})


// Always place this code below
app.use((req,res) => {
	res.render('404',{title:"Error"})
})