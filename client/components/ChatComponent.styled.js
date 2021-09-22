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
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    font-size: 1.2em;
    /* grayscale/ainize gray 4 */
    width: 320px;
    height: 50px;
    border: 2px solid #ECECF3;
    box-sizing: border-box;
    border-radius: 10px;
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
