/* Include market achievements in boot */
window.addEventListener('load', () => {
  const s = document.createElement('script');
  s.src = 'src/integrations/market-achievements.js';
  document.body.appendChild(s);
});
