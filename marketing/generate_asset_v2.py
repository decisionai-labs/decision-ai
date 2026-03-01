import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Constants
WIDTH = 3840  # 4K UHD
HEIGHT = 2160
BG_COLOR = (245, 245, 245)      # Soft off-white
TEXT_DARK = (15, 15, 15)        # Near black for primary text
TEXT_LIGHT = (100, 100, 100)    # Grey for secondary text
ACCENT_MAIN = (245, 124, 0)     # High-tech Amber / Orange (modern/technical)
ACCENT_SEC = (69, 90, 100)      # Slate grey (secondary accent)
GREY_BORDER = (220, 220, 220)   # Subtle geometric border

def draw_grid_and_architecture(draw):
    """Draws a highly structured architectural grid on a clean white background."""
    margin = 120
    draw.rectangle([margin, margin, WIDTH - margin, HEIGHT - margin], outline=GREY_BORDER, width=2)
    
    grid_spacing = 160
    for x in range(margin, WIDTH - margin, grid_spacing):
        opacity = 80 if (x // grid_spacing) % 4 == 0 else 30
        draw.line([(x, margin), (x, HEIGHT - margin)], fill=(0, 0, 0, opacity), width=1)
    
    for y in range(margin, HEIGHT - margin, grid_spacing):
        opacity = 80 if (y // grid_spacing) % 4 == 0 else 30
        draw.line([(margin, y), (WIDTH - margin, y)], fill=(0, 0, 0, opacity), width=1)
        
    draw.line([(WIDTH//2, margin), (WIDTH//2, HEIGHT - margin)], fill=(0, 0, 0, 150), width=1)
    draw.line([(margin, HEIGHT//2), (WIDTH - margin, HEIGHT//2)], fill=(0, 0, 0, 100), width=1)

def draw_dashed_line(draw, start, end, fill, width, dash_length=20):
    x1, y1 = start
    x2, y2 = end
    length = math.hypot(x2 - x1, y2 - y1)
    dashes = int(length // dash_length)
    if dashes == 0:
        return
    dx = (x2 - x1) / dashes
    dy = (y2 - y1) / dashes
    for i in range(dashes):
        if i % 2 == 0:
            draw.line([(x1 + dx * i, y1 + dy * i), (x1 + dx * (i + 1), y1 + dy * (i + 1))], fill=fill, width=width)

def get_text_dimensions(text_string, font):
    # Using the updated Pillow text API to get text bounds
    # Since we strictly need width/height to center, we can approximate if exact bounds fail
    try:
        left, top, right, bottom = font.getbbox(text_string)
        return right - left, bottom - top
    except Exception:
        # Fallback approximation based on font size if getbbox fails
        return len(text_string) * (font.size * 0.6), font.size

def draw_horizontal_flowchart(draw, font_small, font_medium, font_large):
    """Draws a clean, organized flowchart for the execution engine."""
    y_center = HEIGHT // 2 - 200 
    
    # Node X-positions
    x_intent = WIDTH // 6
    x_engine = (WIDTH // 2)
    x_market = (WIDTH * 5) // 6
    x_risk = (WIDTH * 5) // 6
    
    y_market = y_center - 250
    y_risk = y_center + 250
    
    # Connection logic (Backbone)
    draw.line([(x_intent + 300, y_center), (x_engine - 300, y_center)], fill=GREY_BORDER, width=4)
    # Split to the two downstream nodes
    draw.line([(x_engine + 300, y_center), (x_market - 400, y_market)], fill=GREY_BORDER, width=4)
    draw.line([(x_engine + 300, y_center), (x_risk - 400, y_risk)], fill=GREY_BORDER, width=4)
    
    # Connection Arrows
    draw.polygon([(x_engine - 300, y_center), (x_engine - 320, y_center - 15), (x_engine - 320, y_center + 15)], fill=TEXT_LIGHT)
    
    # Node 1: User Intent 
    draw.rectangle([x_intent - 300, y_center - 150, x_intent + 300, y_center + 150], fill=(255, 255, 255), outline=GREY_BORDER, width=3)
    
    w1, h1 = get_text_dimensions("USER_INTENT", font_medium)
    draw.text((x_intent - w1//2, y_center - h1 - 5), "USER_INTENT", font=font_medium, fill=TEXT_DARK)
    w2, h2 = get_text_dimensions("[ NATURAL LANGUAGE ]", font_small)
    draw.text((x_intent - w2//2, y_center + 10), "[ NATURAL LANGUAGE ]", font=font_small, fill=TEXT_LIGHT)

    # Node 2: Decision Engine (The Core, highlighted)
    draw.ellipse((x_engine - 350, y_center - 350, x_engine + 350, y_center + 350), outline=ACCENT_MAIN+(80,), width=1)
    for r in [280, 300]:
        draw.ellipse((x_engine - r, y_center - r, x_engine + r, y_center + r), outline=GREY_BORDER, width=1)

    draw.rectangle([x_engine - 250, y_center - 250, x_engine + 250, y_center + 250], fill=(255, 255, 255), outline=ACCENT_MAIN, width=4)
    draw.rectangle([x_engine - 230, y_center - 230, x_engine + 230, y_center + 230], outline=ACCENT_MAIN+(80,), width=1)
    
    # Centering the Decision text perfectly
    w_dec, h_dec = get_text_dimensions("DECISION", font_large)
    w_sub, h_sub = get_text_dimensions("AUTONOMOUS EXECUTION", font_small)
    
    draw.text((x_engine - w_dec//2, y_center - h_dec - 10), "DECISION", font=font_large, fill=ACCENT_MAIN)
    draw.text((x_engine - w_sub//2, y_center + 20), "AUTONOMOUS EXECUTION", font=font_small, fill=TEXT_LIGHT)

    # Node 3: Market Analysis
    draw.rectangle([x_market - 300, y_market - 150, x_market + 300, y_market + 150], fill=(255, 255, 255), outline=GREY_BORDER, width=3)
    w3, _ = get_text_dimensions("MARKET_ANALYSIS", font_medium)
    draw.text((x_market - w3//2, y_market - 40), "MARKET_ANALYSIS", font=font_medium, fill=TEXT_DARK)
    w4, _ = get_text_dimensions("[ ON-CHAIN LIQUIDITY ]", font_small)
    draw.text((x_market - w4//2, y_market + 30), "[ ON-CHAIN LIQUIDITY ]", font=font_small, fill=TEXT_LIGHT)

    # Node 4: Risk Assessment
    draw.rectangle([x_risk - 300, y_risk - 150, x_risk + 300, y_risk + 150], fill=(255, 255, 255), outline=GREY_BORDER, width=3)
    w5, _ = get_text_dimensions("RISK_ASSESSMENT", font_medium)
    draw.text((x_risk - w5//2, y_risk - 40), "RISK_ASSESSMENT", font=font_medium, fill=TEXT_DARK)
    w6, _ = get_text_dimensions("[ SMART CONTRACT ]", font_small)
    draw.text((x_risk - w6//2, y_risk + 30), "[ SMART CONTRACT ]", font=font_small, fill=TEXT_LIGHT)

    # Action Labels
    draw.text((x_intent + 370, y_center - 50), "NATURAL LANGUAGE\nPARSING", font=font_small, fill=TEXT_DARK)
    draw.text((x_engine + 370, y_market + 100), "SYNDICATE\nROUTING", font=font_small, fill=TEXT_DARK)

def draw_clean_product_ui(img, draw, font_small, font_medium, font_large):
    """Draws a clean, light-mode product representation anchored clearly at the bottom."""
    ui_width = 1600
    ui_height = 500
    
    ui_x = WIDTH // 2 - ui_width // 2
    ui_y = HEIGHT - 120 - ui_height - 100 

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
    draw.rounded_rectangle([ui_x + 100, content_y, ui_x + 240, content_y + 50], radius=12, fill=ACCENT_MAIN+(20,))
    draw.text((ui_x + 120, content_y + 10), "ACTIVE", font=font_small, fill=ACCENT_MAIN)
    
    # Clinical Output Log
    draw.text((ui_x + 100, content_y + 80), "Decision Engine > Parsing intent: 'Analyze risk for new CTO...'", font=font_medium, fill=TEXT_LIGHT)
    draw.text((ui_x + 100, content_y + 150), "> Multi-agent consensus established.", font=font_medium, fill=TEXT_DARK)
    draw.text((ui_x + 100, content_y + 220), "> Executing on-chain assessment via isolated pathways.", font=font_medium, fill=TEXT_DARK)

def draw_typography(img, draw, font_small, font_medium, font_large):
    """Clean, high-end Swiss typography framing."""
    margin = 160
    
    draw.text((margin, margin), "DECISION ARCHITECTURE", font=font_small, fill=TEXT_DARK)
    
    draw.text((WIDTH - margin - 450, margin), "FIG. 2: MULTI-AGENT EXECUTION", font=font_small, fill=TEXT_LIGHT)
    
    draw.text((WIDTH // 2 - 180, HEIGHT - 180), "CLINICAL EXECUTION RECORD", font=font_small, fill=TEXT_LIGHT)

def main():
    print("Generating clean, structured logical canvas for Execution Flow...")
    
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 80, index=2)   
        font_medium = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 40, index=1)  
        font_small = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", 30)              
    except IOError:
         font_large = ImageFont.load_default()
         font_medium = ImageFont.load_default()
         font_small = ImageFont.load_default()

    img = Image.new('RGBA', (WIDTH, HEIGHT), BG_COLOR + (255,))
    draw = ImageDraw.Draw(img, 'RGBA')

    draw_grid_and_architecture(draw)
    
    draw_horizontal_flowchart(draw, font_small, font_medium, font_large)
    
    draw_clean_product_ui(img, draw, font_small, font_medium, font_large)
    
    draw_typography(img, draw, font_small, font_medium, font_large)

    final_img = img.convert('RGB')
    
    out_png = os.path.join(os.path.dirname(__file__), 'decision_execution_flow_post.png')
    
    final_img.save(out_png, format='PNG', optimize=True)
    
    print(f"Masterpiece generated successfully at: {out_png}")

if __name__ == "__main__":
    main()
