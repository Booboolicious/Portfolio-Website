import os
import re

# Mapping of labels (regex) to filenames
NAV_MAP = {
    r'Home': 'home_page.html',
    r'About( Me)?': 'about_me.html',
    r'Skills( & Tech| & Expertise)?': 'skills_&_expertise.html',
    r'Projects( Gallery)?': 'projects_gallery.html',
    r'Resume|Experience': 'professional_resume.html',
    r'Contact( Me| Section| Information)?|Let\'s Talk': 'contact_information.html'
}

def link_nav(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Determine if we are in adminDashboad (one level deep)
    is_admin = 'adminDashboad/' in file_path
    
    def replace_href(match):
        label = match.group(2).strip()
        # Clean label of HTML tags if any (e.g. <span>About</span>)
        clean_label = re.sub('<[^<]+?>', '', label).strip()
        
        found_file = None
        for pattern, filename in NAV_MAP.items():
            if re.fullmatch(pattern, clean_label, re.IGNORECASE):
                found_file = filename
                break
        
        if found_file:
            prefix = '../' if is_admin else ''
            return f'href="{prefix}{found_file}"'
        return match.group(0)

    # Regex to find href="#" inside <a> with specific labels
    # This might be tricky because labels can have spans
    # Improved regex to capture the content of the anchor tag
    pattern = r'href="#"([^>]*>)(.*?)(?=</a>)'
    
    # We need a custom logic to handle the href="#" replacement
    # Actually, let's look for href="#" and then look at the text content after it until </a>
    
    new_content = re.sub(r'href="#"([^>]*>)([^<]*(?:<(?!/a)[^>]*>[^<]*)*)(?=</a>)', replace_href, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        return True
    return False

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
        if link_nav(full_path):
            print(f"Updated links in {file}")
        else:
            print(f"No changes in {file}")
    else:
        print(f"File not found: {file}")
