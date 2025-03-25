from flask import Flask, jsonify
from scraper import fetch_news
from ai_writer import generate_blog
from image_gen import generate_image
from html_builder import save_blog_post
import schedule
import time
import threading

app = Flask(__name__)

# Function to automate daily blog posting
def auto_generate_blog():
    print("🔄 Fetching latest news...")
    news_data = fetch_news()  # Get AI, gaming, gacha news

    if not news_data:
        print("⚠️ No news found today.")
        return

    print("📝 Generating AI-written blog...")
    blog_content = generate_blog(news_data)

    print("🖼️ Generating AI image...")
    image_url = generate_image(blog_content["title"])

    print("📄 Saving blog post...")
    save_blog_post(blog_content, image_url)

    print("✅ Blog posted successfully!")

# Schedule task to run daily
schedule.every().day.at("08:00").do(auto_generate_blog)

# Background thread to run the scheduler
def run_scheduler():
    while True:
        schedule.run_pending()
        time.sleep(60)

# Start scheduler in a separate thread
threading.Thread(target=run_scheduler, daemon=True).start()

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "AI Blog Automation Running 🚀"})

if __name__ == "__main__":
    app.run(debug=True)
