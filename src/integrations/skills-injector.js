/* Inject SkillsAPI into the game and extend mechanics with real-world data */
(async function(){
  // Load SkillsAPI
  if (!window.SkillsAPI) {
    console.warn('SkillsAPI not found');
    return;
  }
  const skillsApi = new window.SkillsAPI();

  // Wait until game is ready
  const waitForGame = () => new Promise(res => {
    const i = setInterval(() => {
      if (window.game) { clearInterval(i); res(window.game); }
    }, 100);
  });
  const game = await waitForGame();

  // 1) Replace skills with real data-backed structure (preserving progress where possible)
  const realSkills = await skillsApi.getSkills();
  Object.keys(realSkills).forEach((skillName) => {
    if (!game.player.skills[skillName]) {
      game.player.skills[skillName] = { level: 0, category: realSkills[skillName].category };
    } else {
      game.player.skills[skillName].category = realSkills[skillName].category;
    }
  });

  // 2) Add Career Paths guidance UI panel
  const main = document.querySelector('.game-main');
  const guidance = document.createElement('section');
  guidance.className = 'guidance-panel';
  guidance.innerHTML = `
    <h3><i class="fas fa-compass"></i> Career Guidance (Real Data)</h3>
    <div id="career-recos" class="recos"></div>
    <div id="market-insights" class="insights"></div>
  `;
  main.appendChild(guidance);

  function renderInsights(){
    const insights = skillsApi.getMarketInsights();
    const insightsEl = document.getElementById('market-insights');
    insightsEl.innerHTML = `
      <div class="insight-box">
        <strong>Hot Skills</strong>
        <ul>${insights.hotSkills.map(s=>`<li>${s.name} — growth ${s.growth}% (${s.demand})</li>`).join('')}</ul>
      </div>
      <div class="insight-box">
        <strong>Industry Trends</strong>
        <ul>${Object.entries(insights.industryTrends).map(([k,v])=>`<li>${k}: growth ${v.growth}% — ${v.demand}</li>`).join('')}</ul>
      </div>
    `;
  }

  function renderRecommendations(){
    const recos = skillsApi.getSkillRecommendations(game.player.skills);
    const recosEl = document.getElementById('career-recos');
    recosEl.innerHTML = `
      <div class="reco-list">
        ${recos.map(r=>`<div class="reco-item"><strong>${r.skill}</strong><br><small>${r.reason}</small><br><em>${r.category}</em></div>`).join('')}
      </div>
      <button class="btn-primary" id="btnStudyReco">Study Top Recommendation</button>
    `;
    document.getElementById('btnStudyReco').onclick = () => {
      if (recos.length){
        const top = recos[0].skill;
        // small deterministic boost to encourage trend-aligned learning
        const inc = 6 + Math.floor(Math.random()*5);
        game.player.skills[top].level = Math.min(100, (game.player.skills[top]?.level||0) + inc);
        game.player.experience += 8;
        game.addFeedMessage(`Trend learning: ${top} +${inc} points (market hot skill).`, 'skill');
        game.updateUI();
        renderRecommendations();
      }
    };
  }

  // 3) Enhance job generation using career paths
  const careerPaths = skillsApi.getCareerPaths();
  const defaultPath = 'Software Engineering';
  const nextLevel = skillsApi.getNextCareerLevel(defaultPath, game.player.skills);
  if (nextLevel){
    // Inject a tailored job into available jobs
    game.gameData.availableJobs.unshift({
      title: nextLevel.title,
      company: 'MarketMatch Corp',
      salary: Math.round((nextLevel.salary.min + nextLevel.salary.max)/2),
      requirements: Object.entries(nextLevel.requiredSkills).map(([s,v])=>`${s}: ${v}+`),
      requiredSkills: nextLevel.requiredSkills
    });
    game.generateJobListings();
    game.addFeedMessage(`Market suggests next step: ${nextLevel.title}. Requirements actualizate pe trend.`, 'job');
  }

  // 4) Salary prediction feedback loop
  const originalUpdateUI = game.updateUI.bind(game);
  game.updateUI = function(){
    originalUpdateUI();
    const predicted = skillsApi.predictSalary(game.player.skills);
    // show subtle hint when predicted is higher than current
    if (predicted > game.player.salary){
      game.addFeedMessage(`Salary market signal: cu abilitățile tale poți atinge $${predicted.toLocaleString()}.`, 'info');
    }
  };

  // initial renders
  renderInsights();
  renderRecommendations();
})();
