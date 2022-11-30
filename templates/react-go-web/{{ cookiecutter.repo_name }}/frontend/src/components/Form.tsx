import styled, { keyframes } from 'styled-components'

const FormDownloadPulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(27, 218, 215, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(27, 218, 215, 0);
  }
`

export const FormSubmit = styled.a`
    background: #1BDAD7;
    display: block;
    width: calc(220px + 20vmin);
    text-align: center;
    line-height: 330%;
    border: none;
    font-size: 3vmin;
    color: #2E282A;
    border-radius: 6px;
    margin: 0.5em;
    font-weight: 700;
    height: 10vmin;
    flex-grow: 1;
    cursor: pointer;
    text-decoration: none;
`

export const FormDownload = styled(FormSubmit)`
    animation: ${FormDownloadPulse} 2s 1;
`

export const FormSelect = styled.select`
    background: #4C4246;
    border: none;
    padding: 10px;
    width: calc(220px + 20vmin);
    height: 10vmin;
    font-size: 3vmin;
    color: white;
    border-radius: 6px;
    margin: 0.5em;
`

export const FormInput = styled.input`
    background: #4C4246;
    border: none;
    padding: 10px;
    width: calc(200px + 20vmin);
    height: 10vmin;
    font-size: 3vmin;
    color: white;
    border-radius: 6px;
    margin: 0.5em;
`

export const InputContainer = styled.div`
    display: flex;
    height: 25vmin;
    align-content: flex-start;
`

export const FormContainer = styled.div`
    display: flex;
    direction: row;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(14px + 30vmin);
`