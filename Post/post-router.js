const express = require('express');
const router = express.Router();
router.use(express.json());
const Posts = require('../data/db');

// get posts

router.get('/', (request, response) => {
    Posts.find(request.query)
    .then(gettingPosts => {
        response.status(200).json(gettingPosts)
    })
    .catch(error => {
        response.status(500).json({
            errorMessage: `The posts information could not be retrieved. ${error}`
        })
    })
})

// get posts by id

router.get("/:id", (request, response) => {

    const id = request.params.id;
  
    Posts.findById(id)
    .then(findingById => {
        if(findingById.length > 0) {
            response.status(200).json(findingById)
        } else {
            response.status(404).json({
                errorMessage: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(error => {
        response.status(500).json({
          errorMessage: 'The post with the specified ID could not be retrieved.', error
        })
    })
   
  });

  // get posts by comments

  router.get('/:id/comments', (request, response) => {

    const id = request.params.id;

    Posts.findCommentById(id)
    .then(findingByComment => {
        if(findingByComment.length > 0) {
            response.status(200).json(findingByComment)
        } else {
            response.status(404).json({
                errorMessage: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(error => {
        response.status(500).json({
          errorMessage: `The post with the specified ID and comment could not be retrieved. ${error}`
        })
    })

  })


module.exports = router;