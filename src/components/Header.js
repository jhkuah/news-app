import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Header({ username, onLogout }) {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/home"
          color="inherit"
          underline="none"
        >
          News App
        </Typography>
        {username && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Chip
              label={`Welcome, ${username}`}
              color="primary"
              style={{ marginRight: "10px" }}
            />
            <IconButton color="inherit" onClick={onLogout}>
              <ExitToAppIcon />
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
