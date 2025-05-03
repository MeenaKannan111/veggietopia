def train_svd_model():
    """Train SVD collaborative filtering model and save the model."""
    df = fetch_interaction_data()
    if df.empty:
        print("No interaction data found.")
        return

    # Create user-item interaction matrix
    interaction_matrix = df.pivot(index='user_id', columns='product_id', values='interaction_count').fillna(0)

    # Convert to numpy array for svds
    interaction_matrix_np = interaction_matrix.values

    # Determine k for svds: must be less than min dimension of matrix
    k = min(interaction_matrix_np.shape) - 1
    if k <= 0:
        print("Not enough data to train SVD model.")
        return

    # Perform matrix factorization using SVD
    U, sigma, Vt = svds(interaction_matrix_np, k=k)
    sigma = np.diag(sigma)

    # Save the model components
    model_dir = os.path.join(os.path.dirname(__file__), 'model')
    os.makedirs(model_dir, exist_ok=True)
    with open(os.path.join(model_dir, 'U.pkl'), 'wb') as f:
        pickle.dump(U, f)
    with open(os.path.join(model_dir, 'sigma.pkl'), 'wb') as f:
        pickle.dump(sigma, f)
    with open(os.path.join(model_dir, 'Vt.pkl'), 'wb') as f:
        pickle.dump(Vt, f)
    with open(os.path.join(model_dir, 'interaction_matrix.pkl'), 'wb') as f:
        pickle.dump(interaction_matrix, f)

    print("SVD model trained and saved successfully.")

def generate_recommendations(user_id):
    # Load model components
    model_dir = os.path.join(os.path.dirname(__file__), 'model')
    with open(os.path.join(model_dir, 'U.pkl'), 'rb') as f:
        U = pickle.load(f)
    with open(os.path.join(model_dir, 'sigma.pkl'), 'rb') as f:
        sigma = pickle.load(f)
    with open(os.path.join(model_dir, 'Vt.pkl'), 'rb') as f:
        Vt = pickle.load(f)
    with open(os.path.join(model_dir, 'interaction_matrix.pkl'), 'rb') as f:
        interaction_matrix = pickle.load(f)

    # Reconstruct predicted ratings
    all_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt)
    preds_df = pd.DataFrame(all_user_predicted_ratings, index=interaction_matrix.index, columns=interaction_matrix.columns)

    if user_id not in preds_df.index:
        print(f"No data for user_id {user_id}")
        return []

    # Get and sort the user's predictions
    user_row_number = preds_df.index.get_loc(user_id)
    sorted_user_predictions = preds_df.iloc[user_row_number].sort_values(ascending=False)

    # Get products the user has already interacted with
    user_data = interaction_matrix.loc[user_id]
    interacted_products = user_data[user_data > 0].index.tolist()

    # Recommend products not yet interacted with
    recommendations = sorted_user_predictions[~sorted_user_predictions.index.isin(interacted_products)].index.tolist()

    return recommendations

if __name__ == "__main__":
    import sys
    import json
    if len(sys.argv) > 1:
        user_id = int(sys.argv[1])
        recs = generate_recommendations(user_id)
        print(json.dumps(recs))
    else:
        train_svd_model()
