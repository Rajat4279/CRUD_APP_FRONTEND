import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
    Container,
} from '@material-ui/core';

function PersonForm() {
    const { id } = useParams(); // Retrieve the "id" parameter from the URL
    const history = useHistory(); // Get access to the browser's history object
    const [person, setPerson] = useState({ // Initialize a state variable called "person" using the useState hook
        name: '',
        age: '',
        address: '',
        contact: '',
    });

    useEffect(() => {
        // This effect runs when the component mounts or when the "id" parameter changes
        if (id) {
            fetchPerson(); // Fetch person data if "id" exists
        }
    }, [id]);

    const fetchPerson = async () => {
        try {
            const response = await axios.get(`/api/person/${id}`);
            setPerson(response.data); // Update the "person" state with the fetched data
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target; // Get the name and value from the input element
        setPerson((prevPerson) => ({
            ...prevPerson,
            [name]: value, // Update the corresponding field in the "person" state using the name and value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            if (id) {
                await axios.put(`/api/person/${id}`, person); // Send a PUT request to update the existing person
            } else {
                await axios.post('/api/persons', person); // Send a POST request to create a new person
            }
            history.push('/'); // Redirect to the homepage after successful submission
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    {id ? 'Edit Person' : 'Add Person'} {/* Render the appropriate title based on whether "id" exists */}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                value={person.name} // Bind the "name" value to the corresponding field in the "person" state
                                onChange={handleInputChange} // Call the "handleInputChange" function on input change
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Age"
                                name="age"
                                value={person.age} // Bind the "age" value to the corresponding field in the "person" state
                                onChange={handleInputChange}
                                type="number"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                name="address"
                                value={person.address} // Bind the "address" value to the corresponding field in the "person" state
                                onChange={handleInputChange}
                                multiline
                                rows={4}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contact"
                                name="contact"
                                value={person.contact} // Bind the "contact" value to the corresponding field in the "person" state
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                {id ? 'Update' : 'Create'} {/* Render the appropriate button label based on whether "id" exists */}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default PersonForm;
