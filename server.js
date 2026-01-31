const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Handle contact form submission
  if (req.method === 'POST' && pathname === '/send-email') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const formData = JSON.parse(body);

        // Validate form data
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'All fields are required.' }));
          return;
        }

        // In a real implementation, you would send the email here
        // For now, we'll simulate the email sending

        // Log the received data (in production, you would send an actual email)
        console.log('Contact form submitted:');
        console.log('Name:', formData.name);
        console.log('Email:', formData.email);
        console.log('Subject:', formData.subject);
        console.log('Message:', formData.message);

        // Simulate sending email to sgsatyam27@gmail.com
        // In a real implementation, you would use nodemailer or similar

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Thank you for your message! I will get back to you soon.'
        }));
      } catch (error) {
        console.error('Error parsing form data:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid form data.' }));
      }
    });

    return;
  }

  // Handle routing for different pages
  let filePath = pathname;

  // Default to index.html if root is requested
  if (pathname === '/') {
    filePath = './index.html';
  }
  // Handle /home route
  else if (pathname === '/home' || pathname === '/index.html') {
    filePath = './index.html';
  }
  // Handle pages directory routes
  else if (pathname.startsWith('/pages/')) {
    filePath = `.${pathname}`;
  }
  // Handle other routes by checking if file exists
  else {
    filePath = `.${pathname}`;
  }

  // Determine content type based on file extension
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch(extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
    case '.mp4':
      contentType = 'video/mp4';
      break;
    case '.woff':
      contentType = 'application/font-woff';
      break;
    case '.ttf':
      contentType = 'application/font-ttf';
      break;
    case '.eot':
      contentType = 'application/vnd.ms-fontobject';
      break;
    case '.otf':
      contentType = 'application/font-otf';
      break;
    case '.ico':
      contentType = 'image/x-icon';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found - redirect to index
        res.writeHead(302, { 'Location': '/' });
        res.end();
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Satyam Bhaii Professional Portfolio Server running at http://${hostname}:${port}/`);
  console.log('Theme: Dark Cyber-Tech with Glassmorphism');
  console.log('Developer: Satyam Bhaii - Master of Code Creation');
  console.log('Pages Available: Home, About, Works, Contact');
  console.log('Contact form endpoint: POST /send-email');
  console.log('Press Ctrl+C to stop the server');
});