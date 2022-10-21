import React, { createContext, useReducer } from 'react'

export const WorkoutContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case "getWorkout": 
            return {
                workouts: action.payload
            }
        case "addWorkout":
            return {
                workouts: [ action.payload, ...state.workouts]
            }
        case "deleteWorkout":
            return {
                workouts: state.workouts.filter(item => item._id !== action.payload._id )
            }
        default:
            return state;
    }
}
function WorkoutContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, {workouts: null})
  return (
    <WorkoutContext.Provider value={{...state, dispatch}}>
        {children}
    </WorkoutContext.Provider>
  )
}

export default WorkoutContextProvider