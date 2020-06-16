import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import firebase from '../../../utils/firebase';
export default function Dashboard() {
    const [books, setBooks] = useState("")
    useEffect(() => {
        // firebase.database().ref("books")
        firebase.database().ref("/books/").on('value', (snapshot) => {
            // let main = { ...snapshot.val() };
            let main = snapshot.val();
            let booksArray = Object.values(main);
            console.log("books arry :", booksArray);
            console.log("snapshot VALUE :", main);
            setBooks(booksArray)
        });
    }, [])
    return (
        <div>
            <div style={{ marginLeft: 50, width: 700 }}>
                <div className=" border border-gray-500 p-5">
                    <h1 style={{ marginLeft: 0 }} className=" text-4xl text-center"> DASHBOARD</h1>
                    <div className=" flex justify-around  border-gray-500 border-solid"
                        style={{ border: "solid 0px", justifyContent: " space-around", display: "flex", marginTop: 20 }}>
                        <Button variant="contained" color="secondary" href="/enrollmember">
                            Add Members
                </Button>
                        <Button variant="contained" color="secondary" href="/addbook">
                            Add Book
                </Button>
                        <Button variant="contained" color="secondary" href="/addbook">
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
                                </tr>
                            })}


                        </tbody>
                    </table>
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