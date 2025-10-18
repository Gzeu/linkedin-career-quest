// Real Achievements tied to market trends
(function(){
  const origCheck = window.CareerQuestGame && window.CareerQuestGame.prototype?.checkAchievements;
  // If class not exposed, patch through game instance once available
  function patch(){
    if (!window.game) return false;
    const game = window.game;
    const _check = game.checkAchievements.bind(game);
    game.checkAchievements = function(){
      _check();
      try {
        const skillsApi = new window.SkillsAPI();
        const recos = skillsApi.getSkillRecommendations(this.player.skills);
        // Hot Skill Hunter: any recommended skill at level >=50
        if (!this.player.achievements.includes('Hot Skill Hunter')){
          const hit = recos.find(r=> (this.player.skills[r.skill]?.level||0) >= 50);
          if (hit){
            this.player.achievements.push('Hot Skill Hunter');
            this.showAchievement('Hot Skill Hunter: Ai crescut o abilitate cu trend major la 50+');
            this.addFeedMessage('🏅 New achievement: Hot Skill Hunter!', 'success');
          }
        }
        // Market Jump: predicted salary at least +20% over current
        const predicted = skillsApi.predictSalary(this.player.skills);
        if (!this.player.achievements.includes('Market Jump')){
          if (predicted >= Math.round(this.player.salary * 1.2)){
            this.player.achievements.push('Market Jump');
            this.showAchievement('Market Jump: Potențial salarial +20% față de curent!');
            this.addFeedMessage('💹 Achievement: Market Jump unlocked', 'success');
          }
        }
      } catch(_){}
    };
    return true;
  }
  const i = setInterval(()=>{ if (patch()) clearInterval(i); }, 200);
})();
