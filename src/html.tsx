import * as elements from "typed-html";

export const BASEHTML = ({ children }: elements.children) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Chainlink ENS Price Feeds</title>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/htmx.org@1.9.5"></script>
<style>
  /* Light theme */
  :root {
    --background-color: #f5f5f5;
    --text-color: #333;
  }
  
  body {
    background-color: var(--background-color);
    color: var(--text-color);
  }
  
  /* Dark theme */
  body.dark-theme {
    background-color: #333;
    color: #f5f5f5;
  }
  
  /* Style the label for the toggle switch */
  .toggle-label {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  /* Style the hidden checkbox */
  .toggle-checkbox {
    display: none;
  }

  /* Style the switch container */
  .toggle-switch {
    width: 40px;
    height: 20px;
    background-color: #ccc;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
  }

  /* Style the toggle knob */
  .toggle-knob {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 0;
    transition: transform 0.3s ease-in-out;
  }

  /* Move the toggle knob to the right when the checkbox is checked */
  .toggle-checkbox:checked + .toggle-switch .toggle-knob {
    transform: translateX(20px);
  }
</style>
</head>
<body class="p-4">
<label class="toggle-label" for="theme-toggle">
  <input type="checkbox" id="theme-toggle" class="toggle-checkbox"/>
  <div class="toggle-switch">
    <div class="toggle-knob"></div>
  </div>
</label>
${children}
</body>
<script>
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      // Apply your dark theme styles here
      document.body.classList.add('dark-theme');
    } else {
      // Apply your light theme styles here
      document.body.classList.remove('dark-theme');
    }
  });
  copyToClip = (address) => {
    navigator.clipboard.writeText(address);
    alert("Copied "+ address +" to clipboard");
  }
</script>
</html>
`;
