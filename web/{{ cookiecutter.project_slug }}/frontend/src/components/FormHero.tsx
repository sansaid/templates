import React, { useState } from 'react'
import styled from 'styled-components'

enum Direction {
    L = "L",
    R = "R"
}

const FormContainer = styled.div`
    display: flex;
    direction: row;
`

const AddressSelectorContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    height: calc(14px + 25vmin);
`

const SliderButton = styled.button`
    background-color: transparent;
    border: none;
    font-weight: bold;
    color: white;
    padding: calc(4px + 5vmin)
`

const FormInput = styled.input`
    background: #4C4246;
    border: none;
    padding: 10px;
    font-size: calc(14px + 2vmin);
    color: white;
    border-radius: 6px;
    margin: 4px;
`

const FormSelect = styled.select`
    background: #4C4246;
    border: none;
    padding: 10px;
    font-size: calc(14px + 2vmin);
    color: white;
    border-radius: 6px;
    margin: 4px;
`

const FormSubmit = styled.input`
    background: #17BEBB;
    border: none;
    padding: 10px;
    font-size: calc(14px + 2vmin);
    color: #2E282A;
    border-radius: 6px;
    margin: 4px;
    font-weight: 700;
    height: calc(14px + 6vmin);
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(14px + 30vmin);
`

function AddressSelector(): React.ReactElement {
    let [addresses, setAddresses] = useState([])

    async function getAddresses(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length > 5) {
            let encodedPostcode = encodeURIComponent(e.target.value)
            let res = await fetch(`https://fc013299-77c1-4990-8b26-aaff9d512e75.mock.pstmn.io/${encodedPostcode}`)

            let addresses = await res.json()
    
            if ("Addresses" in addresses) {
                setAddresses(addresses.Addresses)
            }
        }
    }

    return <>
        <AddressSelectorContainer>
            <FormInput type="text" placeholder="Postcode" onChange={getAddresses}/>
            <FormSelect id="addresses" name="addresses">
                {addresses.length === 0 ? <option value="">Addresses not found</option> : addresses.map((address) => {
                    return <option key={address["SiteId"]} value={address["AccountSiteUprn"]}>{address["SiteShortAddress"]}</option>
                })}
            </FormSelect>
        </AddressSelectorContainer>
    </>
}

// REF: https://www.techomoro.com/submit-a-form-data-to-rest-api-in-a-react-app/
export function FormHero(): React.ReactElement {
    const [address, setAddress] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [inputIndex, setInputIndex] = useState(0)

    const formInputs: Array<React.ReactElement> = [
        <FormInput 
            onKeyDown={keydownHandler} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setMobileNumber(e.target.value)  }} 
            type='text'
            placeholder='Mobile number'
        />,
        <AddressSelector/>
    ]

    async function submitHandler(e: React.FormEvent) {
        e.preventDefault();

        const API: string = ""

        try {
            let res = await fetch(API, {
                method: "POST",
                body: JSON.stringify({
                    mobileNumber: mobileNumber,
                    address: address
                }),
            });
            
            if (res.status === 200) {
                setAddress("");
                setMobileNumber("");
            }
        } catch (err) {
            console.log(err);
        }
    }

    function keydownHandler(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault()

            if (inputIndex === (formInputs.length - 1)) {
                return inputIndex
            }

            setInputIndex(inputIndex+1)
        }
    }

    function clickHandler(direction: Direction): React.MouseEventHandler {
        return (e: React.MouseEvent) => {
            switch(direction) {
                case Direction.R:
                    if (inputIndex === (formInputs.length - 1)) {
                        return inputIndex
                    }

                    setInputIndex(inputIndex+1)
                    break;
                case Direction.L:
                    if (inputIndex === 0) {
                        return inputIndex
                    }

                    setInputIndex(inputIndex-1)
                    break;
                default:
                    console.log(`Unrecognised direction declared: ${direction}`)
            }
        }
    }

    return <>
        <FormContainer>
            <SliderButton onClick={clickHandler(Direction.L)}>👈</SliderButton>
            <Form onSubmit={submitHandler}>
                <InputContainer>
                    {formInputs[inputIndex]}
                </InputContainer>
                <FormSubmit type='submit' value="Submit"/>
            </Form>
            <SliderButton onClick={clickHandler(Direction.R)}>👉</SliderButton>
        </FormContainer>
    </>
}