from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

# Load the trained model and interaction matrix
with open("model.pkl", "rb") as model_file:
    svd, interaction_matrix = pickle.load(model_file)

# Initialize Flask app
app = Flask(__name__)

# API endpoint for recommendations
@app.route("/recommendations/<int:user_id>", methods=["GET"])
def recommend_products(user_id):
    try:
        # Check if user exists in the interaction matrix
        if user_id not in interaction_matrix.index:
            return jsonify({"recommendations": []})

        # Get the user's latent vector
        user_index = interaction_matrix.index.get_loc(user_id)
        user_latent_vector = svd.transform(interaction_matrix.iloc[user_index].values.reshape(1, -1))

        # Compute similarity with all products
        product_similarity = np.dot(user_latent_vector, svd.components_)
        recommended_product_indices = np.argsort(product_similarity[0])[::-1][:5]

        # Map indices to product IDs
        recommended_products = interaction_matrix.columns[recommended_product_indices].tolist()

        return jsonify({"recommendations": recommended_products})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)