import React, {useState} from 'react'
import axios from 'axios'
import {TextField, Button, Snackbar, Alert} from '@mui/material'
import apiUrl from '../../routes/service'

export default function HelpForm (props) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    let isValid = name.trim().length > 0;
    isValid = isValid && subject.trim().length > 0;
    isValid = isValid && email.trim().length > 0;
    isValid = isValid && description.trim().length > 0;


    if (isValid){
      onSubmit();
    } else {
      setInvalid(true);
    }
  }

  const onSubmit = () => {
    const form = {
      name,
      email,
      description,
      subject,
      status: 'new'
    }

    axios.post(`${apiUrl}/submitTickets`, form)
        .then(response => {
          setName('');
          setSubject('');
          setEmail('');
          setDescription('');
          setSuccess(true);
        })
        .catch(error => {
          setError(true);
        });
  }


  return <div style={{display: 'grid', padding: 20}}>

    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={success} autoHideDuration={5000} onClose={() => {setSuccess(false)}}>
      <Alert
        onClose={() => {setSuccess(false)}}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Your ticket has been successfully submitted.
      </Alert>
    </Snackbar>

    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={invalid} autoHideDuration={5000} onClose={() => {setInvalid(false)}}>
      <Alert
        onClose={() => {setInvalid(false)}}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        At least one of the fields is left blank. Please fill in all fields.
      </Alert>
    </Snackbar>

    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={error} autoHideDuration={5000} onClose={() => {setError(false)}}>
      <Alert
        onClose={() => {setError(false)}}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        There has been an error uploading your ticket.
      </Alert>
    </Snackbar>

    <h4>Helpdesk Form</h4>
    <TextField sx={{margin: '10px 0', width: '100%'}} label={'Name'} value={name} onChange={(e) => {setName(e.target.value)}}/>

    <TextField sx={{margin: '10px 0', width: '100%'}}label={'Subject'} value={subject} onChange={(e) => {setSubject(e.target.value)}}/>

    <TextField sx={{margin: '10px 0', width: '100%'}} label={'Email'} value={email} onChange={(e) => {setEmail(e.target.value)}}/>

    <TextField sx={{margin: '10px 0', width: '100%'}} label={'Description'} multiline rows={4} value={description} onChange={(e) => {setDescription(e.target.value)}}/>

    <Button sx={{margin: '10px 0', width: '100%'}} onClick={validateForm}>Submit</Button>

  </div>
}
