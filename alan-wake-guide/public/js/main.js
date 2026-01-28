// Fetch and display all achievements
async function loadAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    
    try {
        const response = await fetch('/api/achievements');
        
        if (!response.ok) {
            throw new Error('Failed to fetch achievements');
        }
        
        const achievements = await response.json();
        
        if (achievements.length === 0) {
            achievementsList.innerHTML = '<div class="error">No achievements found.</div>';
            return;
        }
        
        achievementsList.innerHTML = achievements.map(achievement => `
            <div class="achievement-card" onclick="goToAchievement('${achievement.achievement_id}')">
                <img 
                    src="${achievement.image_url || 'https://via.placeholder.com/150/e94560/FFFFFF?text=Achievement'}" 
                    alt="${achievement.name}"
                    class="achievement-image"
                >
                <div class="achievement-info">
                    <h3>${achievement.name}</h3>
                    <p>${achievement.description || 'No description available'}</p>
                    ${achievement.points ? `<span class="achievement-points">${achievement.points} points</span>` : ''}
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading achievements:', error);
        achievementsList.innerHTML = '<div class="error">Error loading achievements. Please try again later.</div>';
    }
}

function goToAchievement(achievementId) {
    window.location.href = `/achievement/${achievementId}`;
}

// Load achievements when page loads
document.addEventListener('DOMContentLoaded', loadAchievements);
