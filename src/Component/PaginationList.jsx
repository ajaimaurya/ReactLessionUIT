import React, { useState,useEffect } from 'react'

export default function PaginationList() {
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [page,setPage]=useState(1);
    const [post,setPost]=useState([]);
    const POST_PER_PAGE=10;
    const TOTAL_POST=100;
    const TOTAL_PAGE=Math.ceil(TOTAL_POST/POST_PER_PAGE);

    const fetchPost=async(page)=>{
        setLoading(true);
        try{
            const response=await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${POST_PER_PAGE}`);
            const data=await response.json();
            setPost(data);
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }   
    };   
        useEffect(()=>{
            fetchPost(page);
        }   ,[page]);

        const handleNext=()=>{
            setPage((prevPage)=>Math.min(prevPage+1,TOTAL_PAGE) );
        };  
        const handlePrev=()=>{
            setPage((prevPage)=>Math.max(prevPage-1,1) );
        };
        const gotoPage=(pageNumber)=>{
            setPage(pageNumber);
        };
      return (
    <div>
        <h2>Pagination List</h2>
        <div>
            <button onClick={handlePrev} disabled={page===1}>Previous</button>
            <span>{page} of {TOTAL_PAGE}</span>
            <button onClick={handleNext} disabled={page===TOTAL_PAGE}>Next</button>
        </div>
        {loading ? (
            <div>Loading...</div>
        ) : error ? (
            <div>Error: {error}</div>
        ) : (
            <div>
                {post.map((item) => (
                    <div key={item.id}>{item.title}</div>
                ))}
            </div>
           
        )}
        <div>
            <p>Jump Page</p>
            <div>
                {Array.from({ length: TOTAL_PAGE }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}        
                        onClick={() => gotoPage(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))} 
            </div>
        </div>
    </div>
  );
}
