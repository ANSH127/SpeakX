import  { useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

export default function Pagination({ setCurrentData,totalResults,title }) {
  const itemsPerPage = 20;
  const pageCount = Math.ceil(totalResults / itemsPerPage);


  const handlePageClick = (data) => {
    let selected = data.selected;
    fetchQuestions(selected + 1, itemsPerPage);
    window.scrollTo(0, 0);
  };

  const fetchQuestions = async (page,limit) => {
    try {
    if(title){
        const response = await axios.get("http://localhost:4000/questions/search?title="+title+"&page="+page+"&limit="+limit);
        setCurrentData(response.data.questions);
    }
    else{
      const response = await axios.get("http://localhost:4000/questions?page="+page+"&limit="+limit);
      setCurrentData(response.data.questions);
    }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestions(1,itemsPerPage);
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center w-full my-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="| Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="Prev |"
          renderOnZeroPageCount={null}
          activeClassName="page-btn"
          activeLinkClassName="active"
          containerClassName="pagination-container"
          pageClassName="page-btn"
          pageLinkClassName="page-btn-link"
          previousClassName="page-btn"
          previousLinkClassName="prev page-btn-link"
          nextClassName="page-btn"
          nextLinkClassName="next page-btn-link"
          disabledClassName="page-btn"
          disabledLinkClassName="disabled page-btn-link"
          breakClassName="page-btn"
          breakLinkClassName="break page-btn-link"
        />
        
      </div>
    </div>
  );
}