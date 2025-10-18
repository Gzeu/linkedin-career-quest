/* Load skills integrations and career path selector on menu + game */
window.addEventListener('load', () => {
  const add = (src) => { const s = document.createElement('script'); s.src = src; document.body.appendChild(s); };
  add('src/api/skills-api.js');
  add('src/integrations/skills-injector.js');
  add('src/integrations/career-path-selector.js');
  add('src/integrations/career-path-hook.js');
});
