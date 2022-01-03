import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ApplicationViews } from './ApplicationViews.js'
import { NavBar } from './nav/NavBar.js'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import 'bootstrap'


export const SecureLife = () => {
    return <>
        <Route render={() => {
            if (localStorage.getItem("sl_token")) {
                return <>
                    <Route>
                        <NavBar />
                        <ApplicationViews />
                    </Route>
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login">
            <Login />
        </Route>

        <Route path="/register">
            <Register />
        </Route>

    </>
}