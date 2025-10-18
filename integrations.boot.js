/* Load new integrations */
window.addEventListener('load', () => {
  const script1 = document.createElement('script');
  script1.src = 'src/api/skills-api.js';
  document.body.appendChild(script1);

  const script2 = document.createElement('script');
  script2.src = 'src/integrations/skills-injector.js';
  document.body.appendChild(script2);
});
