# Maple & Steam

**Author:** R Sai Dheeraj  
**Roll number:** 24ATA05269

A six-page café website with a data-driven menu, persistent cart, checkout demo, reservation form, and contact form. Built with plain HTML, CSS, and JavaScript. No photographs, external fonts, or image libraries.

## Pages

| Page | What it does |
|------|--------------|
| `index.html` | Hero, animated ticker, featured menu, story, gallery preview |
| `menu.html` | Full menu with category filters, search, and add-to-cart |
| `about.html` | Café concept, house rules, founder profile |
| `gallery.html` | Six CSS/SVG visual studies of the room |
| `reservation.html` | Validated table reservation form |
| `contact.html` | Validated contact form and café details |

## Features

- Menu data rendered from a single JavaScript array
- Category filters and live search
- Persistent cart with quantity controls and a running total
- 5% tax calculation and order checkout demo
- Orders saved in `localStorage` under `mapleOrders`
- Reservation form with date guard, party size, and confirmation
- Contact form with subject and message validation
- Responsive navigation and cart drawer
- Keyboard support: `Escape` closes the menu/cart; visible focus states
- Reduced-motion support
- No external images or dependencies

## Run it

Open `index.html` directly, or serve the folder:

```bash
cd cafe-website
python3 -m http.server 8082
```

Then open <http://localhost:8082>.

## Demo data

This is a front-end demo. Nothing is sent to a server and no payment is processed.

| Key | Contents |
|-----|----------|
| `mapleCart` | Current cart lines and quantities |
| `mapleOrders` | Last 20 checkout summaries |
| `mapleReservations` | Last 30 reservation requests |
| `mapleMessages` | Last 30 contact messages |

Clearing site data removes all saved demo entries.

## Design notes

- Warm paper, terracotta, sage, and gold palette.
- Serif display type paired with a system sans for body copy.
- Coffee cup, menu, and gallery artwork is inline SVG.
- The menu cards use CSS gradient tiles instead of food photography.

## Files

```text
cafe-website/
├── index.html
├── menu.html
├── about.html
├── gallery.html
├── reservation.html
├── contact.html
├── css/style.css
├── js/app.js
└── README.md
```

## Author

R Sai Dheeraj · 24ATA05269 · 2026
