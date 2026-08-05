export const getTrainerAvatar = (name = '', avatar = '', photo = '') => {
  const existing = photo || avatar;
  if (
    existing &&
    typeof existing === 'string' &&
    existing.trim() !== '' &&
    !existing.includes('placeholder') &&
    !existing.includes('photo-1534528741775-53994a69daeb')
  ) {
    return existing;
  }
  const n = (name || '').toLowerCase();
  if (n.includes('hari')) return '/trainer-hari-black.png';
  if (n.includes('hemath') || n.includes('hemanth')) return '/trainer-hemath.png';
  if (n.includes('logesh')) return '/trainer-logesh.png';
  if (n.includes('kumar')) return '/trainer-kumar.png';
  if (n.includes('lisa')) return '/trainer-lisa.png';
  if (n.includes('marcus')) return 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600';
  if (n.includes('sarah')) return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600';
  if (n.includes('dmitri')) return 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600';
  return existing || '/trainer-hari-black.png';
};
