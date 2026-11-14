import struct
import zlib
import math
import os

def write_png(filename, width, height, rgba_bytes):
    def png_chunk(chunk_type, data):
        chunk = chunk_type + data
        return struct.pack('>I', len(data)) + chunk + struct.pack('>I', zlib.crc32(chunk) & 0xffffffff)

    raw_rows = bytearray()
    stride = width * 4
    for y in range(height):
        raw_rows.append(0)  # Filter type 0 (None)
        raw_rows.extend(rgba_bytes[y * stride : (y + 1) * stride])

    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    idat = zlib.compress(bytes(raw_rows), 9)

    with open(filename, 'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n')
        f.write(png_chunk(b'IHDR', ihdr))
        f.write(png_chunk(b'IDAT', idat))
        f.write(png_chunk(b'IEND', b''))

def point_in_poly(x, y, poly):
    inside = False
    n = len(poly)
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]
        xj, yj = poly[j]
        if ((yi > y) != (yj > y)) and (x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi):
            inside = not inside
        j = i
    return inside

def render_icon(filename, size, maskable=False):
    # Scale factor keeps all foreground artwork strictly inside the 80% safe zone if maskable
    scale = 0.68 if maskable else 0.88
    cx, cy = size * 0.5, size * 0.5
    radius_max = size * 0.72

    # Polygon for subtle energy bolt inside the botanical drop
    # Normalized to [-1, 1] around center
    bolt = [
        (0.08, -0.34),
        (-0.22, 0.05),
        (-0.02, 0.05),
        (-0.10, 0.38),
        (0.22, -0.04),
        (0.02, -0.04),
    ]

    buf = bytearray(size * size * 4)

    for py in range(size):
        for px in range(size):
            # Normalized coords [-1, 1]
            nx = (px - cx) / (size * 0.5)
            ny = (py - cy) / (size * 0.5)

            # Background radial dark emerald gradient (#0a3c24 -> #04120a)
            dist_bg = math.hypot(nx + 0.25, ny + 0.30)
            t_bg = min(1.0, dist_bg / 1.45)
            r = int(12 * (1 - t_bg) + 4 * t_bg)
            g = int(66 * (1 - t_bg) + 17 * t_bg)
            b = int(40 * (1 - t_bg) + 9 * t_bg)
            a = 255

            # Outer subtle ring (only on standard icon or safely inside maskable)
            ring_r = 0.82 * (scale / 0.88)
            d_ring = abs(math.hypot(nx, ny) - ring_r)
            if d_ring < 0.018:
                alpha = max(0.0, 1.0 - d_ring / 0.018) * 0.35
                r = int(r * (1 - alpha) + 52 * alpha)
                g = int(g * (1 - alpha) + 211 * alpha)
                b = int(b * (1 - alpha) + 153 * alpha)

            # Scaled coordinates for foreground botanical drop
            sx = nx / scale
            sy = ny / scale

            # Botanical droplet / leaf shape:
            # Top tip around sy = -0.62, rounded bottom around sy = 0.58
            in_drop = False
            if -0.62 <= sy <= 0.58:
                u = (sy + 0.62) / 1.20  # 0 at top tip, 1 at bottom
                # Smooth teardrop half-width function
                half_w = 0.54 * (u ** 0.72) * math.sqrt(max(0.0, 1.0 - (max(0.0, u - 0.58) / 0.42) ** 2))
                if u > 0.58:
                    # Smooth circular cap bottom
                    cap_y = (sy - 0.08) / 0.50
                    half_w = 0.50 * math.sqrt(max(0.0, 1.0 - cap_y * cap_y))
                edge_dist = half_w - abs(sx)
                if edge_dist >= 0:
                    in_drop = True
                    # Emerald gradient across leaf
                    t_leaf = (sx + sy + 1.1) / 2.2
                    t_leaf = max(0.0, min(1.0, t_leaf))
                    lr = int(110 * (1 - t_leaf) + 5 * t_leaf)
                    lg = int(231 * (1 - t_leaf) + 150 * t_leaf)
                    lb = int(183 * (1 - t_leaf) + 105 * t_leaf)

                    # Anti-aliased boundary blend
                    aa = min(1.0, edge_dist * size * 0.25)
                    r = int(r * (1 - aa) + lr * aa)
                    g = int(g * (1 - aa) + lg * aa)
                    b = int(b * (1 - aa) + lb * aa)

                    # Lightning bolt cutout inside the leaf
                    if point_in_poly(sx, sy, bolt):
                        # Crisp amber-gold core with dark border look
                        r, g, b = 250, 204, 21

            idx = (py * size + px) * 4
            buf[idx] = r
            buf[idx + 1] = g
            buf[idx + 2] = b
            buf[idx + 3] = a

    write_png(filename, size, size, buf)
    print(f"Generated {filename} ({size}x{size}, maskable={maskable})")

out_dir = os.path.join(os.path.dirname(__file__), '../public')
render_icon(os.path.join(out_dir, 'pwa-192x192.png'), 192, maskable=False)
render_icon(os.path.join(out_dir, 'pwa-512x512.png'), 512, maskable=False)
render_icon(os.path.join(out_dir, 'pwa-maskable-512x512.png'), 512, maskable=True)
render_icon(os.path.join(out_dir, 'apple-touch-icon.png'), 180, maskable=False)
