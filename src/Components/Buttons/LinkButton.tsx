import React from "react";
import { Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

interface LinkButtonProps {
    to?: string;
    previous?: boolean;
    children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({ to, previous, children }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (previous) {
            navigate(-1);
        }
    };

    return (
        <Button
            component={previous ? "button" : RouterLink}
            to={previous ? undefined : to}
            onClick={previous ? handleClick : undefined}
            variant="contained"
            color="primary"
        >
            {children}
        </Button>
    );
};

export default LinkButton;
