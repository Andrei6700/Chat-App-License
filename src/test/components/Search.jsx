import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="find a user"/>
      </div>
      <div className="userChat">
        <img src="https://images.pexels.com/photos/9345696/pexels-photo-9345696.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt=""/>
        <div className="userChatInfo">
          <div>Ion</div>
        </div>
      </div>
    </div>
  );
};

export default Search;
