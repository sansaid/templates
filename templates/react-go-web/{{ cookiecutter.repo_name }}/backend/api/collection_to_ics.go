package api

import (
	"fmt"
	"time"

	ics "github.com/arran4/golang-ical"
	"github.com/google/uuid"
)

const IcalDateFormatLocal string = "20060102"

type AlarmTemplate struct {
	name    string
	action  ics.Action
	trigger string
}

func NewEventId(customPrefix string) string {
	var prefix string

	defaultPrefix := "binboi"

	if customPrefix == "" {
		prefix = defaultPrefix
	} else {
		prefix = fmt.Sprintf("%s-%s", defaultPrefix, customPrefix)
	}

	return fmt.Sprintf("%s-%s", prefix, uuid.New().String())
}

func addDefaultAlarms(event *ics.VEvent) {
	// See here for valid trigger values: https://www.rfc-editor.org/rfc/rfc5545#section-3.8.6.3
	alarmTemplates := []AlarmTemplate{
		AlarmTemplate{
			name:    "Display 5 hours before",
			action:  ics.ActionDisplay,
			trigger: "-PT5H",
		},
	}

	for _, alarmTemplate := range alarmTemplates {
		alarm := event.AddAlarm()

		alarm.SetAction(alarmTemplate.action)
		alarm.SetTrigger(alarmTemplate.trigger)
	}
}

func CollectionToEvent(collection Collection) (*ics.VEvent, error) {
	event := ics.NewEvent(NewEventId(""))
	description := "Time to put out your bins (auto generated by binboi.fly.dev)"
	startDate, err := time.Parse("02/01/2006 15:04:05", *collection.Date)

	if err != nil {
		return nil, err
	}

	endDate := startDate.AddDate(0, 0, 1)

	event.SetSummary(*collection.Service)
	event.SetDescription(description)

	// Can't use SetAllDay{End,Start}At because it sets the timezone to UTC (i.e. 20060102Z), which is not
	// .ics compatible. Working by setting the property directly
	event.SetProperty(ics.ComponentPropertyDtStart, startDate.UTC().Format(IcalDateFormatLocal), ics.WithValue("DATE"))
	event.SetProperty(ics.ComponentPropertyDtEnd, endDate.UTC().Format(IcalDateFormatLocal), ics.WithValue("DATE"))

	event.SetDtStampTime(time.Now())

	addDefaultAlarms(event)

	return event, nil
}

func CollectionsToCal(collections *[]Collection) (*ics.Calendar, error) {
	if len(*collections) == 0 {
		return nil, fmt.Errorf("[binboi] Empty collection - no calendar to create")
	}

	cal := ics.NewCalendar()

	cal.SetProductId("binboi-collection-reminders")
	cal.SetCalscale("GREGORIAN")
	cal.SetMethod(ics.MethodPublish)

	for _, collection := range *collections {
		event, err := CollectionToEvent(collection)

		if err != nil {
			return nil, fmt.Errorf("[binboi] Failed to create event from collection %#v: %s", collection, err.Error())
		}

		cal.AddVEvent(event)
	}

	return cal, nil
}
