(function () {
  const main = document.getElementById("concepts");
  const toc = document.querySelector(".toc");

  const DEFS = `
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/>
      </marker>
      <marker id="arrow-alt" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill="var(--blue)"/>
      </marker>
    </defs>
  `;

  // ---- Render sections + nav from CONCEPTS (data.js) ----
  CONCEPTS.forEach((c, i) => {
    const idx = String(i + 1).padStart(2, "0");

    const tocLink = document.createElement("a");
    tocLink.href = `#${c.id}`;
    tocLink.textContent = c.title;
    toc.appendChild(tocLink);

    const section = document.createElement("section");
    section.className = "concept";
    section.id = c.id;
    section.innerHTML = `
      <div class="concept-head">
        <span class="concept-index">${idx}</span>
        <h2>${c.title}</h2>
      </div>
      <p class="concept-desc">${c.desc}</p>
      <div class="concept-grid">
        <div class="concept-text">
          <h3>Considerations</h3>
          <ul>${c.considerations.map((x) => `<li>${x}</li>`).join("")}</ul>
          <h3>Resources</h3>
          <ul class="resources">
            ${c.resources
              .map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.label}</a></li>`)
              .join("")}
          </ul>
        </div>
        <div class="visual-panel">
          <svg viewBox="0 0 320 160" data-concept="${c.id}">${DEFS}${c.svg}</svg>
          <button class="replay-btn" type="button" data-target="${c.id}">Replay ▸</button>
        </div>
      </div>
    `;
    main.appendChild(section);
  });

  // ---- Animation builders: id -> function(svg) -> gsap timeline (paused) ----
  const ANIMATORS = {
    repo(svg) {
      const files = svg.querySelectorAll("#repo-files rect");
      const box = svg.querySelector("#repo-box");
      const tl = gsap.timeline({ paused: true });
      tl.set(files, { x: 0, opacity: 1 })
        .set(box, { scale: 1, transformOrigin: "50% 50%" })
        .to(files, {
          x: 90,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.in"
        })
        .to(box, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: "power1.inOut" }, "-=0.2");
      return tl;
    },

    clone(svg) {
      const target = svg.querySelector("#clone-target");
      const packet = svg.querySelector("#clone-packet");
      const tl = gsap.timeline({ paused: true });
      tl.set(target, { opacity: 0, x: 0 })
        .set(packet, { x: 0, opacity: 1 })
        .to(packet, { x: 190, duration: 0.9, ease: "power1.inOut" })
        .to(target, { opacity: 1, duration: 0.4 }, "-=0.15")
        .to(packet, { opacity: 0, duration: 0.2 }, "-=0.1");
      return tl;
    },

    branch(svg) {
      const line = svg.querySelector("#branch-line");
      const point = svg.querySelector("#branch-point");
      const tl = gsap.timeline({ paused: true });
      tl.set(line, { opacity: 0 })
        .to(point, { scale: 1.4, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1 })
        .to(line, { opacity: 1, duration: 0.5 });
      return tl;
    },

    commit(svg) {
      const files = svg.querySelectorAll("#commit-files rect");
      const node = svg.querySelector("#commit-node");
      const label = svg.querySelector("#commit-label");
      const tl = gsap.timeline({ paused: true });
      tl.set(files, { x: 0, y: 0, opacity: 1 })
        .set(node, { attr: { r: 0 } })
        .set(label, { opacity: 0 })
        .to(files, { x: -70, y: 60, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.in" })
        .to(node, { attr: { r: 6 }, duration: 0.25, ease: "back.out(2)" }, "-=0.15")
        .to(label, { opacity: 1, duration: 0.3 });
      return tl;
    },

    "push-pull"(svg) {
      const push = svg.querySelector("#push-packet");
      const pull = svg.querySelector("#pull-packet");
      const tl = gsap.timeline({ paused: true });
      tl.set(push, { opacity: 0, x: 0 })
        .set(pull, { opacity: 0, x: 0 })
        .to(push, { opacity: 1, x: 70, duration: 0.6, ease: "power1.inOut" })
        .to(push, { opacity: 0, duration: 0.15 })
        .to(pull, { opacity: 1, x: -70, duration: 0.6, ease: "power1.inOut" })
        .to(pull, { opacity: 0, duration: 0.15 });
      return tl;
    },

    diff(svg) {
      const removed = svg.querySelector("#diff-removed");
      const added = svg.querySelector("#diff-added");
      const added2 = svg.querySelector("#diff-added2");
      const tl = gsap.timeline({ paused: true });
      tl.set([removed, added, added2], { opacity: 0 })
        .to(removed, { opacity: 1, duration: 0.35 })
        .to(added, { opacity: 1, duration: 0.35 }, "+=0.1")
        .to(added2, { opacity: 1, duration: 0.35 }, "+=0.1");
      return tl;
    },

    merge(svg) {
      const path = svg.querySelector("#merge-path");
      const node = svg.querySelector("#merge-node");
      const label = svg.querySelector("#merge-label");
      const tl = gsap.timeline({ paused: true });
      tl.set(path, { strokeDashoffset: 120 })
        .set(node, { attr: { r: 0 } })
        .set(label, { opacity: 0 })
        .to(path, { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" })
        .to(node, { attr: { r: 7 }, duration: 0.25, ease: "back.out(2)" }, "-=0.15")
        .to(label, { opacity: 1, duration: 0.3 });
      return tl;
    },

    rebase(svg) {
      const stem = svg.querySelector("#rebase-stem");
      const rb1 = svg.querySelector("#rb1"); // starts at (130,80), lands on main at (190,110)
      const rb2 = svg.querySelector("#rb2"); // starts at (180,60), lands on main at (240,110)
      const tl = gsap.timeline({ paused: true });
      tl.set([rb1, rb2], { x: 0, y: 0 })
        .to([rb1, rb2], { y: "-=20", duration: 0.3, stagger: 0.05, ease: "power1.out" })
        .to(stem, { opacity: 0, duration: 0.2 }, "<")
        .to(rb1, { x: 60, y: 30, duration: 0.5, ease: "power1.inOut" }, "+=0.05")
        .to(rb2, { x: 60, y: 50, duration: 0.5, ease: "power1.inOut" }, "<");
      return tl;
    },

    conflict(svg) {
      const a = svg.querySelector("#conflict-a");
      const b = svg.querySelector("#conflict-b");
      const bang = svg.querySelector("#conflict-bang");
      const box = svg.querySelector("#conflict-box");
      const text = svg.querySelector("#conflict-text");
      const resolved = svg.querySelector("#conflict-resolved");
      const tl = gsap.timeline({ paused: true });
      tl.set([a, b], { x: 0 })
        .set(bang, { opacity: 0, scale: 0, transformOrigin: "50% 50%" })
        .set([box, text], { opacity: 0 })
        .set(resolved, { attr: { r: 0 } })
        .to(a, { x: 40, duration: 0.4, ease: "power1.in" })
        .to(b, { x: -40, duration: 0.4, ease: "power1.in" }, "<")
        .to(bang, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(3)" })
        .to([box, text], { opacity: 1, duration: 0.3 }, "+=0.1")
        .to([a, b], { opacity: 0, duration: 0.25 }, "+=0.3")
        .to(bang, { opacity: 0, duration: 0.2 }, "<")
        .to(resolved, { attr: { r: 8 }, duration: 0.25, ease: "back.out(2)" }, "-=0.1");
      return tl;
    },

    pr(svg) {
      const card = svg.querySelector("#pr-card");
      const check = svg.querySelector("#pr-check");
      const arrow = svg.querySelector("#pr-merge-arrow");
      const tl = gsap.timeline({ paused: true });
      tl.set(card, { opacity: 0, y: 10 })
        .set(check, { opacity: 0 })
        .set(arrow, { strokeDashoffset: 115 })
        .to(card, { opacity: 1, y: 0, duration: 0.4 })
        .to(check, { opacity: 1, duration: 0.3 }, "+=0.2")
        .to(arrow, { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" }, "+=0.1");
      return tl;
    },

    issue(svg) {
      const labels = svg.querySelector("#issue-labels");
      const closed = svg.querySelector("#issue-closed");
      const card = svg.querySelector("#issue-card");
      const tl = gsap.timeline({ paused: true });
      tl.set(labels, { opacity: 0 })
        .set(closed, { opacity: 0 })
        .to(labels, { opacity: 1, duration: 0.35 })
        .to(card, { attr: { stroke: "var(--green)" }, duration: 0.3 }, "+=0.3")
        .to(closed, { opacity: 1, duration: 0.35 }, "-=0.1");
      return tl;
    }
  };

  // ---- Wire up: build timeline per svg, play on scroll-into-view, replay on click ----
  const timelines = {};

  CONCEPTS.forEach((c) => {
    const svg = document.querySelector(`svg[data-concept="${c.id}"]`);
    const build = ANIMATORS[c.id];
    if (!svg || !build) return;
    timelines[c.id] = build(svg);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.concept;
          const tl = timelines[id];
          if (tl) tl.restart();
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll("svg[data-concept]").forEach((svg) => io.observe(svg));

  document.querySelectorAll(".replay-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tl = timelines[btn.dataset.target];
      if (tl) tl.restart();
    });
  });
})();
