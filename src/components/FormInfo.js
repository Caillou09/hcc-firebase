import {useContext, useEffect, useState} from 'react'

import {FirebaseContext} from '../firebase'

 import Firebase from 'firebase'


import useForm from '../hooks/useForm'


const FormInfo = () => {
  const {user, firebase } = useContext(FirebaseContext);
  const [status, setStatus] = useState('idle')
  const [readOnly, setReadOnly] = useState(false)
  const [initialValues, setInitialValues] = useState({
    age : "",
    poids: "",
    frequence: ""
  })

  const readOnlySyle = {
    background : '#898c8a',
    outline : 'none'
  }

  const inputStyle = {

  }

  useEffect( () => {
    let userInfo = firebase.db.collection('users').doc(`${user.uid}`)
    userInfo.get()
    .then( (userData) => {
      setStatus('isfetching')
      if (userData.data().age) {
        setInitialValues({
          age : userData.data().age,
          poids : userData.data().poids,
          frequence : userData.data().frequence
        })
        setStatus('fetched')
        setReadOnly(true)
      }
    })

  }, [])



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
  console.log(inputs);

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
        {!readOnly ? <button onClick={handleSubmit}>Enregistrer</button> : <button onClick={handleClick}>Modifier</button>}


      </div>
    </div>
  )
}

export default FormInfo
