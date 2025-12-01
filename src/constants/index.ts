import { url } from "inspector";

export const LEFT_NAVBAR_ITEMS = [
  {
    link: "/about",
    name: "About",
  },
  {
    link: "/contact",
    name: "Contact",
  },
];

export const RIGHT_NAVBAR_ITEMS = [
  {
    link: "/login",
    name: "Login",
  },
  {
    link: "/signup",
    name: "Sign Up",
  },
];

export const HERO_ITEMS = {
  heading: "Creovo",
  sub_heading:
    "Masterfully Crafting Intelligent Web and Mobile solutions with Agentic Experiences",
};

export const TIMELINE_ITEMS = {
  heading: "Our working timeline",
  sub_heading:
    "We&apos;ve been working on Website development field for the past 4 years. Here&apos;sa timeline of our workflow.",
};

export const TECHSTACK_ITEMS = {
  heading:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  sub_heading:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
};

export const TIMELINE_DATA = {
  heading: "From Blueprint to Reality",
  sub_heading: "A transparent, structured roadmap designed to take your vision from a rough sketch to a fully deployed ecosystem.",
  launches: [
    {
      title: "Understanding the Core Logic",
      description:
        "It starts with a deep-dive consultation. We don't just ask what features you want; we analyze the business problem you are solving. Whether it&apso;s a web platform or an autonomous agent, we define the technical feasibility, scope, and success metrics before writing a single line of code",
      mission_number: "Discovery & Strategy",
    },
    {
      title: "Designing the Skeleton",
      description:
        "Before development begins, our senior engineers map out the system architecture. We select the right tech stack, design the database schema, and plan the AI workflows. This ensures that your solution is scalable, secure, and built on a solid foundation, eliminating technical debt down the road",
      mission_number: "Architecture & Blueprinting",
    },
    {
      title: "The Build Phase",
      description:
        "We work in transparent, iterative sprints. You get regular updates and access to a staging environment to see your product come to life in real-time. We focus on writing clean, modular, and documented code that adheres to industry standards",
      mission_number: "Agile Development",
    },
    {
      title: "Stress-Testing the System",
      description:
        "We rigorously test every component. For websites and apps, we check responsiveness and load times. For Agentic solutions, we test for hallucinations, edge cases, and logical consistency. We ensure the system is bug-free and optimized for high traffic",
      mission_number: "QA & Performance Tuning",
    },
    {
      title: "Your Code, Your Asset",
      description:
        "We handle the deployment to your cloud infrastructure (AWS, Azure, Vercel). Once live, we provide a full handover: this includes the complete source code, technical documentation, and ownership transfer. We leave you with a robust product that you fully own",
      mission_number: "Deployment & Handover",
    }
  ],
};

export const CTA_ITEMS = {
  heading: "Ready to Get Started?",
  sub_heading:
    "Join us today and take the first step towards a brighter future.",
  CTAs: [
    {
      url: "https://calendly.com/creovotech/30min",
      text: "Contact Us",
      variant: "primary",
    },
    {
      text: "Estimate Cost",
      variant: "muted",
      url: "/",
    },
  ],
};

export const TESTIMONIALS_ITEMS = {
  heading: "What Our Clients Say",
  sub_heading: "Hear from those who have experienced our service first-hand.",
  testimonials: [
    {
      quote:
        "They didn't just build a website; they captured the soul of our brand.",
      user: {
        firstname: "Alisha",
        lastname: "Reyes",
        image: {
          url: "/profiles/alisha.png",
        },
        job: "Founder, TerraHaul Organics",
      },
      title: "Founder, TerraHaul Organics",
      description: 'Working with them was a transformative experience. They didnt just build a website; they captured the soul of our brand. Their team felt like a true extension of ours.'
    },
    {
      quote:
        "They revolutionized our workflow, turning a complex manual process into a streamlined, automated system.",
      user: {
        firstname: "Kenji",
        lastname: "Tanaka",
        image: {
          url: "/profiles/kenji.png",
        },
        job: "Operations Director, FastLogistics Co",
      },
      title: "Operations Director, FastLogistics Co",
      description: 'They have revolutionized our workflow. What was once a complex, manual process is now a streamlined, automated system .Their commitment to understanding our unique operational challenges were evident from day one.'
    },
    {
      quote:
        "True innovators who delivered an AI solution that went beyond our expectations.",
      user: {
        firstname: "Dr Evelyn",
        lastname: "Reed",
        image: {
          url: "/profiles/evelyn.png",
        },
        job: "Head of Growth, Nexus pharma Inc",
      },
      title: "Head of Growth, Nexus pharma Inc",
      description: 'We needed a partner who could keep pace with our vision, and they delivered beyond our expectations. The custom AI support agent they built has dramatically reduced our customer response times and improved user satisfaction.'
    },
  ],
};

export const FOOTER_ITEMS = {
  logo: {
    image: '/logo.svg',
  },

  description:
    'Creovo helps teams design, build, and ship delightful digital experiences.',

  copyright: '© 2025 Creovo. All rights reserved.',

  internal_links: [
    { text: 'Home', URL: '/' },
    { text: 'About', URL: '/about' },
  ],

  policy_links: [
    { text: 'Privacy Policy', URL: '/privacy' },
    { text: 'Terms of Service', URL: '/terms' },
  ],

  social_media_links: [
    { text: 'Twitter', URL: 'https://twitter.com/creovo' },
    { text: 'LinkedIn', URL: 'https://linkedin.com/company/creovo' },
  ],
};

export const TERMS_ITEMS = [
    {
        title: "1. Introduction",
        content: "Welcome to Creovo. These Terms of Service (\"Terms\") govern your use of our website and the services we offer. By accessing our website or using our services, you agree to be bound by these Terms."
    },
    {
        title: "2. Services",
        content: "Creovo provides software development services, including but not limited to web development, mobile application development, and AI solutions. All services are subject to a separate agreement that will be provided before the commencement of any work."
    },
    {
        title: "3. User Conduct",
        content: "You agree not to use our website or services for any unlawful purpose or in any way that could harm our business or reputation. This includes, but is not limited to, transmitting any material that is defamatory, obscene, or otherwise objectionable."
    },
    {
        title: "4. Limitation of Liability",
        content: "In no event shall Creovo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service."
    },
    {
        title: "5. Governing Law",
        content: "These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is registered, without regard to its conflict of law provisions."
    }
];


export const PRIVACY_ITEMS = [
    {
        title: "1. Information We Collect",
        content: "We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, and payment information. We also automatically collect usage data when you access our services."
    },
    {
        title: "2. How We Use Your Information",
        content: "We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you technical notices and support messages, and to communicate with you about products, services, offers, and events."
    },
    {
        title: "3. Data Sharing and Disclosure",
        content: "We do not share your personal information with third parties except as described in this policy. We may share your information with third-party vendors who need access to such information to perform services on our behalf, or to comply with legal obligations."
    },
    {
        title: "4. Data Security",
        content: "We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no internet transmission or electronic storage is ever completely secure."
    },
    {
        title: "5. Cookies and Tracking",
        content: "We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
    },
    {
        title: "6. Your Rights",
        content: "Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete the data we hold about you. Contact us to exercise these rights."
    }
];