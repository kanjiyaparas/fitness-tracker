import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Box,
    CircularProgress,
    Divider,
    Avatar,
    Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Custom styles for the card to make it more engaging
const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    borderRadius: '15px',
    padding: theme.spacing(2),
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[8],
    },
}));

// Custom avatar style for a profile picture-like effect
const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    width: theme.spacing(7),
    height: theme.spacing(7),
}));

const AdminDashboard = () => {
    const [userStatistics, setUserStatistics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/statistics');
                setUserStatistics(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <Container maxWidth="lg">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                    Admin Dashboard
                </Typography>

                {loading ? (
                    <Box display="flex" justifyContent="center" mt={5}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={4}>
                        {userStatistics.map(({ user, goals, workouts }) => (
                            <Grid item xs={12} sm={6} md={4} key={user._id}>
                                <StyledCard>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <StyledAvatar>
                                                <AccountCircleIcon fontSize="large" />
                                            </StyledAvatar>
                                            <Box ml={2}>
                                                <Typography variant="h6" gutterBottom>
                                                    {user.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Divider sx={{ mb: 2 }} />

                                        <Box display="flex" alignItems="center" mt={2}>
                                            <EmojiEventsIcon color="primary" />
                                            <Typography variant="subtitle1" ml={1}>
                                                Goals
                                            </Typography>
                                        </Box>
                                        <Paper elevation={1} sx={{ padding: 2, mt: 1 }}>
                                            {goals.length > 0 ? (
                                                goals.map((goal) => (
                                                    <Typography key={goal._id} variant="body2">
                                                        {goal.goalType} - Target: {goal.targetValue} - Progress: {goal.progress}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography variant="body2" color="textSecondary">
                                                    No goals available
                                                </Typography>
                                            )}
                                        </Paper>

                                        <Divider sx={{ mt: 2 }} />

                                        <Box display="flex" alignItems="center" mt={2}>
                                            <FitnessCenterIcon color="secondary" />
                                            <Typography variant="subtitle1" ml={1}>
                                                Workouts
                                            </Typography>
                                        </Box>
                                        <Paper elevation={1} sx={{ padding: 2, mt: 1 }}>
                                            {workouts.length > 0 ? (
                                                workouts.map((workout) => (
                                                    <Typography key={workout._id} variant="body2">
                                                        {workout.activity} - Duration: {workout.duration} min
                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography variant="body2" color="textSecondary">
                                                    No workouts available
                                                </Typography>
                                            )}
                                        </Paper>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" variant="contained" fullWidth>
                                            View Details
                                        </Button>
                                    </CardActions>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default AdminDashboard;
