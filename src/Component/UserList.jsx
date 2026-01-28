import React, { useState,useEffect } from 'react'

export default function UserList() {
   
 const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);

    const POSTS_PER_PAGE = 10;
    const TOTAL_POSTS = 100;
    const totalPages = Math.ceil(TOTAL_POSTS / POSTS_PER_PAGE); 


    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const response = await fetch(`https://reqres.in/api/users?_page=${page}&_limit=${POSTS_PER_PAGE}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch posts.")
                }

                const data = await response.json();
                setPosts(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading (false);
            }
        };

        fetchPosts();
    },[page]);

    const handleNext = () => {
        setPage((prevPage) => Math.min(totalPages, prevPage+1));
    };

    const handlePrevious = () => {
        setPage((prevPage)=>Math.max(1, prevPage - 1));
    };

    const goToPage = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div>
            <h2>Paginated List</h2>
            <br />
            <strong>useEffect runs whenever 'page' changes</strong>

            <span>
                Page {page} of {totalPages}
            </span>

            <div>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages || loading}
                >
                    Next
                </button>

                <button
                    onClick={handlePrevious}
                    disabled={page === 1 || loading}
                >
                    Previous
                </button>
            </div>

            {loading && <p>Loading Posts for page {page}</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
                <div>
                    {posts.map((post) => (
                        <div key={post.id}>
                            <h3>Post #{(page-1) * POSTS_PER_PAGE + posts.indexOf(post) + 1}</h3>
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="page-jumper">
                <p>Jump to page:</p>
                <div className="page-buttons">
                {/* Create buttons for each page */}
                {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                    <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`${page === pageNum ? 'active' : ''}`}
                        disabled={loading}
                    >
                        {pageNum}
                    </button>
                    );
                })}
                </div>
            </div>
            
        </div>
    );
};
