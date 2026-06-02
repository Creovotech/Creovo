"use client";
import { IconSparkles } from '@tabler/icons-react';
import { motion } from 'motion/react';
import React from 'react';

import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { GradientContainer } from '@/components/gradient-container';
import { FEATURES_ITEMS } from '@/constants';
import {
  Card,
  CardDescription,
  CardSkeletonContainer,
  CardTitle,
} from './card';
import { FeatureIconContainer } from './feature-icon-container';
import { SkeletonOne } from './skeletons/first';
import { SkeletonFour } from './skeletons/fourth';
import { SkeletonTwo } from './skeletons/second';
import { SkeletonThree } from './skeletons/third';

export const Features = () => {
  const { heading, sub_heading, cards } = FEATURES_ITEMS;
  return (
    <div id='features'>
      <GradientContainer className="md:my-20">
        <Container className="max-w-7xl mx-auto relative z-40 my-8">
          <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.3, 1, 1.3, 1],
                opacity: [1, 0.7, 1, 0.7, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2.5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            >
              <IconSparkles className="h-6 w-6 text-white" />
            </motion.div>
          </FeatureIconContainer>
          <Heading className="pt-4">{heading}</Heading>
          <Subheading className="max-w-3xl mx-auto mb-20">{sub_heading}</Subheading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-2">
            <Card className="lg:col-span-2">
              <CardTitle>{cards.globe.title}</CardTitle>
              <CardDescription>{cards.globe.description}</CardDescription>
              <CardSkeletonContainer>
                <SkeletonOne />
              </CardSkeletonContainer>
            </Card>

            <Card>
              <CardSkeletonContainer showGradient={false} className="max-w-64 mx-auto">
                <SkeletonTwo />
              </CardSkeletonContainer>
              <CardTitle>{cards.ray.title}</CardTitle>
              <CardDescription>{cards.ray.description}</CardDescription>
            </Card>

            <Card>
              <CardSkeletonContainer showGradient={false} className="max-w-64 mx-auto">
                <SkeletonThree />
              </CardSkeletonContainer>
              <CardTitle>{cards.graph.title}</CardTitle>
              <CardDescription>{cards.graph.description}</CardDescription>
            </Card>

            <Card className="lg:col-span-2">
              <CardSkeletonContainer showGradient={false}>
                <SkeletonFour />
              </CardSkeletonContainer>
              <CardTitle>{cards.social.title}</CardTitle>
              <CardDescription>{cards.social.description}</CardDescription>
            </Card>
          </div>
        </Container>
      </GradientContainer>
    </div>
  );
};
