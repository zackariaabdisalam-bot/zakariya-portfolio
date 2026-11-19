const CONTACT = {
  email: "zackariaabdisalam@gmail.com",
  whatsapp: "254768182415",
  github: "https://github.com/zackariaabdisalam-bot",
};

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const deadlineInput = document.querySelector("#deadline");

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelectorAll("[data-social='github']").forEach((link) => {
  link.href = CONTACT.github;
});
document.querySelectorAll("[data-email]").forEach((link) => {
  link.href = `mailto:${CONTACT.email}`;
});

function makeWhatsAppUrl(message) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = makeWhatsAppUrl("Hi Zakariya, I'd like to discuss a project.");
});

const today = new Date();
const pad = (value) => String(value).padStart(2, "0");
deadlineInput.min = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navLinks.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("is-open", !isExpanded);
  document.body.classList.toggle("menu-open", !isExpanded);
});

navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector("#project-type").value = link.dataset.service;
  });
});

document.querySelectorAll("[data-project]").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector("#project-type").value = "Custom Software Development";
    document.querySelector("#message").value = `I'd like to discuss a system similar to ${link.dataset.project}. `;
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const values = new FormData(contactForm);
  const lines = [
    "Hi Zakariya, I'd like to discuss a project.",
    "",
    `Name: ${values.get("name")}`,
    `Email: ${values.get("email") || "Not provided"}`,
    `Phone: ${values.get("phone") || "Not provided"}`,
    `Project type: ${values.get("projectType")}`,
    `Budget: ${values.get("budget") || "Prefer to discuss"}`,
    `Target deadline: ${values.get("deadline") || "Flexible / to discuss"}`,
    "",
    `Project details: ${values.get("message")}`,
  ];
  const whatsappUrl = makeWhatsAppUrl(lines.join("\n"));
  const whatsappLink = document.createElement("a");

  whatsappLink.href = whatsappUrl;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
  whatsappLink.textContent = "Open WhatsApp to send your enquiry";
  formStatus.replaceChildren(document.createTextNode("WhatsApp should open with your enquiry. If it doesn't, "), whatsappLink, document.createTextNode("."));
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
