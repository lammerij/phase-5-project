import React, {useContext} from 'react'
import { UserContext } from '../context/userContext'
import CauseCard from './CauseCard'

function CauseList() {
  const [causes, setCauses] = useContext(UserContext)

  console.log(causes)

  return <CauseCard/>
}

export default CauseList