document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const localImagePattern = /photo-[^/?]+/;
  const imageElements = document.querySelectorAll("img[src]");

  imageElements.forEach((image) => {
    const match = image.src.match(localImagePattern);

    if (!match) {
      return;
    }

    const localSrc = `assets/images/${match[0]}.jpg`;

    image.addEventListener("error", () => {
      if (image.dataset.fallbackApplied === "true") {
        return;
      }

      image.dataset.fallbackApplied = "true";
      image.src = localSrc;
    });
  });

  const nights = document.querySelector("#nights");
  const nightsValue = document.querySelector("#nights-value");
  const form = document.querySelector("#trip-form");
  const message = document.querySelector("#form-message");

  if (nights && nightsValue) {
    const updateNights = () => {
      nightsValue.textContent = nights.value;
    };

    nights.addEventListener("input", updateNights);
    updateNights();
  }

  if (form && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();

      if (!name || !email) {
        message.textContent = "Please fill in your name and email.";
        return;
      }

      message.textContent = `Thanks, ${name}. Your enquiry is ready.`;
      form.reset();
      if (nightsValue) {
        nightsValue.textContent = "5";
      }
    });
  }
});
