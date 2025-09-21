'use client';

import { IconSettings } from '@tabler/icons-react';
import React from 'react';

import { FeatureIconContainer } from '../features/feature-icon-container';
import { Container } from '@/components/container';
import { Subheading } from '@/components/elements/subheading';
import { Heading } from '@/components/elements/heading';
import { TIMELINE_ITEMS } from '@/constants/items';
import { TimelineData, data } from '@/constants/timelinedata';
import { Timelinebody } from '@/components/ui/timeline';

export const Timeline = () => {
  return (
    <div>
      <Container className="py-20 max-w-7xl mx-auto  relative z-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconSettings className="h-6 w-6 text-white" />
        </FeatureIconContainer>
        <Heading className="pt-4">{TIMELINE_ITEMS.heading}</Heading>
        <Subheading className="max-w-3xl mx-auto">{TIMELINE_ITEMS.sub_heading}</Subheading>
        <Timelinebody data={data as TimelineData[]} />
      </Container>
    </div>
  );
};
