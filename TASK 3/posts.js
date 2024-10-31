const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Create a post
router.post('/', async (req, res) => {
    const post = new Post({ ...req.body, author: req.user.id });
    await post.save();
    res.status(201).json(post);
});

// Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
});

// Get a single post
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    res.json(post);
});

// Update a post
router.put('/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
});

// Delete a post
router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
