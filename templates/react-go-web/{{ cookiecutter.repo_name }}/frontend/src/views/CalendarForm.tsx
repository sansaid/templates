import React from 'react';
import { CodeTxt } from '../components/CodeTxt';
import { FormHero } from '../components/FormHero';

export function CalendarForm() {
    return <>
      <p style={{width: "30em", margin: "0.2em"}}>
        👋 I'm <CodeTxt>binboi</CodeTxt> and I can generate a full year's set of bin collection reminders for your calendar. 
      </p>
      <p style={{width: "30em", margin: "0.2em", fontWeight: "600"}}>
        Enter your postcode to get started.
      </p>
      <p style={{fontStyle: "italic", fontSize: "2vmin", margin: "1em"}}>
        (I only work for Reading council at the moment.)
      </p>
      <FormHero/>
    </>
}

