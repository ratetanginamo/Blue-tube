// js/youtube-api.js
const API_BASE = "http://127.0.0.1:3000/api";

/**
 * Fetch a single video by ID
 */
async function fetchVideoById(videoId){
    const res = await fetch(`${API_BASE}/video/${videoId}`);
    const data = await res.json();
    if(data.error) throw new Error(data.error);
    return data;
}

/**
 * Search videos by query
 * Requires backend /api/search endpoint
 */
async function searchVideos(query, maxResults = 10){
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&maxResults=${maxResults}`);
    const data = await res.json();
    if(data.error) throw new Error(data.error);
    return data.items || [];
}

/**
 * Format numbers like 1500 → 1.5K, 2300000 → 2.3M
 */
function formatNumber(num){
    if(num >= 1e6) return (num/1e6).toFixed(1) + "M";
    if(num >= 1e3) return (num/1e3).toFixed(1) + "K";
    return num.toString();
}

/**
 * Persistent video state
 */
async function getVideoState(videoId){
    const res = await fetch(`${API_BASE}/videoState/${videoId}`);
    return res.json();
}

async function saveVideoState(videoId, state){
    const res = await fetch(`${API_BASE}/videoState/${videoId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
    });
    return res.json();
}

/**
 * Make functions globally accessible
 */
window.fetchVideoById = fetchVideoById;
window.searchVideos = searchVideos;
window.formatNumber = formatNumber;
window.getVideoState = getVideoState;
window.saveVideoState = saveVideoState;
  
