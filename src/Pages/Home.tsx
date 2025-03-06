import React from "react";
import withPage from "../hoc/withPage";

const HomeContent: React.FC = () => {
    return (
        <>
            {/* Additional content for Home page */}
            <p>This website is currently under construction.</p>
        </>
    );
};

export default withPage("home.title", null)(HomeContent);
