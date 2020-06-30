import React from 'react'
import { ContextConsumer } from '../../../../store/store'
import IssuedBooks from './issuedBooks'

export default function IssuedBooksContainer() {
    return (
        <ContextConsumer>
            {
                ({ id, dispatch }) => {
                    console.log("id in container : ", id)
                    return (<IssuedBooks id={id} dispatch={dispatch} />)
                }
            }
        </ContextConsumer>
    )
}