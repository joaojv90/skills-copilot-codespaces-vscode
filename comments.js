// Create web server
// By: fuchunhui 2014-4-4
// Modified by: fuchunhui 2014-4-4

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

// GET /comments
// Get all comments
router.get('/', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
});

// POST /comments
// Create a new comment
router.post('/', function(req, res) {
    var newComment = new Comment(req.body);
    newComment.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json(req.body);
    });
});

// GET /comments/:id
// Get a comment by id
router.get('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            res.send(err);
        }
        res.json(comment);
    });
});

// PUT /comments/:id
// Update a comment by id
router.put('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            res.send(err);
        }
        comment.name = req.body.name;
        comment.content = req.body.content;
        comment.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json(comment);
        });
    });
});

// DELETE /comments/:id
// Delete a comment by id
router.delete('/:id', function(req, res) {
    Comment.findByIdAndRemove(req.params.id, function(err, comment) {
        if (err) {
            res.send(err);
        }
        res.json(comment);
    });
});

module.exports = router;