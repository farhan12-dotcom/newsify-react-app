import React from 'react';

const NewsItems = ({ title, description, image, newsUrl, author, date, source }) => {
  return (
    <div className="my-3">
      <div className="card">
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author} | {new Date(date).toGMTString()} | Source: {source}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer" // fix security warning
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItems;