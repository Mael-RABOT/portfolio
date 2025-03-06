import React from "react";
import Motion from "../Components/Wrappers/Motion";

interface AbstractPageProps {
    t: (key: string) => string;
}

abstract class AbstractPage extends React.Component<AbstractPageProps> {
    protected constructor(props: AbstractPageProps) {
        super(props);
    }

    abstract renderContent(): React.ReactElement;

    render(): React.ReactElement {
        return (
            <Motion>
                {this.renderContent()}
            </Motion>
        );
    }
}

export default AbstractPage;
