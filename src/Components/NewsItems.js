import React, { Component } from 'react'

let NewsItems = (props) => {
  let {title, description,  newsUrl, image, author, date, source} = props;
  return (

      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
          <img src={!image?"https://images.pexels.com/photos/35190753/pexels-photo-35190753.jpeg":image} className="card-img-top" alt="..."/>
            <div className="card-body" >
              <h5 className="card-title" >{title}<span className="badge text-bg-success" style={{position: "absolute", top: "10px", right: "10px"}}>{source}</span></h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {date}</small></p>
              <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }


export default NewsItems
