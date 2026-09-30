import React from "react";
import { useTheme } from "../../theme/ThemeContext.tsx";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { colors } from "../../theme/theme.const";

/* UNUSED */

const StyledButton = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  backgroundColor: colors.secondary.base,
  color: colors.text.primary,
  '&:hover': {
    backgroundColor: colors.secondary.dark,
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
