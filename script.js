// Modern Trending Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
    
    // Initialize hamburger menu
    initializeHamburgerMenu();
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
    
    // Generate time slots on page load
    generateTimeSlots();
    
    // Event listeners
    dateInput.addEventListener('change', generateTimeSlots);
    document.getElementById('bookingForm').addEventListener('submit', handleBookingSubmit);
    document.getElementById('searchBooking').addEventListener('click', searchBooking);

    
    // Login system event listeners
    document.getElementById('loginIcon').addEventListener('click', openLoginModal);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Modal close event listeners
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModals);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
    
    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Package selection logic
    const packageForm = document.getElementById('packageForm');
    const packageNextBtn = document.getElementById('packageNextBtn');
    if (packageForm && packageNextBtn) {
        packageNextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const selected = packageForm.querySelector('input[name="package"]:checked');
            if (!selected) {
                alert('Please select a package to proceed.');
                return;
            }
            // Store selected package in localStorage or a global variable
            localStorage.setItem('selectedPackage', selected.value);
            // Scroll to booking slots section or show it
            const bookingSection = document.querySelector('.main-container');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Hamburger Menu Functions
function initializeHamburgerMenu() {
    console.log('Initializing hamburger menu...');
    
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    // Removed check for closeSidebar button
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Check if elements exist
    if (!hamburgerMenu) {
        console.error('Hamburger menu element not found!');
        return;
    }
    if (!sidebarMenu) {
        console.error('Sidebar menu element not found!');
        return;
    }
    if (!sidebarOverlay) {
        console.error('Sidebar overlay element not found!');
        return;
    }
    
    console.log('All hamburger menu elements found successfully');
    
    // Toggle sidebar when hamburger is clicked
    hamburgerMenu.addEventListener('click', function() {
        console.log('Hamburger menu clicked!');
        toggleSidebar();
    });
    
    // Close sidebar when overlay is clicked
    sidebarOverlay.addEventListener('click', function() {
        console.log('Overlay clicked!');
        closeSidebarMenu();
    });
    // Add close button functionality
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', function() {
            closeSidebarMenu();
        });
    }
    
    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only prevent default for menu items without an href or with href="#"
            if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                console.log('Menu item clicked:', section);
                handleMenuNavigation(section);
            } // else, let the browser navigate normally
        });
    });
    
    // Handle submenu functionality (including nested submenus)
    const menuItemsWithSubmenu = document.querySelectorAll('.menu-item-with-submenu');
    menuItemsWithSubmenu.forEach(item => {
        const menuItem = item.querySelector('.menu-item, .submenu-item');
        const submenuArrow = item.querySelector('.submenu-arrow');
        // Special case: Only allow arrow to toggle for Video Editing submenu
        if (submenuArrow && menuItem && menuItem.getAttribute('data-section') === 'video-editing') {
            submenuArrow.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                // Toggle 'active' on the parent <li> of this arrow (the Video Editing <li>)
                const videoEditingLi = submenuArrow.closest('.menu-item-with-submenu');
                if (videoEditingLi) {
                    videoEditingLi.classList.toggle('active');
                }
            });
        } else {
            // For all other submenus, both label and arrow can toggle
            if (submenuArrow) {
                submenuArrow.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const parentUl = item.parentElement;
                    parentUl.querySelectorAll(':scope > .menu-item-with-submenu').forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                });
            }
            if (menuItem) {
        menuItem.addEventListener('click', function(e) {
                    if (e.target.classList.contains('submenu-arrow')) return;
            e.preventDefault();
            e.stopPropagation();
                    const parentUl = item.parentElement;
                    parentUl.querySelectorAll(':scope > .menu-item-with-submenu').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
            }
        }
    });
    
    // Handle submenu item clicks
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            console.log('Submenu item clicked:', section);
            handleSubmenuNavigation(section);
        });
    });

    // Make both the label and the arrow toggle the submenu for all menu-item-with-submenu
    document.querySelectorAll('.menu-item-with-submenu > .menu-item, .menu-item-with-submenu > .submenu-item').forEach(label => {
        label.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const parentLi = label.closest('.menu-item-with-submenu');
            if (parentLi) {
                parentLi.classList.toggle('active');
            }
        });
    });
    
    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebarMenu();
        }
    });
    
    console.log('Hamburger menu initialized successfully');
}

function toggleSidebar() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    // No auto-expand/collapse of submenu here

    hamburgerMenu.classList.toggle('active');
    sidebarMenu.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');

    // Prevent body scroll when sidebar is open
    if (sidebarMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeSidebarMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    hamburgerMenu.classList.remove('active');
    sidebarMenu.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function handleMenuNavigation(section) {
    console.log('Navigating to section:', section);
    
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked menu item
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Handle different sections
    switch(section) {
        case 'home':
            // Already on home page, just close sidebar
            closeSidebarMenu();
            break;
            
        case 'about':
            showAboutSection();
            break;
            
        case 'help':
            showHelpSection();
            break;
            
        case 'admin':
            showAdminSection();
            break;
            
        // For menu items with submenus, just toggle submenu (do not show notification)
        case 'book-edit':
        case 'events':
            // Only toggle submenu, do not close sidebar or show notification
            break;
            
        default:
            console.log('Unknown section:', section);
    }
}

function showVideoEditingSection() {
    closeSidebarMenu();
    showNotification('Book Edit section coming soon!', 'info');
    // TODO: Implement video editing functionality
}

function showEventsSection() {
    // closeSidebarMenu(); // Do not auto-close sidebar
    showNotification('Events Booking section coming soon!', 'info');
    // TODO: Implement events functionality
}

function handleSubmenuNavigation(section) {
    console.log('Navigating to submenu section:', section);
    
    // Remove active class from all submenu items
    document.querySelectorAll('.submenu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked submenu item
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Handle different submenu sections
    switch(section) {
        case 'birthday-party':
            showBirthdayPartySection();
            break;
            
        case 'wedding-party':
            showWeddingPartySection();
            break;
            
        case 'bride-to-be':
            showBrideToBeSection();
            break;
            
        case 'groom-to-be':
            showGroomToBeSection();
            break;
            
        default:
            console.log('Unknown submenu section:', section);
    }
}

function showBirthdayPartySection() {
    // closeSidebarMenu(); // Do not auto-close sidebar
    window.location.href = 'birthday-party.html';
}

function showWeddingPartySection() {
    // closeSidebarMenu(); // Do not auto-close sidebar
    window.location.href = 'wedding-party.html';
}

function showBrideToBeSection() {
    // closeSidebarMenu(); // Do not auto-close sidebar
    window.location.href = 'bride-to-be.html';
}

function showGroomToBeSection() {
    // closeSidebarMenu(); // Do not auto-close sidebar
    window.location.href = 'groom-to-be.html';
}

function showAboutSection() {
    closeSidebarMenu();
    showNotification('About section coming soon!', 'info');
    // TODO: Implement about functionality
}

function showHelpSection() {
    closeSidebarMenu();
    showNotification('Help section coming soon!', 'info');
    // TODO: Implement help functionality
}

function showAdminSection() {
    closeSidebarMenu();
    window.location.href = 'admin-login.html';
}

// Initialize application
function initializeApp() {
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .booking-form, .cancel-form, .trending').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize trending animations
    initializeTrendingAnimations();
}

// Initialize trending animations
function initializeTrendingAnimations() {
    // Add parallax effect to floating shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add hover effects to trending cards
    document.querySelectorAll('.feature-card.trending').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Scroll to booking section
function scrollToBooking() {
    const bookingSection = document.querySelector('.booking-section');
    if (bookingSection) {
        bookingSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll to features section
function scrollToFeatures() {
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
        featuresSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Generate time slots with modern styling
function generateTimeSlots() {
    const dateInput = document.getElementById('date');
    const timeSlotsContainer = document.getElementById('timeSlots');
    const selectedDate = dateInput.value;
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date();
    
    // Clear existing slots
    timeSlotsContainer.innerHTML = '';
    
    // Time slots from 9 AM to 10 PM (1-hour intervals in 12-hour format)
    const timeSlots = [
        '09:00 AM-10:00 AM', '10:00 AM-11:00 AM', '11:00 AM-12:00 PM', '12:00 PM-01:00 PM', '01:00 PM-02:00 PM', 
        '02:00 PM-03:00 PM', '03:00 PM-04:00 PM', '04:00 PM-05:00 PM', '05:00 PM-06:00 PM', '06:00 PM-07:00 PM', 
        '07:00 PM-08:00 PM', '08:00 PM-09:00 PM', '09:00 PM-10:00 PM'
    ];
    
    timeSlots.forEach(time => {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        slot.dataset.time = time;
        
        // Format time for display (extract start time from range)
        const startTime = time.split('-')[0];
        const timeObj = new Date(`2000-01-01T${startTime}`);
        const displayTime = timeObj.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        slot.textContent = time; // Show full time range
        
        // Check if slot is in the past for today
        if (selectedDate === today) {
            const startTime = time.split('-')[0].trim();
            // Convert 12-hour format to 24-hour for comparison
            const timeParts = startTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
            if (timeParts) {
                let hour = parseInt(timeParts[1]);
                const minute = timeParts[2];
                const period = timeParts[3];
                
                if (period === 'PM' && hour !== 12) hour += 12;
                if (period === 'AM' && hour === 12) hour = 0;
                
                const slotTime = new Date(`2000-01-01T${hour.toString().padStart(2, '0')}:${minute}`);
                const currentTimeOnly = new Date(`2000-01-01T${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`);
                
                if (slotTime < currentTimeOnly) {
                    // Skip past slots - don't add them to the display
                    return;
                }
            }
        }
        
        // Check if slot is booked
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const isBooked = bookings.some(booking => 
            booking.date === selectedDate && 
            booking.time === time && 
            booking.status !== 'cancelled'
        );
        
        if (isBooked) {
            slot.classList.add('booked');
            slot.textContent = time + ' ✓ Booked';
        }
        
        if (isBooked) {
            slot.classList.add('booked');
        }
        
        // Add click event for available slots
        if (!slot.classList.contains('booked') && !slot.classList.contains('past')) {
            slot.addEventListener('click', () => selectTimeSlot(slot));
        }
        
        timeSlotsContainer.appendChild(slot);
    });
}

// Select time slot with animation
function selectTimeSlot(selectedSlot) {
    // Remove previous selection
    document.querySelectorAll('.time-slot.selected').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Add selection with animation
    selectedSlot.classList.add('selected');
    selectedSlot.style.transform = 'scale(1.05)';
    setTimeout(() => {
        selectedSlot.style.transform = '';
    }, 200);
}

// Handle booking form submission
function handleBookingSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const selectedSlot = document.querySelector('.time-slot.selected');
    
    if (!selectedSlot) {
        showNotification('Please select a time slot', 'error');
        return;
    }
    
    const booking = {
        id: generateBookingId(),
        name: formData.get('name'),
        mobile: formData.get('mobile'),
        email: formData.get('email'),
        date: formData.get('date'),
        time: selectedSlot.dataset.time,
        status: 'pending',
        paymentMethod: 'upi',
        amount: 10,
        createdAt: new Date().toISOString()
    };
    
    // Show booking confirmation modal
    showBookingConfirmModal(booking);
}

// Show booking confirmation modal
function showBookingConfirmModal(booking) {
    const modal = document.getElementById('bookingConfirmModal');
    const detailsDiv = document.getElementById('bookingConfirmDetails');
    
    detailsDiv.innerHTML = `
        <div class="booking-info">
            <div class="booking-info-item">
                <span class="booking-info-label">Name:</span>
                <span class="booking-info-value">${booking.name}</span>
            </div>
            <div class="booking-info-item">
                <span class="booking-info-label">Mobile:</span>
                <span class="booking-info-value">${booking.mobile}</span>
            </div>
            <div class="booking-info-item">
                <span class="booking-info-label">Email:</span>
                <span class="booking-info-value">${booking.email}</span>
            </div>
            <div class="booking-info-item">
                <span class="booking-info-label">Date:</span>
                <span class="booking-info-value">${formatDate(booking.date)}</span>
            </div>
            <div class="booking-info-item">
                <span class="booking-info-label">Time:</span>
                <span class="booking-info-value">${booking.time}</span>
            </div>
            <div class="booking-info-item">
                <span class="booking-info-label">Amount:</span>
                <span class="booking-info-value">₹${booking.amount}</span>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Store booking data for confirmation
    window.currentBooking = booking;
}

// Confirm booking
function confirmBooking() {
    const confirmationType = document.querySelector('input[name="confirmationType"]:checked').value;
    const booking = window.currentBooking;
    
    if (!booking) {
        showNotification('No booking data found', 'error');
        return;
    }
    
    // Update booking status based on confirmation type
    if (confirmationType === 'confirm') {
        booking.status = 'confirmed';
        booking.paymentStatus = 'paid';
    } else {
        booking.status = 'pending';
        booking.paymentStatus = 'pending';
    }
    
    // Save booking
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Close modal
    closeBookingConfirmModal();
    
    // Show success message
    const message = confirmationType === 'confirm' 
        ? 'Booking confirmed successfully! Your session is booked.' 
        : 'Booking saved as pending. Please complete payment before your session.';
    showNotification(message, 'success');
    // Show thank you message
    setTimeout(() => showThankYouOnPage(booking), 500);

    // Show Download Ticket button
    setTimeout(() => {
        const btn = document.getElementById('downloadTicketBtn');
        if (btn) {
            btn.style.display = 'inline-block';
            btn.onclick = function() {
                generateTicketPDF(booking);
            };
        }
    }, 500);
    
    // Reset form
    document.getElementById('bookingForm').reset();
    document.getElementById('date').value = new Date().toISOString().split('T')[0];
    generateTimeSlots();
    
    // Remove selection
    document.querySelectorAll('.time-slot.selected').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Clear current booking
    window.currentBooking = null;
}

// Close booking confirmation modal
function closeBookingConfirmModal() {
    const modal = document.getElementById('bookingConfirmModal');
    modal.style.display = 'none';
    window.currentBooking = null;
}

function showThankYouOnPage(booking) {
    // Hide the booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) bookingForm.style.display = 'none';
    // Show thank you message
    const thankYouDiv = document.getElementById('thankYouMessage');
    if (thankYouDiv) {
        thankYouDiv.innerHTML = `
            <div class="thank-you-box">
                <h2><i class="fas fa-smile"></i> Thank You for Booking Your Slot!</h2>
                <p>Your booking was successful. You can download your ticket below.</p>
                <button id="downloadTicketBtn" class="btn-confirm"><i class="fas fa-download"></i> Download Ticket</button>
            </div>
        `;
        thankYouDiv.style.display = 'block';
        // Set up download button
        const btn = document.getElementById('downloadTicketBtn');
        if (btn) {
            btn.onclick = function() {
                generateTicketPDF(booking);
            };
        }
    }
}

function closeThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    modal.style.display = 'none';
    window.currentBooking = null;
}

// Search booking by mobile number
function searchBooking() {
    const mobile = document.getElementById('cancelMobile').value.trim();
    
    if (!mobile) {
        showNotification('Please enter your mobile number', 'error');
        return;
    }
    
    if (!/^\d{10}$/.test(mobile)) {
        showNotification('Please enter a valid 10-digit mobile number', 'error');
        return;
    }
    
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const userBookings = bookings.filter(booking => 
        booking.mobile === mobile && booking.status !== 'cancelled'
    );
    
    const bookingDetails = document.getElementById('bookingDetails');
    
    if (userBookings.length === 0) {
        bookingDetails.innerHTML = `
            <div class="booking-info">
                <div class="booking-info-item">
                    <span class="booking-info-label">No bookings found</span>
                    <span class="booking-info-value">Please check your mobile number</span>
                </div>
            </div>
        `;
        bookingDetails.style.display = 'block';
        return;
    }
    
    // Show the most recent booking
    const latestBooking = userBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    
    const timeObj = new Date(`2000-01-01T${latestBooking.time}`);
    const displayTime = timeObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    const canCancel = canCancelBooking(latestBooking);
    const timeRemaining = getTimeRemaining(latestBooking);
    
    bookingDetails.innerHTML = `
        <div class="booking-info">
            <div class="booking-info-item">
                <span class="booking-info-label">Booking ID:</span>
                <span class="booking-info-value">${latestBooking.id}</span>
            </div>
            <div class="booking-info-item">
                <span class="booking-info-label">Name:</span>
                <span class="booking-info-value">${latestBooking.name}</span>
            </div>
            <div class="booking-info-item">
                <span class="booking-info-label">Date:</span>
                <span class="booking-info-value">${formatDate(latestBooking.date)}</span>
            </div>
            <div class="booking-info-item">
                <span class="booking-info-label">Time:</span>
                <span class="booking-info-value">${latestBooking.time}</span>
            </div>
            <div class="booking-info-item">
                <span class="booking-info-label">Status:</span>
                <span class="booking-info-value">${getStatusBadge(latestBooking.status)}</span>
            </div>
            <div class="booking-info-item">
                <span class="booking-info-label">Amount:</span>
                <span class="booking-info-value">₹${latestBooking.amount}</span>
            </div>
            <div class="booking-info-item">
                <span class="booking-info-label">Time Remaining:</span>
                <span class="booking-info-value ${timeRemaining === 'Booking time has passed' ? 'text-danger' : ''}">${timeRemaining}</span>
            </div>
        </div>
        ${canCancel ? 
            `<button class="cancel-btn" onclick="cancelBooking('${latestBooking.id}')">
                <i class="fas fa-times"></i> Cancel Booking
            </button>` : 
            `<div class="cancel-notice">
                <i class="fas fa-info-circle"></i>
                ${latestBooking.status === 'cancelled' ? 
                    'This booking has already been cancelled.' : 
                    'Cancellation is only allowed up to 10 minutes before the booking time.'
                }
            </div>`
        }
    `;
    
    bookingDetails.style.display = 'block';
}



// Check if booking can be cancelled
function canCancelBooking(booking) {
    // Parse the time range to get start time
    const timeRange = booking.time;
    const startTime = timeRange.split('-')[0].trim();
    
    // Convert 12-hour format to 24-hour for comparison
    const timeParts = startTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
    if (!timeParts) return false;
    
    let hour = parseInt(timeParts[1]);
    const minute = timeParts[2];
    const period = timeParts[3];
    
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    // Create booking date time
    const bookingDateTime = new Date(`${booking.date}T${hour.toString().padStart(2, '0')}:${minute}:00`);
    const currentDateTime = new Date();
    const timeDifference = bookingDateTime - currentDateTime;
    const minutesDifference = timeDifference / (1000 * 60);
    
    // Can cancel if more than 10 minutes before booking time and booking is not already cancelled
    return minutesDifference > 10 && booking.status !== 'cancelled';
}

// Get time remaining until booking
function getTimeRemaining(booking) {
    const timeRange = booking.time;
    const startTime = timeRange.split('-')[0].trim();
    
    const timeParts = startTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
    if (!timeParts) return null;
    
    let hour = parseInt(timeParts[1]);
    const minute = timeParts[2];
    const period = timeParts[3];
    
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    const bookingDateTime = new Date(`${booking.date}T${hour.toString().padStart(2, '0')}:${minute}:00`);
    const currentDateTime = new Date();
    const timeDifference = bookingDateTime - currentDateTime;
    const minutesDifference = timeDifference / (1000 * 60);
    
    if (minutesDifference <= 0) {
        return 'Booking time has passed';
    }
    
    const hours = Math.floor(minutesDifference / 60);
    const minutes = Math.floor(minutesDifference % 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m remaining`;
    } else {
        return `${minutes}m remaining`;
    }
}

// Cancel booking
function cancelBooking(bookingId) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const booking = bookings.find(b => b.id === bookingId);
    
    if (!booking) {
        showNotification('Booking not found', 'error');
        return;
    }
    
    if (!canCancelBooking(booking)) {
        const timeRemaining = getTimeRemaining(booking);
        showNotification(`Cannot cancel booking. ${timeRemaining}`, 'error');
        return;
    }
    
    if (confirm('Are you sure you want to cancel this booking?')) {
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        
        if (bookingIndex !== -1) {
            bookings[bookingIndex].status = 'cancelled';
            localStorage.setItem('bookings', JSON.stringify(bookings));
            
            showNotification(`Booking cancelled successfully! The time slot "${booking.time}" is now available for new bookings.`, 'success');
            
            // Refresh booking details
            setTimeout(() => {
                searchBooking();
            }, 1000);
            
            // Refresh time slots to show the unlocked slot
            const dateInput = document.getElementById('date');
            if (dateInput && dateInput.value === booking.date) {
                generateTimeSlots();
                
                // Highlight the newly unlocked slot briefly
                setTimeout(() => {
                    const unlockedSlot = document.querySelector(`[data-time="${booking.time}"]`);
                    if (unlockedSlot && !unlockedSlot.classList.contains('booked')) {
                        unlockedSlot.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                        unlockedSlot.style.color = '#fff';
                        unlockedSlot.style.transform = 'scale(1.1)';
                        unlockedSlot.style.boxShadow = '0 10px 30px rgba(40, 167, 69, 0.3)';
                        
                        setTimeout(() => {
                            unlockedSlot.style.background = '';
                            unlockedSlot.style.color = '';
                            unlockedSlot.style.transform = '';
                            unlockedSlot.style.boxShadow = '';
                        }, 2000);
                    }
                }, 100);
            }
        }
    }
}

// Generate unique booking ID
function generateBookingId() {
    return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Get status badge HTML
function getStatusBadge(status) {
    const badges = {
        'pending': '<span class="status-badge status-pending">Pending</span>',
        'confirmed': '<span class="status-badge status-confirmed">Confirmed</span>',
        'cancelled': '<span class="status-badge status-cancelled">Cancelled</span>'
    };
    return badges[status] || status;
}

// Show notification with modern styling
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Add status badge styles
const style = document.createElement('style');
style.textContent = `
    .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .status-confirmed {
        background: #d4edda;
        color: #155724;
    }
    
    .status-pending {
        background: #fff3cd;
        color: #856404;
    }
    
    .status-cancelled {
        background: #f8d7da;
        color: #721c24;
    }
`;
document.head.appendChild(style);

// Login system functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeModals() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('bookingsModal').style.display = 'none';
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Admin credentials
    const ADMIN_CREDENTIALS = {
        username: 'kirankiru18',
        password: 'kirankumar@kirankumar68686'
    };
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Close login modal
        document.getElementById('loginModal').style.display = 'none';
        
        // Show success message
        showNotification('Login successful! Loading bookings...', 'success');
        
        // Load and display all bookings
        setTimeout(() => {
            displayAllBookings();
        }, 1000);
    } else {
        showNotification('Invalid username or password. Please try again.', 'error');
        document.getElementById('password').value = '';
    }
}

function displayAllBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const bookingsList = document.getElementById('allBookingsList');
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = `
            <div class="no-bookings">
                <i class="fas fa-calendar-times"></i>
                <h3>No bookings found</h3>
                <p>There are no bookings in the system yet.</p>
            </div>
        `;
    } else {
        // Sort bookings by date (newest first)
        bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        bookingsList.innerHTML = `
            <div class="bookings-header">
                <h3>All Bookings (${bookings.length})</h3>
            </div>
            <div class="bookings-grid">
                ${bookings.map(booking => {
                    const createdDate = new Date(booking.createdAt);
                    const ageInHours = Math.floor((Date.now() - createdDate) / (1000 * 60 * 60));
                    const ageInDays = Math.floor(ageInHours / 24);
                    const ageText = ageInDays > 0 ? `${ageInDays} days ago` : `${ageInHours} hours ago`;
                    
                    const canCancel = canCancelBooking(booking);
                    
                    return `
                        <div class="booking-card ${booking.status}">
                            <div class="booking-header">
                                <div class="booking-id">${booking.id}</div>
                                <div class="booking-status ${booking.status}">${booking.status.toUpperCase()}</div>
                            </div>
                            
                            <div class="booking-details">
                                <div class="detail-section">
                                    <h4><i class="fas fa-user"></i> Customer Information</h4>
                                    <p><strong>Name:</strong> ${booking.name}</p>
                                    <p><strong>Mobile:</strong> ${booking.mobile}</p>
                                    <p><strong>Email:</strong> ${booking.email}</p>
                                </div>
                                
                                <div class="detail-section">
                                    <h4><i class="fas fa-calendar-alt"></i> Session Details</h4>
                                    <p><strong>Date:</strong> ${formatDate(booking.date)}</p>
                                    <p><strong>Time:</strong> ${booking.time}</p>
                                    <p><strong>Duration:</strong> 1 Hour</p>
                                </div>
                                
                                <div class="detail-section">
                                    <h4><i class="fas fa-credit-card"></i> Payment Information</h4>
                                    <p><strong>Method:</strong> ${booking.paymentMethod || 'UPI'}</p>
                                    <p><strong>Amount:</strong> ₹${booking.amount || 10}</p>
                                    <p><strong>UPI ID:</strong> varun173205@axl</p>
                                </div>
                                
                                <div class="detail-section">
                                    <h4><i class="fas fa-info-circle"></i> Additional Info</h4>
                                    <p><strong>Created:</strong> ${createdDate.toLocaleString()}</p>
                                    <p><strong>Age:</strong> ${ageText}</p>
                                    <p><strong>Studio:</strong> KKR Studios</p>
                                </div>
                            </div>
                            
                            <div class="booking-actions">
                                ${canCancel ? `<button class="btn btn-cancel" onclick="cancelBooking('${booking.id}')">
                                    <i class="fas fa-times"></i> Cancel Booking
                                </button>` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    // Show bookings modal
    document.getElementById('bookingsModal').style.display = 'block';
}

// Hero Slider Functionality
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const leftArrow = document.querySelector('.hero-arrow-left');
  const rightArrow = document.querySelector('.hero-arrow-right');
  const heroContent = document.getElementById('heroContent');
  let current = 0;
  let interval;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
    current = idx;
    // Hide hero content if slide has data-hide-content="true"
    if (slides[idx].getAttribute('data-hide-content') === 'true') {
      heroContent.style.display = 'none';
    } else {
      heroContent.style.display = '';
    }
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }
  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  function startAutoSlide() {
    interval = setInterval(nextSlide, 5000);
  }
  function stopAutoSlide() {
    clearInterval(interval);
  }

  rightArrow.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });
  leftArrow.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  showSlide(0);
  startAutoSlide();
})();

// Generate PDF ticket using jsPDF
function generateTicketPDF(booking) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    // Logo (optional, if you have a logo image, add it here)
    // doc.addImage('logo.png', 'PNG', 10, 10, 30, 30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('KKR Studios Booking Ticket', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Booking ID: ${booking.id}`, 20, 40);
    doc.text(`Name: ${booking.name}`, 20, 50);
    doc.text(`Mobile: ${booking.mobile}`, 20, 60);
    doc.text(`Email: ${booking.email}`, 20, 70);
    doc.text(`Date: ${formatDate(booking.date)}`, 20, 80);
    doc.text(`Time: ${booking.time}`, 20, 90);
    doc.text(`Service: Studio Booking`, 20, 100);
    doc.text(`Amount: ₹${booking.amount}`, 20, 110);
    doc.text('Thank you for booking with KKR Studios!', 20, 130);
    doc.save(`KKR-Booking-${booking.id}.pdf`);
}

 