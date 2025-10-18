// Open Skills API Integration for LinkedIn Career Quest
// Provides real-world skills data and career pathways

class SkillsAPI {
    constructor() {
        this.baseURL = 'https://api.onetwebservice.org/ws/online';
        this.fallbackSkills = {
            // Technical Skills
            'JavaScript': { 
                category: 'Programming', 
                description: 'Client-side and server-side JavaScript development',
                relatedOccupations: ['Web Developer', 'Software Engineer', 'Full Stack Developer'],
                demand: 'High',
                growth: 8.2
            },
            'Python': { 
                category: 'Programming', 
                description: 'General-purpose programming language',
                relatedOccupations: ['Data Scientist', 'Backend Developer', 'AI Engineer'],
                demand: 'Very High',
                growth: 9.1
            },
            'React': { 
                category: 'Framework', 
                description: 'Frontend JavaScript library for building user interfaces',
                relatedOccupations: ['Frontend Developer', 'UI Engineer', 'Web Developer'],
                demand: 'High',
                growth: 7.8
            },
            'Node.js': { 
                category: 'Runtime', 
                description: 'JavaScript runtime for server-side development',
                relatedOccupations: ['Backend Developer', 'Full Stack Developer', 'API Developer'],
                demand: 'High',
                growth: 8.5
            },
            'DevOps': { 
                category: 'Operations', 
                description: 'Development and operations practices integration',
                relatedOccupations: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Architect'],
                demand: 'Very High',
                growth: 12.3
            },
            'Machine Learning': { 
                category: 'AI/Data', 
                description: 'Algorithms and statistical models for data analysis',
                relatedOccupations: ['ML Engineer', 'Data Scientist', 'AI Researcher'],
                demand: 'Very High',
                growth: 15.7
            },
            'Cloud Computing': { 
                category: 'Infrastructure', 
                description: 'Cloud platforms and services management',
                relatedOccupations: ['Cloud Engineer', 'Solutions Architect', 'Platform Engineer'],
                demand: 'Very High',
                growth: 11.2
            },
            'Cybersecurity': { 
                category: 'Security', 
                description: 'Information security and threat protection',
                relatedOccupations: ['Security Analyst', 'Penetration Tester', 'CISO'],
                demand: 'Very High',
                growth: 18.4
            },
            
            // Soft Skills
            'Leadership': { 
                category: 'Management', 
                description: 'Ability to guide and influence team members',
                relatedOccupations: ['Team Lead', 'Project Manager', 'Engineering Manager'],
                demand: 'High',
                growth: 6.8
            },
            'Communication': { 
                category: 'Interpersonal', 
                description: 'Effective verbal and written communication skills',
                relatedOccupations: ['All Roles', 'Technical Writer', 'Product Manager'],
                demand: 'Essential',
                growth: 5.2
            },
            'Problem Solving': { 
                category: 'Analytical', 
                description: 'Critical thinking and analytical reasoning',
                relatedOccupations: ['All Technical Roles', 'Consultant', 'Architect'],
                demand: 'Essential',
                growth: 7.1
            },
            'Project Management': { 
                category: 'Management', 
                description: 'Planning, executing, and delivering projects',
                relatedOccupations: ['Project Manager', 'Scrum Master', 'Product Owner'],
                demand: 'High',
                growth: 6.5
            },
            'Agile Methodology': { 
                category: 'Process', 
                description: 'Iterative development and project management approach',
                relatedOccupations: ['Scrum Master', 'Agile Coach', 'Product Manager'],
                demand: 'High',
                growth: 8.9
            },
            'Data Analysis': { 
                category: 'Analytics', 
                description: 'Statistical analysis and data interpretation',
                relatedOccupations: ['Data Analyst', 'Business Analyst', 'Product Analyst'],
                demand: 'Very High',
                growth: 13.2
            }
        };
        
        this.careerPaths = {
            'Software Engineering': {
                levels: [
                    { 
                        title: 'Junior Developer',
                        salary: { min: 45000, max: 55000 },
                        requiredSkills: { 'JavaScript': 30, 'Problem Solving': 25, 'Communication': 20 },
                        experienceYears: 0
                    },
                    { 
                        title: 'Mid-level Developer',
                        salary: { min: 65000, max: 80000 },
                        requiredSkills: { 'JavaScript': 50, 'React': 40, 'Communication': 35, 'Problem Solving': 45 },
                        experienceYears: 2
                    },
                    { 
                        title: 'Senior Developer',
                        salary: { min: 85000, max: 120000 },
                        requiredSkills: { 'JavaScript': 70, 'React': 60, 'Node.js': 50, 'Leadership': 40, 'Problem Solving': 65 },
                        experienceYears: 5
                    },
                    { 
                        title: 'Tech Lead',
                        salary: { min: 120000, max: 160000 },
                        requiredSkills: { 'JavaScript': 80, 'Leadership': 70, 'Project Management': 60, 'Communication': 70 },
                        experienceYears: 7
                    },
                    { 
                        title: 'Engineering Manager',
                        salary: { min: 140000, max: 200000 },
                        requiredSkills: { 'Leadership': 85, 'Project Management': 80, 'Communication': 85, 'Problem Solving': 70 },
                        experienceYears: 10
                    }
                ]
            },
            'Data Science': {
                levels: [
                    { 
                        title: 'Junior Data Analyst',
                        salary: { min: 50000, max: 60000 },
                        requiredSkills: { 'Python': 35, 'Data Analysis': 40, 'Problem Solving': 30 },
                        experienceYears: 0
                    },
                    { 
                        title: 'Data Analyst',
                        salary: { min: 70000, max: 85000 },
                        requiredSkills: { 'Python': 55, 'Data Analysis': 60, 'Communication': 40, 'Problem Solving': 50 },
                        experienceYears: 2
                    },
                    { 
                        title: 'Data Scientist',
                        salary: { min: 95000, max: 130000 },
                        requiredSkills: { 'Python': 70, 'Machine Learning': 65, 'Data Analysis': 75, 'Communication': 55 },
                        experienceYears: 4
                    },
                    { 
                        title: 'Senior Data Scientist',
                        salary: { min: 130000, max: 180000 },
                        requiredSkills: { 'Python': 85, 'Machine Learning': 80, 'Leadership': 60, 'Communication': 70 },
                        experienceYears: 7
                    },
                    { 
                        title: 'Data Science Manager',
                        salary: { min: 160000, max: 220000 },
                        requiredSkills: { 'Leadership': 80, 'Data Analysis': 70, 'Project Management': 75, 'Communication': 85 },
                        experienceYears: 10
                    }
                ]
            },
            'DevOps Engineering': {
                levels: [
                    { 
                        title: 'Junior DevOps Engineer',
                        salary: { min: 55000, max: 70000 },
                        requiredSkills: { 'Cloud Computing': 30, 'DevOps': 25, 'Problem Solving': 30 },
                        experienceYears: 0
                    },
                    { 
                        title: 'DevOps Engineer',
                        salary: { min: 80000, max: 100000 },
                        requiredSkills: { 'Cloud Computing': 55, 'DevOps': 60, 'Communication': 40, 'Problem Solving': 50 },
                        experienceYears: 2
                    },
                    { 
                        title: 'Senior DevOps Engineer',
                        salary: { min: 110000, max: 145000 },
                        requiredSkills: { 'Cloud Computing': 75, 'DevOps': 80, 'Leadership': 50, 'Project Management': 45 },
                        experienceYears: 5
                    },
                    { 
                        title: 'Platform Architect',
                        salary: { min: 145000, max: 190000 },
                        requiredSkills: { 'Cloud Computing': 85, 'DevOps': 85, 'Leadership': 70, 'Communication': 75 },
                        experienceYears: 8
                    }
                ]
            },
            'Cybersecurity': {
                levels: [
                    { 
                        title: 'Security Analyst I',
                        salary: { min: 60000, max: 75000 },
                        requiredSkills: { 'Cybersecurity': 40, 'Problem Solving': 35, 'Communication': 25 },
                        experienceYears: 0
                    },
                    { 
                        title: 'Security Analyst II',
                        salary: { min: 80000, max: 95000 },
                        requiredSkills: { 'Cybersecurity': 60, 'Problem Solving': 50, 'Communication': 40 },
                        experienceYears: 2
                    },
                    { 
                        title: 'Senior Security Engineer',
                        salary: { min: 110000, max: 140000 },
                        requiredSkills: { 'Cybersecurity': 80, 'Leadership': 50, 'Project Management': 45, 'Communication': 60 },
                        experienceYears: 5
                    },
                    { 
                        title: 'Security Architect',
                        salary: { min: 140000, max: 180000 },
                        requiredSkills: { 'Cybersecurity': 90, 'Leadership': 70, 'Communication': 75, 'Project Management': 65 },
                        experienceYears: 8
                    },
                    { 
                        title: 'CISO',
                        salary: { min: 200000, max: 300000 },
                        requiredSkills: { 'Cybersecurity': 85, 'Leadership': 90, 'Communication': 90, 'Project Management': 80 },
                        experienceYears: 12
                    }
                ]
            }
        };
        
        this.industryTrends = {
            'AI/Machine Learning': { growth: 15.7, demand: 'Explosive' },
            'Cybersecurity': { growth: 18.4, demand: 'Critical' },
            'Cloud Computing': { growth: 11.2, demand: 'Very High' },
            'Data Science': { growth: 13.2, demand: 'Very High' },
            'DevOps': { growth: 12.3, demand: 'High' },
            'Mobile Development': { growth: 6.8, demand: 'Stable' },
            'Web Development': { growth: 8.1, demand: 'High' }
        };
    }
    
    // Get all available skills with real-world data
    async getSkills() {
        try {
            // For now, we'll use our curated dataset
            // In production, you could enhance this with real API calls
            return this.fallbackSkills;
        } catch (error) {
            console.warn('Using fallback skills data:', error);
            return this.fallbackSkills;
        }
    }
    
    // Get career paths based on skills
    getCareerPaths() {
        return this.careerPaths;
    }
    
    // Get suggested skills for a career path
    getSkillsForCareer(careerPath) {
        if (!this.careerPaths[careerPath]) {
            return [];
        }
        
        const allRequiredSkills = new Set();
        this.careerPaths[careerPath].levels.forEach(level => {
            Object.keys(level.requiredSkills).forEach(skill => {
                allRequiredSkills.add(skill);
            });
        });
        
        return Array.from(allRequiredSkills);
    }
    
    // Get next career level based on current skills
    getNextCareerLevel(currentPath, currentSkills) {
        const path = this.careerPaths[currentPath];
        if (!path) return null;
        
        for (let level of path.levels) {
            const meetsRequirements = Object.entries(level.requiredSkills).every(([skill, required]) => {
                return currentSkills[skill] && currentSkills[skill].level >= required;
            });
            
            if (!meetsRequirements) {
                return level;
            }
        }
        
        return null; // Already at highest level
    }
    
    // Get skill recommendations based on industry trends
    getSkillRecommendations(currentSkills, careerGoal = null) {
        const recommendations = [];
        
        // High-growth skills that player doesn't have or has low level in
        Object.entries(this.fallbackSkills).forEach(([skillName, skillData]) => {
            const currentLevel = currentSkills[skillName]?.level || 0;
            
            if (currentLevel < 50 && skillData.growth > 8) {
                recommendations.push({
                    skill: skillName,
                    reason: `High growth potential (${skillData.growth}% annually)`,
                    priority: skillData.growth,
                    category: skillData.category
                });
            }
        });
        
        // Sort by priority (growth rate)
        return recommendations.sort((a, b) => b.priority - a.priority).slice(0, 5);
    }
    
    // Get salary prediction based on skills
    predictSalary(skills, location = 'US Average') {
        let baseSalary = 45000;
        let multiplier = 1;
        
        // Calculate multiplier based on skills
        Object.entries(skills).forEach(([skillName, skillData]) => {
            const skillInfo = this.fallbackSkills[skillName];
            if (skillInfo && skillData.level > 50) {
                if (skillInfo.demand === 'Very High') {
                    multiplier += (skillData.level / 100) * 0.8;
                } else if (skillInfo.demand === 'High') {
                    multiplier += (skillData.level / 100) * 0.6;
                } else {
                    multiplier += (skillData.level / 100) * 0.4;
                }
            }
        });
        
        return Math.floor(baseSalary * multiplier);
    }
    
    // Get job market insights
    getMarketInsights() {
        return {
            hotSkills: Object.entries(this.fallbackSkills)
                .filter(([_, skill]) => skill.growth > 10)
                .sort((a, b) => b[1].growth - a[1].growth)
                .slice(0, 5)
                .map(([name, skill]) => ({ name, growth: skill.growth, demand: skill.demand })),
            
            industryTrends: this.industryTrends,
            
            recommendations: [
                "AI and Machine Learning skills are showing explosive growth",
                "Cybersecurity expertise is in critical demand across all industries",
                "Cloud computing skills remain highly valuable",
                "Soft skills like Leadership and Communication are essential for career advancement"
            ]
        };
    }
    
    // Generate networking events based on real industry events
    generateNetworkingEvents() {
        return [
            {
                name: "AI & ML Meetup",
                description: "Connect with data scientists and ML engineers",
                skillBonus: "Machine Learning",
                reward: { connections: 3, influence: 8 },
                cost: 0,
                duration: "2 hours"
            },
            {
                name: "DevOps Conference",
                description: "Learn about modern deployment practices",
                skillBonus: "DevOps",
                reward: { connections: 4, influence: 10 },
                cost: 50,
                duration: "Full day"
            },
            {
                name: "Cybersecurity Workshop",
                description: "Hands-on security training session",
                skillBonus: "Cybersecurity",
                reward: { connections: 2, influence: 12 },
                cost: 75,
                duration: "Half day"
            },
            {
                name: "Leadership Seminar",
                description: "Develop your management skills",
                skillBonus: "Leadership",
                reward: { connections: 3, influence: 6 },
                cost: 25,
                duration: "3 hours"
            },
            {
                name: "Tech Startup Pitch Night",
                description: "Network with entrepreneurs and investors",
                skillBonus: "Communication",
                reward: { connections: 5, influence: 15 },
                cost: 20,
                duration: "Evening"
            }
        ];
    }
}

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillsAPI;
} else {
    window.SkillsAPI = SkillsAPI;
}