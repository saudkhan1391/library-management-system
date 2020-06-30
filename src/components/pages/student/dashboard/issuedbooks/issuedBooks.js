import React, { useState, useEffect } from 'react'
import firebase from '../../../../utils/firebase';
import Button from '@material-ui/core/Button';
import { BsPersonCheck, RiAdminLine } from 'react-icons/all'
export default function IssuedBooks(props) {
    let { id, dispatch } = props;
    console.log("props", props);
    const [books, setBooks] = useState("");
    const [currentUserId, setCurrentUser] = useState("");
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let curuserid = firebase.auth().currentUser.uid;
                console.log("curuserid var :", curuserid);
                setCurrentUser(curuserid);
                getAllBooks(curuserid);
            }
        })

    }, [])
    function getAllBooks(curuserid) {
        firebase.database().ref("/issuedBooks").on('value', (snapshot) => {
            // let main = { ...snapshot.val() };
            let main = snapshot.val();
            let booksArray = Object.values(main);
            let keys = Object.keys(main);
            keys.map((value, index) => { booksArray[index].booking_id = value })
            console.log("books arry :", booksArray);
            console.log("currentUserId 2:", curuserid);
            console.log("snapshot VALUE :", main);
            let bookedByCurUser = booksArray.filter(item => item.uid == curuserid);
            console.log("boooked by cur user", bookedByCurUser);
            setBooks(bookedByCurUser)
        });
    }
    return (
        <div>
            <div style={{ marginLeft: 50, width: 1000 }}>
                <div className=" border border-gray-500 p-5">
                    <h1 style={{ marginLeft: 0 }} className=" text-4xl text-center"> ISSUED</h1>
                    <div className=" flex justify-around  border-gray-500 border-solid"
                        style={{ border: "solid 0px", justifyContent: " space-around", display: "flex", marginTop: 20 }}>
                        <Button variant="contained" color="secondary" href="/dashboardstudent">
                            Back
                        </Button>
                    </div>
                </div>
                <h1 className="text-2xl mt-5 mb-2">Issued Books</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Author Name</th>
                            <th>ISBN</th>
                            <th>Publication</th>
                            <th>Publishing Date</th>
                            <th>Issued By Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books && books.map((value, index) => {
                            return <tr key={index}>
                                <td>{value.title}</td>
                                <td>{value.authorName}</td>
                                <td>{value.isbn}</td>
                                <td>{value.publication}</td>
                                <td>{value.publishingDate}</td>
                                <td className="issueIcon" >{value.issued ? <BsPersonCheck size={44} style={{ color: "green" }} /> :
                                    <RiAdminLine size={44} style={{ color: "red" }} />
                                }</td>
                            </tr>
                        })}


                    </tbody>
                </table>
            </div>
            <style jsx="true">{`
            .issueIcon:hover{
                // background-color: rgba(0,0,0,0.2);
                // height:80px;
                // background-color: #dddddd;
            }
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
              }
              
              td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
              }
              
              tr:nth-child(even) {
                background-color: #dddddd;
              }
            `}
            </style>
        </div>
    )
}