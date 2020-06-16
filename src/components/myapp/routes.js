import React from 'react'
import { Switch, Route, } from 'react-router-dom'
import Home from '../pages/home/home'
import Login from '../pages/login.js/login'
import Dashboard from '../pages/admin/dashboard/dashboard'
import EnrollMember from '../pages/admin/enrollMember.js/enrollMember'
import AddBook from '../pages/admin/addBook/addBook'

export default function Routes() {
    return (
        <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/addbook" component={AddBook} />
            <Route path="/home" component={Login} />
            <Route path="/login" component={Home} />
            <Route path="/enrollmember" component={EnrollMember} />
            <Route path="/" component={Login} />
        </Switch>
    )
}