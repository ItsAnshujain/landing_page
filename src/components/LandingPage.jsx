import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";

import React from "react";

const LandingPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSearch = debounce((value) => {
    setSearch(value);
  }, 300);

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero bg-cover bg-center h-screen text-white flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://static.vecteezy.com/system/resources/thumbnails/008/020/629/small_2x/banner-web-template-abstract-blue-and-golden-curved-lines-overlapping-layer-design-on-dark-blue-background-luxury-style-vector.jpg)",
        }}
      >
        <div className="relative text-center bg-opacity-50 p-8 ">
          <h1 className="text-5xl font-bold">Welcome to Our Service</h1>
        </div>
      </section>

      {/* Search Bar  */}
      <div className="p-4 text-center mt-5">
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-96 p-2 border-b-2 shadow focus:outline-none "
        />
      </div>

      {/* Filtered Users */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 mx-10 ">
        {filteredUsers.map((user) => (
          <div key={user.id} className="border-b-2 p-4  shadow-lg">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-500">@{user.username}</p>
            <p className="mt-2">Email : {user.email}</p>
            <p>Phone : {user.phone}</p>
            <p>Company name : {user.company.name}</p>
            <p>Catch Phrase : {user.company.catchPhrase}</p>
            <p>bs : {user.company.bs}</p>
            <p>
              Address : {user.address.city}, {user.address.street},{" "}
              {user.address.suite}
            </p>
            <p> Zipcode: {user.address.zipcode}</p>
            <p>
              {" "}
              Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
            </p>
            Website :{" "}
            <a
              href={`https://${user.website}`}
              target="_blank"
              className="text-blue-500"
            >
              {" "}
              {user.website}
            </a>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <section className="p-4 text-center">
        <p className="text-2xl mb-4 font-bold">Contact Us</p>
        <form className="grid gap-4 border p-10 w-[40rem] mx-auto rounded-md">
          <input
            type="text"
            placeholder="Your Name"
            className="border rounded-md p-2 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border rounded-md p-2 focus:outline-none "
          />
          <textarea
            placeholder="Your Message"
            className="border rounded-md p-2 focus:outline-none "
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default LandingPage;
