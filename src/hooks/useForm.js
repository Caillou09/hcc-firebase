import {useState, useEffect} from 'react'

const useForm = (initialValues, callback) => {

  const [inputs, setInputs] = useState(initialValues)

  const handleSubmit = (event) => {
    event.preventDefault();
    callback();
  }

  const handleInput = (event) => {
    setInputs( inputs => ({...inputs, [event.target.name] : event.target.value}
    ));
  }

  useEffect( () => {
    setInputs(initialValues)
  }, [initialValues])

  return {
    inputs,
    handleSubmit,
    handleInput
  }


}

export default useForm
