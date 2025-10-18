/* Career Path selector for menu and persistence */
(function(){
  const KEY = 'cq.careerPath';
  const DEFAULT = 'Software Engineering';
  const PATHS = ['Software Engineering','Data Science','DevOps Engineering','Cybersecurity'];

  function renderPicker(){
    const header = document.querySelector('.menu-header .logo-section, .menu-header');
    if (!header) return;
    const box = document.createElement('div');
    box.className = 'career-path-picker';
    box.style.cssText = 'margin-top:10px; display:flex; gap:8px; align-items:center; flex-wrap:wrap;';
    box.innerHTML = `
      <label for="careerPath" style="font-weight:600">Career Path:</label>
      <select id="careerPath" aria-label="Career Path" style="padding:6px 8px; border-radius:8px; border:1px solid #e1e4e8;">
        ${PATHS.map(p=>`<option value="${p}">${p}</option>`).join('')}
      </select>
    `;
    header.appendChild(box);
    const sel = box.querySelector('select');
    sel.value = localStorage.getItem(KEY) || DEFAULT;
    sel.addEventListener('change', ()=>{
      localStorage.setItem(KEY, sel.value);
      // small toast if exists
      if (window.toast) toast(`Career Path set to ${sel.value}`);
    });
  }

  // Expose get method
  window.getCareerPath = function(){ return localStorage.getItem(KEY) || DEFAULT; };

  document.addEventListener('DOMContentLoaded', renderPicker);
})();
