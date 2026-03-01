import math
import os
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Constants
WIDTH = 3840  
HEIGHT = 2160
BG_COLOR = (15, 17, 21)        # Midnight Slate #0F1115
TEXT_WHITE = (245, 245, 245)  
TEXT_LIGHT = (140, 150, 160)   # Slate Grey for secondary text
CYBER_GREEN = (0, 255, 163)    # #00FFA3 (High visibility radar ping)
AMBER = (245, 124, 0)          # #F57C00 (Secondary Alert)
GRID_LINE = (255, 255, 255, 15)

# Fixed seed for perfect, reproducible scatter plotting
random.seed(4242)

def draw_hud_bg(draw):
    """Draws absolute outer HUD boundaries and subtle crosshairs."""
    margin = 120
    draw.rectangle([margin, margin, WIDTH - margin, HEIGHT - margin], outline=GRID_LINE, width=2)
    
    # Crosshairs across the entire screen
    draw.line([(WIDTH//2, margin), (WIDTH//2, HEIGHT - margin)], fill=GRID_LINE, width=1)
    draw.line([(margin, HEIGHT//2), (WIDTH - margin, HEIGHT//2)], fill=GRID_LINE, width=1)

def draw_radar_topology(draw, center_x, center_y, font_small):
    """Draws the massive central concentric radar topology."""
    max_radius = 850
    step = 150
    
    # Draw concentric rings
    for r in range(step, max_radius + step, step):
        # Every alternate ring is slightly thicker
        w = 2 if r % (step * 2) == 0 else 1
        alpha = 60 if r % (step * 2) == 0 else 30
        draw.ellipse((center_x - r, center_y - r, center_x + r, center_y + r), outline=(255, 255, 255, alpha), width=w)
        
        # Add tiny distance markers on the Y axis
        if r < max_radius:
            draw.text((center_x + 10, center_y - r - 20), f"{r}u", font=font_small, fill=(255,255,255,100))

    # Draw radial degree lines
    for angle in range(0, 360, 15):
        rad = math.radians(angle)
        # Inner void
        start_r = 50
        x1 = center_x + start_r * math.cos(rad)
        y1 = center_y + start_r * math.sin(rad)
        
        # Outer edge
        x2 = center_x + max_radius * math.cos(rad)
        y2 = center_y + max_radius * math.sin(rad)
        
        opacity = 50 if angle % 90 == 0 else (20 if angle % 45 == 0 else 10)
        draw.line([(x1, y1), (x2, y2)], fill=(255, 255, 255, opacity), width=1)
        
        # Draw degree labels on the outer edge for major angles
        if angle % 45 == 0:
            lx = center_x + (max_radius + 40) * math.cos(rad)
            ly = center_y + (max_radius + 40) * math.sin(rad)
            draw.text((lx - 20, ly - 10), f"{angle}°", font=font_small, fill=(255,255,255, 100))

    # Center Eye
    draw.ellipse((center_x - 30, center_y - 30, center_x + 30, center_y + 30), outline=CYBER_GREEN, width=2)
    draw.ellipse((center_x - 10, center_y - 10, center_x + 10, center_y + 10), fill=CYBER_GREEN)


def plot_data_nodes(draw, img, center_x, center_y, font_small):
    """Scatters 'liquidity events' and 'CTO targets' across the radar."""
    max_radius = 850
    
    # 1. Background noise (small white dots)
    for _ in range(150):
        angle = random.uniform(0, 360)
        r = random.uniform(150, max_radius - 50)
        rad = math.radians(angle)
        x = center_x + r * math.cos(rad)
        y = center_y + r * math.sin(rad)
        size = random.choice([2, 3])
        draw.ellipse((x-size, y-size, x+size, y+size), fill=(255,255,255, 60))

    # 2. Tracked Targets (Green Pings)
    targets = []
    for _ in range(8):
        angle = random.uniform(0, 360)
        r = random.uniform(200, max_radius - 100)
        rad = math.radians(angle)
        x = center_x + r * math.cos(rad)
        y = center_y + r * math.sin(rad)
        targets.append((x, y))
        
        # Target reticle
        s = 12
        draw.line([(x-s, y), (x+s, y)], fill=CYBER_GREEN, width=2)
        draw.line([(x, y-s), (x, y+s)], fill=CYBER_GREEN, width=2)
        draw.ellipse((x-s*2, y-s*2, x+s*2, y+s*2), outline=CYBER_GREEN+(150,), width=1)
        
        # Telemetry Text
        confidence = round(random.uniform(75.0, 99.9), 1)
        draw.text((x + 25, y - 20), f"TGT_{int(r)}", font=font_small, fill=CYBER_GREEN)
        draw.text((x + 25, y + 10), f"CONF:{confidence}%", font=font_small, fill=(255,255,255,150))

    # 3. High Risk Anomalies (Amber Triangles)
    for _ in range(3):
        angle = random.uniform(0, 360)
        r = random.uniform(400, max_radius - 100)
        rad = math.radians(angle)
        x = center_x + r * math.cos(rad)
        y = center_y + r * math.sin(rad)
        
        # Triangle
        s = 15
        draw.polygon([(x, y-s), (x-s, y+s), (x+s, y+s)], outline=AMBER, width=3)
        draw.text((x + 25, y - 10), "ANOMALY", font=font_small, fill=AMBER)
        
    # 4. Connecting a 'Route'
    t1, t2, t3 = targets[0], targets[1], targets[2]
    draw.line([t1, t2], fill=CYBER_GREEN+(80,), width=2)
    draw.line([t2, t3], fill=CYBER_GREEN+(80,), width=2)
    
    # Fake a sweeping radar arm glow using a conic-like overlay
    glow_img = Image.new('RGBA', (WIDTH, HEIGHT), (0,0,0,0))
    glow_draw = ImageDraw.Draw(glow_img)
    # A soft green wedge at 45 degrees
    glow_draw.pieslice([center_x - max_radius, center_y - max_radius, center_x + max_radius, center_y + max_radius], 
                       start=315, end=360, fill=CYBER_GREEN+(12,))
    glow_draw.line([(center_x, center_y), (center_x + max_radius, center_y)], fill=CYBER_GREEN+(150,), width=4)
    img.alpha_composite(glow_img)

def draw_telemetry_panels(draw, font_small, font_medium):
    """Draws the side HUD panels for the 'Active Command Center' feel."""
    margin = 120
    panel_w = 400
    
    # Left Panel: System Status
    left_x = margin + 50
    left_y = margin + 500
    
    draw.text((left_x, left_y), "ENGINE STATUS", font=font_medium, fill=TEXT_WHITE)
    draw.line([(left_x, left_y + 60), (left_x + panel_w, left_y + 60)], fill=GRID_LINE, width=2)
    
    stats = [
        ("UPTIME", "99.999%"),
        ("RPC LATENCY", "12ms"),
        ("NODES", "14 ACTIVE"),
        ("SHIELDING", "Z-KNOWLEDGE")
    ]
    
    for i, (label, val) in enumerate(stats):
        y_pos = left_y + 100 + (i * 80)
        draw.text((left_x, y_pos), label, font=font_small, fill=TEXT_LIGHT)
        draw.text((left_x + 250, y_pos), val, font=font_small, fill=CYBER_GREEN if i != 1 else TEXT_WHITE)

    # Right Panel: Live Feed
    right_x = WIDTH - margin - panel_w - 50
    right_y = HEIGHT - margin - 500
    
    draw.text((right_x, right_y), "LIVE FEED", font=font_medium, fill=TEXT_WHITE)
    draw.line([(right_x, right_y + 60), (right_x + panel_w, right_y + 60)], fill=GRID_LINE, width=2)
    
    feeds = [
        "> Subscribing to blocks...",
        "> Target TGT_812 localized.",
        "> Liquidity threshold met.",
        "> Auto-executing payload.",
        "> Transaction verified."
    ]
    
    for i, msg in enumerate(feeds):
        y_pos = right_y + 100 + (i * 60)
        color = CYBER_GREEN if "executing" in msg or "verified" in msg else TEXT_LIGHT
        draw.text((right_x, y_pos), msg, font=font_small, fill=color)

def draw_typography(draw, font_small, font_medium, font_large):
    """Clinical, high-end Swiss typography framing on top of the HUD."""
    margin = 160
    
    # Top Left Identity (Classic Decision Brand placement)
    draw.text((margin, margin), "DECISION ARCHITECTURE", font=font_medium, fill=TEXT_WHITE)
    draw.text((margin, margin + 60), "LIVE TOPOLOGY HUD", font=font_small, fill=CYBER_GREEN)
    
    # Bottom Center Title
    draw.text((WIDTH // 2 - 380, HEIGHT - margin - 150), "AUTONOMOUS OVERSIGHT", font=font_large, fill=TEXT_WHITE)
    draw.text((WIDTH // 2 - 250, HEIGHT - margin - 50), "SCANNING ON-CHAIN SYNDICATES", font=font_small, fill=TEXT_LIGHT)

def main():
    print("Generating Dark Mode Radar Topology canvas...")
    
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

    # Base Architecture
    draw_hud_bg(draw)
    
    # The massive central radar
    center_x, center_y = WIDTH // 2, HEIGHT // 2
    draw_radar_topology(draw, center_x, center_y, font_small)
    plot_data_nodes(draw, img, center_x, center_y, font_small)
    
    # Side telemetry data
    draw_telemetry_panels(draw, font_small, font_medium)
    
    # Structural Branding
    draw_typography(draw, font_small, font_medium, font_large)

    # Output
    final_img = img.convert('RGB')
    out_png = os.path.join(os.path.dirname(__file__), 'decision_topology_post.png')
    final_img.save(out_png, format='PNG', optimize=True)
    
    print(f"Master Radar HUD generated successfully at: {out_png}")

if __name__ == "__main__":
    main()
