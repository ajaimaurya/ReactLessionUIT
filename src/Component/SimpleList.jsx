import React, { use, useEffect, useState } from 'react'

export default function SimpleList() {
    const [user,SetUsers]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    const fetchUser=async()=>{ 
        try{
            const response=await fetch('https://jsonplaceholder.typicode.com/users');
            const userData=await response.json();
            SetUsers(userData);
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }   
     };
    
    useEffect(()=>{
        fetchUser();
    },[]);

    if(loading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>Error:{error}</div>
    }
  return (
    <div>
        <h2>Simple List</h2>
        <p>This Component Fetchese all user at once whe it use</p>
        <div>{
            user.map((user)=>(
                <div className='roundedmax-w-sm rounded-xl bg-white p-6 shadow-md 
                transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl' key={user.id} style={{border:'1px solid gray',margin:'10px',padding:'10px'}}>
                    <h2 className="text-3xl font-semibold">Name:{user.name}</h2>  
                    <p className="text-red-500">Email:{user.email}  </p>
                    <p>Phone:{user.company.name}  </p>
</div>
            ))}
        </div>  
        <p>Total User {user.length}</p>
    </div>
  )
}
