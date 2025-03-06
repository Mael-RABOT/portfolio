import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface MotionProps {
    children: ReactNode;
    duration?: number;
    style?: React.CSSProperties;
    className?: string;
}

const defaultDuration = 0.5;
const defaultStyle = { paddingLeft: '2.5rem', paddingRight: '2.5rem' };

const Motion: React.FC<MotionProps> = ({ children, duration, style = {} , className }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration || defaultDuration }}
            style={{ ...defaultStyle, ...style }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default Motion;
