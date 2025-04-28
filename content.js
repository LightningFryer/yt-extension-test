// Inject Tailwind CSS
function injectTailwind() {
  if (document.getElementById("tailwindcss-extension-style")) return;
  const link = document.createElement("link");
  link.id = "tailwindcss-extension-style";
  link.href =
    "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

injectTailwind();

// Create and insert the div
function createDiv() {
  const player = document.getElementById("player");
  if (!player) {
    console.log("Player not found");
    return false;
  }

  if (document.getElementById("my-extension-div")) {
    console.log("Div already exists");
    return true;
  }

  const div = document.createElement("div");
  div.id = "my-extension-div";

  // Start hidden off screen
  div.className = `
    bg-yellow-300 p-5 mt-4 border border-black text-2xl rounded-lg
    transform -translate-y-10 opacity-0
    transition-all duration-500 ease-out
  `
    .replace(/\s+/g, " ")
    .trim();

  div.innerText =
    "THIS IS A TEST TEXT. THIS DIV IS INJECTED BY A CUSTOM EXTENSION";

  player.parentNode.insertBefore(div, player.nextSibling);

  // Trigger animation after a tiny delay to allow CSS transition
  requestAnimationFrame(() => {
    div.classList.remove("-translate-y-10", "opacity-0");
    div.classList.add("translate-y-0", "opacity-100");
  });

  console.log("✅ Div injected with animation");
  return true;
}

// Remove the div (with slide-up transition)
function removeDiv() {
  const div = document.getElementById("my-extension-div");
  if (div) {
    // Animate before removing
    div.classList.add("-translate-y-10", "opacity-0");
    div.classList.remove("translate-y-0", "opacity-100");

    setTimeout(() => {
      div.remove();
      console.log("🗑️ Div removed after animation");
    }, 400); // wait for the transition to finish
    return true;
  }
  return false;
}

// Wait for player, then toggle div
function waitForPlayerAndToggle() {
  const interval = setInterval(() => {
    const player = document.getElementById("player");
    if (player) {
      if (document.getElementById("my-extension-div")) {
        removeDiv();
      } else {
        createDiv();
      }
      clearInterval(interval);
    }
  }, 300);
}

// Listen for "Y" key
window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "y") {
    console.log('🎯 "Y" pressed');
    waitForPlayerAndToggle();
  }
});
