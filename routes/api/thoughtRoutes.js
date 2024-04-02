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

router.route('/').get(getThoughts).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

    router.route('/:thoughtId/reaction').post(addReaction);

    router.route('/:thoughtId/readtion/:reactionId').delete(deleteReaction)


    ///colons were needed in front of thoughtId (i.e /:thoughtId)
