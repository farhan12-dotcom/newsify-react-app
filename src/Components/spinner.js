import React from 'react'
import loading from './Spinner.gif'

const spinner=()  => {
  return (
    <div className='text-center'>
      <img src={loading} alt="Loading..." style={{ width: "60px", height: "60px" }} />
      
      </div>
    )
  }


export default spinner