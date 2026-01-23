// ===== Helpers =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const form = $("#signup-form");

const summaryPlan = $("#summaryPlan");
const summaryBilling = $("#summaryBilling");
const summaryPrice = $("#summaryPrice");

const prices = {
  monthly: { basic: "$2.99/mo", advanced: "$5.99/mo", pro: "$9.99/mo" },
  annual: { basic: "$28.70/yr", advanced: "$57.50/yr", pro: "$95.90/yr" },
};

function setError(key, msg) {
  const el = document.querySelector(`[data-error-for="${key}"]`);
  if (el) el.textContent = msg || "";
}

function getQueryPlan() {
  const params = new URLSearchParams(window.location.search);
  const plan = params.get("plan");
  if (!plan) return null;
  const normalized = plan.toLowerCase();
  if (["basic", "advanced", "pro"].includes(normalized)) return normalized;
  return null;
}

function getSelectedBilling() {
  return (
    document.querySelector('input[name="billing"]:checked')?.value || "monthly"
  );
}

function getSelectedPlan() {
  return document.querySelector('input[name="plan"]:checked')?.value || "";
}

function updateSummary() {
  const billing = getSelectedBilling();
  const plan = getSelectedPlan();

  summaryBilling.textContent = billing === "annual" ? "Annual" : "Monthly";
  summaryPlan.textContent = plan
    ? plan.charAt(0).toUpperCase() + plan.slice(1)
    : "—";

  if (plan) {
    summaryPrice.textContent = prices[billing][plan];
  } else {
    summaryPrice.textContent = "$—";
  }

  // Update the visible prices on plan cards
  document.querySelectorAll("[data-price]").forEach((node) => {
    const key = node.getAttribute("data-price");
    node.textContent = prices[billing][key];
  });
}

function preselectPlan() {
  const planFromUrl = getQueryPlan();
  if (!planFromUrl) return;

  const radio = document.querySelector(
    `input[name="plan"][value="${planFromUrl}"]`,
  );
  if (radio) radio.checked = true;
}

// ===== Events =====
window.addEventListener("load", () => {
  preselectPlan();
  updateSummary();
});

$$('input[name="billing"]').forEach((r) =>
  r.addEventListener("change", updateSummary),
);

$$('input[name="plan"]').forEach((r) =>
  r.addEventListener("change", () => {
    setError("plan", "");
    updateSummary();
  }),
);

// ===== Validation + Submit =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // reset errors
  ["email", "password", "confirmPassword", "plan", "terms"].forEach((k) =>
    setError(k, ""),
  );

  const email = $("#email").value.trim();
  const password = $("#password").value;
  const confirmPassword = $("#confirmPassword").value;
  const plan = getSelectedPlan();
  const terms = $("#terms").checked;

  let ok = true;

  // Basic email check
  if (!email) {
    setError("email", "Email is required.");
    ok = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    setError("email", "Enter a valid email address.");
    ok = false;
  }

  if (!password) {
    setError("password", "Password is required.");
    ok = false;
  } else if (password.length < 8) {
    setError("password", "Use at least 8 characters.");
    ok = false;
  }

  if (!confirmPassword) {
    setError("confirmPassword", "Please confirm your password.");
    ok = false;
  } else if (confirmPassword !== password) {
    setError("confirmPassword", "Passwords do not match.");
    ok = false;
  }

  if (!plan) {
    setError("plan", "Please select a plan.");
    ok = false;
  }

  if (!terms) {
    setError("terms", "Please accept the demo terms.");
    ok = false;
  }

  if (!ok) return;

  // Demo redirect (you can change the filename if yours is different)
  const billing = getSelectedBilling();

  // pass along what they selected
  const url = `Confirmation.html?plan=${encodeURIComponent(plan)}&billing=${encodeURIComponent(billing)}&email=${encodeURIComponent(email)}`;
  window.location.href = url;
});
