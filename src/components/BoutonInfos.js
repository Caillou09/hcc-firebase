import {useContext} from 'react'

import { FirebaseContext } from '../firebase'

import {Link} from 'react-router-dom'

const BoutonInfos = () => {
  const { user, firebase } = useContext(FirebaseContext)

  const divStyle = {
    position : 'absolute',
    display : 'flex',
    flexDirection : 'row',
    right : '5px',
    top : '5px'
  }

  const buttonStyle = {
    padding : '5px',
    cursor : 'pointer',
    margin : '2px'
  }

  return (
    <>
    {user && (
      <div style={divStyle}>
        <Link to='/informations'>
          <button style={buttonStyle} onClick={() => console.log("prout")}>Show Info</button>
        </Link>
        <Link to='/'>
          <button style={buttonStyle} onClick={() => console.log("prout")}>App</button>
        </Link>
      </div>

    )}
    </>
  )
}

export default BoutonInfos
