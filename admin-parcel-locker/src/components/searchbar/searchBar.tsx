import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [recommendations, setRecommendations] = React.useState<string[]>([]);

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Searching for: ${searchTerm}`);
        handleComplexSearch(searchTerm);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setRecommendations([]);
        } else {
            setRecommendations([
                `Recommendation 1 for ${value}`,
                `Recommendation 2 for ${value}`,
                `Recommendation 3 for ${value}`,
                //dummy thoi nhe, doi bind BE vo di roi minh lam tiep nha
            ]);
        }
    };

    const handleComplexSearch = (query: string) => {
        const trimmedQuery = query.trim();
        if (trimmedQuery.startsWith('customer:')) {
            const customerId = trimmedQuery.substring(9);
            console.log(`Searching for customer with ID: ${customerId}`);
            //logic de tim customer id
        } else if (trimmedQuery.startsWith('locker:')) {
            const lockerId = trimmedQuery.substring(7);
            console.log(`Searching for locker with ID: ${lockerId}`);
        } else {
            console.log(`Searching for: ${trimmedQuery}`);
        }
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, position: 'relative' }}
        >
            <IconButton type="submit" sx={{ p: '0.25em' }} aria-label="search">
                <SearchIcon color='disabled'/>
            </IconButton>
            <InputBase
                name="search"
                disabled
                value={searchTerm}
                onChange={handleInputChange}
                sx={{ flex: 1 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
            />

            {recommendations.length > 0 && (
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1,
                        mt: 1,
                        bgcolor: 'background.paper',
                        boxShadow: 3,
                    }}
                >
                    <List>
                        {recommendations.map((recommendation, index) => (
                            <React.Fragment key={index}>
                                <ListItem button>
                                    <ListItemText primary={recommendation} />
                                </ListItem>
                                {index < recommendations.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            )}
        </Paper>
    );
};

export default SearchBar;
