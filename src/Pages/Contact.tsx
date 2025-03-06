import React from "react";
import withPage from "../hoc/withPage";

const ContactContent: React.FC = () => {
    return (
        <>
            {/* Additional content for Contact page */}
        </>
    );
};

export default withPage("contact.title", null)(ContactContent);
