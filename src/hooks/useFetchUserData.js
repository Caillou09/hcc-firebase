import { useState, useEffect, useContext } from 'react'

import {FirebaseContext} from '../firebase'

const useFetchUserData = (userId) => {

  const {user, firebase } = useContext(FirebaseContext);
  const [data, setData] = useState({})

  useEffect( () => {
    let userInfo = firebase.db.collection('users').doc(userId)
    userInfo.get()
    .then( (userData) => {
      setData(userData.data())
    })
  }, [])


  return {
    data
  }
}

export default useFetchUserData
