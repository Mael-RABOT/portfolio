import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from "@mui/material";

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('navigation');

    return (
        <section className="section section--tight" aria-labelledby="not-found-title">
            <div className="container" style={{ minHeight: '50vh' }}>
                <span className="eyebrow">404</span>
                <Typography id="not-found-title" variant="h1" sx={{ mt: 2 }}>{t('notFound.title')}</Typography>
                <Typography className="muted" sx={{ mt: 2, maxWidth: '48ch' }}>{t('notFound.text')}</Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 4 }}>
                    <Button variant="contained" onClick={() => navigate('/')}>{t('notFound.home')}</Button>
                    <Button variant="outlined" onClick={() => navigate(-1)}>{t('notFound.back')}</Button>
                </Box>
            </div>
        </section>
    );
};

export default NotFound;
