import { Bot, Box, Component, LayoutTemplate, Palette, Plug, Wrench, type LucideIcon } from 'lucide-react';

export type Category = {
  slug: string;
  label: string;
  desc: string;
  tagline: string;
  accent: string; // tailwind gradient classes — the category's theme color
  icon: LucideIcon;
  image?: string; // banner image (self-hosted under /public/marketplace)
};

export type ListingType = 'product' | 'tool';

export type Listing = {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  price: number; // 0 = free
  description: string;
  format: string;
  type: ListingType;
  href: string; // products -> /listing/<slug>, tools -> the tool's own route
  image?: string; // preview image (self-hosted under /public/marketplace)
};

// Banner images live in /public/marketplace/categories/<slug>.jpg — swap the files to rebrand.
export const CATEGORIES: Category[] = [
  { slug: 'templates', label: 'Templates', desc: 'Full site & app starters', tagline: 'Launch-ready site and app starters you can ship today.', accent: 'from-sky-500 to-blue-600', icon: LayoutTemplate, image: '/marketplace/categories/templates.jpg' },
  { slug: 'ui-components', label: 'UI Components', desc: 'Drop-in React components', tagline: 'Accessible, drop-in React components and kits.', accent: 'from-violet-500 to-purple-600', icon: Component, image: '/marketplace/categories/ui-components.jpg' },
  { slug: 'ai-agents', label: 'AI Agents', desc: 'Prebuilt agentic workflows', tagline: 'Prebuilt agentic workflows and scaffolds.', accent: 'from-fuchsia-500 to-pink-600', icon: Bot, image: '/marketplace/categories/ai-agents.jpg' },
  { slug: 'integrations', label: 'Integrations', desc: 'Connectors & plugins', tagline: 'Connect the tools and platforms you already use.', accent: 'from-emerald-500 to-teal-600', icon: Plug, image: '/marketplace/categories/integrations.jpg' },
  { slug: 'design-kits', label: 'Design Kits', desc: 'Figma & brand assets', tagline: 'Icons, fonts, and brand assets for any project.', accent: 'from-amber-500 to-orange-600', icon: Palette, image: '/marketplace/categories/design-kits.jpg' },
  { slug: '3d-models', label: '3D Models', desc: 'Game-ready & AR assets', tagline: 'Game-ready and AR-ready 3D assets.', accent: 'from-cyan-500 to-blue-600', icon: Box, image: '/marketplace/categories/3d-models.jpg' },
  { slug: 'free-tools', label: 'Free Tools', desc: 'Handy utilities, free to use', tagline: 'Handy browser-based utilities — free, no signup.', accent: 'from-rose-500 to-red-600', icon: Wrench, image: '/marketplace/categories/free-tools.jpg' },
];

// Preview images live in /public/marketplace/listings/<slug>.jpg.
export const LISTINGS: Listing[] = [
  {
    id: 'tmpl-business-theme',
    slug: 'responsive-business-html-theme',
    title: 'Responsive Business HTML Theme',
    categorySlug: 'templates',
    price: 30,
    description: 'A polished multi-page marketing theme with dark mode and motion built in.',
    format: 'HTML / Tailwind',
    type: 'product',
    href: '/listing/responsive-business-html-theme',
    image: '/marketplace/listings/responsive-business-html-theme.jpg',
  },
  {
    id: 'ui-dashboard-kit',
    slug: 'dark-ui-dashboard-kit',
    title: 'Dark UI Dashboard Kit',
    categorySlug: 'ui-components',
    price: 0,
    description: '40+ accessible dashboard components — charts, tables, and forms.',
    format: 'React / TSX',
    type: 'product',
    href: '/listing/dark-ui-dashboard-kit',
    image: '/marketplace/listings/dark-ui-dashboard-kit.jpg',
  },
  {
    id: 'agent-support-starter',
    slug: 'support-agent-starter',
    title: 'Customer Support Agent Starter',
    categorySlug: 'ai-agents',
    price: 25,
    description: 'A retrieval-augmented support agent scaffold with tools and guardrails.',
    format: 'TypeScript',
    type: 'product',
    href: '/listing/support-agent-starter',
    image: '/marketplace/listings/support-agent-starter.jpg',
  },
  {
    id: 'plugin-stripe-checkout',
    slug: 'stripe-checkout-plugin',
    title: 'Stripe Checkout Plugin',
    categorySlug: 'integrations',
    price: 10,
    description: 'Drop-in hosted checkout with webhooks and subscription support.',
    format: 'Node / API',
    type: 'product',
    href: '/listing/stripe-checkout-plugin',
    image: '/marketplace/listings/stripe-checkout-plugin.jpg',
  },
  {
    id: 'design-icon-pack',
    slug: 'professional-icon-pack',
    title: 'Professional Icon Pack',
    categorySlug: 'design-kits',
    price: 20,
    description: '100 pixel-perfect SVG icons in outline and solid styles.',
    format: '100 SVG',
    type: 'product',
    href: '/listing/professional-icon-pack',
    image: '/marketplace/listings/professional-icon-pack.jpg',
  },
  {
    id: '3d-stylized-tree',
    slug: 'low-poly-stylized-tree',
    title: 'Low-poly Stylized Tree',
    categorySlug: '3d-models',
    price: 0,
    description: 'Game-ready stylized tree, UV-unwrapped with PBR textures.',
    format: 'OBJ / FBX',
    type: 'product',
    href: '/listing/low-poly-stylized-tree',
    image: '/marketplace/listings/low-poly-stylized-tree.jpg',
  },
  {
    id: 'tool-html-to-pdf',
    slug: 'html-to-pdf',
    title: 'HTML to PDF Converter',
    categorySlug: 'free-tools',
    price: 0,
    description: 'Paste HTML, preview it live, and export a clean PDF — right in your browser.',
    format: 'Web tool',
    type: 'tool',
    href: '/tools/html-to-pdf',
    image: '/marketplace/listings/html-to-pdf.jpg',
  },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const listingBySlug = (slug: string) => LISTINGS.find((l) => l.slug === slug);
export const listingsByCategory = (slug: string) => LISTINGS.filter((l) => l.categorySlug === slug);
