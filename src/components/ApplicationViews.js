import React from "react"
import { Route } from "react-router-dom"
// import { LocationForm } from "./locations/LocationForm.js"
// import { LocationList } from "./locations/LocationList.js"
// import { LocationDetail } from "./locations/LocationDetail.js"
// import { GrowthForm } from "./growth/GrowthForm.js"
// import { GrowthList } from "./growth/GrowthDetail.js"
// import { GrowthDetail } from "./growth/GrowthDetail.js"
import { AdventureForm } from "./adventures/AdventureForm.js"
import { AdventureList } from "./adventures/AdventureList.js"
import { AdventureDetail } from "./adventures/AdventureDetail.js"
// import { DailyEntryForm } from "./adventures/DailyEntryForm.js"
// import { DailyEntryList } from "./adventures/DailyEntryList.js"
// import { DailyEntryDetail } from "./adventures/DailyEntryDetail.js"
// import { Profile } from "./auth/Profile.js"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            {/* <Route exact path="/locations/new">
                <LocationForm />
            </Route>
            <Route exact path="/locations">
                <LocationList />
            </Route>
            <Route exact path="/locations/edit/:locationId(\d+)">
                <LocationDetail />
            </Route>
            <Route exact path="/growth/new">
                <GrowthForm />
            </Route>
            <Route exact path="/growth">
                <GrowthList />
            </Route>
            <Route exact path="/growth/edit/:growthId(\d+)">
                <GrowthDetail />
            </Route> */}
            <Route exact path="/adventures/new">
                <AdventureForm />
            </Route>
            <Route exact path="/adventures">
                <AdventureList />
            </Route>
            <Route exact path="/adventures/edit/:adventureId(\d+)">
                <AdventureDetail />
            </Route>
            {/* <Route exact path="/daily_entries/new">
                <DailyEntryForm />
            </Route>
            <Route exact path="/daily_entries">
                <DailyEntryList />
            </Route>
            <Route exact path="/daily_entries/edit/:daily_entryId(\d+)">
                <DailyEntryDetail />
            </Route> */}
            {/* <Route exact path="/profile">
                <Profile />
            </Route> */}
        </main>
    </>
}
