import React, { useState } from 'react';
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
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  // Sort activity data by time in descending order (latest first)
  const sortedData = activityData.sort((a, b) => b.time - a.time);

  // Calculate pagination variables
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate start and end indices of items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data based on the current page
  const paginatedData = sortedData.slice(startIndex, endIndex);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: '5vh', ...tableContainerStyle }}>
      <Typography variant="h3" component="h2" gutterBottom sx={headingStyle}>
        Activity Tracker
      </Typography>
      {/* Items per page selection */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body1" component="span" style={{ marginRight: '8px' }}>
          Items per page:
        </Typography>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          {/* <option value={5}>5</option> */}
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>

        </select>
      </div>
      <Table aria-label="Activity Tracker">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Time</TableCell> {/* Added Time column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.message}</TableCell>
              <TableCell>{item.time.toLocaleString()}</TableCell> {/* Display formatted time */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            style={{
              padding: '8px',
              margin: '0 4px',
              fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </TableContainer>
  );
};

export default ActivityTracker;
