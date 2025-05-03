import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds
import mysql.connector
import pickle
import os
import sys
import json

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Meena@2925',
    'database': 'veggietopia'
}

def fetch_interaction_data():
    conn = mysql.connector.connect(
        host=DB_CONFIG['host'],
        user=DB_CONFIG['user'],
        password=DB_CONFIG['password'],
        database=DB_CONFIG['database']  
    )
    cursor = conn.cursor()
    query = "SELECT user_id, product_id, interaction_count FROM user_product_interactions"
    cursor.execute(query)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    # Convert to DataFrame
    df = pd.DataFrame(rows, columns=['user_id', 'product_id', 'interaction_count'])
