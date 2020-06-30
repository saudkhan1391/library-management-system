import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import firebase from '../../../utils/firebase';
// import TextField from '@material-ui/core/TextField';
export default function AddBook() {
    const [title, setTitle] = useState("")
    const [authorName, setAuthorName] = useState("")
    const [publishingDate, setPublishingDate] = useState("")
    const [publication, setPublication] = useState("")
    const [isbn, setIsbn] = useState("");
    const [currentUserId, setCurrentUser] = useState("");
    useEffect(() => {
        // let curuserid = firebase.auth().currentUser.uid;
        // setCurrentUser(curuserid);
    })
    function addBook() {
        let data = {
            title: title, authorName: authorName, publishingDate: publishingDate,
            publication: publication, isbn: isbn
        }
        // firebase.database().ref("/appointments").child(appointmentId).set(data).then(res => {});
        if (title && authorName && publication && publishingDate && isbn) {
            firebase.database().ref("/books").push(data).then(res => {
                console.log("res ", res);
                alert("Added Successfully")
            })
                .catch(e => { alert(e.message); console.log("error :", e) })
        }
        else {
            alert("All fields must be valid")
        }
    }
    return (
        <div>
            <div style={{ marginLeft: 50, width: 700 }}>
                <h1 style={{ marginLeft: 210 }} className=" text-4xl"> ADD BOOK</h1>

                <FormGroup style={{}}>
                    <Label >Book Title</Label>
                    <Input style={{ height: 50, marginBottom: 10 }} type="text"
                        placeholder=" Title" onChange={(e) => { setTitle(e.target.value) }} />
                    <Label >Author Name</Label>
                    <Input style={{ height: 50, marginBottom: 10 }} type="text"
                        placeholder="Stephen Hawkings" onChange={(e) => { setAuthorName(e.target.value) }} />
                    <Label >Publishing Date</Label>
                    <Input style={{ height: 50, marginBottom: 10 }} type="text"
                        placeholder="20-2-2020" onChange={(e) => { setPublishingDate(e.target.value) }} />
                    <Label >Publication</Label>
                    <Input style={{ height: 50, marginBottom: 10 }} type="text"
                        placeholder="Publication" onChange={(e) => { setPublication(e.target.value) }} />
                    <Label >ISBN</Label>
                    <Input style={{ height: 50, marginBottom: 10 }} type="text"
                        placeholder="121389" onChange={(e) => { setIsbn(e.target.value) }} />
                </FormGroup>
                <Button variant="contained" color="secondary" style={{ marginLeft: "80%", height: 50, width: 130 }}
                    onClick={() => { addBook() }}
                >
                    Add Book
                </Button>
            </div>
        </div>
    )
}