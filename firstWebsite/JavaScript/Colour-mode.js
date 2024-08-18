// Define DOM elements
const toggleButton = document.querySelector("#toggle-button");
const colorMode = document.querySelector("#color-mode");
const root = document.querySelector(":root");
const storageKey = "color-mode";
const defaultMode = "light-mode";

// Load the current color mode from local storage
function loadColorMode() {
    const colorMode = localStorage.getItem(storageKey);
    root.classList.add(colorMode || defaultMode);
    updateToggleButton();
}

// Save the user's preferred color mode to local storage
function saveColorMode() {
    const currentMode = root.classList.contains("dark-mode") ? "light-mode" : "dark-mode";
    root.classList.remove("light-mode", "dark-mode");
    root.classList.add(currentMode);
    localStorage.setItem(storageKey, currentMode);
    updateToggleButton();
}

// Update the toggle button appearance based on the current mode
function updateToggleButton() {
    if (root.classList.contains("dark-mode")) {
        toggleButton.style.backgroundImage = "var(--moon)";
        toggleButton.style.transform = "translateX(30px)"; // Adjust if needed
    } else {
        toggleButton.style.backgroundImage = "var(--sun)";
        toggleButton.style.transform = "translateX(0px)"; // Adjust if needed
    }
}

// Initialize the color mode
loadColorMode();

// Add event listener to toggle the color mode
toggleButton.addEventListener("click", () => {
    saveColorMode();
});
