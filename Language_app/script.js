// Login function to authenticate the user
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username && password) {
    alert(`Welcome, ${username}!`);
    document.querySelector('.auth-container').style.display = 'none';
    document.querySelector('.deck-container').style.display = 'block';
  } else {
    alert('Please enter both your username and password.');
  }
}

// Function to create a new deck
function createDeck() {
  const deckName = document.getElementById('deckName').value.trim();

  if (deckName) {
    const decksContainer = document.getElementById('decks');
    const deck = document.createElement('div');
    deck.className = 'deck';
    deck.textContent = deckName;

    // Add event listener for selecting the deck
    deck.addEventListener('click', () => {
      alert(`You selected the "${deckName}" deck.`);
    });

    decksContainer.appendChild(deck);
    document.getElementById('deckName').value = ''; // Clear the input field
  } else {
    alert('Please enter a deck name.');
  }
}

// Function to toggle the flashcard (flip effect)
function toggleCard(card) {
  const inner = card.querySelector('.flashcard-inner');
  const isFlipped = inner.style.transform === 'rotateY(180deg)';
  inner.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
}

// Function to share the flashcard on social media
function shareCard(platform) {
  const message = 'Check out this flashcard: English: Hello -> French: Bonjour';
  let url;

  switch (platform) {
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
      break;
    case 'twitter':
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
      break;
    default:
      console.error('Unsupported platform for sharing.');
      return;
  }

  window.open(url, '_blank');
}

// Function to fetch translation using MyMemory API
async function fetchTranslation(word, fromLang = 'en', toLang = 'fr') {
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${fromLang}|${toLang}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    if (data.responseData) {
      console.log(`Translation (${fromLang} to ${toLang}): ${data.responseData.translatedText}`);
    } else {
      console.error('No translation data received.');
    }
  } catch (error) {
    console.error('Error fetching translation:', error.message);
  }
}

// Example usage of fetchTranslation function
fetchTranslation('hello');

// Function to unlock the 'Flashcard Master' badge
function checkBadgeUnlock(completions) {
  const badgeThreshold = 10;

  if (completions >= badgeThreshold) {
    alert("Congratulations! You unlocked the 'Flashcard Master' badge!");
  }
}

// Example: dynamically tracked user completions
let userCompletions = 10;
checkBadgeUnlock(userCompletions);

// Calculate progress function
const calculateProgress = (reviewedCards, totalCards) => {
  return (reviewedCards / totalCards) * 100;
};

// React component: Flashcard Deck with progress tracking
import React, { useState } from 'react';

const FlashcardDeck = ({ totalCards }) => {
  const [reviewedCards, setReviewedCards] = useState(0);

  const handleNextCard = () => {
    setReviewedCards((prev) => Math.min(prev + 1, totalCards));
  };

  const progress = calculateProgress(reviewedCards, totalCards);

  return (
    <div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{progress.toFixed(0)}% Complete</p>

      {/* Flashcard component here */}
      <button onClick={handleNextCard}>Next Card</button>
    </div>
  );
};
document.getElementById('share-button').addEventListener('click', () => {
  const shareOptions = document.getElementById('share-options');
  shareOptions.classList.toggle('hidden');
});

const url = encodeURIComponent(window.location.href);
const text = encodeURIComponent("Check out this amazing app!");

document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
document.getElementById('share-whatsapp').href = `https://api.whatsapp.com/send?text=${text} ${url}`;
document.getElementById('share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
