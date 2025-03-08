import React from "react";
import withPage from "../hoc/withPage";

const Projects: React.FC = () => {
    return (
        <>
            {/* Additional content for page */}
            <p>This page is currently under construction</p>
        </>
    );
};

export default withPage("projects.title", null)(Projects);
