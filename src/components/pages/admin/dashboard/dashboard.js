import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import firebase from '../../../utils/firebase';
import AppBarSearch from '../../../../commonComponents/appbar';
import {  AiOutlineDelete } from 'react-icons/all'
export default function Dashboard() {
    const [books, setBooks] = useState("");
    const [filteredBooks, setFilteredBooks] = useState("");
    const [currentUserId, setCurrentUser] = useState("");
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let curuserid = firebase.auth().currentUser.uid;
                setCurrentUser(curuserid);
                console.log("curuserid", curuserid);
            }
        });
        firebase.database().ref("/books/").on('value', (snapshot) => {
            // let main = { ...snapshot.val() };
            let main = snapshot.val();
            
            let booksArray = Object.values(main);

            let keys = Object.keys(main);
            keys.map((value, index) => { booksArray[index].booking_id = value })

            console.log("books arry :", booksArray);
            console.log("snapshot VALUE :", main);
            setBooks(booksArray)
            setFilteredBooks(booksArray)
        });
    }, [])
    function deleteIssueRequest(item) {
        console.log("delete item : ", item)
        firebase.database().ref("/books/" + item.booking_id).remove().then(res => { console.log("res delete : ", res) }).catch(e => { console.log("error : ", e) })
    }
    function searchTableByName(key) {
        let value = key.toUpperCase();
        console.log("value ", value)
        if (value == "") {
            //   this.noRecordFound = false;
            setFilteredBooks(books)
        } else {
            //   this.noRecordFound = false;
            let myBooks = books.filter((item) => { return item.title.toUpperCase().includes(value) });
            setFilteredBooks(myBooks)
            //   if (this.filteredAppointmentList.length == 0) {
            // this.noRecordFound = true;
        }
    }
    return (
        <div>
            <AppBarSearch  searchTableByName={searchTableByName} />
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <div style={{ width: "70vw" }}>
                    <div className=" border border-gray-500 p-5">
                        <h1 style={{ marginLeft: 0 }} className=" text-4xl text-center">ADMIN DASHBOARD</h1>
                        <div className=" flex justify-around  border-gray-500 border-solid"
                            style={{ border: "solid 0px", justifyContent: " space-around", display: "flex", marginTop: 20 }}>
                            <Button variant="contained" color="secondary" href="/enrollmember">
                                Add Members
                </Button>
                            <Button variant="contained" color="secondary" href="/addbook">
                                Add Book
                </Button>
                            <Button variant="contained" color="secondary" href="/issuebooks">
                                {/* <Button variant="contained" color="secondary" href="/issuedbooks"> */}
                            Issue Books
                </Button>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl mt-5 mb-2">Available Books</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Book Title</th>
                                    <th>Author Name</th>
                                    <th>ISBN</th>
                                    <th>Publication</th>
                                    <th>Publishing Date</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks && filteredBooks.map((value, index) => {
                                    return <tr key={index}>
                                        <td>{value.title}</td>
                                        <td>{value.authorName}</td>
                                        <td>{value.isbn}</td>
                                        <td>{value.publication}</td>
                                        <td>{value.publishingDate}</td>
                                        <td className="issueIcon" onClick={() => { deleteIssueRequest(value) }}>
                                        <AiOutlineDelete size={44} style={{ color: "green" }} /></td>
                                    </tr>
                                })}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <style jsx="true">{`
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