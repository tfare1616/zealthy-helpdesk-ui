import React from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'

export default function StatusFilter (props) {

  return <FormControl fullWidth>
      <InputLabel id="ticket-select-label">{props.label}</InputLabel>
      <Select label={props.label} sx={{width: props.width}} value={props.filter} onChange={props.onChange}>
        {props.showAll ?
          <MenuItem value={'all'}> All status </MenuItem>
          : null
        }
        <MenuItem value={'new'}> New </MenuItem>
        <MenuItem value={'inProgress'}> In progress </MenuItem>
        <MenuItem value={'reopened'}> Need more information </MenuItem>
        <MenuItem value={'completed'}> Completed</MenuItem>
    </Select>
  </FormControl>

}
