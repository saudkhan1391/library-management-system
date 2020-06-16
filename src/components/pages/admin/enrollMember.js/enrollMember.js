import React, { useState } from 'react'
import {  FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import firebase from '../../../utils/firebase';
export default function EnrollMember() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const registerMember = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            alert("Registered Successfully");
            // history.push('/dashboard')
        }).catch((e) => { alert(e.message) })
    }
    return (
        <div>
            <div style={{ marginLeft: 50, width: 700 }}>
                <h1 className=" text-4xl text-center p-5" > Enroll Member</h1>

                <FormGroup style={{}}>
                    <Label for="exampleEmail">Member Name</Label>
                    <Input style={{ height: 50, marginBottom: 10 }} type="text" placeholder=" Saud Khan"
                    />
                    <Label for="exampleEmail">Member Email</Label>
                    <Input style={{ height: 50, marginBottom: 10 }} type="email" placeholder="Stephen Hawkings"
                        onChange={e => { setEmail(e.target.value) }}
                    />
                    <Label for="exampleEmail">Member Password</Label>
                    <Input style={{ height: 50, marginBottom: 10 }} type="password" placeholder="******"
                        onChange={e => { setPassword(e.target.value) }}
                    />
                    <Label for="exampleEmail">Phone Number</Label>
                    <Input style={{ height: 50, marginBottom: 10 }} type="tel" name="number" placeholder="+9231192382832" />

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label for="cars">Member Type:</label>
                        {/* <select name="cars" id="cars"> */}
                        <select style={{ height: 50 }} onChange={(event) => { alert(event.target.value) }}>
                            <option value="Staff">Staff</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                    {/* <Input style={{ height: 50, marginBottom: 10 }} type="text" name="email" id="exampleEmail" placeholder="20-2-2020" /> */}
                </FormGroup>
                <Button variant="contained" color="secondary" style={{ marginLeft: "80%", height: 50, width: 130 }}
                    onClick={() => { registerMember() }}
                >
                    Add Member
                </Button>
            </div>
        </div>
    )
}