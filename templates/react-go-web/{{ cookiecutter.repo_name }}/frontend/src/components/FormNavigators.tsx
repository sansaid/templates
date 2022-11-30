import styled from 'styled-components'

export const FormButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    place-content: center;
    place-items: center;
`

export const FormNavigatorSecondary = styled.button`
    background: rgba(0,0,0,0);
    border: solid 0.2em #6E75FF;
    font-size: calc(14px + 2vmin);
    color: #6E75FF;
    border-radius: 6px;
    margin: 4px;
    font-weight: 700;
    height: calc(14px + 6vmin);
    flex-grow: 1;
`

export const FormNavigatorPrimary = styled(FormNavigatorSecondary)`
    background: #6E75FF;
    border: none;
    color: #2E282A;
    flex-grow: 1;
`