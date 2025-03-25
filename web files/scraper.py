import requests
import feedparser
from bs4 import BeautifulSoup

# Google News RSS URLs
NEWS_SOURCES = {
    "AI": "https://news.google.com/rss/search?q=artificial+intelligence&hl=en-US&gl=US&ceid=US:en",
    "Gaming": "https://news.google.com/rss/search?q=gaming&hl=en-US&gl=US&ceid=US:en",
    "Gacha": "https://news.google.com/rss/search?q=gacha+games&hl=en-US&gl=US&ceid=US:en"
}

# Function to fetch news from Google News RSS
def fetch_google_news(category):
    feed = feedparser.parse(NEWS_SOURCES[category])
    articles = []
    
    for entry in feed.entries[:3]:  # Limit to top 3 articles
        articles.append({
            "title": entry.title,
            "link": entry.link,
            "summary": entry.summary,
            "source": "Google News"
        })
    
    return articles

# Function to fetch news from a website (using BeautifulSoup)
def fetch_reddit_news():
    url = "https://www.reddit.com/r/artificial/top/.rss"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        return []
    
    soup = BeautifulSoup(response.content, "xml")
    items = soup.find_all("entry")[:3]  # Get top 3 posts
    
    articles = []
    for item in items:
        articles.append({
            "title": item.title.text,
            "link": item.link["href"],
            "summary": item.summary.text if item.summary else "No summary available",
            "source": "Reddit"
        })
    
    return articles

# Main function to fetch news
def fetch_news():
    ai_news = fetch_google_news("AI")
    gaming_news = fetch_google_news("Gaming")
    gacha_news = fetch_google_news("Gacha")
    reddit_ai_news = fetch_reddit_news()

    all_news = {
        "AI": ai_news + reddit_ai_news,
        "Gaming": gaming_news,
        "Gacha": gacha_news
    }
    
    return all_news

# Testing the scraper
if __name__ == "__main__":
    news = fetch_news()
    for category, articles in news.items():
        print(f"\n🔹 {category} News:")
        for article in articles:
            print(f" - {article['title']} ({article['source']})")
