import React, { useEffect, useState } from 'react';
import styles from './ChatComponent.module.css';
const fetcher = (url) => fetch(url).then((res) => res.json())

const ChatComponent = () => {

  let inputBox = null;
  let messageEnd = null;

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([{user: "AIN", message: "Hi, my name is AIN. How may I help you?"}]);
  const messageTextIsEmpty = messageText.trim().length === 0;
/*
  const { historyMessages, error } = useSwr('/api/getHistory', fetcher)
  console.log('error', error)
  console.log('[history]', historyMessages)
  setMessages(historyMessages);
*/
  const sendChatMessage = (messageText) => {
    var time = Date.now()
    console.log(time)
    receivedMessages.push({user: "you", message: messageText})
    setMessages([...receivedMessages])
    setMessageText("");
    fetch(`/api/sendChat?user=kmh&message=${messageText}&time=${time}`).then(() => {
      var getMessage = () => {
        fetch(`/api/getMessage?user=kmh&time=${time}`).then((result) => result.json()).then((data) => {
          console.log("data", data)
          if (data.response) {
            console.log("response", data.response)
            receivedMessages.push({user: "AIN", message: data.response})
            setMessages([...receivedMessages])
            clearInterval(intervalId);
          }
        })
      }
      var intervalId = setInterval(getMessage, 1000);
      setTimeout(() => { clearInterval(intervalId); }, 10000);
    })
    inputBox.focus();
  }

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  }

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  }

  const messages = receivedMessages.map((message, index) => {
    let color = styles.message_color
    if (message.user == 'AIN') {
      color = styles.message_color_ain
    }
    console.log(color)
    return <span key={index} className={[styles.message, color].join(' ')} data-author={message.user}>{message.message}</span>;
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages}
        <div ref={(element) => { messageEnd = element; }}></div>
      </div>
      <form onSubmit={handleFormSubmission} className={styles.form}>
        <textarea
          ref={(element) => { inputBox = element; }}
          value={messageText}
          placeholder="Type a message..."
          onChange={e => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.textarea}
        ></textarea>
        <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>Send</button>
      </form>
    </div>
  )
}

export default ChatComponent;
