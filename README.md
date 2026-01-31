# Satyam Bhaii Professional Portfolio Website

A high-end, ultra-modern portfolio website for Satyam Bhaii, featuring a dark cyber-tech theme with premium glassmorphism effects.

## Deployment Instructions

### Deploy to Cloudflare Pages

1. Fork this repository to your GitHub account
2. Log in to Cloudflare Dashboard and navigate to Pages
3. Click "Create a project" and connect to your GitHub account
4. Select this repository
5. For the build settings, use:
   - Build command: `npm run build`
   - Build output directory: `./`
   - Root directory: `./`
6. Click "Save and deploy"

### Using the Contact Form

The contact form uses Formspree for email delivery:

1. Go to https://formspree.io/
2. Create an account and set up a new form
3. Replace `XYZ12345` in `pages/contact.html` with your actual Formspree form ID
4. Update the `_next` hidden field to point to your domain if needed

### Local Development

To run locally:
```bash
npm install
npm start
```

Visit `http://localhost:3000` to view the site.

## Features

- Dark cyber-tech theme with neon accents
- Glassmorphism UI elements
- 3D isometric CPU illustration with animated energy lines
- Responsive design for all devices
- Interactive animations and effects
- Modern typography with Orbitron and Exo 2 fonts
- Particle background with connection lines
- Scroll-triggered animations
- Mobile-friendly navigation

## Pages

1. **Home**: Main landing page with hero section and featured skills
2. **About**: Detailed information about Satyam Bhaii and his expertise
3. **Works**: Showcase of projects and achievements
4. **Contact**: Contact form and social links

## Setup

1. Clone or download the repository
2. Install Node.js if not already installed
3. Run `npm install` to install dependencies
4. Run `npm start` to start the local server
5. Visit `http://localhost:3000` in your browser

## License

This project is open source and available under the MIT License.