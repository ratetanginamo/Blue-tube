// js/youtube-api.js
const API_BASE = "http://127.0.0.1:3000/api";

async function fetchVideoById(videoId){
  const res = await fetch(`${API_BASE}/video/${videoId}`);
  const data = await res.json();
  if(!data.items || data.items.length === 0) throw new Error("Video not found");
  return data.items[0];
}

async function searchVideos(query, maxResults=10){
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&maxResults=${maxResults}`);
  const data = await res.json();
  return data.items || [];
}

function formatNumber(num){
  if(num>=1e6) return (num/1e6).toFixed(1)+"M";
  if(num>=1e3) return (num/1e3).toFixed(1)+"K";
  return num;
}
