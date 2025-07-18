# KKR Studios - Photography & Videography Booking System

A modern, responsive website for KKR Studios with separate admin and user interfaces for booking photography and videography services.

## 📁 Project Structure

```
kkr-studios/
├── index.html                 # Main user landing page
├── birthday-party.html        # Birthday celebration booking
├── wedding-party.html         # Wedding anniversary booking
├── bride-to-be.html          # Bride-to-be session booking
├── groom-to-be.html          # Office meetings booking
├── find-booking.html         # User booking search
├── thank-you.html            # Booking confirmation page
├── select-package-birthday.html
├── select-package-wedding.html
├── styles.css                # User site styles
├── script.js                 # User site JavaScript
├── find-booking.js           # Booking search functionality
├── admin/                    # Admin site folder
│   ├── index.html           # Admin dashboard
│   ├── admin-styles.css     # Admin styles
│   └── admin-script.js      # Admin functionality
└── README.md                # This file
```

## 🚀 How to Host on GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Name your repository: `kkr-studios-website`
4. Make it **Public** (required for free GitHub Pages)
5. Click "Create repository"

### Step 2: Upload Your Files

**Option A: Using GitHub Web Interface**
1. In your new repository, click "uploading an existing file"
2. Drag and drop all your project files
3. Add a commit message: "Initial commit"
4. Click "Commit changes"

**Option B: Using Git Commands**
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/kkr-studios-website.git

# Copy your project files into the folder
# (Copy all HTML, CSS, JS files)

# Add files to git
git add .

# Commit changes
git commit -m "Initial commit"

# Push to GitHub
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch
6. Click **Save**

### Step 4: Access Your Website

Your website will be available at:
```
https://YOUR_USERNAME.github.io/kkr-studios-website/
```

## 🌐 Site Structure

### User Site (Main)
- **URL:** `https://yourusername.github.io/kkr-studios-website/`
- **Features:**
  - Landing page with services
  - Event booking forms
  - Package selection
  - Booking search
  - Thank you page

### Admin Site
- **URL:** `https://yourusername.github.io/kkr-studios-website/admin/`
- **Features:**
  - Dashboard with statistics
  - Booking management
  - Search and filter bookings
  - Edit/delete bookings
  - Settings management

## 🔧 Customization

### Update Contact Information
Edit `admin/admin-script.js` to change:
- Studio name
- Contact email
- Phone number

### Update Social Media Links
Edit `index.html` footer section to update:
- Instagram link
- Facebook link
- WhatsApp channel

### Update Instagram Reel
Edit `index.html` features section to change the embedded Instagram reel.

## 📱 Features

### User Features
- ✅ Responsive design
- ✅ Event booking forms
- ✅ Package selection
- ✅ Booking search
- ✅ Thank you page
- ✅ Social media integration

### Admin Features
- ✅ Dashboard with statistics
- ✅ Booking management
- ✅ Search and filter
- ✅ Edit/delete bookings
- ✅ Settings management
- ✅ Mobile responsive

## 🛠️ Technical Details

- **Frontend:** HTML5, CSS3, JavaScript
- **Storage:** LocalStorage (client-side)
- **Hosting:** GitHub Pages (free)
- **Icons:** Font Awesome
- **Fonts:** Google Fonts (Inter, Poppins)

## 🔒 Security Notes

- This is a client-side application
- Data is stored in browser localStorage
- No server-side authentication
- For production use, consider adding:
  - Server-side validation
  - Database storage
  - User authentication
  - SSL certificate

## 📞 Support

For questions or issues:
- Email: kirankumar68686@gmail.com
- Phone: +91 9019104086

## 🚀 Deployment Checklist

- [ ] Upload all files to GitHub
- [ ] Enable GitHub Pages
- [ ] Test user site functionality
- [ ] Test admin site functionality
- [ ] Update contact information
- [ ] Test booking forms
- [ ] Test booking search
- [ ] Verify social media links

## 📈 Analytics (Optional)

To add Google Analytics:
1. Get a Google Analytics account
2. Add tracking code to `<head>` section of all HTML files
3. Track user behavior and conversions

---

**Made with ❤️ for KKR Studios** 