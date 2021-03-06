import React from "react"
import { Route } from "react-router-dom"
import { LocationForm } from "./locations/LocationForm.js"
import { LocationList } from "./locations/LocationList.js"
import { LocationDetail } from "./locations/LocationDetail.js"
import { GrowthForm } from "./growth/GrowthForm.js"
import { GrowthList } from "./growth/GrowthList.js"
import { GrowthDetail } from "./growth/GrowthDetails.js"
import { AdventureForm } from "./adventures/AdventureForm.js"
import { AdventureList } from "./adventures/AdventureList.js"
import { AdventureDetail } from "./adventures/AdventureDetail.js"
import { EventList } from "./events/EventList.js"
import { EventForm } from "./events/EventForm.js"
import { EventDetail } from "./events/EventDetail.js"
import { PeopleList } from "./people/PeopleList.js"
import { PeopleForm } from "./people/PeopleForm.js"
import { PeopleDetail } from "./people/PeopleDetail.js"
import { Home } from "./nav/Home.js"
// import { Profile } from "./auth/Profile.js"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/locations/new">
                <LocationForm />
            </Route>
            <Route exact path="/locations">
                <LocationList />
            </Route>
            <Route exact path="/locations/edit/:locationId(\d+)">
                <LocationForm />
            </Route>
            <Route exact path="/locations/details/:locationId(\d+)">
                <LocationDetail />
            </Route>
            <Route exact path="/growth/new">
                <GrowthForm />
            </Route>
            <Route exact path="/growth">
                <GrowthList />
            </Route>
            <Route exact path="/growth/edit/:growthId(\d+)">
                <GrowthForm />
            </Route>
            <Route exact path="/growth/details/:growthId(\d+)">
                <GrowthDetail />
            </Route>
            <Route exact path="/adventures/new">
                <AdventureForm />
            </Route>
            <Route exact path="/adventures">
                <AdventureList />
            </Route>
            <Route exact path="/adventures/edit/:adventureId(\d+)">
                <AdventureForm />
            </Route>
            <Route exact path="/adventures/details/:adventureId(\d+)">
                <AdventureDetail />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/events/edit/:eventId(\d+)">
                <EventForm />
            </Route>
            <Route exact path="/events/details/:eventId(\d+)">
                <EventDetail />
            </Route>
            <Route exact path="/humans/new">
                <PeopleForm />
            </Route>
            <Route exact path="/humans">
                <PeopleList />
            </Route>
            <Route exact path="/humans/edit/:humanId(\d+)">
                <PeopleForm />
            </Route>
            <Route exact path="/humans/details/:humanId(\d+)">
                <PeopleDetail />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
        </main>
    </>
}
