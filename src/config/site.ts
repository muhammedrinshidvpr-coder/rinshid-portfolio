export interface PublicLink {
  platform: string; url: string; purpose: string; order: number; featured: boolean;
  group: 'Code' | 'Connect' | 'Watch';
}
export const site = {
  name: 'Muhammed Rinshid V P',
  shortName: 'Rinshid',
  title: "Rinshid’s notebook",
  url: process.env.SITE_URL || 'https://rinshid-portfolio.vercel.app',
  bio: 'CS student and founder of CosmIQ. Helping fellow students adapt to AI, learn through building, and make time for what matters.',
  mastheadNote: 'Learn by building. Make time for what matters.',
  profile: {
    education: 'B.Tech in Computer Science & Engineering, TKM College of Engineering',
    graduation: '2029',
    venture: 'CosmIQ',
    role: 'Founder',
    previousWork: {
      organization: 'Azmora',
      period: 'June–August 2026',
      contribution: 'Built n8n automation on AWS.',
    },
  },
  themes: [
    { title: 'Engineering in the AI era', summary: 'Prompt and context engineering, new tools, and how to think critically while using AI.' },
    { title: 'Learning through building', summary: 'Practical projects, experiments, and turning what we learn into something that works.' },
    { title: 'Time, focus & productivity', summary: 'Making room for meaningful work and using our time deliberately.' },
    { title: 'Attention & personal growth', summary: 'Social-media habits, distraction, and developing ourselves alongside our technical skills.' },
  ],
  email: 'muhammedrinshidvpr@gmail.com',
  location: 'Kerala, India',
  navigation: [
    { label: 'Home', path: '/' }, { label: 'Projects', path: '/projects/' },
    { label: 'Writing', path: '/writing/' }, { label: 'Now', path: '/now/' }, { label: 'About', path: '/about/' },
  ],
  secondary: [
    { label: 'Student guides', path: '/guides/' }, { label: 'Videos', path: '/videos/' },
    { label: 'Contact', path: '/contact/' }, { label: 'All links', path: '/links/' },
  ],
  links: [
    { platform: 'GitHub', url: 'https://github.com/muhammedrinshidvpr-coder', purpose: 'Source code, experiments, releases, and project discussions.', order: 1, featured: true, group: 'Code' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/rinshidrazaq/', purpose: 'My professional profile and a place to connect.', order: 2, featured: true, group: 'Connect' },
    { platform: 'YouTube', url: 'https://www.youtube.com/@RinshidRazaq', purpose: 'My channel, under the name Rinshid Razaq.', order: 3, featured: true, group: 'Watch' },
    { platform: 'Instagram', url: 'https://www.instagram.com/rinshidrazaq/', purpose: 'Find me as @rinshidrazaq.', order: 4, featured: false, group: 'Connect' },
  ] satisfies PublicLink[],
};
export const publicLinks = [...site.links].sort((a, b) => a.order - b.order);
