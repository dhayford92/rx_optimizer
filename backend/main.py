from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from app.utils.db import tortoise_config, DATABASE_URL
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth_router, user_router, med_router, sale_router




app = FastAPI()

app.get("/")
def index():
    return {"message": "Hello World"}


# --- routers --------------
app.include_router(auth_router.router)
app.include_router(user_router.router)
app.include_router(med_router.router)
app.include_router(sale_router.router)


# --- CORS --------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    



# --- data base configuration --------------
register_tortoise(
    app,
    config=tortoise_config,
    generate_schemas=True,
    add_exception_handlers=True
)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)