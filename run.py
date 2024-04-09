# run.py

from app.spit import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)  # Set to `debug=False` in production
