import React, { useState } from "react";

function SimpleSearchBar() {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log("Search:", e.target.value); // This can be used to filter items or perform the search
  };

  return (
    <div className="container-fluid mt-4">
      {/* Full-width container */}
      <div className="row justify-content-left">
        {/* Center the search bar in the row */}
        <div className="col-12 ">
          {/* Column takes full width on small screens, half width on medium and above */}
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={query}
              onChange={handleChange}
            />
            <button className="btn btn-primary btn-sm" type="button">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleSearchBar;
