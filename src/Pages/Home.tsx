import React from "react";
import withPage from "../hoc/withPage";

const HomeContent: React.FC = () => {
    return (
        <>
            {/* Additional content for Home page */}
        </>
    );
};

export default withPage("home.title", null)(HomeContent);
