<<<<<<< HEAD
# INKIND print studio

## Wolf and moon artwork

The default artwork is `assets/wolf-moon.png`, generated from the supplied wolf/moon style reference with a transparent background. It is shared by the paper, transfer, front, back, studio preview, upload/reset flow, and front mockup download. Front print dimensions remain unchanged; the back print uses a larger centered box (34% width, 27% height of the character frame). The original wave asset is preserved.

Generation prompt: standalone T-shirt print, upward-howling wolf with flowing teal and near-black fur, large golden full moon, pine silhouettes, crisp screen-print illustration, portrait 2:3, actual transparent background, no text or mockup.

Verified desktop back and mobile front placement, image loading, no horizontal overflow, and JavaScript syntax.

## Printer output motion

The output sheet translates downward through a fixed slot while a top clip hides the portion still inside the printer. Artwork keeps a fixed position and size on the moving page. The leading blank margin emerges first, then the artwork, then the trailing margin; the entire page exits before lifting toward the shirt. A subtle slot shadow replaces the orange scan beam. Verified desktop/mobile appearance and forward/reverse feed: slot alignment within 0.01 px and constant artwork offset across 0/25/50/75/100% output on mobile.

## Scroll turntable

The final 20% of the extended story scrubs one full front/right/back/left/front turn. This uses transparent rendered views with CSS perspective blending, not a real-time mesh. The left profile reuses the side view mirrored in CSS. Front and back artwork both use the studio's shared uploaded design.

New assets generated with the built-in image generation tool:

- `assets/boy-back.png`: Edit the reference character into an exact 180-degree rear view for a turntable animation. Preserve the SAME stylized 3D young man, hair, proportions, white oversized blank T-shirt, charcoal trousers, white sneakers, pose, centered framing, camera scale, head and foot vertical positions. Show only back of head and back of shirt, NO face. Arms same relaxed position. Shirt back completely blank for compositing graphic later. Full body. Truly transparent alpha background, no floor or backdrop, no text. Match 1024x1536 portrait reference.
- `assets/boy-side.png`: Edit reference into exact 90-degree side profile of SAME stylized 3D man, facing RIGHT. Turn whole body, face torso hips shoes together 90 degrees, not only head. Preserve hair, white blank oversized T-shirt, charcoal trousers, white sneakers, relaxed arms, identical proportions and full body scale, top of hair and soles same vertical positions. Feet stationary neutral standing turntable pose. Center torso on horizontal center of 1024x1536 portrait canvas, matching reference framing. Actual transparent alpha background, no backdrop/floor/text. Shirt blank.

Checked desktop/mobile loading, transparency, no horizontal overflow, 0/90/180/270/360 degree states and reverse scrolling.



## Expanded scroll story

`story.js` drives an 850-viewport-height desktop sequence (780 on mobile), with eased scroll scrubbing: floating/rotating paper, printer entry and feed, progressive print reveal, artwork lifting onto the shirt, then shirt-to-character alignment and reveal. Wheel, trackpad, touch, keyboard scrolling and chapter buttons share the same reversible timeline. No timed autoplay or wheel interception. Reduced-motion preference removes perspective rotations and scroll smoothing.

The boy is a transparent CGI-rendered PNG animated with CSS perspective, not a real-time 3D mesh. New asset: `assets/boy-3d.png`, generated using the built-in image generation tool. Original model asset is retained.

Final boy generation prompt:
Use case: stylized-concept. Single full-body premium 3D rendered young adult male streetwear character for a website, friendly expressive face, sculpted dark wavy hair, warm medium Indian skin tone, slightly oversized head and stylized proportions, high quality clay-meets-Pixar CGI materials. Wearing a completely blank white oversized short sleeve crewneck T-shirt, charcoal loose trousers, chunky white sneakers. Front view perfectly straight torso, arms relaxed slightly away from sides, chest entirely unobstructed for later compositing a graphic. Entire body feet and hair within canvas, centered symmetrical composition, soft directional studio lighting, detailed cloth volume. Truly transparent RGBA background, isolated clean cutout, no floor, no backdrop, no text or logos, no shadow outside character. Portrait 2:3 composition.


Run `npm run dev`, then open http://127.0.0.1:3000. No dependency installation required. `npm run check` checks JavaScript syntax.

Scroll through paper feed, print reveal, T-shirt transformation and model reveal. Stage buttons navigate the story. Studio: size selection, local PNG/JPG/WebP uploads up to 10 MB, reset and transparent PNG mockup download. Uploads stay in the browser. Frontend experience only; checkout, payments and order fulfilment are not connected.

Four raster assets created with built-in image generation, saved in assets/, with verified alpha transparency. Blank paper and decoration are HTML/CSS. Google Fonts has local fallback fonts.

## Generation prompts

- assets/printer.png: Photorealistic white and graphite compact transfer printer, slightly elevated front view, rear feed and front output slot visible, empty, no text or logo, soft studio lighting, centered with margins, actual alpha transparency, no floor or backdrop.
- assets/shirt.png: Use case: product-mockup. One white heavyweight oversized cotton T-shirt, floating ghost mannequin, front view perfectly symmetrical, realistic cloth folds, sleeves spread gently, round crew neck, blank chest without any print. Entire shirt centered with clear margins. Premium fashion studio photography. Truly transparent alpha background, no floor, no background color, no checkerboard, no shadow outside garment. Asset for website animation.
- assets/model.png: Use case: photorealistic-natural. Full body fashion editorial cutout of a young adult Indian male model with dark wavy hair wearing a plain white oversized short sleeve crew neck T-shirt and loose black trousers and black sneakers. Facing directly forward with relaxed arms at sides, shirt chest fully visible and flat without graphics, confident subtle smile, premium streetwear editorial photography. Entire body including feet inside frame with generous margins. Actual transparent alpha background, no scenery, no floor, no checkerboard, no external shadows.
- assets/graphic.png: Use case: illustration-story. A single isolated bold screen-print graphic for a streetwear T-shirt: vivid orange sun disc behind a fluid cobalt blue ocean wave, small black flying seabird, expressive retro hand drawn halftone texture, compact circular composition. No text or lettering. Flat limited ink colors orange blue black cream, crisp edges. Actual transparent alpha background outside the illustration, no paper, no garment, no mockup, no checkerboard. Centered with margins.
=======
# Tintavo
Clothing aand printing website
>>>>>>> d37c558dd2d3fb1e1d694a2f52aa6e8aa565fe6e
