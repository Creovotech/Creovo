export const footerData = {
  // Optional logo object with image path or component props
  logo: {
    image: '/logo.svg',
  },

  // Short description shown in footer
  description:
    'Creovo helps teams design, build, and ship delightful digital experiences.',

  // Copyright string
  copyright: '© 2025 Creovo. All rights reserved.',

  // Internal links rendered in the first column — relative URLs
  internal_links: [
    { text: 'Home', URL: '/' },
    { text: 'About', URL: '/about' },
    { text: 'Products', URL: '/products' },
  ],

  // Policy links rendered in the second column
  policy_links: [
    { text: 'Privacy Policy', URL: '/privacy' },
    { text: 'Terms of Service', URL: '/terms' },
    { text: 'Cookies', URL: '/cookies' },
  ],

  // Social media links rendered in the third column — absolute URLs allowed
  social_media_links: [
    { text: 'Twitter', URL: 'https://twitter.com/creovo' },
    { text: 'LinkedIn', URL: 'https://linkedin.com/company/creovo' },
    { text: 'GitHub', URL: 'https://github.com/Creovotech' },
  ],
};

export default footerData;
