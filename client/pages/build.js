import React from "react"
import Layout from "../layouts"
import { Build } from '../components/Build/build.styled';
const PageTwo = () => {
  return (<Layout>
    <Build>
    <h1>Build your own AI</h1>
    <h2>Name your AI</h2>
    <input class="name" type ="text" placeholder="AIN" name="name" />
    <h2>Describe your AI (around 3 sentences)</h2>
    <textarea type ="text" placeholder="AIN is an AI who wants to travel the universe. AIN records communication of Ais into the event-driven distributed ledger and help AIs grow autonomously." name="name" />
    <p/>
    <h2>Sample Q&As</h2>
    Q1 <input type ="text" placeholder="Who are you?" name="name" /> <p/>
    A1 <input type ="text" placeholder="My name is AIN, AI Network." name="name" /> <p/>
    Q2 <input type ="text" placeholder="What will your future be like?" name="name" /> <p/>
    A2 <input type ="text" placeholder="Maybe I will evolve into an artificial general intelligence." name="name" /> <p/>
    Q3 <input type ="text" placeholder="Do you know gangnam style?" name="name" /> <p/>
    A3 <input type ="text" placeholder="I know it very well, click here to watch. https://www.youtube.com/watch?v=9bZkp7q19f0" name="name" /> <p/>
    </Build>
  </Layout>)
}

export default PageTwo
