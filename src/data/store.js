const products = [
  { id: 1, name: 'Melody Bot', category: 'Music', price: 1500, description: 'High quality music bot with playlist and lyrics support.', icon: 'music', color: '#00d4ff', features: ['HD playback', 'Playlist support', 'Lyrics', 'Queue controls'] },
  { id: 2, name: 'Harmony DJ', category: 'Music', price: 2500, description: 'Advanced music bot with equalizer and room controls.', icon: 'headphones', color: '#7b5cff', features: ['10 band EQ', 'Bass boost', 'Multi-room', 'Web dashboard'] },
  { id: 3, name: 'Guardian Shield', category: 'Security', price: 2000, description: 'Protects communities from spam, raid, and abuse.', icon: 'shield', color: '#00ff88', features: ['Anti-raid', 'Anti-spam', 'Auto-mod', 'Verification'] },
  { id: 4, name: 'Custom Bot Premium', category: 'Custom', price: 8000, description: 'Custom Discord bot built around your workflow.', icon: 'sparkles', color: '#ffb703', features: ['Unlimited features', 'Priority support', 'Dashboard', 'Source code'] }
];

const plans = [
  { id: 'source', name: 'Source Code', price: 'Custom Quote', description: 'Receive codebase and documentation.', accent: '#00d4ff' },
  { id: 'full-service', name: 'Full Service', price: 'Bot + 4,000 THB', description: 'Hosting, domain, setup, and maintenance.', accent: '#7b5cff' },
  { id: 'yearly', name: 'Yearly Care', price: '3,200 THB / year', description: 'Ongoing hosting, updates, and support.', accent: '#00ff88' }
];

const reviews = [
  { name: 'Darkside_TH', bot: 'Melody Bot', rating: 5, text: 'Audio is stable and support replies quickly.' },
  { name: 'NeonGamer', bot: 'Guardian Shield', rating: 5, text: 'Our server is much easier to manage now.' },
  { name: 'SakuraChii', bot: 'Custom Bot Premium', rating: 5, text: 'The custom flow matched our team exactly.' }
];

const faqs = [
  { question: 'How long does delivery take?', answer: 'Ready-made bots can be delivered quickly after payment confirmation. Custom work depends on scope.' },
  { question: 'Do you provide after-sales support?', answer: 'Yes. Each package includes a support window and bug fixes based on the agreement.' },
  { question: 'Can I test before buying?', answer: 'Yes. A demo flow can be prepared for selected bots.' }
];

module.exports = {
  products,
  plans,
  reviews,
  faqs
};
