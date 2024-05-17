import React from 'react';
import "./single.css"

const SingleProComp = ({ data }) => {
  return (
    <div className='single_container'>
      <div className='single_grid'>
          <div className='single_left'>
            <div className='single_left_top'>
                <img src={data.thumbnail} alt={data.title} />
            </div>
            <div className='single_left_bottom'>
               {
                data?.images?.map((data)=>{
                   return(
                    <div>
                        <img src={data} alt="" />
                    </div>
                   )
                })

               }
            </div>
          </div>
          <div className='single_right'>{data.title}</div>
      </div>
    </div>
  );
};

export default SingleProComp;
