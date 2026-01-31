// Static file server for Cloudflare Pages compatibility
const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('.'));

// Handle all routes by serving index.html (for SPA routing)
app.get('*', (req, res) => {
  // Check if the request is for a specific file
  const requestedFile = path.join(__dirname, req.path);
  
  // If it's a page request, serve the corresponding HTML file
  if (req.path.startsWith('/pages/')) {
    const pagePath = req.path.substring(1); // Remove leading slash
    res.sendFile(path.join(__dirname, pagePath));
  } else if (req.path === '/' || req.path === '/index.html') {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    // For any other route, try to serve the file directly
    res.sendFile(requestedFile, (err) => {
      if (err) {
        // If file doesn't exist, serve index.html (for client-side routing)
        res.sendFile(path.join(__dirname, 'index.html'));
      }
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});