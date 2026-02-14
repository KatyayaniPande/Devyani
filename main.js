const heartsContainer = document.getElementById("floating-hearts");
const petalsContainer = document.getElementById("falling-petals");
const revealButton = document.querySelector("[data-reveal-btn]");
const revealMessage = document.querySelector("[data-reveal-message]");
const flipCards = document.querySelectorAll("[data-flip-card]");
const scrollButton = document.querySelector("[data-scroll-target]");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const createFloatingHeart = () => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤";
  const size = randomBetween(14, 36);
  heart.style.left = `${randomBetween(0, 100)}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.opacity = randomBetween(0.3, 0.85);
  heart.style.animationDuration = `${randomBetween(8, 16)}s`;
  heart.style.animationDelay = `${randomBetween(0, 4)}s`;
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 18000);
};

const createPetal = () => {
  const petal = document.createElement("div");
  petal.className = "petal";
  petal.style.left = `${randomBetween(0, 100)}%`;
  petal.style.width = `${randomBetween(10, 22)}px`;
  petal.style.height = `${randomBetween(10, 22)}px`;
  petal.style.opacity = randomBetween(0.3, 0.7);
  petal.style.animationDuration = `${randomBetween(10, 18)}s`;
  petal.style.animationDelay = `${randomBetween(0, 6)}s`;
  petalsContainer.appendChild(petal);

  setTimeout(() => petal.remove(), 20000);
};

if (!prefersReducedMotion) {
  setInterval(createFloatingHeart, 700);
  setInterval(createPetal, 900);
  for (let i = 0; i < 10; i += 1) {
    createFloatingHeart();
    createPetal();
  }
}

if (revealButton && revealMessage) {
  revealButton.addEventListener("click", () => {
    revealMessage.classList.add("is-visible");
    revealButton.setAttribute("aria-hidden", "true");
    revealButton.style.display = "none";
  });
}

if (flipCards.length) {
  flipCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  });
}

if (scrollButton) {
  scrollButton.addEventListener("click", () => {
    const target = document.querySelector(scrollButton.dataset.scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const revealItems = document.querySelectorAll(".reveal-on-scroll");
if (revealItems.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
