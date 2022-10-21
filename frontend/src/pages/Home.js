import React, { useContext, useEffect } from 'react'
import WorkoutDetails from '../Components/WorkoutDetails'
import axios from "axios"
import Form from '../Components/Form'
import { WorkoutContext } from '../context/WorkoutContext'
import {useNavigate} from 'react-router-dom'


function Home() {
  const {workouts, dispatch} = useContext(WorkoutContext)
  const navigate = useNavigate()

  useEffect(() => {
    const workout = async () => {
     await axios.get('api/workouts')
      .then(res => {
        console.log(res.data);
        dispatch({type: "getWorkout", payload: res.data})
      })
      .catch(err => {
        console.log(err)
        navigate('/404')
      })
     
    }
    workout()
 }, [dispatch, navigate])

  return (
    <div className='home'>
     
      <div className='workouts'>
        {workouts && workouts.map(workout => (
          <div key={workout._id}>
              <WorkoutDetails workout={workout}/>
          </div>
        ))}  
      </div>
      <Form/>
    </div> 
  )
}

export default Home