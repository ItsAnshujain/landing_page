import { useEffect, useState } from "react";
import React from "react";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        setMovies(data);
      })
      .catch((error) => console.error("Error", error));
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="text-center">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 w-96 border  shadow hover focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredMovies.map((movie) => (
          <div
            key={movie.Title}
            className="border p-4 -lg shadow-md flex flex-col"
          >
            <img
              src={
                movie.Poster && typeof movie.Poster === "string"
                  ? movie.Poster
                  : "https://online.stl.tech/cdn/shop/products/image_9_80239d75-941f-42bc-b028-9c895b8a7e10.png?v=1683889672"
              }
              alt={movie.Title}
              className="w-full h-64 object-cover  mb-2"
            />
            <h2 className="text-lg font-bold flex-grow">{movie.Title}</h2>
            <p className="text-gray-500">{movie.Year}</p>
            <p>{movie.Runtime}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
