import React, { useState } from 'react'
import { AddressSelector } from './AddressSelector'
import { Form, FormSubmit, FormDownload, FormContainer, InputContainer } from './Form'
import { FormButtonContainer } from './FormNavigators'
import ClipLoader from "react-spinners/ClipLoader";


// REF: https://www.techomoro.com/submit-a-form-data-to-rest-api-in-a-react-app/
export function FormHero(): React.ReactElement {
    const [uprn, setUprn] = useState('')
    const [downloadUrl, setDownloadUrl] = useState('')
    const [loading, setLoading] = useState(false);

    async function submitHandler(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        
        let yearFromNowDate: Date = new Date()
        
        yearFromNowDate.setFullYear(yearFromNowDate.getFullYear() + 1)

        let yearFromNow: string = yearFromNowDate.toISOString().split('T')[0]

        if (uprn !== '') {
            setDownloadUrl(`https://binboi-api.fly.dev/calendar/${uprn}?to_date=${yearFromNow}`)
        }

        setLoading(false)
    }

    return <>
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <InputContainer>
                    <AddressSelector onChange={(e) => { setDownloadUrl('') } } setUprn={setUprn} />
                </InputContainer>
                <FormButtonContainer>
                    { downloadUrl === '' ? 
                        <FormSubmit onClick={submitHandler}>
                            { loading ? <ClipLoader
                                color={"#2E282A"}
                                loading={loading}
                                size={'2vmin'}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> : "Submit" }
                        </FormSubmit> :
                        <FormDownload href={downloadUrl}>Download Reminders</FormDownload>
                    }
                </FormButtonContainer>
            </Form>
        </FormContainer>
    </>
}