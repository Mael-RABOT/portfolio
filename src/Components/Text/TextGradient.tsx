import React from "react";
import { Typography } from "@mui/material";

interface TypoProps {
    text: string;
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline";
}

const TextGradient: React.FC<TypoProps> = ({ text, variant }) => {
    return (
        <Typography
            variant={variant}
            component="h1"
            gutterBottom
            sx={{
                fontWeight: 'bold',
                mb: 4,
                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
            }}
        >
            {text}
        </Typography>
    );
};

export default TextGradient;
