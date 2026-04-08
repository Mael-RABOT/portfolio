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
    Paper
} from "@mui/material";

const Accessibility: React.FC = () => {
    const { t } = useTranslation('accessibility');

    return (
        <Box component="main" aria-label={t('title')}>
            <Card sx={{ mb: 4 }} component="section" aria-label={t('title')}>
                <CardHeader title={t('title')} />
                <CardContent>
                    <Typography className="terminal-prompt" sx={{ mb: 2 }} aria-hidden="true">&gt; cat accessibility_report.txt</Typography>
                    
                    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>{t('compliance_status.title')}</Typography>
                    <Typography sx={{ mb: 2 }}>
                        {t('compliance_status.description')}
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>{t('measures.title')}</Typography>
                    <Typography sx={{ mb: 1 }}>{t('measures.intro')}</Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 3 }} aria-label={t('measures.title')}>
                        <Box component="li"><Typography>{t('measures.item1')}</Typography></Box>
                        <Box component="li"><Typography>{t('measures.item2')}</Typography></Box>
                        <Box component="li"><Typography>{t('measures.item3')}</Typography></Box>
                        <Box component="li"><Typography>{t('measures.item4')}</Typography></Box>
                        <Box component="li"><Typography>{t('measures.item5')}</Typography></Box>
                    </Box>

                    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>{t('non_accessible.title')}</Typography>
                    <Typography sx={{ mb: 2 }}>
                        {t('non_accessible.description')}
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>{t('feedback.title')}</Typography>
                    <Typography sx={{ mb: 1 }}>
                        {t('feedback.description')}
                    </Typography>
                    <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                        <Table size="small" aria-label={t('feedback.title')}>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row"><strong>{t('feedback.email')}</strong></TableCell>
                                    <TableCell><Link href="mailto:contact@maelrabot.com" color="primary">contact@maelrabot.com</Link></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>{t('enforcement.title')}</Typography>
                    <Typography sx={{ mb: 2 }}>
                        {t('enforcement.description')}
                    </Typography>

                </CardContent>
            </Card>
        </Box>
    );
};

export default Accessibility;
