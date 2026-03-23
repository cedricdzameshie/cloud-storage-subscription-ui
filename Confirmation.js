function generateConfirmId() {
  // Example: DM-2026-8F3K2Q
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `DM-${year}-${rand}`;
}

function titleCase(str) {
  return (str || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function nextRenewalDate(billing) {
  const d = new Date();
  if (billing === "annual") d.setFullYear(d.getFullYear() + 1);
  else d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const params = new URLSearchParams(window.location.search);

const email = params.get("email") || "demo@drmembrane.dev";
const plan = params.get("plan") || "advanced";
const billing = params.get("billing") || "monthly";

const confirmIdEl = document.getElementById("confirmId");
const emailEl = document.getElementById("emailValue");
const planEl = document.getElementById("planValue");
const billingEl = document.getElementById("billingValue");
const renewalEl = document.getElementById("renewalValue");

const confirmId = generateConfirmId();

confirmIdEl.textContent = confirmId;
emailEl.textContent = email;
planEl.textContent = titleCase(plan);
billingEl.textContent = billing === "annual" ? "Annual" : "Monthly";
renewalEl.textContent = nextRenewalDate(billing);

// Copy button
document.getElementById("copyIdBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(confirmId);
    const btn = document.getElementById("copyIdBtn");
    const old = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = old), 900);
  } catch {
    // If clipboard fails, do nothing (still fine for demo)
  }
});
