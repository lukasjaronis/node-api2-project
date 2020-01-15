const express = require("express");
const router = express.Router();
router.use(express.json());
const Posts = require("../data/db");

// get posts

router.get("/", (request, response) => {
  Posts.find(request.query)
    .then(gettingPosts => {
      response.status(200).json(gettingPosts);
    })
    .catch(error => {
      response.status(500).json({
        errorMessage: `The posts information could not be retrieved. ${error}`
      });
    });
});

// get posts by id

router.get("/:id", (request, response) => {
  const id = request.params.id;

  Posts.findById(id)
    .then(findingById => {
      if (findingById.length > 0) {
        response.status(200).json(findingById);
      } else {
        response.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      response.status(500).json({
        errorMessage: "The post with the specified ID could not be retrieved.",
        error
      });
    });
});

// get posts by comments

router.get("/:id/comments", (request, response) => {
  const id = request.params.id;

  Posts.findCommentById(id)
    .then(findingByComment => {
      if (findingByComment.length > 0) {
        response.status(200).json(findingByComment);
      } else {
        response.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      response.status(500).json({
        errorMessage: `The post with the specified ID and comment could not be retrieved. ${error}`
      });
    });
});

// delete id

router.delete("/:id", (request, response) => {
  const id = request.params.id;

  Posts.remove(id)
    .then(deletingID => {
      if (deletingID) {
        response.status(200).json(deletingID);
      } else {
        response.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      response.status(500).json({
        errorMessage: `The post with the specified ID could not be removed ${error}`
      });
    });
});

// create a post

router.post("/", (request, response) => {
  const { title, contents } = request.body;

  Posts.insert(request.body)
    .then(creatingPost => {
      if (!title || !contents) {
        response.status(400).json({
          errorMessage: "Please provide a title and contents for the post"
        });
      } else {
        response.status(201).json(creatingPost);
      }
    })
    .catch(error => {
      response.status(500).json({
        errorMessage: `There was an error creating the post. ${error}`
      });
    });
});

// creating a comment for a post

router.post('/:id/comments', (request, response) => {

    const { text } = request.body;
    const id  = request.params.id;

    Posts.findById(id)
    .then(findingByID => {
        if (findingByID.length === 0) {
            response.status(404).json(
                { message: "The post with the specified ID does not exist." })
        }
    })

    if (!request.body.text) {
        return response.status(400).json(
            { errorMessage: "Please provide text for the comment." });
    }

    Posts.insertComment({ post_id: id, text: text})
    .then(insertingComment => {
        response.status(201).json(insertingComment);
    })
    .catch(error => {
        response.status(500).json(
            { error: `There was an error while saving the comment to the database | ${error} |` })
    })
})

// update post

router.put("/:id", (request, response) => {
  const id = request.params.id;
  const posts = request.body;
  const { title, contents } = posts;

  if (!title || !contents) {
    response.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  Posts.update(id, posts)
    .then(updating => {
      if (!updating) {
        response.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      } else {
        response.status(200).json({
          errorMsuccessMsgessage: "The post information was updated."
        });
      }
    })
    .catch(error => {
      response.status(500).json({
        errorMessage: `The post information could not be modified. ${error}`
      });
    });
});

module.exports = router;
