import React from 'react'
import { ContextConsumer } from '../../store/store'
import Login from './login'

export default function LoginContainer() {
    return (
        <ContextConsumer>
            {
                ({ id, dispatch }) => (
                    <Login id={id} dispatch={dispatch} />
                )
            }
        </ContextConsumer>
    )
}