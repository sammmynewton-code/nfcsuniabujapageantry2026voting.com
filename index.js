// ===== CONTESTANT DATA =====
const contestants = [
  {
    id: 1,
    name: "Margaret Ukamaka",
    title: "Contestant #1",
    bio: "A passionate advocate for women's empowerment and community development with a heart of gold.",
    instagram: "nfcs.uniabuja",
    votes: 0,
    image: "images/contestant_1.png"
  },
  {
    id: 2,
    name: "Amara Okafor",
    title: "Contestant #2",
    bio: "A vibrant spirit with a love for the arts, championing cultural heritage through creative expression.",
    instagram: "nfcs.uniabuja",
    votes: 0,
    image: "images/contestant_2.png"
  },
  {
    id: 3,
    name: "Chidinma Eze",
    title: "Contestant #3",
    bio: "An ambitious entrepreneur dedicated to sustainable fashion and environmental conservation.",
    instagram: "nfcs.uniabuja",
    votes: 0,
    image: "images/contestant_3.png"
  },
  {
    id: 4,
    name: "Blessing Adeyemi",
    title: "Contestant #4",
    bio: "A talented singer and philanthropist committed to uplifting underprivileged youth through education.",
    instagram: "nfcs.uniabuja",
    votes: 0,
    image: "images/contestant_4.png"
  },
  {
    id: 5,
    name: "Ngozi Nwosu",
    title: "Contestant #5",
    bio: "A dedicated healthcare professional with a vision for accessible healthcare across rural communities.",
    instagram: "nfcs.uniabuja",
    votes: 0,
    image: "images/contestant_5.png"
  },
  {
    id: 6,
    name: "Fatima Ibrahim",
    title: "Contestant #6",
    bio: "A tech-savvy innovator building bridges between tradition and modernity through digital storytelling.",
    instagram: "nfcs.uniabuja",
    votes: 0,
    image: "images/contestant_6.png"
  },
  {
    id: 7,
    name: "Adaeze Obi",
    title: "Contestant #7",
    bio: "A graceful dancer and fitness enthusiast promoting wellness and self-care in every community she touches.",
    instagram: "nfcs.uniabuja",
    votes: 0,
    image: null
  },
  {
    id: 8,
    name: "Kemi Afolabi",
    title: "Contestant #8",
    bio: "A bright young lawyer passionate about human rights and gender equality across Africa.",
    instagram: "nfcs.uniabuja",
    votes: 0,
    image: null
  },
  {
    id: 9,
    name: "Zainab Mohammed",
    title: "Contestant #9",
    bio: "A multilingual writer and poet using words to inspire change and celebrate African beauty.",
    instagram: "nfcs.uniabuja",
    votes: 0,
    image: null
  },
  {
    id: 10,
    name: "Ijeoma Chukwu",
    title: "Contestant #10",
    bio: "A culinary artist blending traditional recipes with modern flair to showcase Nigeria's rich food culture.",
    instagram: "nfcs.uniabuja",
    votes: 0,
    image: null
  },
  {
    id: 11,
    name: "Nneka Obiora",
    title: "Contestant #11",
    bio: "An architectural student designing eco-friendly spaces that celebrate the beauty of African landscapes.",
    instagram: "nfcs.uniabuja",
    votes: 0,
    image: null
  }
];

// ===== GRADIENT CLASSES FOR PLACEHOLDER AVATARS =====
const gradientClasses = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4', 'gradient-5'];

// ===== STATE =====
let currentSort = 'votes'; // 'votes' or 'name'
let searchQuery = '';

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  renderContestants();
  renderLeaderboard();
  updateHeroStats();
  setupEventListeners();
  setupScrollAnimations();
});

// ===== RENDER CONTESTANTS =====
function renderContestants() {
  const grid = document.getElementById('contestants-grid');
  let filtered = getFilteredSortedContestants();

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No contestants found</h3>
        <p>Try a different search term</p>
      </div>
    `;
    return;
  }

  // Get sorted by votes for ranking
  const sortedByVotes = [...contestants].sort((a, b) => b.votes - a.votes);
  const rankMap = {};
  sortedByVotes.forEach((c, i) => rankMap[c.id] = i + 1);

  grid.innerHTML = filtered.map((contestant, index) => {
    const rank = rankMap[contestant.id];
    const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';
    const initials = contestant.name.split(' ').map(n => n[0]).join('');
    const gradientIndex = (contestant.id - 1) % gradientClasses.length;

    const imageHtml = contestant.image
      ? `<img src="${contestant.image}" alt="${contestant.name}" loading="lazy">`
      : `<div class="placeholder-avatar ${gradientClasses[gradientIndex]}">${initials}</div>`;

    return `
      <div class="contestant-card" style="animation-delay: ${index * 0.08}s">
        <div class="card-rank ${rankClass}">${rank}</div>
        <div class="card-image">
          ${imageHtml}
          <div class="image-overlay"></div>
        </div>
        <div class="card-body">
          <h3 class="card-name">${contestant.name}</h3>
          <div class="card-title">${contestant.title}</div>
          <p class="card-bio">${contestant.bio}</p>
          <div class="card-stats">
            <div class="vote-count">
              <span class="vote-icon">❤️</span>
              <span class="count" data-target="${contestant.votes}">${formatNumber(contestant.votes)}</span>
              <span class="count-label">votes</span>
            </div>
            <button class="vote-btn" onclick="openInstagram('${contestant.instagram}')" title="Follow @${contestant.instagram} to vote">
              <svg class="ig-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Vote Now
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== RENDER LEADERBOARD =====
function renderLeaderboard() {
  const tbody = document.getElementById('leaderboard-body');
  const sorted = [...contestants].sort((a, b) => b.votes - a.votes);
  const maxVotes = sorted[0].votes;

  tbody.innerHTML = sorted.map((contestant, index) => {
    const rank = index + 1;
    const rankColorClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
    const percentage = (contestant.votes / maxVotes * 100).toFixed(1);
    const initials = contestant.name.split(' ').map(n => n[0]).join('');
    const gradientIndex = (contestant.id - 1) % gradientClasses.length;

    const avatarHtml = contestant.image
      ? `<img class="mini-avatar" src="${contestant.image}" alt="${contestant.name}">`
      : `<div class="mini-avatar-placeholder ${gradientClasses[gradientIndex]}">${initials}</div>`;

    return `
      <tr>
        <td class="rank-cell ${rankColorClass}">${rank <= 3 ? ['👑', '🥈', '🥉'][rank - 1] : rank}</td>
        <td>
          <div class="name-cell">
            ${avatarHtml}
            <div class="name-info">
              <span class="name">${contestant.name}</span>
              <span class="handle">@${contestant.instagram}</span>
            </div>
          </div>
        </td>
        <td class="votes-cell">${formatNumber(contestant.votes)}</td>
        <td class="progress-cell">
          <div class="vote-bar-wrapper">
            <div class="vote-bar" style="width: ${percentage}%"></div>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ===== HERO STATS =====
function updateHeroStats() {
  const totalVotes = contestants.reduce((sum, c) => sum + c.votes, 0);
  document.getElementById('total-votes').textContent = formatNumber(totalVotes);
  document.getElementById('total-contestants').textContent = contestants.length;
}

// ===== FILTER & SORT =====
function getFilteredSortedContestants() {
  let result = [...contestants];

  // Filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    result = result.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.instagram.toLowerCase().includes(q) ||
      c.bio.toLowerCase().includes(q)
    );
  }

  // Sort
  if (currentSort === 'votes') {
    result.sort((a, b) => b.votes - a.votes);
  } else {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Search
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderContestants();
  });

  // Sort buttons
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSort = btn.dataset.sort;
      renderContestants();
    });
  });

  // Mobile nav
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// ===== OPEN INSTAGRAM =====
function openInstagram(handle) {
  window.open(`https://www.instagram.com/${handle}`, '_blank', 'noopener,noreferrer');
}

// ===== FORMAT NUMBER =====
function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
