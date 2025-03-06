import React from "react";
import withPage from "../hoc/withPage";

const BlankPage: React.FC = () => {
    return (
        <>
            {/* Additional content for page */}
        </>
    );
};

export default withPage("page.title", "page.description")(BlankPage);
