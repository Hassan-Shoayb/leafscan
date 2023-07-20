![leafscan](https://socialify.git.ci/Hassan-Shoayb/leafscan/image?description=1&descriptionEditable=A%20project%20that%20demonstrates%20the%20application%20of%20machine%20learning%20and%20transfer%20learning%20techniques%20to%20identify%20diseases%20in%20tomato%20leaves.&forks=1&issues=1&name=1&owner=1&stargazers=1&theme=Light)

This project aims to detect and classify tomato diseases using transfer learning with the InceptionV3 model. Transfer learning allows us to leverage the pre-trained InceptionV3 model's knowledge on a large dataset and fine-tune it for our specific task of tomato diseases detection. The trained model is deployed on a website using TensorFlow JavaScript, allowing users to upload images and receive predictions regarding the presence of diseases in tomatoes.

[live Demo](https://leafscan.netlify.app//)

```my_tomato_project/
|-- website/
|   |-- index.html
|   |-- style.css
|   |-- scripts.js
|-- notebooks/
|   |-- data_preparation.ipynb
|   |-- model_training.ipynb
|   |-- evaluation.ipynb
|-- saved_models/
|   |-- inceptionv3_model.h5
|   |-- ...
|-- README.md
|-- LICENSE

```
