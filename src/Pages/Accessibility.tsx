import React from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Link,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Chip,
    Divider
} from "@mui/material";
import { fonts } from "../theme/theme.const";

const Accessibility: React.FC = () => {
    const { t } = useTranslation('accessibility');

    return (
        <Box component="main" aria-label={t('title')}>
            <Card sx={{ mb: 4 }} component="article">
                <CardHeader 
                    title={
                        <Typography 
                            component="h1" 
                            variant="h5" 
                            sx={{ fontFamily: fonts.title, fontWeight: 'bold' }}
                        >
                            {t('title')}
                        </Typography>
                    }
                    action={
                        <Chip 
                            label="WCAG 2.1 AA / RGAA" 
                            color="primary" 
                            size="small" 
                            sx={{ fontWeight: 'bold' }} 
                        />
                    }
                />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 2 }} aria-hidden="true">
                        cat accessibility_report.txt
                    </Typography>

                    <Typography component="h2" variant="h6" sx={{ mt: 3, mb: 1, color: 'primary.main' }}>
                        {t('compliance_status.title')}
                    </Typography>
                    <Typography sx={{ mb: 2, lineHeight: 1.7 }}>
                        {t('compliance_status.description')}
                    </Typography>

                    <Divider sx={{ my: 2, borderColor: 'divider' }} />

                    <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 1, color: 'primary.main' }}>
                        {t('measures.title')}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>{t('measures.intro')}</Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 3 }} aria-label={t('measures.title')}>
                        <Box component="li" sx={{ mb: 0.5 }}><Typography>{t('measures.item1')}</Typography></Box>
                        <Box component="li" sx={{ mb: 0.5 }}><Typography>{t('measures.item2')}</Typography></Box>
                        <Box component="li" sx={{ mb: 0.5 }}><Typography>{t('measures.item3')}</Typography></Box>
                        <Box component="li" sx={{ mb: 0.5 }}><Typography>{t('measures.item4')}</Typography></Box>
                        <Box component="li" sx={{ mb: 0.5 }}><Typography>{t('measures.item5')}</Typography></Box>
                    </Box>

                    <Divider sx={{ my: 2, borderColor: 'divider' }} />

                    <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 1, color: 'primary.main' }}>
                        {t('non_accessible.title')}
                    </Typography>
                    <Typography sx={{ mb: 2, lineHeight: 1.7 }}>
                        {t('non_accessible.description')}
                    </Typography>

                    <Divider sx={{ my: 2, borderColor: 'divider' }} />

                    <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 1, color: 'primary.main' }}>
                        {t('feedback.title')}
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        {t('feedback.description')}
                    </Typography>
                    <TableContainer component={Paper} variant="outlined" sx={{ mb: 3, maxWidth: 500 }}>
                        <Table size="small" aria-label={t('feedback.title')}>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '35%' }}>
                                        {t('feedback.email')}
                                    </TableCell>
                                    <TableCell>
                                        <Link 
                                            href="mailto:contact@maelrabot.com" 
                                            color="primary"
                                            underline="hover"
                                            aria-label="Send email to contact@maelrabot.com regarding accessibility feedback"
                                        >
                                            contact@maelrabot.com
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Divider sx={{ my: 2, borderColor: 'divider' }} />

                    <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 1, color: 'primary.main' }}>
                        {t('enforcement.title')}
                    </Typography>
                    <Typography sx={{ mb: 2, lineHeight: 1.7 }}>
                        {t('enforcement.description')}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Accessibility;
