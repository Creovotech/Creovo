import { Link } from 'next-view-transitions';
import React from 'react';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';
import { FOOTER_ITEMS } from '@/constants';

interface FooterLink {
  text: string;
  URL: string;
}

export const Footer = () => {
  const data = {
    description: FOOTER_ITEMS.description,
    copyright: FOOTER_ITEMS.copyright,
    internal_links: FOOTER_ITEMS.internal_links,
    policy_links: FOOTER_ITEMS.policy_links,
    social_media_links: FOOTER_ITEMS.social_media_links,
  };

  return (
    <footer className="bg-primary text-neutral-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 border-b border-neutral-800 pb-10">
          <div className="max-w-sm">
            <div className="text-2xl font-bold text-white mb-2">
              <TextHoverEffect text="Creovo" />
            </div>

            <p className="leading-relaxed">{data.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <LinkSection title="Quick Links" links={data.internal_links} />
            <LinkSection title="Legal" links={data.policy_links} />
            <LinkSection title="Socials" links={data.social_media_links} />
          </div>
        </div>


        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-sm text-neutral-500">
          <p>{data.copyright}</p>
          <div className="text-center sm:text-right">
            <div>
              Designed by{' '}
              <div className='flex justify-end'>
                <Link href="https://aceternity.com" className="hover:text-white underline transition-colors">Aceternity</Link>
                {' & '}
                <Link href="https://creovo.dev" className="hover:text-white underline transition-colors">Creovo Team</Link>
              </div>
            </div>
            <p className="text-xs mt-1">
              Built with Next.js, Tailwind CSS, and more.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Updated LinkSection to include a title for better organization
const LinkSection = ({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) => (
  <div>
    <h3 className="font-semibold text-white mb-4">{title}</h3>
    <div className="flex flex-col space-y-3">
      {links.map((link) => (
        <Link
          key={link.text}
          href={link.URL}
          className="transition-colors hover:text-white hover:underline"
        >
          {link.text}
        </Link>
      ))}
    </div>
  </div>
);