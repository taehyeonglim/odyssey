from PIL import Image, ImageEnhance, ImageFilter
import os

images_dir = os.path.join(os.path.dirname(__file__), '../public/assets/images')

# 1. Penelope portrait (from odyssey_ithaca_return.jpg)
ithaca_path = os.path.join(images_dir, 'odyssey_ithaca_return.jpg')
if os.path.exists(ithaca_path):
    img = Image.open(ithaca_path)
    w, h = img.size
    # Crop central royal figure
    crop_box = (int(w * 0.15), int(h * 0.1), int(w * 0.85), int(h * 0.8))
    penelope_img = img.crop(crop_box).resize((800, 800), Image.Resampling.LANCZOS)
    penelope_img.save(os.path.join(images_dir, 'portrait_penelope.jpg'), 'JPEG', quality=95)
    print("Created portrait_penelope.jpg")

# 2. Agamemnon portrait (from iliad_achilles_rage.jpg)
rage_path = os.path.join(images_dir, 'iliad_achilles_rage.jpg')
if os.path.exists(rage_path):
    img = Image.open(rage_path)
    w, h = img.size
    crop_box = (int(w * 0.45), int(h * 0.05), int(w * 0.95), int(h * 0.75))
    agamemnon_img = img.crop(crop_box).resize((800, 800), Image.Resampling.LANCZOS)
    agamemnon_img.save(os.path.join(images_dir, 'portrait_agamemnon.jpg'), 'JPEG', quality=95)
    print("Created portrait_agamemnon.jpg")

# 3. Hector portrait (from iliad_hector_duel.jpg)
duel_path = os.path.join(images_dir, 'iliad_hector_duel.jpg')
if os.path.exists(duel_path):
    img = Image.open(duel_path)
    w, h = img.size
    crop_box = (int(w * 0.4), int(h * 0.05), int(w * 0.95), int(h * 0.75))
    hector_img = img.crop(crop_box).resize((800, 800), Image.Resampling.LANCZOS)
    hector_img.save(os.path.join(images_dir, 'portrait_hector.jpg'), 'JPEG', quality=95)
    print("Created portrait_hector.jpg")

# 4. Circe portrait (from odyssey_circe.jpg)
circe_path = os.path.join(images_dir, 'odyssey_circe.jpg')
if os.path.exists(circe_path):
    img = Image.open(circe_path)
    w, h = img.size
    crop_box = (int(w * 0.2), int(h * 0.05), int(w * 0.8), int(h * 0.85))
    circe_img = img.crop(crop_box).resize((800, 800), Image.Resampling.LANCZOS)
    circe_img.save(os.path.join(images_dir, 'portrait_circe.jpg'), 'JPEG', quality=95)
    print("Created portrait_circe.jpg")

# 5. Polyphemus portrait (from odyssey_cyclops.jpg)
cyclops_path = os.path.join(images_dir, 'odyssey_cyclops.jpg')
if os.path.exists(cyclops_path):
    img = Image.open(cyclops_path)
    w, h = img.size
    crop_box = (int(w * 0.4), int(h * 0.05), int(w * 0.95), int(h * 0.85))
    poly_img = img.crop(crop_box).resize((800, 800), Image.Resampling.LANCZOS)
    poly_img.save(os.path.join(images_dir, 'portrait_polyphemus.jpg'), 'JPEG', quality=95)
    print("Created portrait_polyphemus.jpg")
