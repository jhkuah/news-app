import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Button,
} from "@mui/material";

function FavoritesPanel({ favorites, onClearFavorites }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Favorites
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClearFavorites}
          style={{ marginLeft: "10px" }}
        >
          Clear All Favorites
        </Button>
      </Typography>
      <List>
        {favorites.map((article, index) => (
          <ListItem button key={index}>
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
              <ListItemText primary={article.title} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default FavoritesPanel;
