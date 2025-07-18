document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('findBookingForm');
  const mobileInput = document.getElementById('mobileInput');
  const resultDiv = document.getElementById('bookingResult');

  // Add a mock booking if none exist (for testing/demo)
  let bookings = [];
  try {
    bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  } catch {
    bookings = [];
  }
  if (!Array.isArray(bookings) || bookings.length === 0) {
    bookings = [{
      id: 'BK123456',
      name: 'Test User',
      mobile: '9876543210',
      email: 'test@example.com',
      date: '2024-06-01',
      time: '10:00 AM-11:00 AM',
      type: 'Birthday Celebration',
      status: 'confirmed'
    }];
    localStorage.setItem('bookings', JSON.stringify(bookings));
    console.log('DEBUG: Mock booking added for testing.');
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    resultDiv.innerHTML = '';
    const mobile = mobileInput.value.trim();
    if (!/^\d{10,15}$/.test(mobile)) {
      resultDiv.innerHTML = '<div class="booking-error"><i class="fas fa-exclamation-triangle"></i> Please enter a valid mobile number.</div>';
      return;
    }
    let bookings = [];
    try {
      bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    } catch {
      bookings = [];
    }
    console.log('DEBUG: All bookings in localStorage:', bookings);
    console.log('DEBUG: Searched mobile number:', mobile);
    // Only show bookings with date today or in the future
    const today = new Date();
    today.setHours(0,0,0,0);
    const found = bookings.filter(b => b.mobile === mobile && new Date(b.date) >= today);
    console.log('DEBUG: Found bookings:', found);
    if (found.length === 0) {
      resultDiv.innerHTML = '<div class="booking-error"><i class="fas fa-exclamation-circle"></i> No upcoming booking found for this mobile number.</div>';
      return;
    }
    resultDiv.innerHTML = found.map(b => `
      <div class="booking-result">
        <h4><i class="fas fa-calendar-check"></i> Booking Details</h4>
        <p><strong>Name:</strong> ${b.name}</p>
        <p><strong>Mobile:</strong> ${b.mobile}</p>
        <p><strong>Email:</strong> ${b.email || 'N/A'}</p>
        <p><strong>Date:</strong> ${b.date}</p>
        <p><strong>Time:</strong> ${b.time}</p>
        <p><strong>Event:</strong> ${b.type || 'N/A'}</p>
        <p><strong>Status:</strong> ${b.status || 'N/A'}</p>
        <p><strong>Booking ID:</strong> ${b.id}</p>
      </div>
    `).join('');
  });
}); 