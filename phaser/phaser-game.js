// Phaser Edition of Career Quest
// Renders HUD, skills and actions using Phaser while using existing CareerQuestGame state

class BootScene extends Phaser.Scene {
  constructor(){ super('BootScene'); }
  preload(){
    // Could preload assets/sounds here later
  }
  create(){ this.scene.start('MenuScene'); }
}

class MenuScene extends Phaser.Scene {
  constructor(){ super('MenuScene'); }
  create(){
    const { width, height } = this.scale;
    this.add.text(width/2, 80, 'Career Quest', { fontSize: '36px', color: '#0077b5', fontFamily: 'Arial' }).setOrigin(0.5);
    this.add.text(width/2, 120, 'Phaser Edition', { fontSize: '16px', color: '#00a0dc' }).setOrigin(0.5);

    const startBtn = this.add.text(width/2, height/2, 'Start Career', { fontSize: '24px', color: '#ffffff', backgroundColor: '#0077b5', padding: { x: 16, y: 8 } })
      .setOrigin(0.5).setInteractive({ useHandCursor: true });
    startBtn.on('pointerdown', () => this.scene.start('GameScene'));

    const goWebBtn = this.add.text(width/2, height/2 + 60, 'Open Web Version', { fontSize: '16px', color: '#0077b5' })
      .setOrigin(0.5).setInteractive({ useHandCursor: true });
    goWebBtn.on('pointerdown', () => window.location.href = 'index.html');
  }
}

class GameScene extends Phaser.Scene {
  constructor(){ super('GameScene'); this.ui = {}; }
  create(){
    const { width } = this.scale;

    // Ensure base game exists
    if (!window.game){ window.game = new CareerQuestGame(); }
    this.model = window.game;

    // HUD
    this.ui.title = this.add.text(16, 12, 'Career Quest — HUD', { fontSize: '14px', color: '#666' });
    this.ui.stats = this.add.text(16, 36, '', { fontSize: '16px', color: '#111' });

    // Skills panel
    this.ui.skillsTitle = this.add.text(16, 70, 'Skills', { fontSize: '18px', color: '#0077b5' });
    this.ui.skills = [];
    this.renderSkills();

    // Action buttons
    const btnStyle = { fontSize: '18px', color: '#fff', backgroundColor: '#0077b5', padding: { x: 12, y: 6 } };
    this.ui.btnNetwork = this.add.text(width - 200, 90, 'Network', btnStyle).setInteractive({ useHandCursor: true });
    this.ui.btnStudy = this.add.text(width - 200, 130, 'Study', btnStyle).setInteractive({ useHandCursor: true });
    this.ui.btnJob = this.add.text(width - 200, 170, 'Job Hunt', btnStyle).setInteractive({ useHandCursor: true });
    this.ui.btnPost = this.add.text(width - 200, 210, 'Post Content', btnStyle).setInteractive({ useHandCursor: true });

    this.ui.btnNetwork.on('pointerdown', () => { networkEvent(); this.refresh(); });
    this.ui.btnStudy.on('pointerdown', () => { // pick highest recommendation if exists
      const SkillsAPIRef = window.SkillsAPI ? new window.SkillsAPI() : null;
      if (SkillsAPIRef){
        const recos = SkillsAPIRef.getSkillRecommendations(this.model.player.skills);
        if (recos.length){ improveSkill(recos[0].skill); } else { this.model.addFeedMessage('No recommendations. Opening picker…'); studySkill(); }
      } else { studySkill(); }
      this.refresh();
    });
    this.ui.btnJob.on('pointerdown', () => { applyJob(); this.refresh(); });
    this.ui.btnPost.on('pointerdown', () => { createContent(); this.refresh(); });

    // Update loop
    this.refresh();
  }

  renderSkills(){
    // Clear existing
    this.ui.skills.forEach(s => s.destroy());
    this.ui.skills = [];
    let y = 100;
    Object.entries(this.model.player.skills).forEach(([name, data]) => {
      const label = this.add.text(16, y, `${name}: ${data.level}/100`, { fontSize: '16px', color: '#222' });
      const barBg = this.add.rectangle(180, y + 10, 200, 10, 0xe0e0e0).setOrigin(0, 0.5);
      const bar = this.add.rectangle(180, y + 10, Math.max(2, 200 * (data.level/100)), 10, 0x0077b5).setOrigin(0, 0.5);
      this.ui.skills.push(label, barBg, bar);
      y += 28;
    });
  }

  refresh(){
    const p = this.model.player;
    this.ui.stats.setText(`Role: ${p.currentRole}  |  Company: ${p.currentCompany}\nConnections: ${p.connections}  •  Influence: ${p.influence}  •  Salary: $${p.salary.toLocaleString()}`);
    this.renderSkills();
  }
}

(function initPhaser(){
  const config = {
    type: Phaser.AUTO,
    parent: 'phaser-root',
    backgroundColor: '#f7f9fc',
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 960, height: 540 },
    scene: [BootScene, MenuScene, GameScene]
  };
  new Phaser.Game(config);
})();
