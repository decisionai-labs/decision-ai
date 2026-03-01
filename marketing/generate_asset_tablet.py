import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Constants
WIDTH = 3840  
HEIGHT = 2160

# Palette matching the reference
GRADIENT_CENTER = (255, 235, 220)  # Very light peach
GRADIENT_EDGE = (245, 120, 60)     # Warm, vibrant orange/amber
TABLET_BODY = (15, 15, 15)         # Nearly black for the tablet case
TABLET_SCREEN_BG = (250, 245, 240) # Warm off-white paper texture inside screen
TEXT_BLACK = (20, 20, 20)          # Deep black for the massive text
HAND_SILHOUETTE = (5, 5, 5, 255)   # Silhouetted hands

# Utility App Palette (Inserted on the right)
APP_BG = (20, 24, 32)
APP_CARD = (30, 35, 45)
APP_TEXT = (245, 245, 245)
APP_MUTED = (150, 160, 170)
APP_ACCENT = (245, 120, 60)        # Tying the utility accent to the background gradient

def draw_radial_gradient(img):
    """Draws a smooth radial gradient mimicking the screenshot background."""
    draw = ImageDraw.Draw(img)
    cx, cy = WIDTH // 2, HEIGHT // 2
    max_radius = math.hypot(cx, cy)
    
    # Simple radial gradient implementation by drawing expanding concentric transparent circles
    # A true smooth gradient requires pixel manipulation, but PIL blending works well enough
    base_img = Image.new("RGB", (WIDTH, HEIGHT), GRADIENT_EDGE)
    
    # We will draw a huge blurred circle in the center to create the soft gradient
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0,0,0,0))
    glow_draw = ImageDraw.Draw(glow)
    
    radius = 1800
    glow_draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=GRADIENT_CENTER+(255,))
    
    # Blur heavily to create the smooth transition
    glow = glow.filter(ImageFilter.GaussianBlur(500))
    
    base_img.paste(glow, (0,0), glow)
    img.paste(base_img, (0,0))

def draw_tablet_mockup(img, draw, font_small, font_medium, font_large):
    """Draws the landscape tablet holding the "Archer Monroe" style layout."""
    
    tablet_w = 2800
    tablet_h = 1900
    tablet_x = (WIDTH // 2) - (tablet_w // 2)
    tablet_y = (HEIGHT // 2) - (tablet_h // 2)
    
    # 1. Tablet Drop Shadow
    shadow_img = Image.new('RGBA', (WIDTH, HEIGHT), (0,0,0,0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.rounded_rectangle([tablet_x - 30, tablet_y + 50, tablet_x + tablet_w + 30, tablet_y + tablet_h + 80], radius=150, fill=(0, 0, 0, 100))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(60))
    img.alpha_composite(shadow_img)

    # 2. Tablet Hardware Frame
    bezel = 60
    corner_radius = 120
    # Outer Case
    draw.rounded_rectangle([tablet_x, tablet_y, tablet_x + tablet_w, tablet_y + tablet_h], radius=corner_radius, fill=TABLET_BODY)
    # Inner Screen Bezel edge
    draw.rounded_rectangle([tablet_x + bezel - 2, tablet_y + bezel - 2, tablet_x + tablet_w - bezel + 2, tablet_y + tablet_h - bezel + 2], radius=corner_radius - bezel//2, outline=(60,60,60), width=4)
    # The actual screen
    screen_x1 = tablet_x + bezel
    screen_y1 = tablet_y + bezel
    screen_x2 = tablet_x + tablet_w - bezel
    screen_y2 = tablet_y + tablet_h - bezel
    draw.rounded_rectangle([screen_x1, screen_y1, screen_x2, screen_y2], radius=corner_radius - bezel//2 + 5, fill=TABLET_SCREEN_BG)
    
    # Add tablet camera array (top tiny dot)
    cam_x = tablet_x + (tablet_w // 2)
    cam_y = tablet_y + (bezel // 2)
    draw.ellipse((cam_x - 8, cam_y - 8, cam_x + 8, cam_y + 8), fill=(30, 30, 40))

    # --- Screen Content (Mirroring Reference Layout) --- #
    
    # Top Nav Bar
    nav_y = screen_y1 + 80
    draw.text((screen_x1 + 80, nav_y), "DECISION NET - 3:38:42 PM", font=font_small, fill=TEXT_BLACK)
    
    nav_links = "ABOUT    AGENTS    SYSTEMS    AWARDS    STORE"
    nav_w, _ = get_text_dimensions(nav_links, font_small)
    draw.text((screen_x1 + (tablet_w // 2) - (nav_w // 2), nav_y), nav_links, font=font_small, fill=TEXT_BLACK)
    
    # Fake Contact Button
    btn_w = 220
    btn_h = 70
    btn_x = screen_x2 - 80 - btn_w
    draw.rounded_rectangle([btn_x, nav_y - 20, btn_x + btn_w, nav_y - 20 + btn_h], radius=35, fill=WHITE, outline=(220,220,220), width=2)
    draw.text((btn_x + 55, nav_y), "Contact", font=font_small, fill=TEXT_BLACK)

    # Left Side: The "Archer Monroe" Massive Typography
    text_x = screen_x1 + 80
    text_y_start = screen_y1 + 800
    
    # Small overhead text
    draw.text((text_x, text_y_start - 120), "Hi, | Execution\nAlgorithm builder", font=font_small, fill=TEXT_BLACK)
    
    # Massive Geometric Header
    try:
        font_massive = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 350, index=2) # Bold 
    except IOError:
        font_massive = ImageFont.load_default()
        
    draw.text((text_x - 15, text_y_start), "Decision", font=font_massive, fill=TEXT_BLACK)
    draw.text((text_x - 15, text_y_start + 320), "Engine", font=font_massive, fill=TEXT_BLACK)
    
    # Small subtext next to the massive headline
    sub_x = text_x + 1300
    sub_y = text_y_start + 500
    draw.text((sub_x, sub_y), "Based on Solana*\nAvailable globally", font=font_small, fill=TEXT_BLACK)

    # Bottom layout dividing line
    bottom_y = screen_y2 - 250
    draw.line([(screen_x1 + 80, bottom_y), (screen_x2 - 80, bottom_y)], fill=(220, 220, 220), width=3)
    
    # Bottom text (A passionate UI/UX...)
    # Using a slightly bold font for the first part
    try:
        font_bot_bold = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 45, index=2)
        font_bot_light = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 45, index=0)
    except:
        font_bot_bold = font_medium
        font_bot_light = font_medium
        
    draw.text((screen_x1 + 800, bottom_y + 80), "An autonomous ", font=font_bot_bold, fill=TEXT_BLACK)
    draw.text((screen_x1 + 1150, bottom_y + 80), "execution agent committed to blending speed", font=font_bot_light, fill=(150, 150, 150))

    # Right Side: The Utility (Replacing the portrait photo)
    # The reference has a stunning portrait. To "make it look like our utility is being used",
    # we draw an embedded dark-mode Execution interface fading beautifully into the right side.
    draw_utility_app(draw, screen_x1, screen_y1, screen_x2, screen_y2, bottom_y, font_small, font_medium)


def draw_utility_app(draw, sx1, sy1, sx2, sy2, bottom_y, font_small, font_medium):
    """Draws a beautiful code editor window displaying a real JSON data structure payload."""
    app_w = 1200
    app_h = bottom_y - sy1 - 150 
    app_x = sx2 - app_w - 60
    app_y = sy1 + 100
    
    # App Container (Code Editor style)
    draw.rounded_rectangle([app_x, app_y, app_x + app_w, app_y + app_h], radius=30, fill=(18, 20, 25))
    
    # Editor Header
    draw.rounded_rectangle([app_x, app_y, app_x + app_w, app_y + 80], radius=30, fill=(25, 28, 35))
    draw.rectangle([app_x, app_y + 50, app_x + app_w, app_y + 80], fill=(25, 28, 35)) # flatten bottom
    
    # Mac window dots
    draw.ellipse([app_x + 30, app_y + 30, app_x + 50, app_y + 50], fill=(255, 95, 86))
    draw.ellipse([app_x + 70, app_y + 30, app_x + 90, app_y + 50], fill=(255, 189, 46))
    draw.ellipse([app_x + 110, app_y + 30, app_x + 130, app_y + 50], fill=(39, 201, 63))
    
    draw.text((app_x + 180, app_y + 20), "decision_payload.json", font=font_small, fill=(150, 150, 160))
    
    # JSON Content with syntax highlighting
    KEY_COLOR = (121, 192, 255)   # Light Blue for keys
    STR_COLOR = (165, 214, 255)   # Lighter Blue for strings
    VAL_COLOR = (255, 123, 114)   # Red/Orange for numbers
    BOOL_COLOR = (255, 166, 87)   # Orange for booleans
    PUNC_COLOR = (200, 200, 200)  # Grey for brackets

    lines = [
        ("{", PUNC_COLOR),
        ('  "target_asset"', KEY_COLOR, ': ', PUNC_COLOR, '"NEURO/SOL"', STR_COLOR, ',', PUNC_COLOR),
        ('  "execution_mode"', KEY_COLOR, ': ', PUNC_COLOR, '"AUTONOMOUS"', STR_COLOR, ',', PUNC_COLOR),
        ('  "syndicate_consensus"', KEY_COLOR, ': ', PUNC_COLOR, 'true', BOOL_COLOR, ',', PUNC_COLOR),
        ('  "risk_assessment"', KEY_COLOR, ': ', PUNC_COLOR, '{', PUNC_COLOR),
        ('    "contract_verified"', KEY_COLOR, ': ', PUNC_COLOR, 'true', BOOL_COLOR, ',', PUNC_COLOR),
        ('    "liquidity_score"', KEY_COLOR, ': ', PUNC_COLOR, '98.5', VAL_COLOR, ',', PUNC_COLOR),
        ('    "slippage_expected"', KEY_COLOR, ': ', PUNC_COLOR, '0.002', VAL_COLOR, ',', PUNC_COLOR),
        ('    "anomalies"', KEY_COLOR, ': ', PUNC_COLOR, '[ ]', PUNC_COLOR),
        ('  }', PUNC_COLOR, ',', PUNC_COLOR),
        ('  "action"', KEY_COLOR, ': ', PUNC_COLOR, '{', PUNC_COLOR),
        ('    "type"', KEY_COLOR, ': ', PUNC_COLOR, '"EXECUTE_ROUTING"', STR_COLOR, ',', PUNC_COLOR),
        ('    "amount_in"', KEY_COLOR, ': ', PUNC_COLOR, '1500.00', VAL_COLOR, ',', PUNC_COLOR),
        ('    "route"', KEY_COLOR, ': ', PUNC_COLOR, '["Raydium", "Orca"]', STR_COLOR),
        ('  }', PUNC_COLOR, ',', PUNC_COLOR),
        ('  "signature"', KEY_COLOR, ': ', PUNC_COLOR, '"0x...a4F2"', STR_COLOR),
        ("}", PUNC_COLOR)
    ]

    try:
        font_code = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", 40)
    except IOError:
        font_code = font_small
        
    y_offset = app_y + 120
    
    for line_parts in lines:
        x_offset = app_x + 60
        for i in range(0, len(line_parts), 2):
            text = line_parts[i]
            color = line_parts[i+1]
            draw.text((x_offset, y_offset), text, font=font_code, fill=color)
            # Advance X precisely
            try:
                x_offset += font_code.getlength(text)
            except AttributeError:
                x_offset += get_text_dimensions(text, font_code)[0]
        y_offset += 75


def draw_silhouetted_hands(img, draw):
    """Draws sleek, stylized black shadows on the left and right edges matching the reference."""
    # We will use large, smooth polygons to fake the hand silhouettes anchoring the tablet
    
    tablet_w = 2800
    tablet_h = 1900
    tablet_x = (WIDTH // 2) - (tablet_w // 2)
    tablet_y = (HEIGHT // 2) - (tablet_h // 2)
    bottom = tablet_y + tablet_h

    # Left Hand Silhouette 
    # Starts off screen, curves into a thumb holding the left bezel 
    left_hand = [
        (-100, bottom + 100),
        (500, bottom + 100),           
        (600, bottom - 300),           # base of thumb
        (650, bottom - 650),           # thumb moving up
        (680, bottom - 800),           # tip of thumb on screen
        (660, bottom - 850),           # top curve of thumb
        (600, bottom - 800),           # back of thumb
        (450, bottom - 500),           # hand edge
        (250, bottom - 200),
        (-100, bottom - 100)
    ]
    draw.polygon(left_hand, fill=HAND_SILHOUETTE)
    
    # Right Hand Silhouette 
    # Starts off screen right, curves into a thumb holding right edge
    right_edge = tablet_x + tablet_w
    right_hand = [
        (WIDTH + 100, bottom + 100),
        (WIDTH - 500, bottom + 100),           
        (WIDTH - 600, bottom - 300),           # base of thumb
        (WIDTH - 650, bottom - 650),           # thumb moving up
        (WIDTH - 680, bottom - 800),           # tip of thumb on screen
        (WIDTH - 660, bottom - 850),           # top curve of thumb
        (WIDTH - 600, bottom - 800),           # back of thumb
        (WIDTH - 450, bottom - 500),           # hand edge
        (WIDTH - 250, bottom - 200),
        (WIDTH + 100, bottom - 100)
    ]
    draw.polygon(right_hand, fill=HAND_SILHOUETTE)

WHITE = (255, 255, 255)

def get_text_dimensions(text_string, font):
    try:
        left, top, right, bottom = font.getbbox(text_string)
        return right - left, bottom - top
    except Exception:
        return len(text_string) * (font.size * 0.6), font.size


def main():
    print("Generating Warm Landscape Tablet canvas...")
    
    try:
        font_huge = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 350, index=2)   
        font_large = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 120, index=2)   
        font_medium = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 48, index=2)  
        font_small = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 32, index=1)              
    except IOError:
         font_huge = ImageFont.load_default()
         font_large = ImageFont.load_default()
         font_medium = ImageFont.load_default()
         font_small = ImageFont.load_default()

    # Base image is transparent so we can drop the blurred radial gradient in safely
    img = Image.new('RGB', (WIDTH, HEIGHT), (255, 255, 255))
    
    # Draw Radial Background
    draw_radial_gradient(img)
    
    # The rest needs RGBA drawing over the base
    overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0,0,0,0))
    draw = ImageDraw.Draw(overlay)

    # Core Device
    draw_tablet_mockup(overlay, draw, font_small, font_medium, font_large)
    
    # Add Hands
    draw_silhouetted_hands(overlay, draw)

    # Composite
    img.paste(overlay, (0,0), overlay)

    # Output
    out_png = os.path.join(os.path.dirname(__file__), 'decision_tablet_post.png')
    img.save(out_png, format='PNG', optimize=True)
    
    print(f"Tablet UI generated successfully at: {out_png}")

if __name__ == "__main__":
    main()
