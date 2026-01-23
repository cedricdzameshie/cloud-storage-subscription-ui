const toggleSwitch = document.getElementById("billing-switch");

const monthlyPrices = document.querySelectorAll(".price--monthly");
const annualPrices = document.querySelectorAll(".price--annual");

function setBilling(isAnnual) {
  if (isAnnual) {
    // Show annual prices
    annualPrices.forEach((el) => el.classList.remove("hidden"));

    // Strike + mute monthly prices
    monthlyPrices.forEach((el) => {
      el.classList.add("price--muted");
    });
  } else {
    // Hide annual prices
    annualPrices.forEach((el) => el.classList.add("hidden"));

    // Restore monthly prices
    monthlyPrices.forEach((el) => {
      el.classList.remove("price--muted");
    });
  }
}

// Initial load
setBilling(toggleSwitch.checked);

// Toggle handler
toggleSwitch.addEventListener("change", () => {
  setBilling(toggleSwitch.checked);
});
