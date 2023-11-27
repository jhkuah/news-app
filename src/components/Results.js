import React from "react";
import { Grid } from "@mui/material";
import NewsItem from "./NewsItem";

function Results({ newsData, favorites, onToggleFavorite, onOpenUrl }) {
  return (
    <Grid container spacing={2} className="m-2">
      {newsData.map((article, index) => (
        <Grid item xs={12} md={6} lg={3} key={index} className="mb-2">
          <NewsItem
            article={article}
            isFavorite={article.isFavorite}
            onToggleFavorite={onToggleFavorite}
            onOpenUrl={onOpenUrl}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Results;
