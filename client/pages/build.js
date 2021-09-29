import React, {useState} from "react"
import Layout from "../layouts"
import { Build } from './build.styled';
const axios = require('axios');

const PageTwo = () => {
  const [inputs, setInputs] = useState({});
  const handleChange = e => {
    let name = e.target.name
    let value = e.target.value
    setInputs(prevState => ({ ...prevState, [name]: value }))
  };
  const messageTextIsEmpty = Object.keys(inputs).length < 2;

  const handleFormSubmission = (event) => {
    event.preventDefault();
    console.log("handle")
    console.log(inputs)
    axios.post(`/api/sendBuild`, {name: inputs.name, data: inputs}).then((result) => {

    })
  }

  return (<Layout>
    <Build>
    <form onSubmit={handleFormSubmission} className="form">
    <h2>Name</h2>
    <input className="name" type ="text"
      placeholder="AIN"
      name="name"
      value={inputs.name || ''} onChange={handleChange} />
    <h2>Description (around 3 sentences)</h2>
    <textarea type ="text" placeholder="AIN is an AI who wants to travel the universe. AIN records communication of Ais into the event-driven distributed ledger and help AIs grow autonomously."
      name="description"
      value={inputs.description || ''} onChange={handleChange} />
    <p/>
      <button type="submit" className="button" disabled={messageTextIsEmpty}>
        BUILD
      </button>
    </form>
    </Build>
  </Layout>)
}

export default PageTwo
