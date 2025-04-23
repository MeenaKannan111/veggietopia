import pandas as pd
from sklearn.decomposition import TruncatedSVD
from sklearn.metrics.pairwise import cosine_similarity
import pickle

# Load dataset
data = pd.read_csv("../data/user_product_interactions.csv")

# Create a user-product interaction matrix
interaction_matrix = data.pivot(index="user_id", columns="product_id", values="interaction_count").fillna(0)
n_features = interaction_matrix.shape[1]  # Number of products (columns)
n_components = min(10, n_features)  # Use 10 or the number of features, whichever is smaller

# Train a collaborative filtering model using matrix factorization
svd = TruncatedSVD(n_components=n_components)
latent_matrix = svd.fit_transform(interaction_matrix)

# Save the model and interaction matrix
with open("../flask_api/model.pkl", "wb") as model_file:
    pickle.dump((svd, interaction_matrix), model_file)

print("Model trained and saved successfully!")