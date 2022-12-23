const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
const regexPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?:([0-9a-zA-Z!@#$%;*(){}_+^&])){5,}$/gm;

export { regexEmail, regexName, regexPassword };
