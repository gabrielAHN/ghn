import { TextField } from '@mui/material';



export default function SearchComponent(props) {
    let { SearchText, setSearchText, search_data, filter_function } = props;


    return (
        <TextField
            id="outlined-basic"
            fullWidth
            label="Search for a station"
            variant="outlined"
            placeholder="Search for a Stop ID"
            type="text"
            value={SearchText}
            onChange={(event) =>
                setSearchText(event.target.value)
            }
        />
    );
}