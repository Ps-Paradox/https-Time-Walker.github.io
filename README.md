# Time Walker Website 

Automated blog platform that generates daily posts about AI, gaming, and gacha culture. It uses the Gemini API for text generation, the Stability AI API for image generation, and GitHub Actions to deploy the content to GitHub Pages. The site features a homepage with blog cards categorized into AI News, Gaming News, and Gacha Updates, with each post linking to a full blog page.
Features
Daily Blog Posts: Automatically generates a new blog post every day at midnight UTC.

AI-Generated Content: Uses the Gemini API to create engaging blog post titles and content.

AI-Generated Images: Uses the Stability AI API to generate futuristic artwork for each blog post.

Categorized Content: Posts are categorized into AI, Gaming, and Gacha, displayed in separate grids on the homepage.

SEO Optimization: Includes meta tags and structured data (JSON-LD) for better search engine visibility.

GitHub Pages Deployment: Deploys the site to GitHub Pages using GitHub Actions.

# Prerequisites
Python 3.9+: Required to run the scripts.

Git: For version control and pushing to GitHub.

GitHub Account: To host the repository and deploy to GitHub Pages.

API Keys:
Gemini API Key: For text generation (get from Google AI Studio).

Stability AI API Key: For image generation (get from Stability AI Developer Platform).

Setup
1. Clone the Repository
bash

git clone https://github.com/your-username/time-walker-website.git
cd time-walker-website

2. Install Dependencies
Install the required Python packages:
bash

pip install -r requirements.txt

3. Set Environment Variables
Set your API keys as environment variables:
bash

# On Windows (PowerShell)
$env:GEMINI_API_KEY="your-gemini-api-key"
$env:STABILITY_API_KEY="your-stability-ai-api-key"

# On Linux/MacOS
export GEMINI_API_KEY="your-gemini-api-key"
export STABILITY_API_KEY="your-stability-ai-api-key"

4. Test Locally
Run the scripts to generate a blog post:
bash

cd web_files
python ai_writer.py      # Generate blog post text
python image_gen.py      # Generate image
python html_builder.py   # Generate HTML
cd ..

Start a local server to view the site:
bash

python -m http.server

Open http://localhost:8000 in your browser to see the homepage with the new blog post.
Deployment
1. Push to GitHub
If you haven’t already, push your project to a GitHub repository:
bash

git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/time-walker-website.git
git branch -M main
git push -u origin main

2. Set Up GitHub Secrets
Add your API keys to GitHub Secrets:
Go to your repository on GitHub.

Navigate to Settings > Secrets and variables > Actions.

Add the following secrets:
GEMINI_API_KEY: Your Gemini API key.

STABILITY_API_KEY: Your Stability AI API key.

3. Enable GitHub Pages
Go to your repository’s Settings tab.

Scroll to the Pages section.

Under Source, select Deploy from a branch.

Choose the main branch and the / (root) directory.

Save the settings.

4. GitHub Actions Workflow
The .github/workflows/deploy.yml file automates the blog post generation and deployment:
Runs daily at midnight UTC.

Installs dependencies, runs the scripts, and deploys to GitHub Pages.

Check the Actions tab in your repository to monitor the workflow.
Usage
Daily Updates: The site updates automatically every day with a new blog post.

Categories: Posts are categorized into AI, Gaming, or Gacha, displayed in separate grids on the homepage.

Full Blog Pages: Click "Read More" on a blog card to view the full post, which includes the generated image and content.

Customization
Prompts: Modify the prompt in web_files/ai_writer.py to change the style or topics of the generated blog posts.

Image Style: Adjust the prompt in web_files/image_gen.py to change the style of generated images (e.g., "Cinematic sci-fi scene" instead of "Futuristic artwork").

Styling: Update the CSS in index.html or the full blog page template in web_files/html_builder.py to match your desired design.

Troubleshooting
API Errors:
Ensure your API keys are correct and have sufficient credits (check Google AI Studio for Gemini, Stability AI Developer Platform for Stability AI).

Check the GitHub Actions logs for error messages.

Image Not Displaying:
Verify the image path in index.html or the blog page (e.g., assets/stability-ai-image-...).

Ensure the assets/ directory is committed to GitHub.

Blog Card Not Appearing:
Check that the target grid ID (e.g., ai-news-grid) exists in index.html.

Verify the category in ai_writer.py matches one of the expected values (AI, Gaming, Gacha).

Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

