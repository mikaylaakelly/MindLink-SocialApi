const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtControllers.js');


///     api/thoughts
router.route('/').get(getAllThoughts).post(createThought);


/// api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)


    ///    api/thoughts/:thoughtId:/reaction

    router.route('/:thoughtId/reaction').post(addReaction)


    ////    api/thoughts/:thoughtId/reaction/:reactionId
    router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction)


    ///colons were needed in front of thoughtId (i.e /:thoughtId)

    module.exports = router;
