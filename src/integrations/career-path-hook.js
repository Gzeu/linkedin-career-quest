// Wire chosen career path into Skills injector
(function(){
  const orig = window.SkillsAPI && window.SkillsAPI.prototype.getNextCareerLevel;
  if (!orig) return;
  // no-op shim kept for clarity; actual selection is read by injector via getCareerPath()
})();
