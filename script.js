// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to scroll to contact section
function scrollToContact() {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Basic form validation
    if (!name || !phone || !service) {
        alert('Please fill in all required fields');
        return false;
    }
    
    // Phone number validation (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Thank you for your request! We will contact you shortly.');
    event.target.reset();
    return false;
}

// Review Modal Functions
function openReviewModal() {
    document.getElementById('reviewModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Handle star rating
const ratingStars = document.querySelectorAll('.rating-input i');
let selectedRating = 0;

ratingStars.forEach(star => {
    star.addEventListener('mouseover', function() {
        const rating = this.dataset.rating;
        updateStars(rating);
    });

    star.addEventListener('mouseout', function() {
        updateStars(selectedRating);
    });

    star.addEventListener('click', function() {
        selectedRating = this.dataset.rating;
        document.getElementById('reviewRating').value = selectedRating;
        updateStars(selectedRating);
    });
});

function updateStars(rating) {
    ratingStars.forEach(star => {
        const starRating = star.dataset.rating;
        if (starRating <= rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

// Handle review form submission
function handleReviewSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('reviewName').value;
    const rating = document.getElementById('reviewRating').value;
    const reviewText = document.getElementById('reviewText').value;

    if (!rating) {
        alert('Please select a rating');
        return false;
    }

    // Create new review card
    const reviewCard = document.createElement('div');
    reviewCard.className = 'swiper-slide';
    reviewCard.innerHTML = `
        <div class="review-card">
            <div class="review-profile">
                <img src="images/default-avatar.jpg" alt="${name}" class="review-avatar">
                <div class="review-info">
                    <h4>${name}</h4>
                    <div class="stars">
                        ${Array(5).fill().map((_, i) => `
                            <i class="fas fa-star${i >= rating ? ' inactive' : ''}"></i>
                        `).join('')}
                    </div>
                </div>
            </div>
            <p class="review-text">"${reviewText}"</p>
        </div>
    `;

    // Add the new review to the slider
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.appendChild(reviewCard);

    // Reset form and close modal
    document.getElementById('reviewForm').reset();
    selectedRating = 0;
    updateStars(0);
    closeReviewModal();

    // Update swiper to include new slide
    reviewSwiper.update();

    return false;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('reviewModal');
    if (event.target === modal) {
        closeReviewModal();
    }
}

// Review form submission handler
function handleReviewSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('reviewName').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    const service = document.getElementById('reviewService').value;
    const reviewText = document.getElementById('reviewText').value;
    
    // Basic form validation
    if (!name || !rating || !service || !reviewText) {
        alert('Please fill in all fields and select a rating');
        return false;
    }
    
    // Create new review card
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    
    // Add review content
    reviewCard.innerHTML = `
        <div class="review-profile">
            <div class="review-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="review-info">
                <h3>${name}</h3>
                <div class="review-stars">
                    ${Array(5).fill('').map((_, index) => 
                        `<i class="fas fa-star${index >= rating ? '-o' : ''}"></i>`
                    ).join('')}
                </div>
            </div>
        </div>
        <p class="review-text">"${reviewText}"</p>
        <span class="review-date">Just now</span>
    `;
    
    // Add the new review to the container
    const reviewContainer = document.querySelector('.review-container');
    reviewContainer.insertBefore(reviewCard, reviewContainer.firstChild);
    
    // Reset form
    event.target.reset();
    
    // Show success message
    alert('Thank you for your review! Your feedback helps us improve our services.');
    
    return false;
}

// Initialize star rating hover effect
document.querySelectorAll('.star-rating label').forEach((star, index) => {
    star.addEventListener('mouseover', () => {
        document.querySelectorAll('.star-rating label').forEach((s, i) => {
            s.style.color = i <= index ? '#ffc107' : '#ddd';
        });
    });
    
    star.addEventListener('mouseout', () => {
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        document.querySelectorAll('.star-rating label').forEach((s, i) => {
            s.style.color = i < rating ? '#ffc107' : '#ddd';
        });
    });
});

// Add shadow to header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Animate services cards on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    });
});

// Resize handler to reset mobile menu state
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 767) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    }, 250);
});
