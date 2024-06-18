import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton';
import { Table, Paper, TableContainer, TableHead, TableBody, TableCell, TableRow, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import apiUrl from '../../routes/service'

export default function AdminPage (props) {
  const [tickets, setTickets] = useState([]);
  const [body, setBody] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get(`${apiUrl}/tickets`)
        .then(response => {
          setTickets(response.data.Tickets)
        })
        .catch(error => {
          console.log(error);
        });
  },[]);

  const setNewStatus = (e, ticket, index) => {
    const temp = JSON.parse(JSON.stringify(tickets));
    temp[index].status = e.target.value;
    axios.put(`${apiUrl}/editTickets`, {id: temp[index].id, status: e.target.value})
        .then(response => {

        })
        .catch(error => {
          console.log(error);
        });
    setTickets(temp);
  }

  const deleteTickets = (ticket, index) => {
    const id = ticket.id
    axios.put(`${apiUrl}/deleteTickets`, {id: id})
        .then(response => {
          axios.get(`${apiUrl}/tickets`)
              .then(response => {
                setTickets(response.data.Tickets)
              })
              .catch(error => {
                console.log(error);
              });
        })
        .catch(error => {
          console.log(error);
        });
  }

  useEffect(() => {
    const b = [];
    const filteredTickets = filter === 'all' ? tickets : tickets.filter((ticket) => {return ticket.status === filter});
    { filteredTickets.map((ticket, i)=> (
      b.push(<TableRow key={ticket.id}>
        <TableCell>{ticket.name}</TableCell>
        <TableCell>{ticket.subject}</TableCell>
        <TableCell>{ticket.description}</TableCell>
        <TableCell>{ticket.email}</TableCell>
        <TableCell>
        <FormControl fullWidth>
          <InputLabel id="ticket-select-label">Status</InputLabel>
          <Select label='Status' sx={{width: '200px'}} value={ticket.status} onChange={(e) => setNewStatus(e, ticket, i)}>
            <MenuItem value={'new'}> New </MenuItem>
            <MenuItem value={'inProgress'}> In progress </MenuItem>
            <MenuItem value={'reopened'}> Needs more information </MenuItem>
            <MenuItem value={'completed'}> Completed</MenuItem>
          </Select>
          </FormControl>
        </TableCell>
        <TableCell>
          <IconButton onClick={() => deleteTickets(ticket, i)} aria-label="delete" >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>)
    ))
    }
    setBody(b)
  }, [tickets, filter])


  return <div>

  <FormControl fullWidth>
    <InputLabel id="filter-select-label">Filter status</InputLabel>
    <Select label='Filter status' sx={{width: '300px'}} value={filter} onChange={(e) => setFilter(e.target.value)}>
      <MenuItem value={'all'}> All status </MenuItem>
      <MenuItem value={'new'}> New </MenuItem>
      <MenuItem value={'inProgress'}> In progress </MenuItem>
      <MenuItem value={'reopened'}> Need more information </MenuItem>
      <MenuItem value={'completed'}> Completed</MenuItem>
    </Select>
    </FormControl>

    {tickets?.length > 0 ?
      <TableContainer sx={{marginTop: '20px',}} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {body.map((b) => {
                return b
              })}
              </TableBody>
            </Table>
          </TableContainer>
       : null}

  </div>
}
