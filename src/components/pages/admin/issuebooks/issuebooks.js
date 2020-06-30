import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import firebase from '../../../utils/firebase';
import { AiOutlineCheckCircle, BsCheckAll, AiOutlineDelete } from 'react-icons/all'
import AppBarSearch from '../../../../commonComponents/appbar';
export default function IssueBooks() {
    const [books, setBooks] = useState("");
    useEffect(() => {
        firebase.database().ref("/issuedBooks").on('value', (snapshot) => {
            // let main = { ...snapshot.val() };
            let main = snapshot.val();
            let booksArray = Object.values(main);
            let keys = Object.keys(main);
            keys.map((value, index) => { booksArray[index].booking_id = value })
            console.log("books arry :", booksArray);
            console.log("snapshot VALUE :", main);
            setBooks(booksArray)
        });
    }, [])
    function AdminIssueBook(item) {
        console.log("issued item", item);
        firebase.database().ref("/issuedBooks/" + item.booking_id).update({ issued: true }).then(res => {
            console.log("res Update : ", res);
            alert("Issued Successfully")
        }).catch(e => { console.log("error : ", e) })
    }
    function deleteIssueRequest(item) {
        console.log("delete item : ", item)
        firebase.database().ref("/issuedBooks/" + item.booking_id).remove().then(res => { console.log("res delete : ", res) }).catch(e => { console.log("error : ", e) })
    }
    return (
        <div style={{}}>
            <AppBarSearch />
            {/* <div style={{ marginLeft: 50, width: 1100 }}> */}
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <div style={{ width: "70vw" }}>
                    <div className=" border border-gray-500 p-5">
                        <h1 style={{ marginLeft: 0 }} className=" text-4xl text-center"> MANAGE</h1>
                        <div className=" flex justify-around  border-gray-500 border-solid"
                            style={{ border: "solid 0px", justifyContent: " space-around", display: "flex", marginTop: 20 }}>
                            <Button variant="contained" color="secondary" href="/dashboard">
                                Back
                        </Button>
                        </div>
                    </div>
                    <h1 className="text-2xl mt-5 mb-2">Issued Books</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Issued By</th>
                                <th>Book Title</th>
                                <th>Author Name</th>
                                <th>ISBN</th>
                                <th>Publication</th>
                                <th>Publishing Date</th>
                                <th>Issue</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books && books.map((value, index) => {
                                return <tr key={index}>
                                    <td>{value.userEmail}</td>
                                    <td>{value.title}</td>
                                    <td>{value.authorName}</td>
                                    <td>{value.isbn}</td>
                                    <td>{value.publication}</td>
                                    <td>{value.publishingDate}</td>
                                    <td className="issueIcon" onClick={() => { AdminIssueBook(value) }}>
                                        <BsCheckAll size={44} style={{ color: "green" }} /></td>
                                    <td className="issueIcon" onClick={() => { deleteIssueRequest(value) }}>
                                        <AiOutlineDelete size={44} style={{ color: "green" }} /></td>
                                </tr>
                            })}


                        </tbody>
                    </table>
                </div>
            </div>
            <style jsx="true">{`
            .issueIcon:hover{
                background-color: rgba(0,0,0,0.2);
                // height:70px;
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