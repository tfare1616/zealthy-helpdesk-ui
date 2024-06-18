import React, {useState} from 'react'
import axios from 'axios'
import {TextField, Button} from '@mui/material'
import apiUrl from '../../routes/service'

export default function HelpForm (props) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = () => {
    const form = {
      name,
      email,
      description,
      subject,
      status: 'new'

    }
    console.log(form)

    axios.post(`${apiUrl}/submitTickets`, form)
        .then(response => {
          setName('');
          setSubject('');
          setEmail('');
          setDescription('');
        })
        .catch(error => {
          console.log(error);
        });
  }


  return <div style={{display: 'grid', padding: 20}}>
    <h4>Helpdesk Form</h4>
    <TextField sx={{margin: '10px 0', width: '100%'}} label={'Name'} value={name} onChange={(e) => {setName(e.target.value)}}/>

    <TextField sx={{margin: '10px 0', width: '100%'}}label={'Subject'} value={subject} onChange={(e) => {setSubject(e.target.value)}}/>

    <TextField sx={{margin: '10px 0', width: '100%'}} label={'Email'} value={email} onChange={(e) => {setEmail(e.target.value)}}/>

    <TextField sx={{margin: '10px 0', width: '100%'}} label={'Description'} multiline rows={4} value={description} onChange={(e) => {setDescription(e.target.value)}}/>

    <Button sx={{margin: '10px 0', width: '100%'}} onClick={onSubmit}>Submit</Button>

  </div>
}
