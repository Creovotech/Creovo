'use client';

import { IconCheck, IconPlus, IconReceipt2 } from '@tabler/icons-react';
import React from 'react';

import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import { Button } from '@/components/elements/button';
import { Subheading } from '@/components/elements/subheading';
import { Heading } from '@/components/elements/heading';

type Perks = {
  [key: string]: string;
};

type CTA = {
  [key: string]: string;
};

type Plan = {
  name: string;
  price: number;
  perks: Perks[];
  additional_perks: Perks[];
  description: string;
  number: string;
  featured?: boolean;
  CTA?: CTA | undefined;
};

// --- MAIN PRICING COMPONENT (Unchanged) ---
export const Pricing = ({
  heading,
  sub_heading,
  plans,
}: {
  heading: string;
  sub_heading: string;
  plans: any[];
}) => {
  const onClick = (plan: Plan) => {
    console.log('click', plan);
  };
  return (
    <div id='pricing' className="py-20 md:py-40">
      <Container>
        <div className="flex justify-center items-center">
          <div className="p-2 bg-neutral-900 rounded-full border border-neutral-800">
            <IconReceipt2 className="h-6 w-6 text-white" />
          </div>
        </div>
        <Heading className="pt-4">{heading}</Heading>
        <Subheading className="max-w-3xl mx-auto">{sub_heading}</Subheading>
        {/*
          Removed `lg:items-start` to allow grid items to stretch,
          making them all equal to the height of the tallest item.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-8 py-20">
          {plans.map((plan) => (
            <Card onClick={() => onClick(plan)} key={plan.name} plan={plan} />
          ))}
        </div>
      </Container>
    </div>
  );
};

// --- REFACTORED CARD COMPONENT ---
const Card = ({ plan, onClick }: { plan: Plan; onClick: () => void }) => {
  return (
    <div
      className={cn(
        // Added flex, h-full, and hover transition
        'flex h-full flex-col rounded-3xl bg-neutral-900 p-4 border-2 border-neutral-800 transition-all duration-300 ease-in-out hover:border-neutral-700 hover:-translate-y-2',
        plan.featured && 'border-neutral-50 bg-neutral-100'
      )}
    >
      {/* Top Section: Price and CTA. This part has a fixed height. */}
      <div
        className={cn(
          'flex-shrink-0 rounded-2xl bg-neutral-800 p-4 shadow-[0px_-1px_0px_0px_var(--neutral-700)]',
          plan.featured && 'bg-white shadow-aceternity'
        )}
      >
        <div className="flex items-center justify-between">
          <p className={cn('font-medium', plan.featured && 'text-black')}>
            {plan.name}
          </p>
          {plan.featured && (
            <div className="relative rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium">
              <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
              Featured
            </div>
          )}
        </div>
        <div className="mt-8">
          {plan.price && (
            <span
              className={cn(
                'text-lg font-bold text-neutral-500',
                plan.featured && 'text-neutral-700'
              )}
            >
              $
            </span>
          )}
          <span
            className={cn('text-4xl font-bold', plan.featured && 'text-black')}
          >
            {plan.price ?? plan?.CTA?.text}
          </span>
          {plan.price && (
            <span
              className={cn(
                'ml-2 text-lg font-normal text-neutral-500',
                plan.featured && 'text-neutral-700'
              )}
            >
              / launch
            </span>
          )}
        </div>
        <Button
          variant="outline"
          className={cn(
            'mb-4 mt-10 w-full',
            plan.featured &&
              'bg-black text-white hover:bg-black/80 hover:text-white'
          )}
          onClick={onClick}
        >
          {plan?.CTA?.text}
        </Button>
      </div>

      {/* Bottom Section: Perks. This part will grow and scroll. */}
      {/* Added flex-1, overflow-y-auto, and custom-scrollbar */}
      <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
        <div className="p-4">
          {plan.perks.map((feature, idx) => (
            <Step featured={plan.featured} key={idx}>
              {feature.text}
            </Step>
          ))}
        </div>
        {plan.additional_perks && plan.additional_perks.length > 0 && (
          <Divider featured={plan.featured} />
        )}
        <div className="p-4">
          {plan.additional_perks?.map((feature, idx) => (
            <Step featured={plan.featured} additional key={idx}>
              {feature.text}
            </Step>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- REFACTORED STEP COMPONENT ---
const Step = ({
  children,
  additional,
  featured,
}: {
  children: React.ReactNode;
  additional?: boolean;
  featured?: boolean;
}) => {
  return (
    <div className="my-4 flex items-start justify-start gap-3">
      <div
        className={cn(
          'mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full',
          additional ? 'bg-indigo-600' : 'bg-neutral-700'
        )}
      >
        <IconCheck className="h-3 w-3 text-neutral-300 [stroke-width:4px]" />
      </div>
      <p
        className={cn(
          'text-sm font-medium text-white',
          featured && 'text-black'
        )}
      >
        {children}
      </p>
    </div>
  );
};

// --- DIVIDER COMPONENT (Unchanged) ---
const Divider = ({ featured }: { featured?: boolean }) => {
  return (
    <div className="relative">
      <div className={cn('h-px w-full', featured ? 'bg-white' : 'bg-neutral-950')} />
      <div className={cn('h-px w-full', featured ? 'bg-neutral-200' : 'bg-neutral-800')} />
      <div
        className={cn(
          'absolute inset-0 m-auto flex h-5 w-5 items-center justify-center rounded-xl bg-neutral-800 shadow-[0px_-1px_0px_0px_var(--neutral-700)]',
          featured && 'bg-white shadow-aceternity'
        )}
      >
        <IconPlus
          className={cn(
            'h-3 w-3 text-neutral-300 [stroke-width:4px]',
            featured && 'text-black'
          )}
        />
      </div>
    </div>
  );
};