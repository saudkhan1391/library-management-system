import React from 'react'
import { Switch, Route, } from 'react-router-dom'
import Home from '../pages/home/home'
import Login from '../pages/login.js/login'
import Dashboard from '../pages/admin/dashboard/dashboard'
import EnrollMember from '../pages/admin/enrollMember.js/enrollMember'
import AddBook from '../pages/admin/addBook/addBook'
import DashboardStudent from '../pages/student/dashboard/dashboard'
import IssuedBooks from '../pages/student/dashboard/issuedbooks/issuedBooks'
import IssueBooks from '../pages/admin/issuebooks/issuebooks'
import LoginContainer from '../pages/login.js/logincontainer'
import IssuedBooksContainer from '../pages/student/dashboard/issuedbooks/issuedbookscontainer'
import DashboardContainer from '../pages/admin/dashboard/dashboardcontainer'

export default function Routes() {
    return (
        <Switch>
            <Route path="/dashboard" component={DashboardContainer} />
            <Route path="/dashboardstudent" component={DashboardStudent} />
            <Route path="/addbook" component={AddBook} />
            <Route path="/issuedbooks" component={IssuedBooksContainer} />
            <Route path="/issuebooks" component={IssueBooks} />
            <Route path="/home" component={Login} />
            <Route path="/login" component={Home} />
            <Route path="/enrollmember" component={EnrollMember} />
            <Route path="/" component={LoginContainer} />
        </Switch>
    )
}