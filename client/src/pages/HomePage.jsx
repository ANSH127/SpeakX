import React from "react";
import {Box,TextField,MenuItem} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


export default function HomePage() {
  const [coloumn, setColoumn] = React.useState(1);
  const searchRef = React.useRef(null);

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <Box
      justifyContent="center"
      textAlign="center"
      alignItems={"center"}
      paddingTop="50px"
    >
      <h3 className="text-xl font-bold">Questions and Answers</h3>
      <Box padding={"40px"}>
        <Box sx={{ display: "flex" }} >
          <TextField
            id="filter-by-coloumn"
            select
            label="Select"
            helperText="Select Type"
            margin="dense"
            variant="standard"
            sx={{ width: "200px" }}
            defaultValue={1}
            onChange={(e) => setColoumn(e.target.value)}
          >
            <MenuItem value={1}>ALL</MenuItem>
            <MenuItem value={2}>ANAGRAM</MenuItem>
            <MenuItem value={3}>MCQ</MenuItem>
            <MenuItem value={4}>CONTENT_ONLY</MenuItem>
            <MenuItem value={5}>CONVERSATION</MenuItem>
            <MenuItem value={6}>READ_ALONG</MenuItem>
          </TextField>

          <TextField
            id="search"
            label="Search"
            variant="standard"
            fullWidth
            margin="dense"
            required
            InputProps={{
              endAdornment: (
                <>
                  <SearchIcon sx={{ cursor: "pointer", marginRight: 2 }} />
                </>
              ),
            }}
            onChange={(e) => handleSearch(e.target.value)}
            inputRef={searchRef}
            autoComplete="off"
          />
        </Box>
      </Box>
    </Box>
  );
}
