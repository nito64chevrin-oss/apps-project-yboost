// Fetch and display all achievements
async function loadAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    
    try {
        console.log('Fetching achievements from /api/achievements...');
        const response = await fetch('/api/achievements');
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch achievements: ${response.status} ${response.statusText}`);
        }
        
        const achievements = await response.json();
        console.log('Achievements loaded:', achievements.length);
        
        if (achievements.length === 0) {
            achievementsList.innerHTML = '<div class="error">No achievements found. Make sure the server is running with "npm start".</div>';
            return;
        }
        
        achievementsList.innerHTML = achievements.map(achievement => `
            <div class="achievement-card" onclick="goToAchievement('${achievement.achievement_id}')">
                <img 
                    src="${achievement.image_url || '/images/achievement-placeholder.png'}" 
                    alt="${achievement.name}"
                    class="achievement-image"
                    onerror="this.src='/images/achievement-placeholder.png'"
                >
                <div class="achievement-info">
                    <h3>${achievement.name}</h3>
                    ${achievement.description ? `<p>${achievement.description}</p>` : ''}
                </div>
                <div class="achievement-difficulty">
                    ${achievement.difficulty || 'Easy'}
                </div>
                <div class="achievement-percentage">
                    ${achievement.percentage || '0'}%
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading achievements:', error);
        achievementsList.innerHTML = `
            <div class="error">
                <h3>Server Not Running</h3>
                <p>The server needs to be started. Please run:</p>
                <pre style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin: 15px 0;">npm install
npm start</pre>
                <p>Then refresh this page.</p>
                <p style="font-size: 0.9em; color: #888; margin-top: 15px;">Error: ${error.message}</p>
            </div>
        `;
    }
}

function goToAchievement(achievementId) {
    window.location.href = `/achievement/${achievementId}`;
}

// Load achievements when page loads
document.addEventListener('DOMContentLoaded', loadAchievements);
