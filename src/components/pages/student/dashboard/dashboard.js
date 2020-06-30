import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import firebase from '../../../utils/firebase';
import { AiOutlineCheckCircle } from 'react-icons/all'
import AppBarSearch from '../../../../commonComponents/appbar';
export default function DashboardStudent() {
    const [books, setBooks] = useState("");
    const [filteredBooks, setFilteredBooks] = useState("");
    const [currentUserId, setCurrentUser] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [curUserEmail, setCurUserEmail] = useState("")
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let curuserid = firebase.auth().currentUser.uid;
                setCurrentUser(curuserid);
                console.log(user.email, "user");
                setCurUserEmail(user.email);

            }
        })
        firebase.database().ref("/books/").on('value', (snapshot) => {
            // let main = { ...snapshot.val() };
            let main = snapshot.val();
            let booksArray = Object.values(main);
            console.log("books arry :", booksArray);
            console.log("snapshot VALUE :", main);
            setBooks(booksArray)
            setFilteredBooks(booksArray)
        });
    }, [])
    function issueBook(item) {
        console.log("issued item", item);
        if (item) {
            let payload = { ...item, uid: currentUserId, userEmail: curUserEmail };
            console.log("payload : ", payload);
            firebase.database().ref("/issuedBooks").push(payload).then(res => {
                console.log("res ", res);
                alert("Added Successfully")
            })
                .catch(e => { alert(e.message); console.log("error :", e) })
        }
        else {
            alert("Error")
        }
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
            <AppBarSearch setSearchValue={setSearchValue} searchTableByName={searchTableByName} />
            {/* <div style={{ marginLeft: 50, width: 1100 }}> */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "70vw" }}>
                    <div className=" border border-gray-500 p-5" style={{}}>
                        <h1 style={{ marginLeft: 0 }} className=" text-4xl text-center">STUDENT DASHBOARD</h1>
                        <div className=" flex justify-around  border-gray-500 border-solid"
                            style={{ border: "solid 0px", justifyContent: " space-around", display: "flex", marginTop: 20 }}>
                            <Button variant="contained" color="secondary" href="/issuedbooks">
                                View Issued Books
                        </Button>
                            {/* <Button variant="contained" color="secondary" href="/">
                            Log Out
                        </Button> */}
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
                                    <th>Issue</th>
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
                                        <td className="issueIcon" onClick={() => { issueBook(value) }}><AiOutlineCheckCircle size={44} style={{ color: "green" }} /></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <style jsx="true">{`
            .issueIcon:hover{
                background-color: rgba(0,0,0,0.2);
                height:80;
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