// Export Career Profile as JSON or Markdown
(function(){
  function buildProfile(){
    const state = JSON.parse(localStorage.getItem('linkedinCareerQuest')||'{}');
    const p = state.player || {};
    const SkillsAPIRef = window.SkillsAPI ? new window.SkillsAPI() : null;
    const recommendations = SkillsAPIRef ? SkillsAPIRef.getSkillRecommendations(p.skills||{}) : [];
    const predicted = SkillsAPIRef ? SkillsAPIRef.predictSalary(p.skills||{}) : p.salary;
    const nextLevel = SkillsAPIRef ? SkillsAPIRef.getNextCareerLevel(window.getCareerPath?.()||'Software Engineering', p.skills||{}) : null;
    return { careerPath: window.getCareerPath?.()||'Software Engineering', role: p.currentRole, company: p.currentCompany, salary: p.salary, predictedSalary: predicted, connections: p.connections, influence: p.influence, skills: p.skills, recommendations, nextLevel };
  }

  window.exportCareerJSON = function(){
    const profile = buildProfile();
    const blob = new Blob([JSON.stringify(profile,null,2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'career-profile.json'; a.click(); URL.revokeObjectURL(url);
  };

  window.exportCareerMarkdown = function(){
    const p = buildProfile();
    const md = `# Career Profile\n\n- Path: ${p.careerPath}\n- Role: ${p.role}\n- Company: ${p.company}\n- Salary (current): $${(p.salary||0).toLocaleString()}\n- Salary (predicted): $${(p.predictedSalary||0).toLocaleString()}\n- Connections: ${p.connections}\n- Influence: ${p.influence}\n\n## Skills\n${Object.entries(p.skills||{}).map(([k,v])=>`- ${k}: ${v.level}/100 (${v.category})`).join('\n')}\n\n## Recommendations\n${(p.recommendations||[]).map(r=>`- ${r.skill} — ${r.reason}`).join('\n')}\n\n## Next Level\n${p.nextLevel?`- Title: ${p.nextLevel.title}\n- Requirements: ${Object.entries(p.nextLevel.requiredSkills).map(([s,v])=>`${s} ${v}+`).join(', ')}`:'- N/A'}`;
    const blob = new Blob([md], {type:'text/markdown'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'career-profile.md'; a.click(); URL.revokeObjectURL(url);
  };
})();
