/* Load profile export and market achievements on both menu & game pages */
window.addEventListener('load', () => {
  const add = (src) => { const s = document.createElement('script'); s.src = src; document.body.appendChild(s); };
  add('src/integrations/profile-export.js');
});
