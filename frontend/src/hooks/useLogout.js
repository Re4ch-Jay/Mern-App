import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { WorkoutContext } from '../context/WorkoutContext'
function useLogout() {

    const {dispatch: dispatchAuth} = useContext(AuthContext)
    const {dispatch: dispatchWorkouts} = useContext(WorkoutContext) 

    const logout = () => {
        localStorage.clear()
        dispatchAuth({type: "LOGOUT"})
        dispatchWorkouts({type: "getWorkout", payload: null})
    }

    return {logout}

}

export default useLogout