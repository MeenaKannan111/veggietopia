import pickle
import numpy as np
import pandas as pd
import os

def load_model():
    model_dir = os.path.join(os.path.dirname(__file__), '../pickle/model')
    with open(os.path.join(model_dir, 'U.pkl'), 'rb') as f:
        U = pickle.load(f)
    with open(os.path.join(model_dir, 'sigma.pkl'), 'rb') as f:
        sigma = pickle.load(f)
    with open(os.path.join(model_dir, 'Vt.pkl'), 'rb') as f:
        Vt = pickle.load(f)
    with open(os.path.join(model_dir, 'interaction_matrix.pkl'), 'rb') as f:
        interaction_matrix = pickle.load(f)
    return U, sigma, Vt, interaction_matrix

def getRecommendationsFromModel(userId):
    try:
        U, sigma, Vt, interaction_matrix = load_model()
    except Exception as e:
        print("Error loading model:", e)
        return []

    if userId not in interaction_matrix.index:
        print(f"User {userId} not found in interaction matrix.")
        return []

    user_idx = interaction_matrix.index.get_loc(userId)
    user_pred = np.dot(np.dot(U[user_idx, :], sigma), Vt)
    sorted_product_indices = np.argsort(user_pred)[::-1]

    recommended_products = []
    for idx in sorted_product_indices:
        product_id = interaction_matrix.columns[idx]
        if interaction_matrix.iloc[user_idx, idx] == 0:  # Recommend only products not interacted with
            recommended_products.append(product_id)
        if len(recommended_products) >= 10:
            break

    return recommended_products
