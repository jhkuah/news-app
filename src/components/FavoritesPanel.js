import React from "react";
import { Typography, List, ListItem, Button } from "@mui/material";

function FavoritesPanel({ favorites, onClearFavorites }) {
  return (
    <div className="container mt-4">
      <Typography variant="h6" className="mb-3">
        Favorites
        <Button
          variant="outline-danger"
          onClick={onClearFavorites}
          className="ms-2"
        >
          Clear All Favorites
        </Button>
      </Typography>
      <List>
        {favorites.map((article, index) => (
          <ListItem key={index} className="list-group-item">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              {article.title}
            </a>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default FavoritesPanel;
