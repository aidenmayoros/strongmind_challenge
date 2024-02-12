import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

function CircularProgressLoader() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<CircularProgress sx={{ p: 2 }} />
		</Box>
	);
}

export default CircularProgressLoader;
