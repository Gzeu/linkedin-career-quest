// Phaser FX module: attach to window.CQFX
(function(){
  window.CQFX = window.CQFX || {};
  const FX = window.CQFX;
  FX.confetti = function(scene, x, y){
    const colors = [0x0077b5, 0x00a0dc, 0x28a745, 0xffc107, 0xdc3545];
    for (let i=0;i<30;i++){
      const rect = scene.add.rectangle(x, y, Phaser.Math.Between(4,8), Phaser.Math.Between(2,5), Phaser.Utils.Array.GetRandom(colors));
      scene.tweens.add({ targets: rect, x: x + Phaser.Math.Between(-180,180), y: y + Phaser.Math.Between(-140,140), angle: Phaser.Math.Between(-180,180), alpha: 0, duration: Phaser.Math.Between(700,1200), ease: 'Cubic.easeOut', onComplete: ()=>rect.destroy() });
    }
  };
  FX.pulse = function(scene, target){ scene.tweens.add({ targets: target, scale: 1.1, duration: 120, yoyo: true, ease: 'Sine.easeInOut' }); };
  FX.growBar = function(scene, bar, width){ scene.tweens.add({ targets: bar, displayWidth: width, duration: 300, ease: 'Cubic.easeOut' }); };
  FX.toast = function(scene, text){
    const { width } = scene.scale;
    const bg = scene.add.rectangle(width/2, 40, 10, 32, 0x000000).setAlpha(0.75);
    const label = scene.add.text(width/2, 40, text, { fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
    const pad = 24; const w = Math.max(160, label.width + pad);
    bg.displayWidth = w; bg.displayHeight = label.height + 14;
    scene.tweens.add({ targets: [bg,label], y: 70, duration: 220, ease: 'Cubic.easeOut' });
    scene.time.delayedCall(1700, ()=> scene.tweens.add({ targets: [bg,label], y: 20, alpha: 0, duration: 250, onComplete: ()=>{ bg.destroy(); label.destroy(); } }));
  };
})();
