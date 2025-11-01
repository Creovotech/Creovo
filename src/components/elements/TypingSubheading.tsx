'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Subheading } from '@/components/elements/subheading';

type Props = {
  text: string;
  className?: string;
  speed?: number; // ms per character
};

export const TypingSubheading = ({ text, className, speed = 50 }: Props) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <Subheading
        className={`text-center mt-2 md:mt-6 text-base md:text-xl text-muted max-w-3xl mx-auto relative z-10 font-normal ${className}`}
      >
        {displayed}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.7, repeat: Infinity }}
          className="inline-block w-[0.6ch] bg-muted-foreground/70 ml-[1px] align-middle"
        />
      </Subheading>
    </motion.div>
  );
};
