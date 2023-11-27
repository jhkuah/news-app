import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const newsItemStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const thumbnailStyle = {
  maxWidth: "100%",
  height: "150px",
  objectFit: "cover",
  marginTop: "8px",
};

function NewsItem({ article, onOpenUrl, onToggleFavorite }) {
  const { title, description, source, publishedAt, urlToImage, url } = article;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    onToggleFavorite(article);
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="m-2" elevation={3} style={newsItemStyle}>
      <CardContent style={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {source.name} - {new Date(publishedAt).toLocaleDateString()}
        </Typography>
        <img
          src={
            urlToImage ||
            "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
          }
          alt="Thumbnail"
          style={thumbnailStyle}
        />
        <Typography variant="body2" style={{ marginTop: "8px" }}>
          {description}
        </Typography>
      </CardContent>
      <div className="d-flex justify-content-between align-items-center p-2">
        <IconButton onClick={handleToggleFavorite} color="primary">
          <FavoriteIcon />
        </IconButton>
        <Link href={url} target="_blank" rel="noopener noreferrer">
          Read More
        </Link>
      </div>
    </Card>
  );
}

export default NewsItem;
