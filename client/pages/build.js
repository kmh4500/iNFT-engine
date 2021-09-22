import React, {useState} from "react"
import Layout from "../layouts"
import { Build } from '../components/Build/build.styled';
const axios = require('axios');

const PageTwo = () => {
  const [inputs, setInputs] = useState({});
  const handleChange = e => {
    let name = e.target.name
    let value = e.target.value
    setInputs(prevState => ({ ...prevState, [name]: value }))
  };
  const messageTextIsEmpty = Object.keys(inputs).length < 8;

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
    <h2>Sample Q&As</h2>
    Q1 <input type ="text" placeholder="Who are you?"
      name="q1"
      value={inputs.q1 || ''} onChange={handleChange} /> <p/>
    A1 <input type ="text" placeholder="My name is AIN, AI Network."
      name="a1"
      value={inputs.a1 || ''} onChange={handleChange} /> <p/>
    Q2 <input type ="text" placeholder="What will your future be like?"
      name="q2"
      value={inputs.q2 || ''} onChange={handleChange} /> <p/>
    A2 <input type ="text" placeholder="Maybe I will evolve into an artificial general intelligence."
      name="a2"
      value={inputs.a2 || ''} onChange={handleChange} /> <p/>
    Q3 <input type ="text" placeholder="Do you know gangnam style?"
      name="q3"
      value={inputs.q3 || ''} onChange={handleChange} /> <p/>
    A3 <input type ="text" placeholder="I know it very well, click here to watch. https://www.youtube.com/watch?v=9bZkp7q19f0"
      name="a3"
      value={inputs.a3 || ''} onChange={handleChange} /> <p/>

      <button type="submit" className="button" disabled={messageTextIsEmpty}>
        BUILD
      </button>
    </form>
    </Build>
  </Layout>)
}

export default PageTwo
