import React from "react";
import { useGlobalContext } from "./context";

const Search = () => {
  const { query, searchPost, searchByMonth } = useGlobalContext();

  return (
    <>
      <div className="search-field">
        <form>
          <div>
            <input
              type="text"
              placeholder="Search here.."
              value={query}
              onChange={(e) => searchPost(e.target.value)}
            />
          </div>
          <div>
            <select onChange={e => searchByMonth(e.target.value)} defaultValue={"march"}>
              <option value="january">JANUARY</option>
              <option value="february">FEBRUARY</option>
              <option value="march">MARCH</option>
              <option value="april">APRIL</option>
              <option value="may">MAY</option>
              <option value="june">JUNE</option>
              <option value="july">JULY</option>
              <option value="august">AUGUST</option>
              <option value="september">SEPTEMBER</option>
              <option value="october">OCTOBER</option>
              <option value="november">NOVEMBER</option>
              <option value="december">DECEMBER</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
