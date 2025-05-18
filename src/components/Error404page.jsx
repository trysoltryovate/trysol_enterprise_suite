import React from 'react'
import { useEffect } from 'react'
import trysolicon from '../assets/logo.png'
import Err404 from '../assets/404-error.png'
import { useNavigate } from 'react-router-dom'


function Error404page() {

    const navigate = useNavigate();

    // Changes Title of a webpage //

    useEffect(() => {
        document.title = "404 Not found | TES"
    }, [])
    


  return (
    <div>
        <div className="error-main-container m-5">
            {/* image - Trysol_icon */}
            <div className="image-container w-[150px] h-[100px] flex items-center justify-center">
                <div className="imagelogo w-25 h-[65px]">
                    <img src={trysolicon} alt="Trysol_logo" className='w-full h-full object-contain'/>
                </div>
            </div>

            {/* Image 404 */}

            <div className="404img w-max-100% flex items-center justify-center m-7">
            <div className="errorimg-404">
                <img src={Err404} alt="404 Not found" className='w-full h-full object-fill'/>

            </div>
            </div>


            {/* Error message */}

            <div className="err-msg w-max-100% flex items-center justify-center">
                <p className='font-sans font-semibold text-[30px]'>Sorry! Page Not Found!</p>
            </div> 



            {/* content */}
            <div className="content w-max-100% flex items-center justify-center m-2">
                {/* <div className="text-sry font-sans text-[30px] sm:text-[35] md:text-[40px]">
                    Oops!
                </div> */}
                <div className="context flex items-center">
                <span className='text-[25px] sm:text-[30px] md:text-[30px] flex'>Oops!</span>
                 <p className='text-gray-500'>The page which you are looking for does not exist.</p>
                </div>
            </div>


                 <div className=' w-max-100% flex items-center justify-center'>
                    <p className='text-gray-500'>Please return to the homepage.</p>
                 </div>


                    {/* Go to Home button */}
                 <div className='flex items-center justify-center ww-max-100% m-5 p-2'>
                 <button type='button' className="btn bg-blue-800 text-white h-[55px] w-[150px] rounded-[5px] hover:bg-blue-900 border-0.5" onClick={() => {navigate('/home')}}>
                    Go to Home
                 </button>
                 </div>
        </div>
    </div>
  )
}

export default Error404page