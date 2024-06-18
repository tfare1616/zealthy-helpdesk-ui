import React, {useState} from 'react'
import style from './style.css'
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin`)
  };

  const handleClose = () => {
    navigate(``)

  };

  return <div className={'header'}>
    <Button onClick={handleClick}>Log in</Button>
    <h1 style={{ textAlign: 'center' }} onClick={() => {handleClose('')}}>Helpdesk</h1>
    <div/>
  </div>
}

export default Header
