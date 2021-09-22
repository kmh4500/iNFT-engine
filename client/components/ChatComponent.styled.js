import styled from 'styled-components';

export const StyledChatComponent = styled.div`
.chatHolder {
    display: grid;
    grid-template-rows: 1fr 100px;
}

.chatText {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
    padding: 1em;
    height: calc(100vh - 40px - 100px - 100px - 100px);
    overflow-y: auto;
}

.form {
    display: grid;
    grid-template-columns: 1fr 100px;
    border-top: 1px solid #eee;
}

.textarea {
    padding: 1em;
    border: 0;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto, Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue, sans-serif;
    font-size: 1.2em;
}

.button {
    border: 0;
    height: 20px;
    width: 20px;
}

.button img {
    border: 0;
    height: 20px;
    width: 20px;
}
.button:hover {
}

.button:disabled,
.button:hover:disabled {
    opacity: 0.5;
}

.message {
    padding: 1em;
    border-radius: 10px;
    flex-grow: 0;
    border-bottom-left-radius: 0;
}

.message_color {
    background-color: #C9F8FF33;
}

.message_color_ain {
    background-color: #AE8AFB33;
}
`
