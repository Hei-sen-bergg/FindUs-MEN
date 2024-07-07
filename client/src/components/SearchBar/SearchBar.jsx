import "./SearchBar.scss";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const types = ["solo", "team"];

const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "solo",
    location: "", // Empty string by default for location
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Prepare the query string, handling empty city case
    let queryString = `/list?type=${query.type}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`;
    
    if (query.location.trim() !== "") {
      queryString += `&city=${query.location}`;
    }

    // Redirect to the search results page
    window.location.href = queryString;
  };

  return (
    <div className="SearchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="location"
          placeholder="City"
          className="searchbutton"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={1000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={1000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <button type="submit">
          <img src="/search.png" alt="" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
