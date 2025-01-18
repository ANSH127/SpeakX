import React from "react";
import { Box, TextField, MenuItem, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Pagination from "../components/Pagination";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AnagramOptions from "../components/AnagramOptions";
export default function HomePage() {
  const [coloumn, setColoumn] = React.useState(1);
  const searchRef = React.useRef(null);
  const [data, setData] = React.useState([]);
  const [totalresults, setTotalResults] = React.useState(0);

  const handleSearch = (title) => {
    // console.log(title);

    if (title.length > 0) {
      fetchQuestions(title);
    } else {
      // fetchQuestions();
      alert("Please enter a search term");
    }
  };

  const fetchQuestions = async (title = null) => {
    try {
      if (title) {
        const response = await axios.get(
          `http://localhost:4000/questions/search?title=${title}`
        );
        setData(response.data.questions);
        setTotalResults(response.data.total);
      } else {
        const response = await axios.get("http://localhost:4000/questions");
        setData(response.data.questions);
        setTotalResults(response.data.total);
        console.log(response.data.questions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchQuestions();
  }, []);

  React.useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSearch(searchRef.current.value);
      }
    };

    const inputElement = searchRef.current;
    inputElement.addEventListener("keypress", handleKeyPress);

    return () => {
      inputElement.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <Box
      justifyContent="center"
      textAlign="center"
      alignItems={"center"}
      paddingTop="50px"
    >
      <h3 className="text-xl font-bold">Questions and Answers</h3>
      <Box padding={"40px"}>
        <Box sx={{ display: "flex" }}>
          <TextField
            id="filter-by-coloumn"
            select
            label="Select"
            helperText="Select Question Type"
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
                  <SearchIcon
                    sx={{ cursor: "pointer", marginRight: 2 }}
                    onClick={() => handleSearch(searchRef.current.value)}
                  />
                </>
              ),
            }}
            inputRef={searchRef}
            autoComplete="off"
          />
        </Box>
        <Box>
          {data.map((item, index) => (
            <Box
              key={item.id}
              padding={"15px"}
              margin={"10px"}
              border="1px solid #ccc"
              borderRadius="5px"
              textAlign={"left"}
            >
              <Chip label={item.type} size="small" className=" justify-end" />
              <h3>
                {index + 1}. {item.title}
              </h3>

              {item.type === "MCQ" && (
                <Box>
                  {item.options.map((option, index) => (
                    <Box key={index} padding={"5px"}>
                      {String.fromCharCode(65 + index)}. {option.text}
                    </Box>
                  ))}

                  <Accordion className=" w-fit text-base">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <h5 className="text-blue-500">View Answer</h5>
                    </AccordionSummary>
                    <AccordionDetails>
                      <h5>
                        {
                          item.options.filter(
                            (option) => option.isCorrectAnswer === true
                          )[0].text
                        }
                      </h5>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              )}
              {item.type === "ANAGRAM" && (
                <Box className="pt-2">
                  <AnagramOptions options={item.blocks} />
                </Box>
              )}
            </Box>
          ))}
          <Pagination
            setCurrentData={setData}
            totalResults={totalresults}
            title={searchRef?.current?.value || null}
          />
        </Box>
      </Box>
    </Box>
  );
}
