
let cartCount = 0;
const cartDisplay = document.createElement("div");
cartDisplay.className = "cart";
cartDisplay.innerHTML = `🛒 <span id="cartCount">0</span>`;
document.querySelector(".header-wrap").appendChild(cartDisplay);

const cards = document.querySelectorAll(".grid .card");

cards.forEach((card) => {
  const btn = document.createElement("button");
  btn.className = "btn add";
  btn.textContent = "Legg i kurv";
  card.appendChild(btn);

  btn.addEventListener("click", () => {
    cartCount++;
    document.getElementById("cartCount").textContent = cartCount;
  });
});

const menySection = document.getElementById("meny");
const grid = menySection.querySelector(".grid");
const filterBar = document.createElement("div");
filterBar.className = "filters";
filterBar.style.margin = "10px 0";

filterBar.innerHTML = `
  <button class="chip chip--active" data-filter="alle">Alle</button>
  <button class="chip" data-filter="veg">Veg</button>
  <button class="chip" data-filter="kjott">Kjøtt</button>
  <button class="chip" data-filter="spicy">Spicy</button>
  <small id="visibleCount"></small>
`;
grid.parentNode.insertBefore(filterBar, grid);

const filterBtns = filterBar.querySelectorAll(".chip");
const visibleCount = document.getElementById("visibleCount");

function getCategory(card) {
  const title = card.querySelector("h3").textContent.toLowerCase();
  if (title.includes("veg")) return "veg";
  if (title.includes("djevel")) return "spicy";
  return "kjott"; 
}

function updateFilter(category) {
  cards.forEach((card) => {
    const cat = getCategory(card);
    const show = category === "alle" || category === cat;
    card.style.display = show ? "" : "none";
  });

  filterBtns.forEach((btn) =>
    btn.classList.toggle("chip--active", btn.dataset.filter === category)
  );

  const visible = [...cards].filter((c) => c.style.display !== "none").length;
  visibleCount.textContent = `Viser ${visible} pizzaer`;
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => updateFilter(btn.dataset.filter));
});

updateFilter("alle");

const form = document.querySelector("form.form");
if (form) {
  const feedback = document.createElement("p");
  feedback.id = "feedback";
  form.appendChild(feedback);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const navn = form.navn.value.trim();
    if (!navn) {
      feedback.textContent = "Skriv inn navnet ditt 🙂";
      return;
    }
    feedback.textContent = `Takk, ${navn}! Vi tar kontakt snarest.`;
    form.reset();
  });
}
