(() => {
  const story = document.getElementById('story');
  const scene = document.querySelector('.scene');
  const pin = document.querySelector('.story-pin');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = v => Math.max(0, Math.min(1, v));
  const range = (p, a, b) => clamp((p - a) / (b - a));
  const ease = t => t * t * (3 - 2 * t);
  const mix = (a, b, t) => a + (b - a) * t;
  const $ = id => document.getElementById(id);
  const model = $('model-object');
  const front = document.createElement('div');
  front.className = 'turn-frame turn-front';
  front.append(...model.childNodes);
  model.append(front);
  const turnFrames = [front];
  ['side', 'back', 'side'].forEach((view, i) => {
    const frame = document.createElement('div');
    frame.className = `turn-frame turn-${view}${i === 2 ? ' turn-left' : ''}`;
    const body = document.createElement('img');
    body.src = `assets/boy-${view}.png`;
    body.alt = '';
    frame.append(body);
    if (view === 'back') {
      const print = document.createElement('img');
      print.src = 'assets/wolf-moon.png';
      print.alt = '';
      print.className = 'model-design design back-design';
      frame.append(print);
    }
    model.append(frame);
    turnFrames.push(frame);
  });
  const graphic = document.createElement('img');
  graphic.src = 'assets/wolf-moon.png';
  graphic.alt = '';
  graphic.className = 'flying-design design';
  scene.append(graphic);
  const slotShadow = document.createElement('div');
  slotShadow.className = 'output-slot-shadow';
  scene.append(slotShadow);
  const dust = document.createElement('div');
  dust.className = 'depth-marks';
  dust.innerHTML = '<span>+</span><span>✳</span><span>○</span><span>+</span>';
  scene.prepend(dust);
  const caption = document.createElement('div');
  caption.className = 'sequence-caption';
  scene.append(caption);
  const chapters = [
    ['01 / A BLANK CANVAS', 'Let your<br>idea float.', 'One blank page. Endless possibilities.', 'imagine.'],
    ['02 / IN LIVING COLOUR', 'Roll in.<br>Print out.', 'Follow the paper. Watch the colour appear.', 'create.'],
    ['03 / THE TRANSFER', 'Off the page.<br>Onto your tee.', 'The same artwork. A brand-new canvas.', 'transfer.'],
    ['04 / MADE TO BE WORN', 'Now that\'s<br>your kind.', 'Your imagination, ready for the real world.', 'wear it.']
  ];
  let shown = -1, displayed = null, target = 0, raf = 0;
  function place(el, x, y, width, height, rotate = 0, tilt = 0, scale = 1) {
    Object.assign(el.style, {
      left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px`,
      transform: `translate(-50%, -50%) perspective(1000px) rotateY(${reduced ? 0 : tilt}deg) rotateZ(${reduced ? 0 : rotate}deg) scale(${scale})`
    });
  }
  function draw(progress) {
    // Preserve the production story; reserve the last two scroll screens for one full turn.
    const p = clamp(progress / .76);
    const turn = range(progress, .78, .98);
    const angle = turn * 360;
    const w = scene.clientWidth, h = scene.clientHeight, mobile = w < 761;
    const cx = w * (mobile ? .50 : .63), cy = h * (mobile ? .60 : .51);
    // Reserve room above the rear feed for the entire sheet, including on short screens.
    const safeTop = Math.max(64, h * (mobile ? .29 : .11));
    const unit = Math.min(w * (mobile ? .87 : .49), h * .69, (cy - safeTop) / .85);
    // Match the sheet to the rear tray: 40% of the printer's full outer width.
    const pw = unit * .46, ph = pw * 1.32;
    const printerW = unit * 1.15, printerH = printerW * 2 / 3;
    const printerY = cy - unit * .08;
    const slotY = printerY + printerH * .20;
    const floating = ease(range(p, 0, .19)), feed = ease(range(p, .20, .34));
    const printing = range(p, .36, .50), lift = ease(range(p, .51, .61));
    const transfer = ease(range(p, .62, .75)), dress = ease(range(p, .79, .90));
    const finish = ease(range(p, .90, 1));
    const enterPrinter = ease(range(p, .10, .19)), leavePrinter = ease(range(p, .53, .64));
    let index = p < .27 ? 0 : p < .56 ? 1 : p < .80 ? 2 : 3;
    if (index !== shown) {
      shown = index;
      const c = chapters[index];
      $('stage-label').textContent = c[0]; $('stage-title').innerHTML = c[1];
      $('stage-desc').textContent = c[2]; $('scene-word').textContent = c[3];
      $('counter').textContent = `0${index + 1} / 04`;
      document.querySelectorAll('[data-step]').forEach((b, i) => {
        b.classList.toggle('active', i === index); b.setAttribute('aria-current', i === index ? 'step' : 'false');
      });
    }
    const floatX = mix(w * .30, cx, floating) + Math.sin(floating * Math.PI * 2) * w * .13;
    const feedLipY = printerY - printerH * .20;
    const parkedY = feedLipY - ph / 2;
    const floatY = Math.max(safeTop + Math.hypot(pw, ph) / 2,
      mix(h * .53, parkedY, floating) - Math.sin(floating * Math.PI) * h * .10);
    const approachY = mix(floatY, parkedY, ease(range(p, .15, .20)));
    place($('input-paper'), mix(floatX, cx, feed), mix(approachY, parkedY + ph, feed), pw, ph,
      mix(-29 + Math.sin(floating * Math.PI * 2) * 27, 0, floating), mix(-32, 0, floating));
    // Keep a stable layer; hide only the portion physically swallowed by the feed slot.
    $('input-paper').style.clipPath = `inset(0 0 ${feed * 100}% 0)`;
    $('input-paper').style.opacity = p >= .35 ? 0 : 1;
    $('input-paper').style.zIndex = 4;
    place($('printer'), cx + leavePrinter * w * .52, printerY + (1 - enterPrinter) * h * .48, printerW, printerH, leavePrinter * 15);
    $('printer').style.opacity = enterPrinter * (1 - leavePrinter);
    const paperX = mix(cx, cx - unit * .26, lift);
    // Move the entire sheet through a fixed slot. The bottom edge exits first;
    // artwork travels with the paper while the remaining sheet stays inside.
    const paperY = mix(slotY - ph / 2 + ph * printing, cy - unit * .07, lift);
    place($('output-paper'), paperX, paperY, pw, ph, -lift * 13, lift * -12);
    $('output-paper').style.opacity = (printing > 0 ? 1 : 0) * (1 - range(p, .70, .77));
    $('output-paper').style.clipPath = `inset(${(1 - printing) * 100}% 0 0 0)`;
    $('output-paper').querySelector('img').style.opacity = 1 - range(p, .61, .625);
    const shirtW = unit * .94;
    const shirtH = shirtW * 1200 / 1280;
    const shirtEnter = ease(range(p, .55, .64));
    const boyH = Math.min(h * (mobile ? .64 : .84), w * (mobile ? 1.18 : .80));
    const boyW = boyH * 2 / 3;
    const boyY = h * (mobile ? .59 : .51);
    const boyX = cx;
    // Shrink and align the floating shirt with the character's torso before revealing the worn shirt.
    const shirtX = mix(cx + (1 - shirtEnter) * w * .45, boyX, dress);
    const shirtY = mix(cy, boyY - boyH * .16, dress);
    const finalShirtW = boyW * .60;
    const sw = mix(shirtW, finalShirtW, dress), sh = sw * 1200 / 1280;
    place($('shirt-object'), shirtX, shirtY, sw, sh, mix(8 * (1 - transfer), 0, dress), mix(-19 * (1 - transfer), 0, dress));
    $('shirt-object').style.opacity = shirtEnter * (1 - range(p, .865, .91));
    const shirtGraphic = $('shirt-object').querySelector('.shirt-design');
    shirtGraphic.style.opacity = range(p, .745, .765);
    const artX = mix(paperX, shirtX, transfer), artY = mix(paperY, shirtY - sh * .03, transfer);
    place(graphic, artX, artY - Math.sin(transfer * Math.PI) * unit * .24, mix(pw * .84, sw * .28, transfer), mix(pw * .84, sh * .30, transfer), mix(-13, 0, transfer), Math.sin(transfer * Math.PI) * 30);
    graphic.style.opacity = range(p, .61, .625) * (1 - range(p, .745, .765));
    const boyEnter = ease(range(p, .78, .88));
    place($('model-object'), boyX, boyY + (1 - boyEnter) * h * .24, boyW, boyH, 0, mix(-14, 0, boyEnter), 1 + finish * .04);
    $('model-object').style.opacity = boyEnter;
    $('model-object').querySelector('.model-design').style.opacity = range(p, .865, .91);
    turnFrames.forEach((frame, i) => {
      const delta = ((angle - i * 90 + 540) % 360) - 180;
      const weight = Math.max(0, 1 - Math.abs(delta) / 90);
      frame.style.opacity = reduced ? (Math.abs(delta) <= 45 ? 1 : 0) : weight;
      frame.style.transform = `perspective(1200px) rotateY(${reduced ? 0 : -delta * .45}deg)`;
      frame.style.zIndex = Math.round(weight * 100);
    });
    model.dataset.angle = angle.toFixed(1);
    place(slotShadow, cx, slotY + 3, pw, 6);
    slotShadow.style.opacity = printing > 0 && printing < 1 ? 1 : 0;
    $('floating-note').style.opacity = 0;
    $('scene-word').style.transform = `translate(${mix(60, -90, p)}px, ${mix(30, -40, p)}px)`;
    document.querySelector('.orbit-one').style.transform = `rotate(${-30 + p * 85}deg) scale(${.85 + p * .25})`;
    document.querySelector('.orbit-two').style.transform = `rotate(${25 - p * 100}deg)`;
    dust.style.transform = `translateY(${-p * 110}px) rotate(${p * 18}deg)`;
    caption.textContent = p < .20 ? '01 — A LITTLE ROOM FOR A BIG IDEA' : p < .35 ? 'FEEDING YOUR IMAGINATION ↓' : p < .52 ? `PRINTING IN COLOUR · ${Math.round(printing * 100)}%` : p < .62 ? 'FRESH OFF THE PRESS' : p < .79 ? 'SAME ART. NEW CANVAS.' : 'YOUR IDEA. BROUGHT TO LIFE.';
    if (progress >= .76) {
      caption.textContent = `SCROLL TO TURN · ${Math.round(angle)}° / 360°`;
      $('stage-title').innerHTML = 'Every side.<br>Your kind.';
      $('stage-desc').textContent = 'Your graphic, front and back. Keep scrolling for a full turn.';
    } else if (shown === 3) {
      $('stage-title').innerHTML = chapters[3][1];
      $('stage-desc').textContent = chapters[3][2];
    }
    $('progress').style.width = `${progress * 100}%`;
    pin.dataset.progress = progress.toFixed(4);
  }
  function animate() {
    displayed = reduced || displayed === null ? target : mix(displayed, target, .16);
    if (Math.abs(target - displayed) < .00008) displayed = target;
    draw(displayed);
    raf = displayed !== target ? requestAnimationFrame(animate) : 0;
  }
  function update() {
    target = clamp(-story.getBoundingClientRect().top / Math.max(1, story.offsetHeight - pin.offsetHeight));
    if (!raf) raf = requestAnimationFrame(animate);
  }
  addEventListener('scroll', update, {passive: true});
  addEventListener('resize', update);
  document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
    scrollTo({top: scrollY + story.getBoundingClientRect().top + (story.offsetHeight - pin.offsetHeight) * [.0608, .3268, .5396, .76][+button.dataset.step], behavior: reduced ? 'instant' : 'smooth'});
  }));
  update();
})();
