import React, {useEffect, useState} from 'react';
import {Routes , Route} from 'react-router-dom';
import HelpForm from '../modules/HelpForm';
import AdminPage from '../modules/AdminPage';

const Layout = (props) => {


return <div>
  <Routes>
    <Route path="*" element={<HelpForm/>} />
    <Route path="/admin" element={<AdminPage />} />
  </Routes>
</div>
}

export default Layout
