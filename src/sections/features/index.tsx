import { IconRocket } from '@tabler/icons-react';
import React from 'react';

import { Container } from '@/components/container';
import { Heading } from '../../components/elements/heading';
import { Subheading } from '../../components/elements/subheading';
import { GradientContainer } from '@/components/gradient-container';
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

export const Features = ({
  heading,
  sub_heading,
  globe_card,
  ray_card,
  graph_card,
  social_media_card,
}: {
  heading: string;
  sub_heading: string;
  globe_card: any;
  ray_card: any;
  graph_card: any;
  social_media_card: any;
}) => {
  return (
    <div id='features'>
    <GradientContainer className="md:my-20">
      <Container className="max-w-7xl mx-auto  relative z-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconRocket className="h-6 w-6 text-white" />
        </FeatureIconContainer>
        <Heading className="pt-4">{heading}</Heading>
        <Subheading className="max-w-3xl mx-auto">{sub_heading}</Subheading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {globe_card && (
            <Card className="lg:col-span-2">
              <CardTitle>{globe_card.title}</CardTitle>
              <CardDescription>{globe_card.description}</CardDescription>
              <CardSkeletonContainer>
                <SkeletonOne />
              </CardSkeletonContainer>
            </Card>
          )}

          {ray_card && (
            <Card> {/* col-span-1 is the default */}
              <CardSkeletonContainer showGradient={false} className="max-w-[16rem] mx-auto">
                <SkeletonTwo />
              </CardSkeletonContainer>
              <CardTitle>{ray_card.title}</CardTitle>
              <CardDescription>{ray_card.description}</CardDescription>
            </Card>
          )}

          {graph_card && (
            <Card> 
              <CardSkeletonContainer
                showGradient={false}
                className="max-w-[16rem] mx-auto"
              >
                <SkeletonThree />
              </CardSkeletonContainer>
              <CardTitle>{graph_card.title}</CardTitle>
              <CardDescription>{graph_card.description}</CardDescription>
            </Card>
          )}

          {/* Social media card spans 2 columns */}
          {social_media_card && (
            <Card className="lg:col-span-2">
              <CardSkeletonContainer showGradient={false}>
                <SkeletonFour />
              </CardSkeletonContainer>
              <CardTitle>{social_media_card.title}</CardTitle>
              <CardDescription>
                {social_media_card.description}
              </CardDescription>
            </Card>
          )}
        </div>
      </Container>
    </GradientContainer>
    </div>
  );
};