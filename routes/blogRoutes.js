const Blog = require('../models/blog')
const express = require('express');
const router = express.Router();

router.get('/create',(req,res) => {
	res.render('create',{title: 'Create new Blog'})
})

router.get('/',(req,res) =>{
	Blog.find().sort({ createdAt: -1 })
	.then((result) => {
		res.render('index', {title:"ALL BLOGS" , blogs:result})
	})
	.catch((err) => {
		console.log(err)
	})
})

router.get('/:id',(req,res) => {
	const id = req.params.id
	Blog.findById(id)
	.then((result) => {
		res.render('details',{blog:result , title: "Details"})
	})
})


router.get('/add-blog',(req,resp) => {
	const blog = new Blog({
		title: 'new blog',
		snippet: 'hey,therye',
		body: 'hahahah'
	});
	blog.save()
		.then((result) => {
			res.send(result)
		})
	.catch((err) => {
		console.log(err);
	});
})

router.get('/all-blogs',(req,res) => {
	Blog.find()
	.then((result) => {
		res.send(result)
	})
	.catch((err) => {
		console.log(err)
	})
})
router.get('/single-blogs',(req,res) => {
	Blog.findbyId('')
	.then((result) => {
		res.send(result)
	})
	.catch((err) => {
		console.log(err)
	})
})



//all the post request
router.post('/',(req,res) => {
	const blog = new Blog(req.body)
	blog.save()
	.then((result) => {
		res.redirect('/blogs');
	})
	.catch((err) => {
		console.log(err);
	})
	req.body
})


//delete
router.delete('/:id',(req,res) => {
	const id = req.params.id
	Blog.findByIdAndDelete(id)
	.then((result) => {
		res.json({  redirect: '/blogs' })
	})
	.catch((err) => {
		console.log(err);
	})
})

module.exports = router;