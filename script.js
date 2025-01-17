const passwordInput = document.getElementById('password');
const criteria = {
  length: document.getElementById('length'),
  uppercase: document.getElementById('uppercase'),
  lowercase: document.getElementById('lowercase'),
  number: document.getElementById('number'),
  special: document.getElementById('special'),
  sequence: document.getElementById('sequence'),
  unique: document.getElementById('unique'),
  spaces: document.getElementById('spaces')
};

const strengthIndicator = document.getElementById('strength');

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;

  // Check length
  toggleValid(criteria.length, password.length >= 8);

  // Check uppercase letters
  toggleValid(criteria.uppercase, /[A-Z]/.test(password));

  // Check lowercase letters
  toggleValid(criteria.lowercase, /[a-z]/.test(password));

  // Check numbers
  toggleValid(criteria.number, /\d/.test(password));

  // Check special characters
  toggleValid(criteria.special, /[!@#$%^&*(),.?":{}|<>]/.test(password));

  // Check repeated sequences
  toggleValid(criteria.sequence, !/(\w{2,})\1/.test(password));

  // Check unique characters
  const uniqueChars = new Set(password);
  toggleValid(criteria.unique, uniqueChars.size >= 4);

  // Check no spaces
  toggleValid(criteria.spaces, !/\s/.test(password));
  updateStrength(password);
});


function toggleValid(element, isValid) {
  element.classList.toggle('valid', isValid);
  const icon = element.querySelector('.icon');
  icon.textContent = isValid ? '\u2714' : '\u2716';
  icon.className = `icon ${isValid ? 'tick' : 'cross'}`;
}

function updateStrength(password) {
  let validCount = 0;
  for (const key in criteria) {
    if (criteria[key].classList.contains('valid')) {
      validCount++;
    }
  }

  if (validCount <= 3) {
    strengthIndicator.textContent = 'Password Strength: Weak';
    strengthIndicator.className = 'strength weak';
  } else if (validCount <= 6) {
    strengthIndicator.textContent = 'Password Strength: Medium';
    strengthIndicator.className = 'strength medium';
  } else {
    strengthIndicator.textContent = 'Password Strength: Strong';
    strengthIndicator.className = 'strength strong';
  }
}

document.getElementById('submit-password').addEventListener('click', () => {
  // Check if all criteria are met
  const allCriteriaMet = Object.values(criteria).every(element =>
    element.id !== 'submit-container' && element.classList.contains('valid')
  );

  if (allCriteriaMet) {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
    passwordInput.value = ''; // Clear the password input
    // Reset all criteria indicators
    Object.values(criteria).forEach(element => {
      if (element.id !== 'submit-container') {
        toggleValid(element, false);
      }
    });
  } else {
    alert('Please meet all password criteria before submitting.');
  }
});
