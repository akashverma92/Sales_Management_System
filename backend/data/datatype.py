import pandas as pd

df = pd.read_csv(r"D:\Sales_Management_System\backend\data\sales_data.csv")

print("\n🔹 Data Type Detection:\n")
print(df.dtypes)
print("\n🔹 Sample Data (first 5 rows):\n")
print(df.head())
print("\n🔹 Summary Statistics (helps refine types):\n")
print(df.describe(include='all'))
