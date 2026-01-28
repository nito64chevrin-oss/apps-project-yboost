// Get achievement ID from URL
function getAchievementId() {
    const path = window.location.pathname;
    const parts = path.split('/');
    return parts[parts.length - 1];
}

// Fetch and display achievement details
async function loadAchievementDetail() {
    const achievementDetail = document.getElementById('achievementDetail');
    const achievementId = getAchievementId();
    
    try {
        const response = await fetch(`/api/achievements/${achievementId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Achievement not found');
            }
            throw new Error('Failed to fetch achievement details');
        }
        
        const achievement = await response.json();
        
        // Parse characters if it's a string
        let characters = [];
        if (achievement.characters) {
            if (typeof achievement.characters === 'string') {
                try {
                    characters = JSON.parse(achievement.characters);
                } catch (e) {
                    characters = achievement.characters;
                }
            } else {
                characters = achievement.characters;
            }
        }
        
        achievementDetail.innerHTML = `
            <div class="detail-header">
                <h2>${achievement.name}</h2>
                <p>${achievement.description || 'No description available'}</p>
                ${achievement.points ? `<span class="achievement-points">${achievement.points} points</span>` : ''}
            </div>
            
            <div class="detail-content">
                <div class="guide-section">
                    <h3>About This Achievement</h3>
                    <p>${achievement.guide_description || 'No additional information available.'}</p>
                </div>
                
                <div class="guide-section">
                    <h3>How to Complete</h3>
                    <p>${achievement.how_to_complete || 'Guide coming soon.'}</p>
                </div>
                
                ${characters && characters.length > 0 ? `
                    <div class="characters-section">
                        <h4>Related Characters</h4>
                        <div class="character-links">
                            ${characters.map(char => `
                                <a href="${char.fandom_url}" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   class="character-link">
                                    ${char.name}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
        
        // Update page title
        document.title = `${achievement.name} - Alan Wake Guide`;
        
    } catch (error) {
        console.error('Error loading achievement details:', error);
        achievementDetail.innerHTML = `
            <div class="error">
                ${error.message === 'Achievement not found' 
                    ? 'Achievement not found. Please check the URL and try again.' 
                    : 'Error loading achievement details. Please try again later.'}
            </div>
        `;
    }
}

// Load achievement details when page loads
document.addEventListener('DOMContentLoaded', loadAchievementDetail);
