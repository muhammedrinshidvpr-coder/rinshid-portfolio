export interface PublicLink {
  platform: string; url: string; purpose: string; order: number; featured: boolean;
  group: 'Code' | 'Connect' | 'Watch';
}
export const site = {
  name: 'Muhammed Rinshid V P',
  shortName: 'Rinshid',
  title: "Rinshid’s notebook",
  url: process.env.SITE_URL || 'https://rinshid-portfolio.vercel.app',
  bio: 'Student developer. Building useful things, figuring out how they work, and sharing what I learn.',
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
