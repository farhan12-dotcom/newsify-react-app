import React, { useState, useEffect } from 'react';
import NewsItems from './NewsItems';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Capitalize first letter
  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Fetch news
  const updateNews = async (pageNumber = 1) => {
    props.setProgress(10);
    setLoading(true);

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1abfffa95aa541c3a0d538984381bf66a&page=${pageNumber}&pageSize=${props.pageSize}`;
      const response = await fetch(url);
      props.setProgress(30);
      const parsedData = await response.json();
      props.setProgress(70);

      setArticles(parsedData.articles || []); // Fallback to empty array
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]);
      setTotalResults(0);
      setLoading(false);
      props.setProgress(100);
    }
  };

  // Fetch more for infinite scroll
  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1abfffa95aa541c3a0d538984381bf66a&page=${nextPage}&pageSize=${props.pageSize}`;
      const response = await fetch(url);
      const parsedData = await response.json();

      setArticles((prev) => [...prev, ...(parsedData.articles || [])]);
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  // Load news on category change
  useEffect(() => {
    setPage(1);
    setArticles([]);
    updateNews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category]);

  return (
    <div className='container my-3'>
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        Newsify - Top Headlines ({capitalizeFirstLetter(props.category)})
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles && articles.map((element) => (
              <div className="col-md-4" key={element.url || Math.random()}>
                <NewsItems
                  title={element.title || "No Title"}
                  description={element.description || "No Description"}
                  image={element.urlToImage || "https://via.placeholder.com/400x200?text=No+Image"}
                  newsUrl={element.url || "#"}
                  author={element.author || "Unknown"}
                  date={element.publishedAt || "Unknown"}
                  source={element.source?.name || "Unknown"}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;

