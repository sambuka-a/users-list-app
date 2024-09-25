import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

import { SearchBar } from './SearchBar';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function UserTable() {
  const users = useSelector((state: RootState) => state.app.users)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Filtering logic
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(name.toLowerCase()) &&
    user.username.toLowerCase().includes(username.toLowerCase()) &&
    user.email.toLowerCase().includes(email.toLowerCase()) &&
    user.phone.includes(phone)
  );


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <SearchBar
                id="name-filter"
                label="Filter by Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <SearchBar
                id="username-filter"
                label="Filter by Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <SearchBar
                id="email-filter"
                label="Filter by Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <SearchBar
                id="phone-filter"
                label="Filter by Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <StyledTableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ cursor: 'pointer' }}>
                  <Tooltip placement="right"
                    title={
                      <>
                        <div><strong>Address:</strong> {user.address?.street}, {user.address?.city}</div>
                        <div><strong>Company:</strong> {user.company?.name}</div>
                      </>
                    }
                    arrow
                  >
                    <span>{user.name}</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">{user.username}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.phone}</TableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No matching users found!
              </TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
