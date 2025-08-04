'use client';
import { motion } from 'framer-motion';
import React from "react";

interface SequentialAnimationProps {
    children: React.ReactNode;
    duration?: number;
    delayStep?: number;
}

const SequentialAnimation: React.FC<SequentialAnimationProps> = ({
                                                                     children,
                                                                     duration = 0.6,
                                                                     delayStep = 0.3,
                                                                 }) => {
    const childrenArray = React.Children.toArray(children);

    return (
        <div>
            {childrenArray.map((child, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                        duration,
                        delay: index * delayStep,
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </div>
    );
};

export default SequentialAnimation;
