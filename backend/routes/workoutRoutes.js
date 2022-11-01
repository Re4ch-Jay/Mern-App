const router = require('express').Router();
const {
    POST_WORKOUT, 
    GET_WORKOUTS, 
    UPDATE_WORKOUT,
    DELETE_WORKOUT,
    GET_SINGLE_WORKOUT} = require('../controllers/workoutControllers')
const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth)

router.get('/', GET_WORKOUTS)


router.post('/', POST_WORKOUT)


router.get('/:id', GET_SINGLE_WORKOUT)


router.delete('/:id', DELETE_WORKOUT)


router.patch('/:id', UPDATE_WORKOUT)


module.exports = router;
