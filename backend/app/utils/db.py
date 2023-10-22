app_models = [
    'aerich.models',
    'app.models.user_models',
    'app.models.pharm_models',
    'app.models.sales_models'
]


SECRET_KEY="09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM="HS256"
DATABASE_URL = 'sqlite://db.sqlite3'


# --- data base configuration --------------
tortoise_config = {
    "connections": {"default": DATABASE_URL},
    "apps": {
        "models": {
            "models": app_models,
            "default_connection": "default",
        },
    },
}



