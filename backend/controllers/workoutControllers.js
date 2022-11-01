const Workout = require('../Models/Workout')

const GET_WORKOUTS = async (req, res) => {
    try {
        const user_id = req.user._id
        const workouts = await Workout.find({user_id}).sort({createdAt: -1})
        res.status(200).json(workouts);
    } catch (error) {
        console.log(error);
        res.status(400).json("Cannot find the data")
    }
}

const POST_WORKOUT = async (req, res) => {
    const {title, load, reps} = req.body;

    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
    
}

const GET_SINGLE_WORKOUT = async (req, res) => {
    const id = req.params.id;
    try {
        const workout = await Workout.findById(id)
        if(!workout) return res.status(404).json({message: "Cannot find this workout"})
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({message: "Cannot find this workout"})
        console.log(error)
    }
}


const DELETE_WORKOUT = async (req, res) => {
    const id = req.params.id;
    try {
        const workout = await Workout.findByIdAndDelete(id)
        if(!workout) return res.status(400).json({message: "Cannot find and delete this workout"})
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({message: 'Cannot find and delete workout'})
    } 
}

const UPDATE_WORKOUT = async (req, res) => {
    const id = req.params.id;
    try {
        const workout = await Workout.findByIdAndUpdate(id, req.body);
        if(!workout) return res.status(400).json({message: "Cannot find and update this workout"})
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({message: "Cannot find and update this workout"})
        console.log(error)
    }
}


module.exports = {
    POST_WORKOUT,
    GET_WORKOUTS,
    GET_SINGLE_WORKOUT,
    DELETE_WORKOUT,
    UPDATE_WORKOUT
}