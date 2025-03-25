import os
from datetime import datetime

# Function to generate a full blog page
def generate_full_blog_page(blog_content, image_url):
    title = blog_content["title"]
    content = blog_content["content"].replace("\n", "<br>").replace("## ", "<h2>").replace("\n", "</h2>")
    date = datetime.now().strftime("%Y-%m-%d")
    
    # Full blog page HTML
    full_page = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="{blog_content['meta_description']}" />
        <meta name="keywords" content="{blog_content['category'].lower()} news, time walker, ai, gaming, gacha" />
        <title>{title} | TIME_WALKER.INC</title>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@400;500;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            /* Reuse styles from index.html */
            body {{ background-color: #0d0d1a; color: #ffffff; font-family: 'Rajdhani', sans-serif; margin: 0; padding: 0; }}
            .container {{ max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }}
            h1 {{ font-family: 'Orbitron', sans-serif; color: #ff003c; font-size: 2.5rem; }}
            h2 {{ font-family: 'Orbitron', sans-serif; color: #00f0ff; }}
            img {{ max-width: 100%; height: auto; border-radius: 8px; }}
            .back-link {{ color: #00f0ff; text-decoration: none; font-family: 'Orbitron', sans-serif; }}
            .back-link:hover {{ color: #ff003c; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>{title}</h1>
            <p>Published on: {date}</p>
            <img src="../{image_url}" alt="{title}" />
            <div>{content}</div>
            <p><a href="../index.html" class="back-link">Back to Home</a></p>
        </div>
    </body>
    </html>
    """
    # Save the blog page
    blog_dir = "blog"
    os.makedirs(blog_dir, exist_ok=True)
    slug = title.lower().replace(" ", "-").replace(":", "")
    file_path = f"{blog_dir}/{slug}.html"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(full_page)
    return file_path

# Updated blog card with link
def generate_blog_card(blog_content, image_url):
    category = blog_content["category"]
    title = blog_content["title"]
    content = blog_content["content"]
    date = datetime.now().strftime("%Y-%m-%d")
    blog_path = generate_full_blog_page(blog_content, image_url)

    button_class = "neon-button-red" if category == "AI" else "neon-button-blue"
    title_class = "neon-red" if category == "AI" else "neon-blue"
    preview_content = content.split("\n")[1][:100] + "..." if len(content.split("\n")) > 1 else content[:100] + "..."

    blog_card = f"""
    <div class="blog-card">
        <img src="{image_url}" alt="{title}" />
        <div class="content">
            <h3 class="{title_class}">{title}</h3>
            <p>{preview_content}</p>
            <a href="{blog_path}"><button class="{button_class}">Read More</button></a>
        </div>
    </div>
    """

    structured_data = f"""
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "{title}",
        "datePublished": "{date}",
        "author": {{
            "@type": "Person",
            "name": "AI Agent"
        }},
        "image": "{image_url}",
        "articleBody": "{content.replace('"', '\\"')}"
    }}
    </script>
    """
    return blog_card, structured_data

# Updated save function
def save_blog_post(blog_content, image_url):
    index_path = "index.html"
    blog_card, structured_data = generate_blog_card(blog_content, image_url)
    target_grid_id = {"AI": "ai-news-grid", "Gaming": "gaming-news-grid", "Gacha": "gacha-updates-grid"}.get(blog_content["category"], "ai-news-grid")

    with open(index_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    grid_start = html_content.find(f'id="{target_grid_id}"') + len(f'id="{target_grid_id}"') + 1
    grid_end = html_content.find("</div>", grid_start)
    updated_html = html_content[:grid_start] + f">{blog_card}" + html_content[grid_start + 1:]

    head_end = updated_html.find("</head>")
    updated_html = updated_html[:head_end] + structured_data + updated_html[head_end:]

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(updated_html)

    print(f"✅ Blog post '{blog_content['title']}' added to {target_grid_id}")