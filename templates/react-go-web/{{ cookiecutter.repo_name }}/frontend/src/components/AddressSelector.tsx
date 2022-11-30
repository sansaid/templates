import styled from 'styled-components'
import React, { useState } from 'react'
import { FormInput, FormSelect } from './Form'

export const AddressSelectorContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export function AddressSelector(props: { onChange: (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void, setUprn: React.Dispatch<React.SetStateAction<string>> }): React.ReactElement {
    let [addresses, setAddresses] = useState([])
    let [inputEmpty, setInputEmpty] = useState(true)

    function updateUprn(e: React.ChangeEvent<HTMLSelectElement>) {
        props.onChange(e);

        // TODO: there's got to be a better way of passing multiple state modifiers in
        props.setUprn(e.target.value as string);
    }

    async function getAddresses(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length === 0) {
            setInputEmpty(true)
        }

        if (e.target.value.length > 3) {
            props.onChange(e)

            setInputEmpty(false)

            let encodedPostcode = encodeURIComponent(e.target.value)
            let res = await fetch(`https://binboi-api.fly.dev/addresses/${encodedPostcode}`)

            let deserialisedRes = await res.json()
    
            if ("Addresses" in deserialisedRes) {
                if (Array.isArray(deserialisedRes.Addresses)) {
                    setAddresses(deserialisedRes.Addresses)
                }
            }
        }
    }

    return <>
        <AddressSelectorContainer>
            <FormInput type="text" placeholder="Postcode" onChange={getAddresses} />
            <FormSelect id="addresses" name="addresses" onChange={updateUprn}>
                {addresses.length === 0 ? <option value="">{inputEmpty ? "Please provide a postcode" : "No addresses found" }</option> : addresses.map((address) => {
                    return <option key={address["SiteId"]} value={address["AccountSiteUprn"]}>{address["SiteShortAddress"]}</option>
                })}
            </FormSelect>
        </AddressSelectorContainer>
    </>
}