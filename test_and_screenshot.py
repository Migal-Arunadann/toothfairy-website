import subprocess
import os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
os.makedirs("screenshots", exist_ok=True)

pages = [
    ("home", "http://localhost:3456/index.html"),
    ("about", "http://localhost:3456/about.html"),
    ("treatments", "http://localhost:3456/treatments.html"),
    ("contact", "http://localhost:3456/contact.html"),
]

viewports = [
    ("desktop", "1280,900"),
    ("mobile", "390,844")
]

for page_name, url in pages:
    for vp_name, size in viewports:
        out_file = os.path.abspath(f"screenshots/{page_name}_{vp_name}.png")
        cmd = [
            chrome_path,
            "--headless=new",
            f"--window-size={size}",
            "--force-device-scale-factor=1",
            f"--screenshot={out_file}",
            "--default-background-color=00000000",
            "--hide-scrollbars",
            url
        ]
        print(f"Capturing {page_name} ({vp_name})...")
        subprocess.run(cmd, capture_output=True, timeout=15)
        if os.path.exists(out_file):
            print(f"  -> Generated {out_file} ({os.path.getsize(out_file)} bytes)")

print("All screenshots generated with scale factor 1!")
