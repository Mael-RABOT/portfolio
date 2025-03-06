import React from "react";
import withTranslation from "../hoc/withTranslation";
import AbstractPage from "../Pages/AbstractPage";

const withPage = (titleKey: string | null, descriptionKey: string | null) => {
    return (Component: React.ComponentType) => {
        class Page extends AbstractPage {
            constructor(props: any) {
                super(props);
            }

            renderContent(): React.ReactElement {
                return (
                    <main>
                        {titleKey && <h1>{this.props.t(titleKey)}</h1>}
                        {descriptionKey && <p>{this.props.t(descriptionKey)}</p>}
                        {/* @ts-ignore type mismatch */}
                        <Component {...this.props} />
                    </main>
                );
            }
        }

        return withTranslation(Page);
    };
};

export default withPage;
