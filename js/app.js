(() => {
  const MENU = [
    {
      id: "maple-latte",
      name: "Maple Latte",
      category: "Coffee",
      price: 260,
      tone: "tone-1",
      description: "Double espresso, steamed milk, and a quiet measure of maple syrup."
    },
    {
      id: "filter-coffee",
      name: "Filter Coffee",
      category: "Coffee",
      price: 180,
      tone: "tone-2",
      description: "The house blend, brewed slow and served hot with milk on the side."
    },
    {
      id: "cold-brew",
      name: "Orange Cold Brew",
      category: "Coffee",
      price: 240,
      tone: "tone-4",
      description: "Sixteen-hour cold brew with a strip of orange peel and no sugar rush."
    },
    {
      id: "masala-chai",
      name: "Masala Chai",
      category: "Tea",
      price: 150,
      tone: "tone-3",
      description: "Black tea simmered with ginger, cardamom, and a little too much love."
    },
    {
      id: "jasmine-green",
      name: "Jasmine Green",
      category: "Tea",
      price: 170,
      tone: "tone-6",
      description: "Loose-leaf green tea, jasmine flowers, and a spoon of honey on request."
    },
    {
      id: "butter-croissant",
      name: "Butter Croissant",
      category: "Bakery",
      price: 190,
      tone: "tone-4",
      description: "Laminated over three days with cultured butter. Best warm, always."
    },
    {
      id: "cinnamon-roll",
      name: "Cinnamon Roll",
      category: "Bakery",
      price: 220,
      tone: "tone-4",
      description: "Soft spiral, cinnamon sugar, and a cream-cheese glaze that means business."
    },
    {
      id: "avocado-toast",
      name: "Avocado Toast",
      category: "Brunch",
      price: 320,
      tone: "tone-3",
      description: "Sourdough, smashed avocado, chilli, lime, and toasted seeds."
    },
    {
      id: "masala-omelette",
      name: "Masala Omelette",
      category: "Brunch",
      price: 280,
      tone: "tone-5",
      description: "Three eggs, onion, tomato, green chilli, and buttered toast."
    },
    {
      id: "banana-pancakes",
      name: "Banana Pancakes",
      category: "Brunch",
      price: 300,
      tone: "tone-2",
      description: "Fluffy pancakes, jaggery butter, banana, and a drizzle of honey."
    }
  ];

  const ICONS = {
    Coffee: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M16 27h27v10c0 9-7 16-16 16s-16-7-16-16V27Z"/><path d="M43 30h4c6 0 10 4 10 9s-4 9-10 9h-4"/><path d="M10 58h39"/><path d="M24 18c-3-4 3-6 0-10M34 18c-3-4 3-6 0-10"/></svg>`,
    Tea: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M32 10c-11 11-17 20-17 28a17 17 0 0 0 34 0c0-8-6-17-17-28Z"/><path d="M32 29v25M23 42h18"/></svg>`,
    Bakery: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 38c0-10 9-18 20-18s20 8 20 18v9H12v-9Z"/><path d="M22 29c3 4 3 10 0 18M32 25c3 5 3 14 0 22M42 29c-3 4-3 10 0 18"/><path d="M8 54h48"/></svg>`,
    Brunch: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="30" cy="34" r="20"/><circle cx="30" cy="34" r="10"/><path d="M52 12v40M52 12c5 4 5 9 0 13M12 12v12c0 4 3 7 7 7s7-3 7-7V12"/></svg>`
  };

  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);

  const readJSON = (key, fallback) => {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  };

  const writeJSON = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  };

  const iconFor = (category) => ICONS[category] || ICONS.Coffee;
  const findItem = (id) => MENU.find((item) => item.id === id);

  // Header, mobile navigation, and scroll state
  const header = document.getElementById("site-header");
  const menuButton = document.getElementById("menu-btn");
  const nav = document.getElementById("nav-links");
  const year = document.getElementById("year");

  const closeMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const updateHeader = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (year) year.textContent = new Date().getFullYear();

  // Reveal animation
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add("visible"));
  }

  // Toast
  const toast = document.getElementById("toast");
  let toastTimer = null;
  const showToast = (text) => {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
  };

  // Menu rendering
  let activeFilter = "All";
  let searchTerm = "";

  const menuCard = (item) => `
    <article class="menu-card">
      <div class="menu-art ${item.tone}" aria-hidden="true">${iconFor(item.category)}</div>
      <div class="menu-body">
        <div class="menu-meta"><span>${item.category}</span><span class="menu-price">${money(item.price)}</span></div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <button class="btn btn-small" type="button" data-add="${item.id}">Add to cart</button>
      </div>
    </article>
  `;

  const menuGrid = document.getElementById("menu-grid");
  const featuredGrid = document.getElementById("featured-grid");

  const renderMenu = () => {
    if (!menuGrid) return;
    const query = searchTerm.trim().toLowerCase();
    const items = MENU.filter((item) => {
      const matchesFilter = activeFilter === "All" || item.category === activeFilter;
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });

    menuGrid.innerHTML = items.length
      ? items.map(menuCard).join("")
      : `<p class="empty-state">No menu items match that search. Try a different word or category.</p>`;
  };

  if (featuredGrid) {
    featuredGrid.innerHTML = MENU.slice(0, 3).map(menuCard).join("");
  }

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "All";
      document.querySelectorAll(".filter-btn").forEach((item) => item.classList.toggle("active", item === button));
      renderMenu();
    });
  });

  const searchInput = document.getElementById("menu-search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = searchInput.value;
      renderMenu();
    });
  }

  renderMenu();

  // Cart
  let cart = readJSON("mapleCart", []);
  if (!Array.isArray(cart)) cart = [];
  cart = cart
    .filter((line) => line && findItem(line.id) && Number.isInteger(line.qty) && line.qty > 0)
    .map((line) => ({ id: line.id, qty: Math.min(line.qty, 20) }));

  const countBadges = document.querySelectorAll("#cart-count");
  const cartItems = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const taxEl = document.getElementById("cart-tax");
  const totalEl = document.getElementById("cart-total");

  const totals = () => {
    const subtotal = cart.reduce((sum, line) => {
      const item = findItem(line.id);
      return sum + (item ? item.price * line.qty : 0);
    }, 0);
    const tax = Math.round(subtotal * 0.05);
    return { subtotal, tax, total: subtotal + tax };
  };

  const saveCart = () => writeJSON("mapleCart", cart);

  const renderCart = () => {
    const count = cart.reduce((sum, line) => sum + line.qty, 0);
    countBadges.forEach((badge) => {
      badge.textContent = String(count);
    });

    if (cartItems) {
      cartItems.innerHTML = cart.length
        ? cart
            .map((line) => {
              const item = findItem(line.id);
              if (!item) return "";
              return `
                <div class="cart-item">
                  <div class="cart-thumb ${item.tone}" aria-hidden="true">${iconFor(item.category)}</div>
                  <div class="cart-item-info">
                    <b>${item.name}</b>
                    <span>${money(item.price)} each</span>
                    <div class="qty-row">
                      <button class="qty-btn" type="button" data-dec="${item.id}" aria-label="Remove one ${item.name}">−</button>
                      <span aria-label="Quantity">${line.qty}</span>
                      <button class="qty-btn" type="button" data-inc="${item.id}" aria-label="Add one ${item.name}">+</button>
                    </div>
                  </div>
                  <span class="cart-line-total">${money(item.price * line.qty)}</span>
                </div>
              `;
            })
            .join("")
        : `<p class="cart-empty">Your cart is empty. Add something from the menu.</p>`;
    }

    const { subtotal, tax, total } = totals();
    if (subtotalEl) subtotalEl.textContent = money(subtotal);
    if (taxEl) taxEl.textContent = money(tax);
    if (totalEl) totalEl.textContent = money(total);
  };

  const addToCart = (id) => {
    const item = findItem(id);
    if (!item) return;
    const line = cart.find((entry) => entry.id === id);
    if (line) {
      line.qty = Math.min(line.qty + 1, 20);
    } else {
      cart.push({ id, qty: 1 });
    }
    saveCart();
    renderCart();
    showToast(`${item.name} added to your order.`);
  };

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add]");
    if (addButton) {
      addToCart(addButton.dataset.add);
      return;
    }

    const incButton = event.target.closest("[data-inc]");
    if (incButton) {
      addToCart(incButton.dataset.inc);
      return;
    }

    const decButton = event.target.closest("[data-dec]");
    if (decButton) {
      const line = cart.find((entry) => entry.id === decButton.dataset.dec);
      if (line) {
        line.qty -= 1;
        if (line.qty <= 0) cart = cart.filter((entry) => entry.id !== line.id);
        saveCart();
        renderCart();
      }
    }
  });

  // Cart drawer
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartOpenButton = document.getElementById("cart-open");
  const cartCloseButton = document.getElementById("cart-close");
  const cartClearButton = document.getElementById("cart-clear");

  const openCart = () => {
    document.body.classList.add("cart-open");
    if (cartDrawer) cartDrawer.setAttribute("aria-hidden", "false");
  };

  const closeCart = () => {
    document.body.classList.remove("cart-open");
    if (cartDrawer) cartDrawer.setAttribute("aria-hidden", "true");
  };

  if (cartOpenButton) cartOpenButton.addEventListener("click", openCart);
  if (cartCloseButton) cartCloseButton.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("cart-open")) closeCart();
  });

  if (cartClearButton) {
    cartClearButton.addEventListener("click", () => {
      cart = [];
      saveCart();
      renderCart();
      showToast("Cart cleared.");
    });
  }

  // Checkout
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutMessage = document.getElementById("checkout-message");

  if (checkoutForm && checkoutMessage) {
    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("checkout-name").value.trim();
      const email = document.getElementById("checkout-email").value.trim();
      const phone = document.getElementById("checkout-phone").value.trim();
      const type = document.getElementById("checkout-type").value;
      const digits = phone.replace(/\D/g, "");

      const setMessage = (text, kind) => {
        checkoutMessage.className = `form-message ${kind}`;
        checkoutMessage.textContent = text;
      };

      if (!cart.length) return setMessage("Your cart is empty. Add something first.", "error");
      if (name.length < 2) return setMessage("Please enter your name.", "error");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setMessage("Please enter a valid email address.", "error");
      if (!(digits.length === 10 || (digits.length === 12 && digits.startsWith("91")))) {
        return setMessage("Please enter a valid 10-digit phone number.", "error");
      }
      if (!type) return setMessage("Choose dine in or takeaway.", "error");

      const orderTotals = totals();
      const orderId = `MS-${(globalThis.crypto?.randomUUID?.() || Date.now().toString(36))
        .replace(/-/g, "")
        .slice(0, 6)
        .toUpperCase()}`;

      const order = {
        id: orderId,
        items: cart.map((line) => {
          const item = findItem(line.id);
          return {
            name: item?.name || "Item",
            price: item?.price || 0,
            qty: line.qty
          };
        }),
        subtotal: orderTotals.subtotal,
        tax: orderTotals.tax,
        total: orderTotals.total,
        customer: { name, email, phone, type },
        createdAt: new Date().toISOString()
      };

      const existing = readJSON("mapleOrders", []);
      const orders = Array.isArray(existing) ? existing : [];
      orders.unshift(order);
      writeJSON("mapleOrders", orders.slice(0, 20));

      cart = [];
      saveCart();
      renderCart();
      checkoutForm.reset();
      setMessage(`Order ${orderId} saved for ${name}. This demo does not charge a card.`, "success");
      showToast(`Order ${orderId} placed.`);
    });
  }

  // Reservation form
  const reservationForm = document.getElementById("reservation-form");
  const reservationMessage = document.getElementById("reservation-message");
  const dateInput = document.getElementById("res-date");

  const localDateString = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (dateInput) {
    dateInput.min = localDateString(today);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    dateInput.value = localDateString(tomorrow);
  }

  if (reservationForm && reservationMessage) {
    reservationForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("res-name").value.trim();
      const email = document.getElementById("res-email").value.trim();
      const phone = document.getElementById("res-phone").value.trim();
      const guests = document.getElementById("res-guests").value;
      const date = document.getElementById("res-date").value;
      const time = document.getElementById("res-time").value;
      const notes = document.getElementById("res-notes").value.trim();
      const digits = phone.replace(/\D/g, "");

      const setMessage = (text, kind) => {
        reservationMessage.className = `form-message ${kind}`;
        reservationMessage.textContent = text;
      };

      if (name.length < 2) return setMessage("Please enter your name.", "error");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setMessage("Please enter a valid email address.", "error");
      if (!(digits.length === 10 || (digits.length === 12 && digits.startsWith("91")))) {
        return setMessage("Please enter a valid 10-digit phone number.", "error");
      }
      if (!guests) return setMessage("Please choose the number of guests.", "error");
      if (!date) return setMessage("Please choose a date.", "error");
      if (new Date(`${date}T00:00:00`) < today) return setMessage("Please choose today or a future date.", "error");
      if (!time) return setMessage("Please choose a time.", "error");
      if (notes.length < 3) return setMessage("Add a short note (at least 3 characters).", "error");

      const displayDate = new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short"
      });

      const reservation = {
        name,
        email,
        phone,
        guests: Number(guests),
        date,
        time,
        notes,
        createdAt: new Date().toISOString()
      };

      const existing = readJSON("mapleReservations", []);
      const reservations = Array.isArray(existing) ? existing : [];
      reservations.unshift(reservation);
      writeJSON("mapleReservations", reservations.slice(0, 30));

      setMessage(`Table for ${guests} requested on ${displayDate} at ${time}. Saved in this browser.`, "success");
      reservationForm.reset();
      if (dateInput) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        dateInput.value = localDateString(tomorrow);
      }
    });
  }

  // Contact form
  const contactForm = document.getElementById("contact-form");
  const contactStatus = document.getElementById("contact-status");

  if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const subject = document.getElementById("contact-subject").value;
      const message = document.getElementById("contact-message").value.trim();

      const setMessage = (text, kind) => {
        contactStatus.className = `form-message ${kind}`;
        contactStatus.textContent = text;
      };

      if (name.length < 2) return setMessage("Please enter your name.", "error");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setMessage("Please enter a valid email address.", "error");
      if (!subject) return setMessage("Please choose a subject.", "error");
      if (message.length < 10) return setMessage("Tell us a little more (at least 10 characters).", "error");

      const entry = { name, email, subject, message, createdAt: new Date().toISOString() };
      const existing = readJSON("mapleMessages", []);
      const messages = Array.isArray(existing) ? existing : [];
      messages.unshift(entry);
      writeJSON("mapleMessages", messages.slice(0, 30));

      setMessage(`Thanks, ${name}. Your message is saved in this browser.`, "success");
      contactForm.reset();
    });
  }

  // Initial paint of the cart and count badges
  renderCart();
})();
