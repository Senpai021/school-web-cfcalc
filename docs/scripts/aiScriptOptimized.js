// Constants for language-specific button labels and language indicators
const enFahr = "Calculate Celsius";
const deFahr = "Fahrenheit berechnen";
const langStDe = "[de]";
const langStEn = "[en]";

// References to HTML elements
const hElement = document.getElementById("h");
const lswButton = document.getElementById("lsw");
const tempCalcButton = document.getElementById("tempCalc");
const celsiusLabel = document.getElementById("idCelsius");
const fahrenheitLabel = document.getElementById("idFahrenheit");
const celsiusInput = document.getElementById("celsius");
const fahrenheitInput = document.getElementById("fahrenheit");

// Function to get the current language from the HTML element
function getLanguage() {
    return hElement.lang;
}

// Function to handle the language switch
function switchLanguage() {
    let currentLanguage = getLanguage();
    let isCalculationDone = (celsiusInput.value !== "" || fahrenheitInput.value !== "");

    switch (currentLanguage) {
        case "en":
            // Disable Fahrenheit input, enable Celsius input
            fahrenheitInput.disabled = true;
            celsiusInput.disabled = false;
            setLanguageElements("de", "Sprache ändern", deFahr, "Grad Celsius", "Grad Fahrenheit");
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
            setLanguageElements("en", "Switch Language", enFahr, "degrees Celsius", "degrees Fahrenheit");
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

// Function to set language-specific elements
function setLanguageElements(language, lswValue, tempCalcValue, celsiusLabelText, fahrenheitLabelText) {
    hElement.lang = language;
    lswButton.value = `${lswValue} ${language === "de" ? langStDe : langStEn}`;
    tempCalcButton.value = tempCalcValue;
    celsiusLabel.innerHTML = celsiusLabelText;
    fahrenheitLabel.innerHTML = fahrenheitLabelText;
    fahrenheitLabel.style.fontSize = "20px";
    if (language === "de") {
        document.title = "Temperatur Rechner";
    } else if (language === "en") {
        document.title = "Temperature Calculator";
    }
}

// Function to calculate and display temperature conversion
function calc() {
    let celsius = parseFloat(celsiusInput.value);
    let fahrenheit = parseFloat(fahrenheitInput.value);

    if (celsiusInput.value === "" && fahrenheitInput.value === "") {
        alert(getLanguage() === "de" ? "Bitte einen Wert angeben!" : "Please enter a value!");
        return;
    }

    let language = getLanguage();

    if (isNaN(celsius)) {
        alert(language === "de" ? "Bitte geben Sie einen gültigen Wert ein!" : "Please enter a valid value!");
        return;
    }

    if (language === "de") {
        // Calculate Fahrenheit from Celsius
        fahrenheit = (celsius * 9 / 5) + 32;
        fahrenheitInput.value = fahrenheit.toFixed(2);
        alert(`${celsius.toFixed(2)} Grad Celsius sind umgerechnet ${fahrenheit.toFixed(2)} Grad Fahrenheit`);
    } else if (language === "en") {
        // Calculate Celsius from Fahrenheit
        celsius = ((fahrenheit - 32) * 5 / 9);
        celsiusInput.value = celsius.toFixed(2);
        alert(`${fahrenheit.toFixed(2)} degrees Fahrenheit is equivalent to ${celsius.toFixed(2)} degrees Celsius`);
    }
}
