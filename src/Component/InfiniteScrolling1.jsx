// import { useEffect, useState } from "react";

// export function InfiniteScrolling() {
//     const [items, setItems] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasMore, setHasMore] = useState(true);

//     const ITEMS_PER_PAGE = 10;
//     const TOTAL_ITEMS = 100;

//     useEffect(() => {
//         const fetchItems = async () => {
//             try{
//                 const start = (page-1) * ITEMS_PER_PAGE;
//                 const response = await fetch(
//                     `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${ITEMS_PER_PAGE}`
//                 );

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch items.');
//                 }

//                 const newItems = await response.json();
//                 setItems((prevItems)=> {
//                     const updated = [...prevItems, ...newItems];
//                     return updated;
//                 });

//                 if (
//                     newItems.length === 0 || 
//                     newItems.length < ITEMS_PER_PAGE || 
//                     start + newItems.length >= TOTAL_ITEMS
//                 ) {
//                     setHasMore(false);
//                 }
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchItems();
//     }, [page]);


//     useEffect(()=> {
//         const handleScroll = () => {
//             if (loading || !hasMore) return;
//                 // Are we near the bottom? (within 200px)
//                 // ┌─────────────────────┐ ← Top of page (scrollTop = 0)
//                 // │                     │
//                 // │   Content above     │
//                 // │   (not visible)     │
//                 // │                     │
//                 // ├─────────────────────┤ ← Top of viewport (scrollTop = how far scrolled)
//                 // │                     │
//                 // │  VISIBLE WINDOW     │ ← windowHeight (what you see)
//                 // │  (your screen)      │
//                 // │                     │
//                 // ├─────────────────────┤ ← scrollTop + windowHeight = bottom of viewport
//                 // │                     │
//                 // │   Content below     │
//                 // │   (not visible)     │
//                 // │                     │
//                 // └─────────────────────┘ ← documentHeight (total page height)
//                 const nearBottom = scrollTop + windowHeight >= documentheight - 200;

//                 if (nearBottom) {
//                     setPage((prevPage)=> prevPage + 1);
//                 }
//         };

//         window.addEventListener('scroll', handleScroll);

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, [loading, hasMore]);

//     const loadMore = () => {
//         if (!loading && hasMore) {
//             setPage((prev) => prev + 1);
//         }
//     };

//     return (
//         <div>
//             {error && <p>Error: {error}</p>}
//             <div className="post-list">
//                 {items.map((item, index) => (
//                 <div key={item.id} className="post-card">
//                     <div style={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between',
//                     alignItems: 'flex-start',
//                     marginBottom: '8px'
//                     }}>
//                     <span style={{ 
//                         fontSize: '0.85em', 
//                         color: '#888',
//                         fontWeight: 'bold'
//                     }}>
//                         #{index + 1}
//                     </span>
//                     <span style={{ 
//                         fontSize: '0.85em', 
//                         color: '#666',
//                         background: '#f0f0f0',
//                         padding: '2px 8px',
//                         borderRadius: '10px'
//                     }}>
//                         Post ID: {item.id}
//                     </span>
//                     </div>
//                     <h4 style={{ 
//                     marginTop: 0, 
//                     marginBottom: '8px',
//                     color: '#333'
//                     }}>
//                     {item.title}
//                     </h4>
//                     <p style={{ 
//                     color: '#666',
//                     fontSize: '0.95em',
//                     lineHeight: '1.5'
//                     }}>
//                     {item.body}
//                     </p>
//                 </div>
//                 ))}

//                 {loading && (
//                     <p>Loading more posts.....</p>
//                 )}

//                 {!loading && hasMore && (
//                     <>
//                     <button onClick={loadMore}>
//                         Load more posts
//                     </button>
//                     <p>Scroll Down to load more posts </p>
//                     </>
//                 )}

//                 {!hasMore && (
//                     <div>
//                         <h3>No more posts to load</h3>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );


// }


import { useEffect, useState } from "react";

export function InfiniteScrolling() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const ITEMS_PER_PAGE = 10;
    const TOTAL_ITEMS = 100;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const start = (page - 1) * ITEMS_PER_PAGE;
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${ITEMS_PER_PAGE}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch items.');
                }

                const newItems = await response.json();
                setItems((prevItems) => [...prevItems, ...newItems]);

                if (
                    newItems.length === 0 || 
                    newItems.length < ITEMS_PER_PAGE || 
                    start + newItems.length >= TOTAL_ITEMS
                ) {
                    setHasMore(false);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (loading || !hasMore) return;

            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            const nearBottom = scrollTop + windowHeight >= documentHeight - 200;

            if (nearBottom) {
                console.log('Near bottom! Loading more...');
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div>
            <h2>Infinite Scrolling</h2>
            
            {error && <p>Error: {error}</p>}

            <div>
                {items.map((item, index) => (
                    <div key={item.id}>
                        <span>#{index + 1}</span>
                        <span>Post ID: {item.id}</span>
                        <h4>{item.title}</h4>
                        <p>{item.body}</p>
                    </div>
                ))}
            </div>

            {loading && <p>Loading more posts...</p>}

            {!loading && hasMore && (
                <div>
                    <button onClick={loadMore}>Load More</button>
                    <p>Or scroll down</p>
                </div>
            )}

            {!hasMore && (
                <div>
                    <h3>All {TOTAL_ITEMS} posts loaded!</h3>
                </div>
            )}
        </div>
    );
}