import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
} from '@material-ui/core';

function PersonList() {
    const [persons, setPersons] = useState([]); // Initialize a state variable called "persons" using the useState hook

    useEffect(() => {
        fetchPersons(); // Fetch the list of persons when the component mounts
    }, []);

    const fetchPersons = async () => {
        try {
            const response = await axios.get('/api/persons'); // Fetch the list of persons from the API
            setPersons(response.data); // Update the "persons" state with the fetched data
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/person/${id}`); // Send a DELETE request to remove the person with the specified ID
            fetchPersons(); // Fetch the updated list of persons after deletion
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Person List</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((person) => (
                            <TableRow key={person._id}>
                                <TableCell>{person.name}</TableCell>
                                <TableCell>{person.age}</TableCell>
                                <TableCell>{person.address}</TableCell>
                                <TableCell>{person.contact}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/edit/${person._id}`}
                                        variant="outlined"
                                        color="primary"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(person._id)}
                                        variant="outlined"
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button component={Link} to="/add" variant="contained" color="primary">
                Add Person
            </Button>
        </div>
    );
}

export default PersonList;
