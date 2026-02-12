import os
import re

def replace_tailwind(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Define the new head content
    # Note: adjusting the path for adminDashboad files
    depth = file_path.count('/') - 5 # Assuming /home/tdh/Github/Portfolio Website/ is the base
    prefix = '../' * depth if depth > 0 else ''
    
    new_head_links = f"""    <link rel="stylesheet" href="{prefix}css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <script src="{prefix}js/main.js" defer></script>"""

    # Regex to find the tailwind script and config
    pattern = r'<script src="https://cdn\.tailwindcss\.com[^>]*></script>.*?<script id="tailwind-config">.*?</script>'
    content = re.sub(pattern, new_head_links, content, flags=re.DOTALL)

    # Also remove internal <style> blocks if they contain tech-grid or glass (which are now in style.css)
    style_pattern = r'<style>.*?.tech-grid.*?</style>'
    content = re.sub(style_pattern, '', content, flags=re.DOTALL)
    
    style_pattern_2 = r'<style>.*?.glass.*?</style>'
    content = re.sub(style_pattern_2, '', content, flags=re.DOTALL)

    # If the regex didn't match (maybe no tailwind-config script), try just the tailwind script
    if 'cdn.tailwindcss.com' in content:
        content = re.sub(r'<script src="https://cdn\.tailwindcss\.com[^>]*></script>', new_head_links, content)

    with open(file_path, 'w') as f:
        f.write(content)

files = [
    "about_me.html",
    "contact_information.html",
    "home_page.html",
    "professional_resume.html",
    "projects_gallery.html",
    "skills_&_expertise.html",
    "adminDashboad/admin_analytics_dashboard.html",
    "adminDashboad/login.html",
    "adminDashboad/page_content_manager.html",
    "adminDashboad/project_management_dashboard.html",
    "adminDashboad/skills_&_proficiency_manager.html"
]

for file in files:
    full_path = os.path.join("/home/tdh/Github/Portfolio Website", file)
    if os.path.exists(full_path):
        print(f"Processing {file}...")
        replace_tailwind(full_path)
    else:
        print(f"File not found: {file}")
