import React from "react";
import { useTheme } from "../../theme/ThemeContext.tsx";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const StyledButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#002d72' : '#001a33',
  },
}));

const ThemeSwitch: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
      <StyledButton onClick={toggleTheme}>
        {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
      </StyledButton>
  );
};

export default ThemeSwitch;
