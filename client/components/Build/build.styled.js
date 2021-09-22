import styled from 'styled-components';

export const Build = styled.div`
font-family: Quicksand;
font-style: normal;
  text-align: left;
form {
  margin-top: 230px;
}

textarea {
  width: 348px;
  height: 104px;
  text-align: center;
  padding: 10px;
  font-size: 14px;
}

p {
  margin: 0px;
}

h2 {
  font-family: Apple SD Gothic Neo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  /* identical to box height, or 171% */
  color: #000000;
}

input {
  width: 328px;
  height: 56px;
  padding: 10px;
  font-size: 14px;

  background: #FFFFFF;
  border: 1px solid #EAECEF;
  box-sizing: border-box;
  border-radius: 8px;

  margin: 8px 0px;
}

input.name {
  width: 73px;
  height: 36px;

  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
}

button {
  width: 348px;
  height: 56px;
  background: #854CFF;
  border-radius: 10px;
  border: 0px;
  color: #FFFFFF;
}

button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

`;
