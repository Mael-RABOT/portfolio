import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitch: React.FC = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLanguage = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLanguage).then();
    };

    return (
        <Button
            color="inherit"
            onClick={toggleLanguage}
            startIcon={<LanguageIcon />}
        >
            {i18n.language.toUpperCase()}
        </Button>
    );
};

export default LanguageSwitch;
