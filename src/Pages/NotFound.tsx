import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { colors, fonts } from "../theme/theme.const";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            component="main"
            aria-label="404 - Page Not Found"
            sx={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                px: 2,
                py: 6,
            }}
        >
            {/* Green 404 */}
            <Typography
                component="h1"
                sx={{
                    fontFamily: fonts.title,
                    fontWeight: 800,
                    fontSize: { xs: '5rem', sm: '7rem', md: '9rem' },
                    lineHeight: 1,
                    color: colors.highlight.base,
                    letterSpacing: '0.1em',
                    textShadow: `0 0 20px ${colors.highlight.glowHover}`,
                    userSelect: 'none',
                    mb: 1,
                }}
            >
                404
            </Typography>

            {/* Small text */}
            <Typography
                variant="body2"
                sx={{
                    fontFamily: fonts.mono,
                    fontSize: 'var(--font-size-sm)',
                    color: colors.text.secondary,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    mb: 4,
                    maxWidth: '420px',
                }}
            >
                Page Not Found. The requested resource does not exist or has been relocated.
            </Typography>

            {/* Action buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/')}
                    aria-label="Go to home page"
                    sx={{ px: 3, py: 1 }}
                >
                    Go Home
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    aria-label="Go back to previous page"
                    sx={{
                        px: 3,
                        py: 1,
                        borderColor: colors.secondary.border,
                        color: colors.text.primary,
                        '&:hover': {
                            borderColor: colors.highlight.base,
                            color: colors.highlight.base,
                            backgroundColor: 'rgba(0, 255, 65, 0.05)',
                        },
                    }}
                >
                    Go Back
                </Button>
            </Box>
        </Box>
    );
};

export default NotFound;
