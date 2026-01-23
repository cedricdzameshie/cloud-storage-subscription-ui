document.addEventListener("DOMContentLoaded", () => {
  const billingSwitch = document.getElementById("billing-switch");

  const monthlyPrices = document.querySelectorAll(".price--monthly");
  const annualPrices = document.querySelectorAll(".price--annual");

  if (!billingSwitch) {
    console.error("Missing #billing-switch in HTML.");
    return;
  }

  function setBilling(isAnnual) {
    // Show annual, hide monthly (or vice versa)
    monthlyPrices.forEach((el) => el.classList.toggle("hidden", isAnnual));
    annualPrices.forEach((el) => el.classList.toggle("hidden", !isAnnual));

    // Optional: line-through monthly when annual selected
    monthlyPrices.forEach((el) => el.classList.toggle("is-striked", isAnnual));
  }

  // Initial render
  setBilling(billingSwitch.checked);

  // Toggle
  billingSwitch.addEventListener("change", () => {
    setBilling(billingSwitch.checked);
  });
});
