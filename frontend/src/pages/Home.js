import React, { useContext, useEffect, useState } from 'react'
import WorkoutDetails from '../Components/WorkoutDetails'
import axios from "axios"
import Form from '../Components/Form'
import { WorkoutContext } from '../context/WorkoutContext'
import {motion} from "framer-motion"
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
function Home() {
  const {workouts, dispatch} = useContext(WorkoutContext)
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    
    const workout = async () => {
     await axios.get('api/workouts', {
      headers: {'Authorization': `Bearer ${user.token}`}
     })
      .then(res => {
        if(res.data){
        console.log(res.data);
        dispatch({type: "getWorkout", payload: res.data})
        setIsLoading(null)
        setError(null)}
      })
      .catch(error => {
        console.log(error.response.data.error)
        setError(error.response.data.error)
        setIsLoading(null)
      })
    }
    if(user) workout() 
    

 }, [dispatch, user, navigate])


  return (
    <motion.div className='home'
    initial={{x: "100vw"}}
    animate={{x: 0}}
    exit={{ x: "-100vw"}}
    transition={{delay: 0.5, type: "spring"}}
    >
      {error && <div className='error center'>{error}</div>}
      {isLoading && <h4>Loading...</h4>}
      {!error &&
      <div className='workouts'>
        {workouts && workouts.map(workout => (
          <div key={workout._id}>
              <WorkoutDetails workout={workout}/>
          </div>
        ))}  
      </div>
      }
      {!error && <Form/>}
    </motion.div> 
  )
}

export default Home