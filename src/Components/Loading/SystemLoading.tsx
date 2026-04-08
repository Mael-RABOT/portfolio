import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, Typography, LinearProgress } from "@mui/material";
import ASCIIArt from "../ASCII/ASCIIArt";
import { useTranslation } from "react-i18next";

interface SystemLoadingProps {
    title?: string;
    loadingText?: string;
    progress?: number;
}

const SystemLoading: React.FC<SystemLoadingProps> = ({ title, loadingText, progress }) => {
    const { t } = useTranslation('home');
    const [loadingProgress, setLoadingProgress] = useState<number>(0);

    useEffect(() => {
        if (progress !== undefined) return;
        
        const progressTimer = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return Math.min(100, prev + Math.random() * 15);
            });
        }, 100);

        return () => {
            clearInterval(progressTimer);
        };
    }, [progress]);

    const displayProgress = progress !== undefined ? progress : loadingProgress;

    return (
        <Card sx={{ mb: 4 }}>
            <CardHeader title={title || t('systemBoot.title')} />
            <CardContent sx={{ textAlign: 'center' }}>
                <ASCIIArt type="loading" size="medium" />
                <Typography variant="body1" className="terminal-prompt" sx={{ mt: 2 }}>
                    {loadingText || t('systemBoot.loading')} [{Math.round(displayProgress)}%]
                </Typography>
                <LinearProgress variant="determinate" value={displayProgress} sx={{ mt: 1 }} />
            </CardContent>
        </Card>
    );
};

export default SystemLoading;