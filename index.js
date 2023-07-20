
let model; // Declare the model variable outside the loadmodel() function
let predictButton = document.getElementById("predictButton");
let loader = document.getElementById("loader");
let popup = document.getElementById("popup");
let closeButton = document.getElementById("closeButton");
let overlay = document.getElementById("overlay");
let headerElement = document.getElementById("header");
let paragraphElement = document.getElementById("paragraph");

// LOAD THE MODEL
async function loadModel() {
  model = await tf.loadLayersModel('model/model.json');
}

// LOAD THE IMAGE FILE 
function readURL(input) {
    if (input.files && input.files[0]) {
  
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('.image-upload-wrap').hide();
  
        $('.file-upload-image').attr('src', e.target.result);
        $('.file-upload-content').show();
      };
  
      reader.readAsDataURL(input.files[0]);
  
    }
}

// PREDICT FUNCTION TO MAKE PREDICTIONS
async function predict() {
  await loadModel(); // Call the loadModel() function to load the model

  const image = document.getElementById('img-predict');
  const inputArray = tf.browser.fromPixels(image);
  const resizedInput = tf.image.resizeBilinear(inputArray, [256, 256]);

  const rescaledInput = resizedInput.div(255);
  const reshapedInput = rescaledInput.expandDims(0);
  const predictions = model.predict(reshapedInput);

  const predictionsData = await predictions.data();
  const predictedValues = Array.from(predictionsData);

  // Find the index of the highest probability value
  const highestProbabilityIndex = predictedValues.indexOf(Math.max(...predictedValues));
  
  // Get the highest probability prediction
  const highestProbabilityPrediction = predictedValues[highestProbabilityIndex];

  // Change the text content of the header and paragraph
    if (highestProbabilityIndex === 0) {
        headerElement.textContent = "Bacterial Spot";
        paragraphElement.textContent = "This disease is prevalent in warm and humid environments, and it primarily affects the leaves and fruit of tomato plants. Infected plants develop small, dark, and water-soaked spots on their leaves, which can later turn yellow or brown. Bacterial spot can significantly reduce the quality and marketability of tomatoes if left uncontrolled.";
    } else if (highestProbabilityIndex === 1) {
        headerElement.textContent = "Early Blight";
        paragraphElement.textContent = "Early blight is another fungal disease caused by the pathogen Alternaria solani. It usually affects older leaves, causing irregularly shaped, brown lesions with concentric rings. Early blight can weaken the plant, reduce fruit yield, and impact fruit quality. Proper spacing, good airflow, and avoiding overhead watering can help manage early blight.";
    } else if (highestProbabilityIndex === 2) {
        headerElement.textContent = "Healthy";
        paragraphElement.textContent = "No signs of any disease are detected on the leaf. However, it's essential to monitor the plants regularly for any changes in health, as diseases can develop over time.";
    } else if (highestProbabilityIndex === 3) {
        headerElement.textContent = "Late Blight";
        paragraphElement.textContent = "Late blight is one of the most destructive diseases affecting tomato plants. It thrives in cool, humid conditions, making it particularly destructive during rainy seasons. Symptoms include dark, water-soaked lesions on leaves, stems, and fruit and can spread rapidly and lead to significant crop loss if not managed promptly.";
    }
}

// Add event listener to the predict button
predictButton.addEventListener("click", async function() {
    // Show the loader
    loader.style.display = "block";

    // Call the predict function to make predictions
    await predict();

    // Hide the loader and show the popup and overlay
    loader.style.display = "none";
    overlay.style.display = "block";
    popup.style.display = "block";
});

// Add event listener to the predict button
predictButton.addEventListener("click", function() {

    // Delay showing the popup window
    setTimeout(function() {
        // Hide the loader and show the popup and overlay
        loader.style.display = "none";
        overlay.style.display = "block";
        popup.style.display = "block";
    }, 3000); // 2 seconds delay
});


closeButton.addEventListener("click", function() {
    // Hide the popup and overlay
    popup.style.display = "none";
    overlay.style.display = "none";
});
