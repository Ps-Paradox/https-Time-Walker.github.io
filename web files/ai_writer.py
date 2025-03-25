import google.generativeai as genai
import os
import random

# Load Google Gemini API Key (Set your API key in environment variables)
genai.configure(api_key=os.getenv(AAIzaSyCepyB4KCJDjayVKirBrehrViNfHL3rt0w))

# Function to generate a blog post using Gemini AI
def generate_blog(news_data):
    category = random.choice(list(news_data.keys()))  # Pick a random category
    articles = news_data[category]

    if not articles:
        return None

    # Combine news summaries
    news_summaries = "\n\n".join([f"{article['title']}: {article['summary']}" for article in articles])

    # AI Prompt for Gemini
    prompt = f"""
    Write a detailed, engaging blog post about the latest {category} news.
    Use an informative yet engaging tone. Ensure SEO keywords appear naturally.

    News summaries:
    {news_summaries}

    Blog post format:
    - Catchy title
    - Introduction (Hook + Why it matters)
    - Key highlights (with H2 headings)
    - Insights & analysis
    - Conclusion (Final thoughts & questions)
    """

    # Call Gemini AI to generate text
    response = genai.generate_text(prompt)

    # Extract AI-generated text
    blog_text = response.text.strip()

    # Extract title from the first line
    title = blog_text.split("\n")[0].replace("# ", "").strip()

    # SEO-friendly meta description
    seo_description = f"Latest {category} news: {title}. Stay updated with AI-generated insights."

    return {
        "category": category,
        "title": title,
        "content": blog_text,
        "meta_description": seo_description
    }

# Testing AI Blog Generator
if __name__ == "__main__":
    sample_news = {
        "AI": [
            {"title": "AI Breakthrough", "summary": "A new AI model can self-learn faster than ever."},
            {"title": "Quantum AI", "summary": "Scientists create AI-powered quantum computing models."}
        ]
    }
    
    blog_post = generate_blog(sample_news)
    print("\n📌 Generated Blog Post:\n")
    print(f"Title: {blog_post['title']}")
    print(f"Content:\n{blog_post['content']}")
