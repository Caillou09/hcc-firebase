import {useContext, useEffect, useState} from 'react'

import {FirebaseContext} from '../firebase'

 import Firebase from 'firebase'


import useForm from '../hooks/useForm'
import useFetchUserData from '../hooks/useFetchUserData'


const FormInfo = () => {
  const {user, firebase } = useContext(FirebaseContext);
  const [status, setStatus] = useState('idle')
  const [readOnly, setReadOnly] = useState(false)
  const [initialValues, setInitialValues] = useState({
    age : "",
    poids: "",
    frequence: ""
  })

//Style CSS des inputs
  const readOnlySyle = {
    background : '#898c8a',
    outline : 'none'
  }

  const inputStyle = {

  }


  const handleClick = () => {
    setReadOnly(!readOnly);
    let userInfo = firebase.db.collection('users').doc(`${user.uid}`).collection("activity").add({
      created : Firebase.firestore.Timestamp.now().seconds,
    });
  }

  const sendInfo = () => {
    let userInfo = firebase.db.collection('users').doc(`${user.uid}`)
    userInfo.update(inputs)
    setReadOnly(true)
  }

  const {inputs, handleInput, handleSubmit} = useForm(initialValues, sendInfo);
  const {data} = useFetchUserData(user.uid)

  useEffect( () => {
    if (data.age) {
      setInitialValues(data)
      setReadOnly(true)
    }
  }, [data]);





  console.log(data);

  return (
    <div className="App-header">
      <form onSubmit={handleSubmit}>
        <h3>Informations de {user.displayName}</h3>
        <div>
          <label>Age : </label>
          <input
            style={readOnly ? readOnlySyle : inputStyle}
            type="number"
            name='age'
            value={inputs.age}
            onChange={handleInput}
            readOnly={readOnly}/>
        </div>
        <div>
          <label>Poids : </label>
          <input
            style={readOnly ? readOnlySyle : inputStyle}
            type="number"
            name='poids'
            value={inputs.poids}
            onChange={handleInput}
            readOnly={readOnly}/>
        </div>
        <div>
          <label>Fréquence de sport par semaine : </label>
          <input
            style={readOnly ? readOnlySyle : inputStyle}
            type="number"
            name='frequence'
            value={inputs.frequence}
            onChange={handleInput}
            readOnly={readOnly}/>
        </div>
      </form>
      <div>
        {!readOnly ? <button style={{cursor : 'pointer'}} onClick={handleSubmit}>Enregistrer</button> : <button style={{cursor : 'pointer'}} onClick={handleClick}>Modifier</button>}


      </div>
    </div>
  )
}

export default FormInfo
