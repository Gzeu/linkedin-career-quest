// Achievement FX patch for CareerQuestGame (for Phaser edition only)
(function(){
  const origShowAchievement = CareerQuestGame.prototype.showAchievement;
  CareerQuestGame.prototype.showAchievement = function(text) {
    origShowAchievement.call(this, text);
    // FX only if Phaser is present and visible
    if (window.Phaser && window.CQFX && document.getElementById('phaser-root')) {
      // Find GameScene instance if possible
      const phaserCanvas = document.querySelector('#phaser-root canvas');
      if (phaserCanvas && window.Phaser && window.Phaser.GAMES && window.Phaser.GAMES.length) {
        const game = window.Phaser.GAMES[0];
        const gs = game.scene && game.scene.keys && game.scene.keys['GameScene'];
        if (gs) {
          window.CQFX.confetti(gs, 480, 140); // Center top
          window.CQFX.toast(gs, 'Achievement unlocked!');
        }
      }
    }
  };
})();
