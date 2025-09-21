type Perks = {
  text: string;
};

type CTA = {
  text: string;
};

type Plan = {
  name: string;
  price?: number;
  perks: Perks[];
  additional_perks: Perks[];
  description: string;
  number: string;
  featured?: boolean;
  CTA?: CTA;
};

type PricingData = {
  heading: string;
  sub_heading: string;
  plans: Plan[];
};

export const pricingData: PricingData = {
  heading: 'Flexible Pricing for Teams of All Sizes',
  sub_heading:
    'Choose a plan that’s right for you. All plans include a 14-day free trial of our premium features.',
  plans: [
    {
      name: 'Starter',
      price: 29,
      description: 'Perfect for individuals and small teams just getting started.',
      number: '1',
      perks: [
        { text: '5 Projects' },
        { text: 'Basic Analytics' },
        { text: '24/7 Email Support' },
      ],
      additional_perks: [],
      CTA: { text: 'Get Started' },
    },
    {
      name: 'Pro',
      price: 99,
      featured: true,
      description: 'For growing businesses that need more power and features.',
      number: '2',
      perks: [
        { text: '25 Projects' },
        { text: 'Advanced Analytics' },
        { text: 'Priority Email Support' },
        { text: 'Team Collaboration' },
      ],
      additional_perks: [
        { text: 'API Access' },
        { text: 'Custom Integrations' },
      ],
      CTA: { text: 'Upgrade to Pro' },
    },
    {
      name: 'Team',
      price: 249,
      description: 'Ideal for large teams and organizations with complex needs.',
      number: '3',
      perks: [
        { text: 'Unlimited Projects' },
        { text: 'Full Analytics Suite' },
        { text: 'Dedicated Account Manager' },
        { text: 'Advanced Security' },
      ],
      additional_perks: [
        { text: 'Single Sign-On (SSO)' },
        { text: 'Custom Branding' },
      ],
      CTA: { text: 'Choose Team Plan' },
    },
    {
      name: 'Enterprise',
      description: 'Tailored solutions for large-scale enterprise deployments.',
      number: '4',
      perks: [
        { text: 'Everything in Team Plan' },
        { text: 'On-premise Deployment' },
        { text: 'Service Level Agreement (SLA)' },
      ],
      additional_perks: [
        { text: 'Custom Feature Development' },
        { text: '24/7/365 Premium Support' },
      ],
      CTA: { text: 'Contact Sales' },
    },
  ],
};
