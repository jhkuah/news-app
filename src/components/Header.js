import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Header({ username, onLogout }) {
  return (
    <AppBar position="static" className="bg-dark">
      <Toolbar className="justify-content-between">
        <Typography
          variant="h6"
          component={RouterLink}
          to="/home"
          color="inherit"
          underline="none"
          className="text-light"
        >
          News App
        </Typography>
        {username && (
          <div className="d-flex align-items-center">
            <Chip
              label={`Welcome, ${username}`}
              color="primary"
              className="me-2"
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
