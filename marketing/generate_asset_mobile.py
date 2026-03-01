import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Constants
WIDTH = 3840  
HEIGHT = 2160

# Palette matching the reference
BG_COLOR = (245, 245, 250)         # Soft off-white / very light grey-purple
GRID_COLOR = (220, 220, 235)       # Subtle grid lines
INDIGO = (60, 50, 110)             # Deep violet/indigo for the massive text
PHONE_BODY = (10, 15, 25)          # Very dark navy for the phone frame
PHONE_SCREEN = (15, 20, 30)        # Dark screen bg
CARD_BG = (25, 30, 45)             # Darker card bg inside phone
TEAL_ACCENT = (20, 184, 166)       # #14B8A6 
WHITE = (255, 255, 255)

def draw_graphing_grid(draw):
    """Draws a clean, light graphing-paper background."""
    grid_spacing = 60
    
    # Minor lines
    for x in range(0, WIDTH, grid_spacing):
        draw.line([(x, 0), (x, HEIGHT)], fill=GRID_COLOR, width=1)
    
    for y in range(0, HEIGHT, grid_spacing):
        draw.line([(0, y), (WIDTH, y)], fill=GRID_COLOR, width=1)
        
    # Major lines (every 5th block)
    major_spacing = grid_spacing * 5
    for x in range(0, WIDTH, major_spacing):
        draw.line([(x, 0), (x, HEIGHT)], fill=(200, 200, 220), width=2)
    
    for y in range(0, HEIGHT, major_spacing):
        draw.line([(0, y), (WIDTH, y)], fill=(200, 200, 220), width=2)

def draw_massive_typography(draw):
    """Draws the huge, left-aligned text from the reference."""
    try:
        # Attempt to get a nice bold geometric sans or default to Helvetica
        font_huge = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 320, index=2) # Bold 
    except IOError:
        font_huge = ImageFont.load_default()
        
    left_margin = 300
    y_start = HEIGHT // 2 - 500
    
    lines = [
        "Autonomous",
        "Execution",
        "for Web3",
        "Syndicates"
    ]
    
    line_spacing = 340
    for i, line in enumerate(lines):
        draw.text((left_margin, y_start + (i * line_spacing)), line, font=font_huge, fill=INDIGO)

def draw_iphone_mockup(img, draw, font_small, font_medium):
    """Draws a high-fidelity mobile device on the right side showing the utility."""
    # Phone Dimensions
    phone_w = 1100
    phone_h = HEIGHT + 200  # Bleeds off the bottom like the reference
    phone_x = WIDTH - phone_w - 300
    phone_y = 150 # Bleeds off the top slightly
    
    # 1. Phone Drop Shadow
    shadow_img = Image.new('RGBA', (WIDTH, HEIGHT), (0,0,0,0))
    s_draw = ImageDraw.Draw(shadow_img)
    for i in range(25):
        offset = i * 3
        s_draw.rounded_rectangle([phone_x - offset, phone_y + offset, phone_x + phone_w + offset, phone_y + phone_h], radius=150, fill=(0, 0, 0, 3))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(30))
    img.alpha_composite(shadow_img)

    # 2. Phone Hardware Frame
    draw.rounded_rectangle([phone_x, phone_y, phone_x + phone_w, phone_y + phone_h], radius=120, fill=PHONE_BODY)
    # Inner screen bezel
    bezel = 25
    screen_x1 = phone_x + bezel
    screen_y1 = phone_y + bezel
    screen_x2 = phone_x + phone_w - bezel
    screen_y2 = phone_y + phone_h
    draw.rounded_rectangle([screen_x1, screen_y1, screen_x2, screen_y2], radius=100, fill=PHONE_SCREEN)

    # 3. Dynamic Island / Notch
    island_w = 340
    island_h = 90
    island_x = phone_x + (phone_w // 2) - (island_w // 2)
    island_y = screen_y1 + 40
    draw.rounded_rectangle([island_x, island_y, island_x + island_w, island_y + island_h], radius=45, fill=(0,0,0))
    # Camera lenses in island
    draw.ellipse((island_x + island_w - 60, island_y + 25, island_x + island_w - 20, island_y + 65), fill=(20, 20, 30))
    draw.ellipse((island_x + island_w - 50, island_y + 35, island_x + island_w - 30, island_y + 55), fill=(40, 40, 60))

    # Add Status Bar details (Time, Signal, Battery)
    draw.text((screen_x1 + 80, screen_y1 + 65), "5:07", font=font_medium, fill=WHITE)
    # Fake battery icon
    bat_x = screen_x2 - 140
    bat_y = screen_y1 + 60
    draw.rounded_rectangle([bat_x, bat_y, bat_x + 60, bat_y + 30], radius=8, outline=WHITE, width=3)
    draw.rounded_rectangle([bat_x + 6, bat_y + 6, bat_x + 40, bat_y + 24], radius=4, fill=WHITE)
    draw.rectangle([bat_x + 64, bat_y + 10, bat_x + 68, bat_y + 20], fill=WHITE)

    # 4. App UI Details (The Utility)
    content_y = island_y + 150
    
    # App Header
    # Back arrow
    draw.line([(screen_x1 + 80, content_y + 20), (screen_x1 + 60, content_y + 40)], fill=WHITE, width=4)
    draw.line([(screen_x1 + 60, content_y + 40), (screen_x1 + 80, content_y + 60)], fill=WHITE, width=4)
    draw.text((screen_x1 + (phone_w//2) - 150, content_y + 10), "Execution Assessment", font=font_medium, fill=WHITE)
    # Close X
    draw.line([(screen_x2 - 80, content_y + 20), (screen_x2 - 60, content_y + 60)], fill=WHITE, width=4)
    draw.line([(screen_x2 - 80, content_y + 60), (screen_x2 - 60, content_y + 20)], fill=WHITE, width=4)

    # Main Card 1: Target Contract
    card1_y = content_y + 120
    draw.rounded_rectangle([screen_x1 + 40, card1_y, screen_x2 - 40, card1_y + 600], radius=30, fill=CARD_BG)
    
    # Card 1 Header
    draw.text((screen_x1 + 100, card1_y + 50), "Contract Verification", font=font_medium, fill=WHITE)
    draw.line([(screen_x1 + 40, card1_y + 140), (screen_x2 - 40, card1_y + 140)], fill=(255, 255, 255, 20), width=2)
    
    # Card 1 Rows
    rows = [
        ("Target Token", "NEURO / SOL"),
        ("Address", "7xHx...9aP2"),
        ("Liquidity Lock", "Verified (1 Year)"),
        ("Mint Authority", "Revoked")
    ]
    
    for i, (label, val) in enumerate(rows):
        row_y = card1_y + 180 + (i * 100)
        draw.text((screen_x1 + 100, row_y), label, font=font_small, fill=(255, 255, 255, 120))
        draw.text((screen_x1 + 100, row_y + 40), val, font=font_small, fill=WHITE)
        # Small icon
        icon_x = screen_x2 - 120
        draw.rounded_rectangle([icon_x, row_y + 20, icon_x + 30, row_y + 50], radius=8, outline=(255,255,255,40), width=2)

    # Main Card 2: Risk Information (matches reference style closely)
    card2_y = card1_y + 650
    draw.rounded_rectangle([screen_x1 + 40, card2_y, screen_x2 - 40, card2_y + 450], radius=30, fill=CARD_BG)
    draw.ellipse((screen_x1 + 100, card2_y + 55, screen_x1 + 130, card2_y + 85), fill=INDIGO)
    draw.text((screen_x1 + 110, card2_y + 60), "i", font=font_medium, fill=WHITE)
    draw.text((screen_x1 + 160, card2_y + 50), "Risk Analysis", font=font_medium, fill=WHITE)
    
    draw.text((screen_x1 + 100, card2_y + 140), "1. The smart contract contains no mutable state functions.", font=font_small, fill=(255,255,255,160))
    draw.text((screen_x1 + 100, card2_y + 220), "2. Slippage parameters fall within the safe 0.5% boundary.", font=font_small, fill=(255,255,255,160))
    draw.text((screen_x1 + 100, card2_y + 300), "3. Syndicate consensus reached. Safe to execute.", font=font_small, fill=(255,255,255,160))

    # Execution Button
    btn_y = card2_y + 520
    draw.rounded_rectangle([screen_x1 + 40, btn_y, screen_x2 - 40, btn_y + 140], radius=70, fill=INDIGO)
    b_w, _ = get_text_dimensions("Confirm Execution", font_medium)
    draw.text((phone_x + (phone_w//2) - (b_w//2), btn_y + 45), "Confirm Execution", font=font_medium, fill=WHITE)


def get_text_dimensions(text_string, font):
    try:
        left, top, right, bottom = font.getbbox(text_string)
        return right - left, bottom - top
    except Exception:
        return len(text_string) * (font.size * 0.6), font.size


def main():
    print("Generating Mobile UI canvas...")
    
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 120, index=2)   
        font_medium = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 48, index=2)  
        font_small = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 36, index=1)              
    except IOError:
         font_large = ImageFont.load_default()
         font_medium = ImageFont.load_default()
         font_small = ImageFont.load_default()

    img = Image.new('RGBA', (WIDTH, HEIGHT), BG_COLOR + (255,))
    draw = ImageDraw.Draw(img, 'RGBA')

    # Draw Background
    draw_graphing_grid(draw)
    
    # Left Content
    draw_massive_typography(draw)
    
    # Right Content
    draw_iphone_mockup(img, draw, font_small, font_medium)

    # Output
    final_img = img.convert('RGB')
    out_png = os.path.join(os.path.dirname(__file__), 'decision_mobile_post.png')
    final_img.save(out_png, format='PNG', optimize=True)
    
    print(f"Mobile UI generated successfully at: {out_png}")

if __name__ == "__main__":
    main()
