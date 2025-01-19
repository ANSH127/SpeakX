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
import Loadar from "../components/Loadar";
export default function HomePage() {
  const [coloumn, setColoumn] = React.useState("ALL");
  const [data, setData] = React.useState([]);
  const [totalresults, setTotalResults] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const searchRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = () => {
    // console.log(title);

    if (title.length > 0) {
      fetchQuestions();
    } else {
      // fetchQuestions();
      alert("Please enter a search term");
    }
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      if (title) {
        console.log(coloumn);

        const response = await axios.get(
          `http://localhost:4000/questions/search?title=${title}&questionType=${coloumn}`
        );
        setData(response.data.questions);
        setTotalResults(response.data.total);
      } else {
        const response = await axios.get(
          "http://localhost:4000/questions?questionType=" + coloumn
        );
        setData(response.data.questions);
        // console.log(response.data.total);

        setTotalResults(response.data.total);
        // console.log(response.data.questions);
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchQuestions();
  }, [coloumn]);

  React.useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

    const inputElement = searchRef.current;
    inputElement.addEventListener("keypress", handleKeyPress);

    return () => {
      inputElement.removeEventListener("keypress", handleKeyPress);
    };
  }, [title]);

  return (
    <Box
      justifyContent="center"
      textAlign="center"
      alignItems={"center"}
      paddingTop="50px"

    >
      <h3 className="text-xl font-bold">Questions and Answers</h3>
      <Box 
      // padding={"40px"}
      className="sm:p-12  md:p-8  mx-auto"
      >
        <Box sx={{ display: "flex" }}>
          <TextField
            id="filter-by-coloumn"
            select
            label="Select"
            helperText="Select Question Type"
            margin="dense"
            variant="standard"
            sx={{ width: "200px" }}
            defaultValue={"ALL"}
            onChange={(e) => setColoumn(e.target.value)}
          >
            <MenuItem value={"ALL"}>ALL</MenuItem>
            <MenuItem value={"ANAGRAM"}>ANAGRAM</MenuItem>
            <MenuItem value={"MCQ"}>MCQ</MenuItem>
            <MenuItem value={"CONTENT_ONLY"}>CONTENT_ONLY</MenuItem>
            <MenuItem value={"CONVERSATION"}>CONVERSATION</MenuItem>
            <MenuItem value={"READ_ALONG"}>READ_ALONG</MenuItem>
          </TextField>

          <TextField
            id="searchtitle"
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
                    onClick={() => handleSearch()}
                  />
                </>
              ),
            }}
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
            inputRef={searchRef}
          />
        </Box>
        {
          loading ? <Loadar /> : 
          <Box>
          {data.map((item, index) => (
            <Box
              key={item._id}
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
            title={title}
            coloumn={coloumn}
          />
        </Box>}
      </Box>
    </Box>
  );
}
