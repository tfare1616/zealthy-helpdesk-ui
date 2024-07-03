import React, {useState} from 'react'
import { Paper, Button, Dialog, TextField, DialogTitle, DialogActions } from '@mui/material';



const RequestModal = (props) => {

  const [comment, setComment] = useState('')

  return <Dialog maxWidth={'sm'} open={props.open}
            fullWidth
            onClose={props.onClose}>
            <DialogTitle>Request additional information</DialogTitle>
            <TextField sx={{padding: '20px',}}
              multiline
              rows={4}
              value={comment}
              onChange={(e) => {setComment(e.target.value)}}/>
              <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button disabled={comment.trim().length === 0} onClick={() => {props.onSubmit(props.ticketId, comment)}}>Send reply</Button>
              </DialogActions>

  </Dialog>
}


export default RequestModal
