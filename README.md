# Acharya's International Alternative Therapy Centre — Clinic Website

A lightweight, responsive, mobile-first informational clinic website built with vanilla HTML5, CSS3, and JavaScript.

## 1. Project File Structure

```text
acharya-clinic-website/
├── index.html                        # Main clinic website page (with custom-designed header & embedded maps)
├── style.css                         # Responsive stylesheet matching the clinic header reference theme
├── script.js                         # Vanilla JS for branch filter tabs, live IST session badge, and copy buttons
├── README.md                         # Setup, image replacement, hosting, and QR code guide
└── images/
    ├── dr-shashikanth-sharma.jpg     # Portrait of Dr. B. Acharya Shashikanth Sharma (used in Header Emblem Logo & Doctor Card)
    └── dr-bhuvaneshwari.png          # Portrait of Dr. B. Bhuvaneshwari (used in Doctor Card)
```

## 2. How to Place or Update Reference Images

All images live inside the `images/` folder using relative paths:

1. **Dr. B. Acharya Shashikanth Sharma (`images/dr-shashikanth-sharma.jpg`)**:
   - Used both as the circular **Acharya Emblem Logo** inside `<header class="site-header">` and in the first `.doctor-card` in `index.html`.
2. **Dr. B. Bhuvaneshwari (`images/dr-bhuvaneshwari.png`)**:
   - Used in the second `.doctor-card` in `index.html`.

To update any photo later, replace the file inside `images/` with the same filename.

## 3. Running Locally, Deploying Online & Creating the QR Code

1. **Test Locally**: Double-click `index.html` to open it in any browser, or run `python3 -m http.server 8000` in the folder.
2. **Deploy to Static Hosting**:
   - **Netlify Drop**: Drag and drop the unzipped `acharya-clinic-website` folder onto [https://app.netlify.com/drop](https://app.netlify.com/drop).
   - **GitHub Pages**: Upload `index.html`, `style.css`, `script.js`, and `images/` to a public GitHub repository and enable **Settings -> Pages**.
   - **Vercel**: Import the project at [https://vercel.com/new](https://vercel.com/new) and click **Deploy**.
3. **Generate the QR Code**:
   - Once your live `https://...` URL is published, generate a QR code pointing to that public URL (never `localhost`).
