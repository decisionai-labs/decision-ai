import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Constants
WIDTH = 3840  # 4K UHD
HEIGHT = 2160
BG_COLOR = (245, 245, 245)      # Soft off-white
TEXT_DARK = (15, 15, 15)        # Near black for primary text
TEXT_LIGHT = (100, 100, 100)    # Grey for secondary text
TEAL_COLOR = (20, 184, 166)     # #14B8A6 (Brand accent)
GREY_BORDER = (220, 220, 220)   # Subtle geometric border

def draw_grid_and_architecture(draw):
    """Draws a highly structured architectural grid on a clean white background."""
    # Outer frame
    margin = 120
    draw.rectangle([margin, margin, WIDTH - margin, HEIGHT - margin], outline=GREY_BORDER, width=2)
    
    # Internal architectural divisions
    grid_spacing = 160
    for x in range(margin, WIDTH - margin, grid_spacing):
        opacity = 80 if (x // grid_spacing) % 4 == 0 else 30
        draw.line([(x, margin), (x, HEIGHT - margin)], fill=(0, 0, 0, opacity), width=1)
    
    for y in range(margin, HEIGHT - margin, grid_spacing):
        opacity = 80 if (y // grid_spacing) % 4 == 0 else 30
        draw.line([(margin, y), (WIDTH - margin, y)], fill=(0, 0, 0, opacity), width=1)
        
    # Center exact alignment line
    draw.line([(WIDTH//2, margin), (WIDTH//2, HEIGHT - margin)], fill=(0, 0, 0, 150), width=1)
    draw.line([(margin, HEIGHT//2), (WIDTH - margin, HEIGHT//2)], fill=(0, 0, 0, 100), width=1)

def draw_horizontal_flowchart(draw, font_small, font_medium, font_large):
    """Draws a clean, organized, left-to-right horizontal flowchart."""
    y_center = HEIGHT // 2 - 200 # Shifted up slightly to leave room for UI below
    
    # Node X-positions
    x_wallet = WIDTH // 6
    x_sly = (WIDTH // 2)
    x_tools = (WIDTH * 5) // 6
    
    # Connection logic (Backbone)
    draw.line([(x_wallet + 300, y_center), (x_sly - 300, y_center)], fill=GREY_BORDER, width=4)
    draw.line([(x_sly + 300, y_center), (x_tools - 300, y_center)], fill=GREY_BORDER, width=4)
    
    # Connection Arrows
    draw.polygon([(x_sly - 300, y_center), (x_sly - 320, y_center - 15), (x_sly - 320, y_center + 15)], fill=TEXT_LIGHT)
    draw.polygon([(x_tools - 300, y_center), (x_tools - 320, y_center - 15), (x_tools - 320, y_center + 15)], fill=TEXT_LIGHT)
    
    # Node 1: Wallet (Clean white box)
    draw.rectangle([x_wallet - 300, y_center - 150, x_wallet + 300, y_center + 150], fill=(255, 255, 255), outline=GREY_BORDER, width=3)
    draw.text((x_wallet - 120, y_center - 30), "USER_WALLET", font=font_medium, fill=TEXT_DARK)
    draw.text((x_wallet - 100, y_center + 40), "[ UNSAFE ZONE ]", font=font_small, fill=TEXT_LIGHT)

    # Node 2: SLY_DATA (The Core, highlighted but clean)
    # Give it architectural emphasis
    draw.ellipse((x_sly - 350, y_center - 350, x_sly + 350, y_center + 350), outline=TEAL_COLOR+(80,), width=1)
    for r in [280, 300]:
        draw.ellipse((x_sly - r, y_center - r, x_sly + r, y_center + r), outline=GREY_BORDER, width=1)

    draw.rectangle([x_sly - 250, y_center - 250, x_sly + 250, y_center + 250], fill=(255, 255, 255), outline=TEAL_COLOR, width=4)
    draw.rectangle([x_sly - 230, y_center - 230, x_sly + 230, y_center + 230], outline=TEAL_COLOR+(80,), width=1)
    
    draw.text((x_sly - 100, y_center - 50), "sly_data", font=font_large, fill=TEAL_COLOR)
    draw.text((x_sly - 180, y_center + 70), "ZERO-KNOWLEDGE CHANNEL", font=font_small, fill=TEXT_LIGHT)

    # Node 3: AI Tools
    draw.rectangle([x_tools - 300, y_center - 150, x_tools + 300, y_center + 150], fill=(255, 255, 255), outline=GREY_BORDER, width=3)
    draw.text((x_tools - 100, y_center - 30), "AI_TOOLING", font=font_medium, fill=TEXT_DARK)
    draw.text((x_tools - 150, y_center + 40), "[ ISOLATED CONTEXT ]", font=font_small, fill=TEXT_LIGHT)

    # Action Labels
    draw.text((x_wallet + 400, y_center - 80), "READ PERMISSION", font=font_small, fill=TEXT_DARK)
    draw.text((x_sly + 370, y_center - 80), "ENCRYPTED QUERY", font=font_small, fill=TEXT_DARK)

def draw_clean_product_ui(img, draw, font_small, font_medium, font_large):
    """Draws a clean, light-mode product representation anchored clearly at the bottom."""
    ui_width = 1600
    ui_height = 500
    
    ui_x = WIDTH // 2 - ui_width // 2
    ui_y = HEIGHT - 120 - ui_height - 100 # Near the bottom margin

    # UI Shadow (Faked soft shadow for clean white look)
    for i in range(12):
        offset = i * 4
        img_temp = Image.new('RGBA', (WIDTH, HEIGHT), (0,0,0,0))
        d_temp = ImageDraw.Draw(img_temp)
        d_temp.rounded_rectangle([ui_x - offset, ui_y + offset, ui_x + ui_width + offset, ui_y + ui_height + offset * 1.5], radius=24, fill=(0, 0, 0, 4))
        img.alpha_composite(img_temp)

    # Clean White Chrome Window
    draw.rounded_rectangle([ui_x, ui_y, ui_x + ui_width, ui_y + ui_height], radius=24, fill=(255, 255, 255, 255), outline=GREY_BORDER, width=2)
    
    # Top Bar
    draw.line([(ui_x, ui_y + 80), (ui_x + ui_width, ui_y + 80)], fill=GREY_BORDER, width=1)
    
    # Window Controls (Monochrome for clean aesthetic)
    draw.ellipse((ui_x + 40, ui_y + 30, ui_x + 60, ui_y + 50), fill=(220, 220, 220))
    draw.ellipse((ui_x + 80, ui_y + 30, ui_x + 100, ui_y + 50), fill=(220, 220, 220))
    draw.ellipse((ui_x + 120, ui_y + 30, ui_x + 140, ui_y + 50), fill=(220, 220, 220))
    
    draw.text((ui_x + ui_width // 2 - 100, ui_y + 20), "Agent Interface", font=font_small, fill=TEXT_LIGHT)

    # Content
    content_y = ui_y + 150
    
    # Action Badge
    draw.rounded_rectangle([ui_x + 100, content_y, ui_x + 240, content_y + 50], radius=12, fill=TEAL_COLOR+(20,))
    draw.text((ui_x + 120, content_y + 10), "ACTIVE", font=font_small, fill=TEAL_COLOR)
    
    # Clinical Output Log
    draw.text((ui_x + 100, content_y + 80), "Decision Engine > Establishing sly_data layer...", font=font_medium, fill=TEXT_LIGHT)
    draw.text((ui_x + 100, content_y + 150), "> Identity shielded.", font=font_medium, fill=TEXT_DARK)
    draw.text((ui_x + 100, content_y + 220), "> Context window populated with sterile metrics safely.", font=font_medium, fill=TEXT_DARK)

def draw_typography(img, draw, font_small, font_medium, font_large):
    """Clean, high-end Swiss typography framing."""
    margin = 160
    
    # Top Left Identity
    draw.text((margin, margin), "DECISION ARCHITECTURE", font=font_small, fill=TEXT_DARK)
    
    # Top Right Spec
    draw.text((WIDTH - margin - 350, margin), "FIG. 1: IDENTITY NEUTRAL", font=font_small, fill=TEXT_LIGHT)
    
    # Minimal Bottom Framing text near the UI element
    draw.text((WIDTH // 2 - 180, HEIGHT - 180), "CLINICAL EXECUTION RECORD", font=font_small, fill=TEXT_LIGHT)

def main():
    print("Generating clean, structured logical canvas...")
    
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 80, index=2)   # Medium/Bold
        font_medium = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 40, index=1)  # Light
        font_small = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", 30)              # Monospace
    except IOError:
         font_large = ImageFont.load_default()
         font_medium = ImageFont.load_default()
         font_small = ImageFont.load_default()

    img = Image.new('RGBA', (WIDTH, HEIGHT), BG_COLOR + (255,))
    draw = ImageDraw.Draw(img, 'RGBA')

    # Draw structured layout elements
    draw_grid_and_architecture(draw)
    
    # Horizontal organized flowchart taking up the top/middle
    draw_horizontal_flowchart(draw, font_small, font_medium, font_large)
    
    # Clean UI representation locked into the bottom section
    draw_clean_product_ui(img, draw, font_small, font_medium, font_large)
    
    # Framing labels
    draw_typography(img, draw, font_small, font_medium, font_large)

    final_img = img.convert('RGB')
    
    out_png = os.path.join(os.path.dirname(__file__), 'neurosan_clean_flow_post.png')
    
    final_img.save(out_png, format='PNG', optimize=True)
    
    print(f"Masterpiece generated successfully at: {out_png}")

if __name__ == "__main__":
    main()
