import {useState, useEffect} from 'react'
import firebase from "../firebase"

const useAuth = (props) => {
  const [authUser, setAuthUser] = useState(null)

  useEffect( () => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if(user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  return authUser
}

export default useAuth
