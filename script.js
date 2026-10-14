/**
 * MINI-PROJECT #1: APEX AUTOMATION INTERACTIVE LOGIC
 * Concepts: Event Listeners, DOM Selection, Class Toggling, Smooth Scrolling
 * Source Reference: developer-roadmap (Frontend > JavaScript Basics)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. BILLING SWITCH TOGGLE (Project vs Retainer)
  const billingToggle = document.getElementById('billingToggle');
  const labelProject = document.getElementById('label-project');
  const labelRetainer = document.getElementById('label-retainer');
  const priceAmounts = document.querySelectorAll('.price-amount');
  const pricePeriods = document.querySelectorAll('.price-period');

  let isRetainer = false;

  billingToggle.addEventListener('click', () => {
    isRetainer = !isRetainer;
    billingToggle.classList.toggle('retainer-active', isRetainer);
    labelProject.classList.toggle('active', !isRetainer);
    labelRetainer.classList.toggle('active', isRetainer);

    priceAmounts.forEach((price) => {
      const projectPrice = price.getAttribute('data-project');
      const retainerPrice = price.getAttribute('data-retainer');
      price.textContent = isRetainer ? retainerPrice : projectPrice;
    });

    pricePeriods.forEach((period) => {
      period.textContent = isRetainer ? '/month' : '/project';
    });
  });

  // 2. AUTOMATIC TIER PRE-SELECTION & SMOOTH SCROLL
  const selectTierButtons = document.querySelectorAll('.select-tier-btn');
  const tierSelectDropdown = document.getElementById('selectedTier');
  const intakeSection = document.getElementById('intake');

  selectTierButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const planName = button.getAttribute('data-plan');
      
      // Auto-update the dropdown in the intake form
      for (let option of tierSelectDropdown.options) {
        if (option.value === planName) {
          option.selected = true;
          break;
        }
      }

      // Smooth scroll to intake form
      intakeSection.scrollIntoView({ behavior: 'smooth' });

      // Visual highlight on dropdown
      tierSelectDropdown.focus();
      tierSelectDropdown.style.borderColor = '#38bdf8';
      setTimeout(() => {
        tierSelectDropdown.style.borderColor = '';
      }, 1200);
    });
  });

  // 3. INTAKE FORM SUBMISSION HANDLING (Interactive feedback)
  const leadForm = document.getElementById('leadForm');
  const submitBtn = document.getElementById('submitBtn');
  const formFeedback = document.getElementById('formFeedback');

  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const selectedPlan = tierSelectDropdown.value;

    // Simulate instant client response
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Transmitting Scope...</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Submit Scope for Immediate Review</span>';
      
      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        <strong>Proposal Request Received!</strong><br>
        Thank you, ${clientName}. We received your scope for <em>${selectedPlan}</em>. A confirmation has been dispatched to <u>${clientEmail}</u>.
      `;
      
      leadForm.reset();
    }, 800);
  });
});
