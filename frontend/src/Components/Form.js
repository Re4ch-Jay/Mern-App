import React, { useContext, useState } from 'react'
import axios from 'axios'
import { WorkoutContext } from '../context/WorkoutContext'

function Form() {
    const {dispatch} = useContext(WorkoutContext)
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [errorTitle, setErrorTitle] = useState(null)
    const [errorLoad, setErrorLoad] = useState(null)
    const [errorReps, setErrorReps] = useState(null)

    const addWorkout = async (e) => {
        e.preventDefault()

        !title ? setErrorTitle('Title is required') : setErrorTitle(null) 
        !load ? setErrorLoad('Load is required') : setErrorLoad(null) 
        !reps ? setErrorReps('Reps is required') : setErrorReps(null) 
        
        await axios.post('/api/workouts', {title, reps, load})
          .then(res => {
            console.log(res);
            setTitle('')
            setLoad('')
            setReps('')
            dispatch({type: "addWorkout", payload: res.data})
          })
          .catch((error) => {
            console.log(error);    
          })          
    }
  return ( 
    <form className='create' onSubmit={addWorkout}>
        <label >Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
        {errorTitle && <div className='error'>{errorTitle}</div>}
        <label >Load</label>
        <input type="number" value={load} onChange={e => setLoad(e.target.value)}/>
        {errorLoad && <div className='error'>{errorLoad}</div>}
        <label >Reps</label>
        <input type="number" value={reps} onChange={e => setReps(e.target.value)}/>
        {errorReps && <div className='error'>{errorReps}</div>}
        <button className='btn'>Add workout</button>
    </form>
  )
}

export default Form
