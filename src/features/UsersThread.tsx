import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/UsersSlice';
import { Typography, CircularProgress, Alert } from '@mui/material';
import type { AppDispatch, RootState } from '../store';

import UserTable from '../components/UsersTable';

export function UsersThread() {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.app)

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Users List
      </Typography>

      {status === 'loading' && <CircularProgress />}

      {status === 'failed' && (
        <Alert severity="error">
          Failed to fetch users. Please try again later.
        </Alert>
      )}

      {status === 'idle' && <UserTable />}
    </div>
  );
}