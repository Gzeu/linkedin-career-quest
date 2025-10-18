// Game State
class CareerQuestGame {
    constructor() {
        this.player = {
            connections: 5,
            influence: 10,
            salary: 45000,
            experience: 0,
            currentRole: 'Junior Developer',
            currentCompany: 'TechStart Inc.',
            skills: {
                'JavaScript': { level: 20, category: 'Technical' },
                'Communication': { level: 15, category: 'Soft' },
                'Project Management': { level: 10, category: 'Leadership' },
                'Problem Solving': { level: 25, category: 'Soft' }
            },
            achievements: [],
            appliedJobs: []
        };
        
        this.gameData = {
            availableJobs: [
                {
                    title: 'Senior Developer',
                    company: 'InnovateTech',
                    salary: 75000,
                    requirements: ['JavaScript: 40+', 'Communication: 30+'],
                    requiredSkills: { 'JavaScript': 40, 'Communication': 30 }
                },
                {
                    title: 'Team Lead',
                    company: 'DevCorp',
                    salary: 85000,
                    requirements: ['Project Management: 50+', 'Communication: 40+'],
                    requiredSkills: { 'Project Management': 50, 'Communication': 40 }
                },
                {
                    title: 'Full Stack Developer',
                    company: 'WebSolutions',
                    salary: 68000,
                    requirements: ['JavaScript: 35+', 'Problem Solving: 40+'],
                    requiredSkills: { 'JavaScript': 35, 'Problem Solving': 40 }
                }
            ],
            networkingEvents: [
                {
                    text: "You meet a senior developer at a tech meetup. They're impressed by your enthusiasm!",
                    reward: { connections: 2, influence: 5 },
                    skillBonus: 'JavaScript'
                },
                {
                    text: "A project manager shares valuable insights about leadership during a LinkedIn workshop.",
                    reward: { connections: 1, influence: 3 },
                    skillBonus: 'Project Management'
                },
                {
                    text: "You participate in a communication skills seminar and make valuable connections.",
                    reward: { connections: 3, influence: 4 },
                    skillBonus: 'Communication'
                },
                {
                    text: "At a problem-solving workshop, you demonstrate excellent analytical skills.",
                    reward: { connections: 2, influence: 6 },
                    skillBonus: 'Problem Solving'
                }
            ],
            achievements: [
                { name: 'Networker', description: 'Reach 25 connections', threshold: 25, type: 'connections' },
                { name: 'Influencer', description: 'Gain 50 influence points', threshold: 50, type: 'influence' },
                { name: 'Skill Master', description: 'Max out any skill', threshold: 100, type: 'skill' },
                { name: 'Career Climber', description: 'Get promoted twice', threshold: 2, type: 'promotions' }
            ]
        };
        
        this.currentNetworkEvent = null;
        this.selectedJob = null;
        this.promotions = 0;
        
        this.init();
    }
    
    init() {
        this.updateUI();
        this.generateJobListings();
        this.addFeedMessage('Welcome to LinkedIn Career Quest! 🚀 Build your network, develop skills, and advance your career.');
        
        // Auto-save every 30 seconds
        setInterval(() => this.saveGame(), 30000);
        
        // Load saved game if exists
        this.loadGame();
    }
    
    updateUI() {
        // Update stats
        document.getElementById('connections').textContent = this.player.connections;
        document.getElementById('influence').textContent = this.player.influence;
        document.getElementById('salary').textContent = this.player.salary.toLocaleString();
        document.getElementById('experience').textContent = this.player.experience;
        document.getElementById('current-role').textContent = this.player.currentRole;
        document.getElementById('current-company').textContent = this.player.currentCompany;
        
        // Update experience bar
        const experiencePercentage = Math.min(this.player.experience, 100);
        document.getElementById('experience-fill').style.width = `${experiencePercentage}%`;
        
        // Update skills
        this.updateSkillsDisplay();
        
        // Check for promotions
        this.checkForPromotion();
    }
    
    updateSkillsDisplay() {
        const skillsGrid = document.getElementById('skills-grid');
        skillsGrid.innerHTML = '';
        
        Object.entries(this.player.skills).forEach(([skillName, skillData]) => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <div class="skill-name">${skillName}</div>
                <div class="skill-level">
                    <div class="skill-progress" style="width: ${skillData.level}%"></div>
                </div>
                <div class="skill-level-text">Level ${skillData.level}/100 (${skillData.category})</div>
            `;
            skillsGrid.appendChild(skillItem);
        });
    }
    
    generateJobListings() {
        const jobsList = document.getElementById('jobs-list');
        jobsList.innerHTML = '';
        
        this.gameData.availableJobs.forEach((job, index) => {
            const jobItem = document.createElement('div');
            jobItem.className = 'job-item';
            jobItem.innerHTML = `
                <div class="job-title">${job.title}</div>
                <div class="job-company">${job.company}</div>
                <div class="job-salary">$${job.salary.toLocaleString()}/year</div>
                <div class="job-requirements">Requirements: ${job.requirements.join(', ')}</div>
            `;
            jobItem.onclick = () => this.showJobDetails(job);
            jobsList.appendChild(jobItem);
        });
    }
    
    addFeedMessage(message, type = 'info') {
        const feedContainer = document.getElementById('feed-container');
        const feedItem = document.createElement('div');
        feedItem.className = 'feed-item';
        
        let icon = 'fas fa-info-circle';
        if (type === 'success') icon = 'fas fa-check-circle';
        if (type === 'network') icon = 'fas fa-users';
        if (type === 'skill') icon = 'fas fa-brain';
        if (type === 'job') icon = 'fas fa-briefcase';
        
        feedItem.innerHTML = `
            <i class="${icon}"></i>
            <p>${message}</p>
        `;
        
        feedContainer.insertBefore(feedItem, feedContainer.firstChild);
        
        // Keep only last 10 messages
        while (feedContainer.children.length > 10) {
            feedContainer.removeChild(feedContainer.lastChild);
        }
    }
    
    checkForPromotion() {
        if (this.player.experience >= 100) {
            this.player.experience = 0;
            this.promotions++;
            
            // Promotion logic
            if (this.player.currentRole === 'Junior Developer' && this.player.skills.JavaScript.level >= 40) {
                this.player.currentRole = 'Mid-level Developer';
                this.player.currentCompany = 'GrowthTech Solutions';
                this.player.salary = 65000;
                this.addFeedMessage('🎉 Congratulations! You\'ve been promoted to Mid-level Developer!', 'success');
                this.showAchievement('Promotion achieved! Welcome to your new role as Mid-level Developer!');
            } else if (this.player.currentRole === 'Mid-level Developer' && this.player.skills['Project Management'].level >= 50) {
                this.player.currentRole = 'Senior Developer';
                this.player.currentCompany = 'InnovateTech';
                this.player.salary = 85000;
                this.addFeedMessage('🚀 Amazing! You\'ve been promoted to Senior Developer!', 'success');
                this.showAchievement('Outstanding! You\'re now a Senior Developer!');
            }
            
            this.checkAchievements();
        }
    }
    
    checkAchievements() {
        this.gameData.achievements.forEach(achievement => {
            if (!this.player.achievements.includes(achievement.name)) {
                let qualified = false;
                
                switch (achievement.type) {
                    case 'connections':
                        qualified = this.player.connections >= achievement.threshold;
                        break;
                    case 'influence':
                        qualified = this.player.influence >= achievement.threshold;
                        break;
                    case 'skill':
                        qualified = Object.values(this.player.skills).some(skill => skill.level >= achievement.threshold);
                        break;
                    case 'promotions':
                        qualified = this.promotions >= achievement.threshold;
                        break;
                }
                
                if (qualified) {
                    this.player.achievements.push(achievement.name);
                    this.showAchievement(`${achievement.name}: ${achievement.description}`);
                    this.addFeedMessage(`🏆 Achievement unlocked: ${achievement.name}!`, 'success');
                }
            }
        });
    }
    
    showAchievement(text) {
        document.getElementById('achievementText').textContent = text;
        document.getElementById('achievementModal').style.display = 'block';
    }
    
    saveGame() {
        const gameState = {
            player: this.player,
            promotions: this.promotions
        };
        localStorage.setItem('linkedinCareerQuest', JSON.stringify(gameState));
    }
    
    loadGame() {
        const savedGame = localStorage.getItem('linkedinCareerQuest');
        if (savedGame) {
            const gameState = JSON.parse(savedGame);
            this.player = { ...this.player, ...gameState.player };
            this.promotions = gameState.promotions || 0;
            this.updateUI();
        }
    }
}

// Global game instance
let game;

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    game = new CareerQuestGame();
});

// Game Actions
function networkEvent() {
    const events = game.gameData.networkingEvents;
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    game.currentNetworkEvent = randomEvent;
    
    document.getElementById('networkEventText').textContent = randomEvent.text;
    document.getElementById('networkModal').style.display = 'block';
}

function acceptNetworkEvent() {
    const event = game.currentNetworkEvent;
    if (event) {
        // Apply rewards
        game.player.connections += event.reward.connections || 0;
        game.player.influence += event.reward.influence || 0;
        
        // Skill bonus
        if (event.skillBonus && game.player.skills[event.skillBonus]) {
            const bonus = Math.floor(Math.random() * 5) + 3;
            game.player.skills[event.skillBonus].level = Math.min(100, 
                game.player.skills[event.skillBonus].level + bonus);
        }
        
        game.player.experience += 10;
        
        game.addFeedMessage(`Great networking! +${event.reward.connections} connections, +${event.reward.influence} influence`, 'network');
        game.updateUI();
        game.checkAchievements();
    }
    closeModal('networkModal');
}

function declineNetworkEvent() {
    game.addFeedMessage('You decided to skip this networking opportunity.', 'info');
    closeModal('networkModal');
}

function studySkill() {
    const skillOptions = document.getElementById('skill-options');
    skillOptions.innerHTML = '';
    
    Object.entries(game.player.skills).forEach(([skillName, skillData]) => {
        const skillOption = document.createElement('div');
        skillOption.className = 'skill-option';
        skillOption.innerHTML = `
            <strong>${skillName}</strong><br>
            <small>Current Level: ${skillData.level}/100</small><br>
            <small>Category: ${skillData.category}</small>
        `;
        skillOption.onclick = () => improveSkill(skillName);
        skillOptions.appendChild(skillOption);
    });
    
    document.getElementById('studyModal').style.display = 'block';
}

function improveSkill(skillName) {
    const improvement = Math.floor(Math.random() * 8) + 5; // 5-12 points
    game.player.skills[skillName].level = Math.min(100, game.player.skills[skillName].level + improvement);
    game.player.experience += 8;
    
    game.addFeedMessage(`You studied ${skillName} and improved by ${improvement} points!`, 'skill');
    game.updateUI();
    game.checkAchievements();
    closeModal('studyModal');
}

function applyJob() {
    // Check if player meets requirements for any job
    const qualifiedJobs = game.gameData.availableJobs.filter(job => 
        !game.player.appliedJobs.includes(job.title)
    );
    
    if (qualifiedJobs.length === 0) {
        game.addFeedMessage('No new job opportunities available. Keep building your skills!', 'info');
        return;
    }
    
    const randomJob = qualifiedJobs[Math.floor(Math.random() * qualifiedJobs.length)];
    game.showJobDetails(randomJob);
}

function createContent() {
    const contentTypes = [
        { type: 'Technical Article', influence: 8, experience: 6 },
        { type: 'Industry Insights', influence: 6, experience: 4 },
        { type: 'Career Tips', influence: 5, experience: 5 },
        { type: 'Project Showcase', influence: 10, experience: 8 }
    ];
    
    const randomContent = contentTypes[Math.floor(Math.random() * contentTypes.length)];
    
    game.player.influence += randomContent.influence;
    game.player.experience += randomContent.experience;
    
    game.addFeedMessage(`You posted "${randomContent.type}" and gained ${randomContent.influence} influence!`, 'success');
    game.updateUI();
    game.checkAchievements();
}

// Job Application System
game.showJobDetails = function(job) {
    this.selectedJob = job;
    document.getElementById('jobTitle').textContent = job.title;
    document.getElementById('jobDetails').innerHTML = `
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Salary:</strong> $${job.salary.toLocaleString()}/year</p>
        <p><strong>Requirements:</strong></p>
        <ul>${job.requirements.map(req => `<li>${req}</li>`).join('')}</ul>
    `;
    document.getElementById('jobModal').style.display = 'block';
};

function applyToJob() {
    const job = game.selectedJob;
    if (!job) return;
    
    // Check if player meets requirements
    let meetsRequirements = true;
    let missingSkills = [];
    
    Object.entries(job.requiredSkills).forEach(([skill, required]) => {
        if (!game.player.skills[skill] || game.player.skills[skill].level < required) {
            meetsRequirements = false;
            missingSkills.push(`${skill} (need ${required}, have ${game.player.skills[skill]?.level || 0})`);
        }
    });
    
    game.player.appliedJobs.push(job.title);
    
    if (meetsRequirements) {
        // Successful application
        const successChance = Math.random();
        if (successChance > 0.3) { // 70% chance of success if qualified
            game.player.currentRole = job.title;
            game.player.currentCompany = job.company;
            game.player.salary = job.salary;
            game.player.experience += 25;
            game.promotions++;
            
            game.addFeedMessage(`🎉 Congratulations! You got the ${job.title} position at ${job.company}!`, 'success');
            game.showAchievement(`New Job! You're now a ${job.title} at ${job.company}!`);
        } else {
            game.addFeedMessage(`Your application for ${job.title} was reviewed, but they went with another candidate. Keep trying!`, 'info');
        }
    } else {
        game.addFeedMessage(`Application submitted for ${job.title}, but you need to improve: ${missingSkills.join(', ')}`, 'info');
    }
    
    game.updateUI();
    game.checkAchievements();
    closeModal('jobModal');
}

// Modal Management
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Click outside modal to close
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};