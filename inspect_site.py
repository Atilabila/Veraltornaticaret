from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto('http://localhost:3000')
            page.wait_for_load_state('networkidle')
            print(f"Page Title: {page.title()}")
            page.screenshot(path='homepage.png', full_page=True)
            print("Screenshot saved to homepage.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
