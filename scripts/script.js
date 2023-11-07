// Constants for language-specific button labels and language indicators
const enFahr = "Calculate Celsius";
const deFahr = "Fahrenheit berechnen";
const langStDe = "[de]";
const langStEn = "[en]";

// Function to get the current language from the HTML element
function getLanguage() {
    return document.getElementById("h").lang;
}

// Get the current language using the getLanguage() function
switch (getLanguage()) {
    case "de":
        // If the current language is German ("de"), set the button value to switch to English
        document.getElementById("lsw").value = `Sprache ändern ${langStDe}`;
        break;
    case "en":
        // If the current language is English ("en"), set the button value to switch to German
        document.getElementById("lsw").value = `Switch Language ${langStEn}`;
        break;
    // Add more cases for other languages if needed
    default:
        // Handle default case
        break;
}


// Function to handle the language switch
function switchLanguage() {
    let currentLanguage = getLanguage();
    let langSwitchButton = document.getElementById("lsw");
    let tempCalcButton = document.getElementById("tempCalc");
    let celsiusLabel = document.getElementById("idCelsius");
    let fahrenheitLabel = document.getElementById("idFahrenheit");

    let celsiusInput = document.getElementById("celsius");
    let fahrenheitInput = document.getElementById("fahrenheit");
    let isCalculationDone = (celsiusInput.value !== "" || fahrenheitInput.value !== "");

    switch (currentLanguage) {
        case "en":
            // Disable Fahrenheit input, enable Celsius input
            fahrenheitInput.disabled = true;
            celsiusInput.disabled = false;

            // Set the language to German
            document.getElementById("h").lang = "de";

            // Update button labels and labels for the switched language
            langSwitchButton.value = `Sprache ändern ${langStDe}`;
            tempCalcButton.value = deFahr;
            celsiusLabel.innerHTML = "Grad Celsius";
            fahrenheitLabel.innerHTML = "Grad Fahrenheit";
            fahrenheitLabel.style.fontSize = "20px";
            document.title = "Temperatur Rechner";

            if (isCalculationDone) {
                // Swap values and recalculate if a calculation has been run
                celsiusInput.value = fahrenheitInput.value;
                calc();
            }
            break;

        case "de":
            // Enable Fahrenheit input, disable Celsius input
            fahrenheitInput.disabled = false;
            celsiusInput.disabled = true;

            // Set the language to English
            document.getElementById("h").lang = "en";

            // Update button labels and labels for the switched language
            langSwitchButton.value = `Switch Language ${langStEn}`;
            tempCalcButton.value = enFahr;
            celsiusLabel.innerHTML = "degrees Celsius";
            fahrenheitLabel.innerHTML = "degrees Fahrenheit";
            fahrenheitLabel.style.fontSize = "20px";
            document.title = "Temperature Calculator";

            if (isCalculationDone) {
                // Swap values and recalculate if a calculation has been run
                fahrenheitInput.value = celsiusInput.value;
                calc();
            }
            break;

        // Add more cases for other languages if needed

        default:
            // Handle default case
            break;
    }
}


// Function to calculate and display temperature conversion
function calc() {
    let celsiusInput = document.getElementById("celsius").value;
    let fahrenheitInput = document.getElementById("fahrenheit").value;
    let celsius = parseFloat(celsiusInput);
    let fahrenheit = parseFloat(fahrenheitInput);
    
    if (celsius === 69.69 || fahrenheit === 69.69) {
        window.open("https://www.reddit.com/r/Spengergasse/", "_blank");
    }
    
    if (celsius === 15.01 || fahrenheit === 15.01) {
        createYouTubeIframe();
        console.log("works, hopefully");
    }

    // Check for empty inputs
    if (celsiusInput === "" && fahrenheitInput === "") {
        alert(getLanguage() === "de" ? "Bitte einen Wert angeben!" : "Please enter a value!");
        return;
    }

    // Get the current language
    let language = getLanguage();

    // Check for invalid input
    if (isNaN(celsius)) {
        alert(language === "de" ? "Bitte geben Sie einen gültigen Wert ein!" : "Please enter a valid value!");
        return;
    }

    // Calculate and display the result based on the selected language
    if (language === "de") {
        fahrenheit = (celsius * 9 / 5) + 32;
        document.getElementById("fahrenheit").value = fahrenheit.toFixed(2);
        alert(`${celsius.toFixed(2)} Grad Celsius sind umgerechnet ${fahrenheit.toFixed(2)} Grad Fahrenheit`);
    } else if (language === "en") {
        celsius = ((fahrenheit - 32) * 5 / 9);
        document.getElementById("celsius").value = celsius.toFixed(2);
        alert(`${fahrenheit.toFixed(2)} degrees Fahrenheit is equivalent to ${celsius.toFixed(2)} degrees Celsius`);
    }
}
function createYouTubeIframe() {
    const iframe = document.createElement("iframe");
    iframe.width = 560;
    iframe.height = 315;
    iframe.src = "https://www.youtube.com/embed/PTENmzgkJL8?si=DRUts0r36tKJpGli";
    iframe.title = "YouTube video player";
    iframe.frameBorder = 0;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.style.display = "none";

    // Add the iframe element to the document
    document.getElementById("iframeContainer").appendChild(iframe);
}
