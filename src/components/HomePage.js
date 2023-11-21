import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Results from "../components/Results";
import FavoritesPanel from "../components/FavoritesPanel";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [loggedInUser, setLoggedInUser] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedInUser(user.username);
    }

    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setNewsData([]);
      return;
    }

    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: searchTerm,
        apiKey: "27e23122d50b455188c19063eeb3a49a",
        page: 1,
        pageSize: 8,
      },
    });

    setNewsData(response.data.articles);
  };

  const handleToggleFavorite = (article) => {
    const articleIndex = favorites.findIndex(
      (fav) => fav.title === article.title
    );

    if (articleIndex !== -1) {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(articleIndex, 1);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, article]);
    }
  };

  const handleLoadMore = async () => {
    if (searchTerm.trim() === "") {
      return;
    }

    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: searchTerm,
        apiKey: "27e23122d50b455188c19063eeb3a49a",
        page: page + 1,
        pageSize: 8,
      },
    });

    setNewsData((prevNewsData) => [...prevNewsData, ...response.data.articles]);
    setPage((prevPage) => prevPage + 1);
  };

  function handleOpenUrl(url) {
    window.open(url, "_blank");
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/news-app");
  };
  const handleClearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");

    const updatedNewsData = newsData.map((article) => ({
      ...article,
      isFavorite: false,
    }));
    setNewsData(updatedNewsData);
  };

  return (
    <div>
      <Header username={loggedInUser} onLogout={handleLogout} />
      <Container maxWidth="lg" style={{ marginTop: "16px" }}>
        <TextField
          label="Search News"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          style={{ marginTop: "8px" }}
        >
          Search
        </Button>

        <Grid container spacing={2} style={{ marginTop: "16px" }}>
          <Grid item xs={12} md={4}>
            <FavoritesPanel
              favorites={favorites}
              onClearFavorites={handleClearFavorites}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Results
              newsData={newsData}
              onToggleFavorite={handleToggleFavorite}
              onOpenUrl={handleOpenUrl}
            />
            {newsData.length > 0 && newsData.length % 8 === 0 && (
              <Button
                variant="outlined"
                onClick={handleLoadMore}
                style={{ marginTop: "8px" }}
              >
                Load More
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
