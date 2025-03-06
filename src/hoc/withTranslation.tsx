import React from "react";
import { useTranslation, WithTranslation } from "react-i18next";

function withTranslation<T extends WithTranslation>(Component: React.ComponentType<T>) {
    return function TranslatedComponent(props: Omit<T, keyof WithTranslation>) {
        const { t } = useTranslation();
        return <Component {...(props as T)} t={t} />;
    };
}

export default withTranslation;
