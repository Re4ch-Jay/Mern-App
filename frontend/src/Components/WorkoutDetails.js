import axios from "axios";
import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import {formatDistanceToNow} from 'date-fns'

function WorkoutDetails({workout}) {
  const {dispatch} = useContext(WorkoutContext)
 const deleteWorkout = async (id) => {
  await axios.delete(`api/workouts/${id}`)
    .then(res => { 
      dispatch({type: "deleteWorkout", payload: res.data})
    })
    .catch(err => {
      console.log(err);
    })
}
  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load (kg)</strong>: {workout.load}</p>
      <p><strong>Reps</strong>: {workout.reps}</p>
      <p><strong>Date</strong>: {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
      <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
    </div>
  )
}

export default WorkoutDetails