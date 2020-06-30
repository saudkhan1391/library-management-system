import React from 'react'
import { ContextConsumer } from '../../../store/store'
import Dashboard from './dashboard'

export default function DashboardContainer() {
    return (
        <ContextConsumer>
            {
                ({ id, dispatch }) => {
                    console.log("id in admin dashboard container : ", id)
                    return (<Dashboard id={id} dispatch={dispatch} />)
                }
            }
        </ContextConsumer>
    )
}