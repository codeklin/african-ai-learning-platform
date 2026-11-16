# GOOGLE FLOW AI / VIDEO GENERATION MASTER PROMPT TEMPLATE
## Universal Consistency Anchor for ituwaAfrica Avatar Production

Use this exact prompt structure in Google Flow (or Kling, Runway Gen-3, Leonardo, Pika). 
Keep all visual descriptors fixed : **only swap out the dialogue text inside the quotation marks for each 8-second clip**.

---

### 1. THE POSITIVE PROMPT (Copy-Paste Template)

```text
A photorealistic medium close-up video of a young professional West African Nigerian male instructor in his late 20s, exact facial identity and facial structure strictly matched to reference image, authentic rich warm dark skin tone, clean groomed modern short fade black haircut, neatly trimmed short beard line, friendly expressive eyes looking directly into the camera lens with natural eye blinks and subtle realistic head nodding. 

Wearing a high-quality solid clean espresso-brown or dark slate fitted crewneck t-shirt with natural fabric texture. 

Setting: Modern minimalist creator studio background, warm oat-cream (#FAF5EE) and muted terracotta walls, soft aesthetic warm ambient bokeh, tasteful indirect key lighting, balanced natural fill light, clean professional depth of field, 4k cinematic studio lighting, steady tripod framing, locked camera position, zero camera shake, photorealistic skin pores and natural mouth articulation synchronized to speech. 

He is naturally speaking directly to the viewer in clear English, saying:
"[PASTE YOUR 8-SECOND SPOKEN SCRIPT HERE]"
```

---

### 2. THE NEGATIVE PROMPT (Copy-Paste Once into Negative Box)

```text
distorted face, changing facial features, changing skin tone, morphing hair, changing clothes, changing shirt color, extra fingers, cartoon, 3d animation, anime, CGI plastic skin, blurry eyes, wandering gaze, erratic head movement, sudden camera pan, camera tilt, camera zoom, flickering background, busy cluttered room, neon lights, generic robot graphics, artifacts, glitch, low resolution, oversaturated, deformed mouth, desynchronized lip movement.
```

---

### 3. TECHNICAL & ENVIRONMENT LOCK PARAMETERS

| Setting | Recommended Value | Why |
|---|---|---|
| **Aspect Ratio** | `9:16` (Vertical for mobile) or `16:9` (Horizontal) | Choose one format and stick to it for the entire course |
| **Duration** | `8 seconds` | Matches your spoken word length (~18–22 words) |
| **Camera Motion** | `Static / Locked Tripod` (0 or Minimal) | Prevents background warping between consecutive clips |
| **Identity Reference Weight** | `0.85 – 0.90` (High) | Keeps your face, beard, and skin tone strictly consistent across all clips |
| **Prompt Weight / CFG** | `7.0 – 7.5` | Balances strict prompt adherence without visual degradation |

---

### 4. HOW TO BATCH GENERATE EACH LESSON

For each lesson:
1. Open the lesson's script in [`curriculum/avatar_production_scripts/01_ai_foundations_avatar_scripts.md`](file:///home/tizzleshop-dev/Documents/Github-Projects/ituwaAfrica/curriculum/avatar_production_scripts/01_ai_foundations_avatar_scripts.md).
2. Take **Clip 1** dialogue, paste it into the quotation marks `"[PASTE YOUR 8-SECOND SPOKEN SCRIPT HERE]"`.
3. Hit Generate.
4. Replace with **Clip 2** dialogue, hit Generate.
5. Repeat for Clips 3 to 6.
6. Export the clips and drop them into your editing timeline alongside your screen recording.
