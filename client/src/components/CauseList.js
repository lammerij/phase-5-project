import React, {useContext} from 'react'
import { UserContext } from '../context/userContext'
import CauseCard from './CauseCard'

function CauseList() {
  const [user, setUser, causes, setCauses] = useContext(UserContext)



  const displayCause = causes.map((cause, id)=>{
    return (<CauseCard cause={cause} key={id}/>)
  })

  return <>{displayCause}</>
}

export default CauseList