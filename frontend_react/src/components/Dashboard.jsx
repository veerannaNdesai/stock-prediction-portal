
import { useEffect } from 'react'
import axiosInstance from '../axiosInstance'

const Dashboard = () => {

    const accessToken = localStorage.getItem('accessToken')
    useEffect(()=>{

        const fetchProtectedData = async () =>{
            try{
                const response = await axiosInstance.get('/protected-view'
                // headers : {
                //     Authorization : `Bearer ${accessToken}`
                // }
            )
           
            }catch(error){
                 console.log("Error :",error)
            }
        }
        fetchProtectedData();

    },[])

  return (
    <>
        <h1 className='text-light text-center'>Dashboard.</h1>
    </>
  )
}

export default Dashboard