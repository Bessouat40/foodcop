import { Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import columns2 from './subcomponents/columns2';

const DataGridMenu = ({ rows2, apiRef2 }) => {
  return (
    <Stack>
      {rows2.length > 0 ? (
        <DataGrid
          apiRef={apiRef2}
          rows={rows2}
          columns={columns2}
          disableColumnMenu
          sx={{ backgroundColor: 'white' }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      ) : (
        <Typography color="white">Please select food</Typography>
      )}
    </Stack>
  );
};

export default DataGridMenu;
