import { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';


function SearchComponent(...props) {
    const [SearchText, setSearchText] = useState('');

    var search_data = props[0].station_data

    const TextSearch = (event, newValue) => {
        var FilterStationData = []

        Object.keys(search_data).map(
            (row, index) => {
                if (search_data[row].stop_name.toLowerCase().includes(event.toLowerCase())) {
                    FilterStationData[row] = search_data[row]
                } if (search_data[row].stop_id.toLowerCase().includes(event.toLowerCase())) {
                    FilterStationData[row] = search_data[row]
                }
            }
        )
        setSearchText(event);
        props[0].filter_function(FilterStationData)
    };

    return (
        <TextField
            id="outlined-basic"
            fullWidth
            label="Search for a station"
            variant="outlined"
            placeholder="Search for a Station 🕵️"
            type="text"
            value={SearchText}
            onChange={(event) =>
                TextSearch(event.target.value)
            }
            InputProps={{
                endAdornment: (
                    <IconButton onClick={
                        () => {
                            setSearchText('')
                            props[0].filter_function(search_data)
                        }
                    }>
                        <ClearIcon style={{ color: 'red' }} />
                    </IconButton>
                ),
            }}
        />
    );
}
export default SearchComponent;