// Inject Tailwind
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

// Inject your div
function injectDiv() {
  const player = document.getElementById("player");
  if (!player) {
    console.log("Player not found yet...");
    return;
  }
  if (document.getElementById("my-extension-div")) return;

  const newDiv = document.createElement("div");
  newDiv.id = "my-extension-div";
  newDiv.className =
    "bg-yellow-300 p-10 mt-4 border border-black text-xl rounded-lg";
  newDiv.innerText =
    "THIS IS A TEST TEXT. THIS DIV IS INJECTED BY A CUSTOM EXTENSION";

  player.parentElement.insertBefore(newDiv, player.nextSibling);
}

// Observe YouTube page
let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    console.log("URL changed!", currentUrl);
    lastUrl = currentUrl;
    setTimeout(injectDiv, 1000);
  }
}).observe(document, { subtree: true, childList: true });

setTimeout(injectDiv, 1000);
