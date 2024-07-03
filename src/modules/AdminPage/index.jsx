import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import StatusFilter from '../Shared/StatusFilter';
import RequestModal from '../RequestModal';
import { Table, Paper, Button, TableContainer, TableHead, Snackbar, Alert, TableBody, TableCell, TableRow, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import apiUrl from '../../routes/service';

export default function AdminPage (props) {
  const [tickets, setTickets] = useState([]);
  const [body, setBody] = useState([]);
  const [filter, setFilter] = useState('all');
  const [ticketId, setTicketId] = useState(0);
  const [isRequestVisible, setIsRequestVisible] = useState(false);
  const [success, setSuccess] = useState(false);

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
    axios.put(`${process.env.REACT_APP_API_URL}/editTickets`, {id: temp[index].id, status: e.target.value})
        .then(response => {
          setSuccess(true);
        })
        .catch(error => {
          console.log(error);
        });
    setTickets(temp);
  }

  const deleteTickets = (ticket, index) => {
    const id = ticket.id
    axios.put(`${process.env.REACT_APP_API_URL}/deleteTickets`, {id: id})
        .then(response => {
          axios.get('https://zealthy-helpdesk-api-vert.vercel.app/tickets')
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

  const openInfoRequest = (ticket) => {
    setTicketId(ticket.id);
    setIsRequestVisible(true);
  }

  const handleInfoRequest = (ticketId, comment) => {
    axios.put(`${apiUrl}/requestComments`, {id: ticketId, comment})
        .then(response => {
          setTicketId(0);
          setIsRequestVisible(true);
          success(true)
        })
        .catch(error => {
          console.log(error);
          setTicketId(0);
          setIsRequestVisible(true);
        });
  }

  const cancelInfoRequest = () => {
    setTicketId(0);
    setIsRequestVisible(false);
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
        <StatusFilter showAll={false} label={'Status'} filter={ticket.status} width={'200px'} onChange={(e) => setNewStatus(e, ticket, i)} />
        </TableCell>
        <TableCell>
        <Button onClick={() => openInfoRequest(ticket)}>Request further information </Button>
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

  <RequestModal open={isRequestVisible} ticketId={ticketId} onClose={cancelInfoRequest} onSubmit={handleInfoRequest}/>

  <StatusFilter showAll={true} label={'Filter status'} filter={filter} width={'300px'} onChange={(e) => setFilter(e.target.value)} />

  <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={success} autoHideDuration={5000} onClose={() => {setSuccess(false)}}>
    <Alert
      onClose={() => {setSuccess(false)}}
      severity="success"
      variant="filled"
      sx={{ width: '100%' }}
    >
      Your request has been successfully submitted.
    </Alert>
  </Snackbar>

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
                  <TableCell>Requset comment</TableCell>
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
