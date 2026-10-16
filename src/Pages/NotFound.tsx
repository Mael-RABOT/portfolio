import React from "react";
import { useTransitionNavigate } from "../Components/Motion/viewTransition";
import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from "@mui/material";
import { GlitchText } from "../Components/Motion/GlitchText";
import { DecodeText } from "../Components/Motion/DecodeText";
import AngleFrame from "../Components/Decor/AngleFrame";

const NotFound: React.FC = () => {
    const navigate = useTransitionNavigate();
    const { t } = useTranslation('navigation');

    return (
        <section className="section section--tight" aria-labelledby="not-found-title">
            <div className="container" style={{ minHeight: '50vh' }}>
                <div className="angle-host">
                    <AngleFrame trigger="load" delay={0.4} />
                    <span className="eyebrow"><DecodeText text="404" trigger="load" /></span>
                    <Typography id="not-found-title" variant="h1" sx={{ mt: 2 }}>
                        <GlitchText text={t('notFound.title')} onLoad delay={0.2} />
                    </Typography>
                    <Typography className="muted" sx={{ mt: 2, maxWidth: '48ch' }}>{t('notFound.text')}</Typography>
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 4 }}>
                        <Button variant="contained" onClick={() => navigate('/')}>{t('notFound.home')}</Button>
                        <Button variant="outlined" onClick={() => navigate(-1)}>{t('notFound.back')}</Button>
                    </Box>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
