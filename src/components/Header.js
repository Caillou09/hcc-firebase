import { useContext } from 'react'

import { FirebaseContext } from '../firebase'

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext)

  const buttonStyle = {
    padding : '5px',
    cursor : 'pointer'
  }

  return (
    <div>
    {user ? (
      <>
      <h1>{user.displayName}</h1>
      <button style={buttonStyle} onClick={() => firebase.logout()}>Déconnexion</button>
      </>
    ) : (
      <>
      <button style={buttonStyle} onClick={() => firebase.login('google')}>Connexion Google</button>
      </>


    )}
    <div id="firebaseui-auth-container"></div>
    </div>
  )
}

export default Header
