# app/__init__.py

from flask import Flask

def create_app():
    app = Flask(__name__, static_folder='static')
    
    with app.app_context():
        # Import parts of our application
        from .routes import main_blueprint

        # Register Blueprints
        app.register_blueprint(main_blueprint)

    return app
