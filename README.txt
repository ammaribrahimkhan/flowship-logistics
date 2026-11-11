FLOWSHIP LOGISTICS — WEBSITE PROJECT
=====================================

WHAT THIS IS
------------
A full, ready-to-launch static website for FlowShip Logistics (truck
dispatch services), built with plain HTML/CSS/JS — no build tools,
no framework, no npm install. Just open it in VS Code and go.

Why plain HTML/CSS/JS? For a first professional client site with a
Wednesday deadline, this is the fastest path to a finished, deployable
result: zero setup, works in any browser immediately, and is trivially
easy to host anywhere (see HOW TO PREVIEW / DEPLOY below).

FOLDER STRUCTURE
----------------
flowship-logistics/
├── index.html          Home page
├── about.html           About / Mission / Vision / Values
├── services.html        Full services list + why you need dispatch
├── equipment.html        Equipment we haul (dry van, reefer, flatbed, etc.)
├── pricing.html          7% flat fee, process, benefits
├── faq.html              Frequently asked questions (accordion)
├── contact.html          Contact form + info
├── onboarding.html       Carrier onboarding form + document upload
├── css/
│   └── style.css        All site styling (single stylesheet)
├── js/
│   └── script.js         Mobile nav, FAQ accordion, counters, reveal animation
├── images/
│   ├── logo.png          Your logo, background removed (transparent)
│   ├── logo.jpeg         Your original uploaded logo
│   ├── hero-illustration.svg     Hero graphic (truck on route)
│   ├── about-illustration.svg    About page graphic
│   ├── contact-illustration.svg  Contact/onboarding graphic
│   └── equip-*.svg        8 equipment illustrations (dry van, reefer, etc.)
└── README.txt            This file

DESIGN DECISIONS (so you can explain it in your demo)
------------------------------------------------------
- Colors pulled directly from your logo: deep navy (#0A1330) + vivid
  route-blue (#2158FF) on white/ice backgrounds — nothing generic.
- Typography: "Oswald" (condensed, industrial) for headings — echoes
  the bold lettering in your logo — paired with "Inter" for body text
  (clean and highly readable). Both load free from Google Fonts.
- Signature element: an animated dashed "route line" divider between
  the hero and stats section, echoing the road + speed lines in your
  logo. It's a small detail, but it's the one thing that's distinctly
  "FlowShip" rather than a generic template.
- All equipment/hero art is custom-built SVG illustration in your
  brand colors — not stock photography — so there's zero copyright
  risk and everything matches your palette exactly. Swap these for
  real photos any time (see below).

HOW TO PREVIEW LOCALLY IN VS CODE
----------------------------------
1. Open the `flowship-logistics` folder in VS Code (File → Open Folder).
2. Install the free "Live Server" extension (search it in the
   Extensions panel — the icon looks like a lightning bolt).
3. Right-click index.html → "Open with Live Server".
   The site opens in your browser and auto-refreshes as you edit.

(You can also just double-click index.html to open it directly in a
browser, but Live Server is smoother for editing.)

HOW TO ADD YOUR OWN PHOTOS
----------------------------------
Every image tag currently points at a custom SVG illustration, e.g.:
    <img src="images/hero-illustration.svg" alt="...">
To swap in a real photo:
1. Drop your photo into the /images folder (e.g. images/hero-truck.jpg).
2. Change the src="" attribute in the relevant HTML file to match.
3. Recommended sizes: hero photo ~1200x1000px, equipment card photos
   ~800x600px, about/contact photos ~900x900px. Keep file sizes under
   ~400KB each (compress at tinypng.com) so the site stays fast.

HOW TO DEPLOY (make it a real live website)
----------------------------------------------
Simplest free options:
- Netlify: drag the whole `flowship-logistics` folder onto
  app.netlify.com/drop — live in seconds, free custom domain support.
- GitHub Pages: push this folder to a GitHub repo and enable Pages in
  the repo settings.
- Any shared hosting (cPanel, etc.): upload the whole folder via FTP
  into public_html — it works instantly since it's plain HTML.

CONNECTING THE FORMS (Contact + Carrier Onboarding)
----------------------------------------------------
Right now both forms are front-end demos: submitting shows a success
message but doesn't send anywhere (see the `data-demo-form` handler
in js/script.js). Before going live, wire them to something real:
- Fastest: use a free service like Formspree or Web3Forms — just
  change the <form> tag's action="" to their endpoint, no backend needed.
- More control: point the form at your own backend (e.g. a small
  Flask/Node endpoint) that emails you the submission or saves it to
  a database.
The onboarding page's file upload input also needs a real backend or
a service like Formspree's file upload support to actually receive
carrier documents — right now it's UI only.

CUSTOMIZING TEXT / CONTACT INFO
----------------------------------
Phone number, email, and hours currently used (search and replace
across all .html files to update everywhere):
- Phone: (800) 555-1234  /  tel:+18005551234
- Email: dispatch@flowship.com
- Hours: Mon–Fri, 8AM–7PM EST

Good luck with the demo — you've got a complete, professional 8-page
site here. If you want a CMS later (so you can edit content without
touching code), that's a natural next step once the client is live.
