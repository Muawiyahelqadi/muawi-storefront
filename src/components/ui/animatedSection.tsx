"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  MotionNodeAnimationOptions,
  MotionNodeViewportOptions,
} from "motion-dom";

interface Props extends MotionNodeAnimationOptions, MotionNodeViewportOptions {
  children?: ReactNode;
  className?: string;
}

export default function AnimatedSection({ children, ...props }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
