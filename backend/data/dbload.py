import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv() 

app = Flask(__name__)
CORS(app)

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

engine = create_engine(f"mysql+mysqlconnector://{user}:{password}@{host}/{database}")

csv_path = r"D:\Sales_Management_System\backend\data\sales_data.csv"

chunksize = 50000 

for chunk in pd.read_csv(csv_path, chunksize=chunksize):

    chunk.columns = [
        "transaction_id", "date", "customer_id", "customer_name", "phone_number",
        "gender", "age", "customer_region", "customer_type",
        "product_id", "product_name", "brand", "product_category", "tags",
        "quantity", "price_per_unit", "discount_percentage",
        "total_amount", "final_amount", "payment_method",
        "order_status", "delivery_type", "store_id", "store_location",
        "salesperson_id", "employee_name"
    ]

    chunk.to_sql("sales_data", con=engine, if_exists="append", index=False)
    
    print("Inserted chunk of rows:", len(chunk))

print(" CSV import completed successfully!")
