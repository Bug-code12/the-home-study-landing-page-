// Particle background system removed

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value;
      const whatsappNumber = document.getElementById("whatsappNumber").value;
      const email = document.getElementById("email").value;
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;

      // Basic validation
      if (!fullName.trim()) {
        alert("Please enter your full name");
        return;
      }
      if (!whatsappNumber.trim()) {
        alert("Please enter your WhatsApp number");
        return;
      }
      if (!email.trim() || !email.includes("@")) {
        alert("Please enter a valid email address");
        return;
      }

      try {
        // Update button state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        // Determine the base URL based on how the page is accessed
        const isLocalFile = window.location.protocol === 'file:';
        const baseUrl = isLocalFile ? 'http://localhost:3000' : '';
        
        // Send data to server
        const response = await fetch(`${baseUrl}/api/submit-form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            whatsappNumber,
            email
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Something went wrong');
        }

        // Show success message
        alert("Thank you for your interest! We will contact you soon.");
        this.reset();
      } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Failed to submit form. Please try again.');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add interactive button effects
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })

  // FAQ interaction
  document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', function() {
      const checkbox = this.parentElement.querySelector('.faq-checkbox');
      checkbox.checked = !checkbox.checked;
    });
  });
})
document.addEventListener('DOMContentLoaded', function() {
    // Select all sections that you want to animate
    const sections = document.querySelectorAll('#home, #features, #faqs-section, #registered-section');

    // Check if sections are selected correctly
    if (sections.length === 0) {
        console.error('No sections found. Check your selectors.');
        return;
    }

    // Set initial styles for each section
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1s ease-in-out, transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
        section.style.visibility = 'visible';
    });

    // Function to check if a section is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 150 &&
            rect.bottom >= 0
        );
    }

    // Function to check visibility and apply animations
    function checkVisibility() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Add event listener for scroll events
    window.addEventListener('scroll', checkVisibility);

    // Check visibility on page load
    checkVisibility();
});
