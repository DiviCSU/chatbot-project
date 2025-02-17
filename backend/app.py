from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import nltk
from nltk.tokenize import word_tokenize

# Download NLTK resources
nltk.download('punkt')

app = Flask(__name__)
CORS(app)  # Enable cross-origin resource sharing (for frontend React)

# MySQL Database connection (Update with your credentials)
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mysql25",
    database="chatbot_db"
)
cursor = db.cursor()

# Process user input with NLTK
def process_query(user_input):
    tokens = word_tokenize(user_input.lower())
    return tokens

# Fetch customer information from the database
def get_customer_info(name):
    query = "SELECT * FROM customers WHERE name = %s"
    cursor.execute(query, (name,))
    result = cursor.fetchone()

    if result:
        return f"Customer Name: {result[1]}, Email: {result[2]}, Membership: {result[4]}"
    else:
        return "No information found for this customer."

# Fetch customers who bought a product
def get_product_customers(product_name):
    query = """
    SELECT c.name 
    FROM customer_orders co
    JOIN customers c ON co.customer_id = c.id
    JOIN products p ON co.product_id = p.id
    WHERE p.name = %s
    """
    cursor.execute(query, (product_name,))
    results = cursor.fetchall()

    if results:
        return "Customers who bought " + product_name + ": " + ", ".join([row[0] for row in results])
    else:
        return "No customers found for this product."

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("user_input", "")
    tokens = process_query(user_input)

    # Check if query is related to customers or products
    if "customer" in tokens and "list" in tokens:
        product_name = tokens[-1].capitalize()
        response = get_product_customers(product_name)

    elif "information" in tokens or "details" in tokens:
        customer_name = tokens[-1].capitalize()
        response = get_customer_info(customer_name)

    else:
        response = "Sorry, I didn't understand. Try asking about customers or products."

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
