import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { TrackerContext } from '../../../utils/ContextApi/TrackerContext';

const ActivityTracker = () => {
  const { activityData } = useContext(TrackerContext);

  const tableContainerStyle = {
    marginBottom: '16px',
    '@media (max-width: 600px)': {
      marginBottom: '8px',
    },
  };

  const headingStyle = {
    marginBottom: '16px',
    '@media (max-width: 600px)': {
      marginBottom: '8px',
    },
    textAlign: 'center',
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: '5vh', ...tableContainerStyle }}>
      <Typography variant="h3" component="h2" gutterBottom sx={headingStyle}>
        Activity Tracker
      </Typography>
      <Table aria-label="Activity Tracker">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activityData.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivityTracker;
