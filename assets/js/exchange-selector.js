// Exchange Program Selector Logic
// Ayachi Samyal — Frameworks

const programs = {
  kakehashi: {
    name: "Asia Kakehashi Project",
    eligibility: ["high-school"],
    goals: ["cultural", "language"],
    japanese: ["none", "n5-n4"],
    budget: ["minimal"],
    duration: ["year"],
    description: "Full-year government-funded cultural ambassadorship. One of the most selective programs (1:300+ ratio). Complete immersion in Japanese high school with host family placement.",
    guide: "/research/guides/kakehashi-guide.html"
  },
  jenesys: {
    name: "JENESYS Programme",
    eligibility: ["undergraduate", "graduate"],
    goals: ["cultural", "professional"],
    japanese: ["none", "n5-n4", "n3-n2"],
    budget: ["minimal"],
    duration: ["short"],
    description: "Short-term government-sponsored exchange (7-10 days). Focus on cultural exposure, professional networking, and regional cooperation. Less selective than Kakehashi.",
    guide: null
  },
  jet: {
    name: "JET Programme",
    eligibility: ["graduate", "working"],
    goals: ["teaching", "professional", "cultural"],
    japanese: ["none", "n5-n4", "n3-n2", "n1"],
    budget: ["minimal"],
    duration: ["year", "long"],
    description: "Teaching assistant positions in Japanese schools. Paid employment (¥3.3M+ annually). Requires bachelor's degree. 1-5 year contracts.",
    guide: null
  },
  mext: {
    name: "MEXT Scholarship",
    eligibility: ["undergraduate", "graduate"],
    goals: ["academic"],
    japanese: ["n3-n2", "n1"],
    budget: ["minimal"],
    duration: ["year", "long"],
    description: "Full scholarship for degree studies in Japan. Covers tuition, living expenses, and airfare. Highly competitive. Requires strong Japanese language ability.",
    guide: null
  },
  university: {
    name: "University Exchange Programs",
    eligibility: ["undergraduate"],
    goals: ["academic", "language", "cultural"],
    japanese: ["none", "n5-n4", "n3-n2"],
    budget: ["moderate", "flexible"],
    duration: ["semester", "year"],
    description: "Partner university exchange for academic credit. Costs vary. Some require Japanese proficiency, others offer English-taught courses.",
    guide: null
  },
  private: {
    name: "Private Exchange Organizations",
    eligibility: ["high-school", "undergraduate"],
    goals: ["language", "cultural"],
    japanese: ["none", "n5-n4"],
    budget: ["flexible"],
    duration: ["short", "semester", "year"],
    description: "Organizations like AFS, YFU, CIEE. Variable costs (₹2L-₹8L+). Less competitive selection. More flexible program structures.",
    guide: null
  }
};

function calculateMatch(userProfile, program) {
  let score = 0;
  let matches = [];
  
  // Level match (required)
  if (program.eligibility.includes(userProfile.level)) {
    score += 30;
    matches.push("education level");
  } else {
    return { score: 0, matches: [] }; // Ineligible
  }
  
  // Goal alignment
  if (program.goals.includes(userProfile.goal)) {
    score += 25;
    matches.push("goals");
  }
  
  // Language level
  if (program.japanese.includes(userProfile.japanese)) {
    score += 20;
    matches.push("language level");
  }
  
  // Budget
  if (program.budget.includes(userProfile.budget)) {
    score += 15;
    matches.push("budget");
  }
  
  // Duration
  if (program.duration.includes(userProfile.duration)) {
    score += 10;
    matches.push("duration");
  }
  
  return { score, matches };
}

function renderResults(userProfile) {
  const resultsDiv = document.getElementById('results');
  const resultsListDiv = document.getElementById('resultsList');
  
  // Calculate scores
  let scoredPrograms = [];
  for (let key in programs) {
    let match = calculateMatch(userProfile, programs[key]);
    if (match.score > 0) {
      scoredPrograms.push({
        key,
        ...programs[key],
        score: match.score,
        matches: match.matches
      });
    }
  }
  
  // Sort by score
  scoredPrograms.sort((a, b) => b.score - a.score);
  
  // Render
  resultsListDiv.innerHTML = '';
  scoredPrograms.forEach((prog, index) => {
    const isTop = index === 0;
    const resultDiv = document.createElement('div');
    resultDiv.className = `result-item ${isTop ? 'top-match' : ''}`;
    
    resultDiv.innerHTML = `
      ${isTop ? '<div class="result-rank">Best Match</div>' : ''}
      <h4>${prog.name}</h4>
      <p>${prog.description}</p>
      <div class="result-match">Matches: ${prog.matches.join(', ')} (${prog.score}% fit)</div>
      ${prog.guide ? `<a href="${prog.guide}" class="result-link">Read Application Guide →</a>` : ''}
    `;
    
    resultsListDiv.appendChild(resultDiv);
  });
  
  // Show results, hide form
  document.getElementById('exchangeForm').style.display = 'none';
  resultsDiv.style.display = 'block';
}

function resetForm() {
  document.getElementById('exchangeForm').reset();
  document.getElementById('exchangeForm').style.display = 'block';
  document.getElementById('results').style.display = 'none';
}

// Form submission
document.getElementById('exchangeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const userProfile = {
    level: formData.get('level'),
    goal: formData.get('goal'),
    japanese: formData.get('japanese'),
    budget: formData.get('budget'),
    duration: formData.get('duration')
  };
  
  renderResults(userProfile);
});
