const exercises = [
  {
    title: "Strict Pull-Up",
    category: "pull",
    cues: [
      "Dead hang with full shoulder elevation at bottom.",
      "Depress scapula before initiating the pull.",
      "Drive elbows down toward hips until chin clears bar."
    ]
  },
  {
    title: "Skin the Cat",
    category: "core",
    cues: [
      "Invert smoothly into straight-arm tuck.",
      "Pass legs under bar into German Hang position.",
      "Engage shoulders to pull back through to start."
    ]
  },
  {
    title: "Parallel Bar Dip",
    category: "push",
    cues: [
      "Maintain active shoulders at top lock-out.",
      "Slight forward lean to engage chest.",
      "Lower until shoulders drop below elbow joint level."
    ]
  },
  {
    title: "Monkey Bar Traverse",
    category: "pull",
    cues: [
      "Maintain momentum using controlled hip swings.",
      "Keep shoulders engaged throughout each reach.",
      "Grip each bar firmly before releasing the trailing arm."
    ]
  },
  {
    title: "Freestyle Swim Recovery",
    category: "core",
    cues: [
      "Focus on long, smooth arm reaches and rhythmic breathing.",
      "Engage core to maintain a high, horizontal water position.",
      "Serves as low-impact cardio recovery after intense bar work."
    ]
  }
];

const grid = document.getElementById('exerciseGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');

let currentCategory = 'all';
let searchQuery = '';

function renderCards() {
  grid.innerHTML = '';
  
  const filtered = exercises.filter(ex => {
    const matchesCategory = currentCategory === 'all' || ex.category === currentCategory;
    const matchesSearch = ex.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #94a3b8;">No exercises found matching your search.</p>`;
    return;
  }

  filtered.forEach(ex => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div>
        <h3>${ex.title}</h3>
        <span class="badge ${ex.category}">${ex.category}</span>
        <ul class="cues-list">
          ${ex.cues.map(cue => `<li>${cue}</li>`).join('')}
        </ul>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Category Filter Listener
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    renderCards();
  });
});

// Live Search Listener
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderCards();
});

// Initial Render
renderCards();