from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

with open("./db/categories.json", 'r') as json_file:
    categories = json.load(json_file)

with open("./db/products.json", 'r') as json_file:
    products = json.load(json_file)

@app.get('/')
async def root():
    return { "message": "Online!" }

@app.get('/products')
def products_route():
    return { "products": products }

@app.get('/product')
def product_route(id: int):
    for product in products:
        if product["id"] == id:
            return { "product": product }
        
    return { "product": "Product not found" }

@app.get('/categories')
def categories_route():
    return { "categories": categories }
