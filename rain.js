(function(){
"use strict";
const COLOR_CACHE = new Map();
function parseColor(input, fallback) {
    if (typeof input !== "string")
        return fallback;
    let hit = COLOR_CACHE.get(input);
    if (hit === undefined) {
        hit = parseColorRaw(input);
        COLOR_CACHE.set(input, hit);
    }
    return hit !== null && hit !== void 0 ? hit : fallback;
}
function parseColorRaw(raw) {
    let s = raw.trim();
    const v = /^var\(\s*--[^,]+,\s*(.+)\)$/.exec(s);
    if (v)
        s = v[1].trim();
    if (s[0] === "#") {
        const h = s.slice(1);
        const x = (a) => parseInt(a, 16);
        let r, g, b, a = 255;
        if (h.length === 3 || h.length === 4) {
            r = x(h[0] + h[0]);
            g = x(h[1] + h[1]);
            b = x(h[2] + h[2]);
            if (h.length === 4)
                a = x(h[3] + h[3]);
        }
        else if (h.length === 6 || h.length === 8) {
            r = x(h.slice(0, 2));
            g = x(h.slice(2, 4));
            b = x(h.slice(4, 6));
            if (h.length === 8)
                a = x(h.slice(6, 8));
        }
        else
            return null;
        const out = [r / 255, g / 255, b / 255, a / 255];
        return out.every(Number.isFinite) ? out : null;
    }
    const m = /^(rgba?|hsla?)\(([^)]*)\)$/i.exec(s);
    if (!m)
        return null;
    const parts = m[2].split(/[\s,/]+/).filter(Boolean);
    if (parts.length < 3)
        return null;
    const num = (p, scale) => (p.endsWith("%") ? (parseFloat(p) / 100) * scale : parseFloat(p));
    const alpha = parts.length > 3 ? num(parts[3], 1) : 1;
    let rgb;
    if (m[1].toLowerCase().startsWith("rgb")) {
        rgb = [num(parts[0], 255) / 255, num(parts[1], 255) / 255, num(parts[2], 255) / 255];
    }
    else {
        const hh = (((parseFloat(parts[0]) % 360) + 360) % 360) / 360;
        const ss = num(parts[1], 1), ll = num(parts[2], 1);
        const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
        const p = 2 * ll - q;
        const f = (t) => {
            t = (t + 1) % 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        rgb = [f(hh + 1 / 3), f(hh), f(hh - 1 / 3)];
    }
    const out = [rgb[0], rgb[1], rgb[2], alpha];
    return out.every(Number.isFinite) ? out.map((c) => Math.min(1, Math.max(0, c))) : null;
}
function num(v, d) {
    return typeof v === "number" && Number.isFinite(v) ? v : d;
}
function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
}
/** Tuning values: the original's tuned numbers, unchanged. */
const ADVANCED_DEFAULTS = {
    laneCount: 10,
    lineFill: 23,
    dashCell: 175,
    dashMin: 25,
    dashMax: 100,
    fallSpeed: 214,
    laneJitter: 25,
    twinkleRate: 48,
    twinkleMin: 55,
    bandWidth: 28,
    bandGlow: 33,
    fringe: 35,
    endCenter: 80,
    endSide: 66,
    endJitter: 6,
    edgeBright: 60,
    glow: 20,
    tipColor: "#FFFFFF",
    cyanColor: "#FFFFFF",
    cyanShare: 18,
    hazeColor: "#000000",
    hazeDepth: 60,
    rimColor: "#000000",
    rimY: 18,
    rimCurve: 2,
    rimStrength: 55,
    seed: 0,
    grain: 0,
    vignette: 6,
    hover: 50,
};
/** Main-panel defaults: the values the original shipped on its panel. */
const DEFAULTS = {
    background: "#07070F",
    density: 100,
    bandPosition: 0,
    scale: 10,
    baseColor: "#FFFFFF",
    accentColor: "#EEE4F8",
    zoom: 100,
    hover: 50,
    wind: 5,
    downpour: 5,
    tap: 50,
    tapEffect: "lightning",
    speed: 41,
};
/** Placement: where the curtain sits in its frame and how it is turned. */
const DEFAULT_PLACEMENT = { x: 0, y: 0, angle: 0, tilt: 0 };
/** The frame the composition was designed in (the intrinsic size below). */
const REF_ASPECT = 1200 / 800;
const MAX_DPR = 2;
/** Drawn-pixel cap: soft 1–2 px streaks look the same at ~1.5 device px per CSS px. */
const MAX_PIXELS = 2.2e6;
/** Resolution steps taken when the GPU runs long, and won back once it is quick. */
const LADDER = [1, 0.85, 0.72, 0.6];
/** The clocks wrap after an hour, as the original's did; per-lane speeds share no shorter period. */
const TIME_WRAP = 3600;
/** Wind: lean per (composition height per second) of pointer sweep at Wind 10, and its cap. */
const WIND_GAIN = 0.17;
const LEAN_MAX = 0.5;
/** Wind spring: ~1.1 Hz, underdamped so the curtain sways once past upright as it settles. */
const LEAN_W = 7;
const LEAN_Z = 0.45;
/** Downpour at full press and Downpour 5: fall-rate multiplier, and a floor so it pours at Speed 0 too. */
const POUR_FALL = 1.6;
const POUR_FLOOR = 0.35;
/** A press bursts in quickly and lets go slowly, like a squall passing. */
const POUR_IN = 0.22;
const POUR_OUT = 0.8;
/** Tap splashes: rings alive at once, and how long one lasts (s; RIP_LIFE in the shader). */
const TAP_SLOTS = 4;
const TAP_LIFE = 1.6;
/*
 * Lanes are fixed columns in the curtain's own (world) space: S units with the
 * origin at the composition's centre, y down, the reference frame spanning x ±0.75
 * and y ±0.5. Every lookup — the pixel and the pointer — goes through worldOf(), so
 * Placement, Scale and the frame's containment invert in one place.
 */
const FRAG = `#version 300 es
precision highp float;
precision highp int;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uSpx;
uniform vec4 uPlace;
uniform float uPxCss;
uniform float uGrainPx;
uniform float uTime;
uniform float uFallT;
uniform vec2 uMouse;
uniform float uHover;
uniform float uLean;
uniform float uPour;
uniform vec4 uTaps[4];
uniform vec3 uBg;
uniform vec3 uBase;
uniform vec3 uAccent;
uniform float uSc;
uniform float uDensity;
uniform float uBandY;
uniform float uPitch;
uniform float uLineW;
uniform float uCell;
uniform float uDashMin;
uniform float uDashMax;
uniform float uFall;
uniform float uJit;
uniform float uTwRate;
uniform float uTwMin;
uniform float uBandW;
uniform float uBandGlow;
uniform float uFringe;
uniform float uEndCenter;
uniform float uEndSide;
uniform float uEndJit;
uniform float uEdge;
uniform float uGlow;
uniform vec3 uTip;
uniform vec3 uCyan;
uniform float uCyanShare;
uniform vec3 uHazeC;
uniform float uHazeDepth;
uniform vec3 uRimC;
uniform float uRimY;
uniform float uRimCurve;
uniform float uRimAmt;
uniform float uSeed;
uniform float uGrain;
uniform float uVig;
uniform float uHoverAmt;
uniform float uTapMode;
out vec4 outColor;

// Tilt perspective: the eye sits this many composition heights in front of the curtain.
const float PERSP = 2.2;
const float REF_HALF_W = 0.75;
// The original re-rolled each dash's twinkle uTwRate times a second; it now eases
// between levels at a sixth of that, so 48 reads as a soft glimmer rather than static.
const float TW_SCALE = 0.1667;
// Width, in probability, of a dash's fade as the envelope thins under it. The
// original switched it with step(), so a falling dash vanished at a hard line.
const float FADE = 0.06;
// Downpour, per unit of uPour: extra dash probability, stretch, brightness, bar flare.
const float POUR_DENS = 0.22;
const float POUR_STRETCH = 0.6;
const float POUR_BRIGHT = 0.45;
const float POUR_BAND = 0.9;
// Hover: radius of the parted pocket, in composition heights.
const float PART_R = 0.14;
// Tap splash: lifetime (s, TAP_LIFE on the CPU), how far the ring travels, how hard it shoves.
const float RIP_LIFE = 1.6;
const float RIP_REACH = 0.85;
const float RIP_PUSH = 0.012;
// Tap lightning: half-width of the struck strands, how fast the charge runs down
// (composition heights/s), how fast it dies, and its flicker (rad/s, ~9 Hz).
const float BOLT_W = 0.03;
const float BOLT_RUN = 5.0;
const float BOLT_DECAY = 6.0;
const float BOLT_FLICK = 55.0;

uint hu(uint x) {
    x ^= x >> 16u; x *= 0x7feb352du;
    x ^= x >> 15u; x *= 0x846ca68bu;
    x ^= x >> 16u;
    return x;
}
// One mixing round over odd-multiplier-spread inputs (the original ran three).
float hf(float a, float b, float c) {
    uint h = uint(int(a)) * 0x8da6b343u ^ uint(int(b)) * 0xd8163841u ^ uint(int(c)) * 0xcb1ab31fu ^ uint(uSeed) * 0x9e3779b9u;
    return float(hu(h)) * (1.0 / 4294967295.0);
}

// Frame (buffer px, GL y up) → world. Inverts the offset, then Tilt, then Angle.
vec2 worldOf(vec2 frag, out bool ok) {
    vec2 p = vec2(frag.x - uCenter.x, uCenter.y - frag.y);
    float D = PERSP * uSpx;
    float den = D * uPlace.z + p.y * uPlace.w;
    ok = den > 1e-3 * D;
    float v = p.y * D / max(den, 1e-3 * D);
    float u = p.x * (D - v * uPlace.w) / D;
    vec2 q = vec2(u * uPlace.x + v * uPlace.y, -u * uPlace.y + v * uPlace.x);
    return q / uSpx;
}

// Share of a pixel footprint [f - a/2, f + a/2] that falls inside [s0, s1].
float cover(float f, float a, float s0, float s1) {
    return clamp((min(f + 0.5 * a, s1) - max(f - 0.5 * a, s0)) / a, 0.0, 1.0);
}

void main() {
    bool ok;
    vec2 w = worldOf(gl_FragCoord.xy, ok);
    // World size of one buffer pixel, perspective included; taken before any branch.
    float pw = max(max(length(dFdx(w)), length(dFdy(w))), 1e-6);
    vec2 fuv = gl_FragCoord.xy / max(uRes, vec2(1.0));
    // The top lip stays on the frame, so a tall frame's sky fills with fringe rain.
    float fy = 1.0 - fuv.y;
    float env = 0.0;
    float band = 0.0;
    vec3 col = uBg;

    if (ok) {
        float y = w.y + 0.5;
        float xn = clamp(w.x / REF_HALF_W, -1.0, 1.0);
        float bY = uBandY;
        float sc = max(uSc, 0.05);

        // Pointer: the rain parts around it like a hand held in the curtain. Lanes
        // bend aside (sampled toward the pointer, kept monotonic so none fold), the
        // core is sheltered, and drops light up on the rim where they bend.
        bool mok;
        vec2 dm = w - worldOf(uMouse, mok);
        float hk = mok ? uHover * uHoverAmt : 0.0;
        float g = exp(-dot(dm, dm) / (PART_R * PART_R));
        float part = dm.x * g * min(0.45 * hk, 0.9);
        float shelter = g * g * min(hk, 1.0);
        float near = hk * 4.0 * g * (1.0 - g);

        // Taps: each sends a splash ring out from where it landed, shoving the lanes
        // aside as it passes and lighting the drops on its front.
        float push = 0.0;
        float splash = 0.0;
        if (uTapMode < 0.5) {
            for (int i = 0; i < 4; i++) {
                vec4 T = uTaps[i];
                if (T.w <= 0.0) continue;
                bool tok;
                vec2 dv = w - worldOf(T.xy, tok);
                if (!tok) continue;
                float r = length(dv);
                float life = clamp(T.z / RIP_LIFE, 0.0, 1.0);
                float k = 1.0 - life;
                float R = RIP_REACH * (1.0 - k * k * k);
                float wd = 0.03 + 0.08 * life;
                float z = (r - R) / wd;
                float ring = exp(-z * z) * k * k;
                push += dv.x / max(r, 1e-3) * ring * min(T.w, 1.0);
                splash += T.w * (ring + exp(-r * r * 300.0) * exp(-T.z * 6.0));
            }
        }

        // Wind leans the lanes about the bar, so the curtain swings from it.
        float sx = w.x - part - push * RIP_PUSH - uLean * (y - bY);
        float P = sc * uPitch;
        float lane = floor(sx / P);
        float cx = (lane + 0.5 + (hf(lane, 3.0, 7.0) - 0.5) * 0.3) * P;
        float d = abs(sx - cx) * inversesqrt(1.0 + uLean * uLean);
        float hw = max(0.6 * pw * uPxCss, P * uLineW * 0.5);
        float shape = exp(-(d * d) / (hw * hw)) + uGlow * 0.5 * exp(-d / max(P * 0.4, 1e-6));

        // Brightness envelope, fixed to the composition; past its sides it carries on flat.
        float laneX = clamp(cx / (2.0 * REF_HALF_W) + 0.5, 0.0, 1.0);
        float xl = laneX * 2.0 - 1.0;
        float endY = mix(uEndSide, uEndCenter, 1.0 - xl * xl) + (hf(lane, 11.0, 5.0) - 0.5) * 2.0 * uEndJit;
        endY = max(endY, bY + 0.05);
        float top = smoothstep(0.01, 0.06, fy);
        float up = top * mix(uFringe, 1.0, smoothstep(bY - 0.12, bY, y));
        float t = clamp((y - bY) / (endY - bY), 0.0, 1.0);
        float down = pow(1.0 - t, 1.4);
        env = y < bY ? up : down;
        band = exp(-pow((y - bY) / max(uBandW, 1e-3), 2.0));
        float sideF = mix(uEdge, 1.0, 1.0 - pow(abs(xl), 4.0));

        // Lightning: each tap strikes the strands nearest it. The charge runs from
        // the bar to just past the hem in about 0.17 s, flickers twice as it dies,
        // and the bar and the whole curtain flash with it, most near the strike.
        float strike = 0.0;
        float flash = 0.0;
        if (uTapMode > 0.5) {
            for (int i = 0; i < 4; i++) {
                vec4 T = uTaps[i];
                if (T.w <= 0.0) continue;
                bool tok;
                vec2 tw = worldOf(T.xy, tok);
                if (!tok) continue;
                float a = T.z;
                float fl = exp(-a * BOLT_DECAY) * (0.6 + 0.4 * cos(a * BOLT_FLICK));
                float lx = (cx - tw.x) / BOLT_W;
                // Not every strand in reach takes the charge, so the strike reads ragged.
                float takes = step(hf(lane, 71.0, float(i) + floor(T.x)), 0.75);
                float front = bY - 0.06 + a * BOLT_RUN;
                float mask = (1.0 - smoothstep(front - 0.04, front, y)) * smoothstep(bY - 0.08, bY - 0.03, y) * (1.0 - smoothstep(endY, endY + 0.08, y));
                strike = max(strike, exp(-lx * lx) * takes * mask * fl * min(T.w, 1.5));
                flash += T.w * fl * (0.35 + exp(-abs(w.x - tw.x) * 5.0));
            }
        }


        // Long dashes falling down each lane at a slow per-lane speed.
        float cellH = max(uCell * sc * mix(0.75, 1.3, hf(lane, 19.0, 4.0)), 1e-5);
        float v = uFall * (1.0 + (hf(lane, 13.0, 1.0) * 2.0 - 1.0) * uJit);
        float yy = y - uFallT * v + hf(lane, 17.0, 9.0) * 10.0;
        float cy = yy / cellH;
        float cl = floor(cy);
        float fr = cy - cl;
        float dens = 0.4 + uDensity;
        float pOn = clamp((0.12 + 0.88 * pow(env, 0.55)) * dens + near * 0.3 + splash * 0.35 - shelter * 0.3 + uPour * POUR_DENS, 0.0, 0.98);
        float on = smoothstep(-FADE, FADE, pOn - hf(lane, cl, 21.0));
        float len = min(1.0, mix(uDashMin, uDashMax, hf(lane, cl, 23.0)) * mix(0.45, 1.0, env) * (1.0 + uPour * POUR_STRETCH));
        float st = hf(lane, cl, 29.0) * max(1.0 - len, 0.0);
        float lit = on * cover(fr, pw / cellH, st, st + len);

        // Fine sparkle in the fringe above the band.
        float cellS = max(cellH * 0.22, 1e-5);
        float cs = (y - uFallT * v * 0.6 + hf(lane, 53.0, 3.0) * 10.0) / cellS;
        float cf = floor(cs);
        float spk = step(hf(lane, cf, 57.0), 0.55 * dens) * cover(cs - cf, pw / cellS, 0.05, 0.95);
        float headMix = 1.0 - smoothstep(bY - 0.09, bY - 0.02, y);
        lit = mix(lit, max(lit * 0.5, spk), headMix);

        // Twinkle: smooth value noise in time per dash, not a re-roll every step.
        float ft = uTime * uTwRate * TW_SCALE + hf(lane, cl, 33.0) * 8.0;
        float fi = floor(ft);
        float ff = ft - fi;
        ff = ff * ff * (3.0 - 2.0 * ff);
        float tw = mix(uTwMin, 1.0, mix(hf(lane, cl, fi + 31.0), hf(lane, cl, fi + 32.0), ff));

        float cb = mix(0.5, 1.0, hf(lane, cl, 43.0));
        float lb = mix(0.6, 1.0, hf(lane, 37.0, 2.0));
        float bright = lit * shape * lb * cb * tw * (0.2 + env) * (1.0 + band * 0.8) * sideF * (1.0 + near * 0.9 + splash * 1.6 + flash * 1.2) * (1.0 - 0.75 * shelter) * (1.0 + uPour * POUR_BRIGHT);

        vec3 dc = mix(uTip, uBase, smoothstep(0.08, 0.55, env));
        dc = mix(dc, uAccent, clamp(band * 0.95 + smoothstep(0.75, 1.0, env) * 0.25, 0.0, 1.0));
        float cyan = step(hf(lane, cl, 41.0), uCyanShare) * (1.0 - band);
        dc = mix(dc, uCyan, cyan * 0.55);

        // Background haze, grey rim shelf at the sides, band glow.
        float hz = smoothstep(0.0, 0.08, fy) * (y < bY ? 1.0 : 1.0 - smoothstep(bY, max(uHazeDepth, bY + 0.01), y));
        col = mix(uBg, uHazeC, hz * 0.9 * mix(0.75, 1.0, 1.0 - xn * xn));
        float rimY = uRimY + uRimCurve * xn * xn;
        float rim = exp(-pow((y - rimY) / 0.04, 2.0)) * mix(0.3, 1.0, xn * xn);
        col += uRimC * rim * uRimAmt;
        col += uAccent * band * uBandGlow * 0.35 * sideF * (1.0 + uPour * POUR_BAND);
        col += dc * bright;
        col += uAccent * (hk * g * 0.035 + splash * 0.05 + flash * 0.03) * (0.3 + env);
        col += uAccent * band * uBandGlow * flash * 0.8;
        col += mix(uTip, uAccent, 0.3) * shape * strike * 1.4;
    }

    // Vignette and grain stay on the frame. Grain cells are whole buffer px, ~1 CSS px.
    float vd = length((fuv - 0.5) * 2.0) / 1.4142;
    col *= 1.0 - uVig * smoothstep(0.35, 1.0, vd);
    vec2 gp = floor(gl_FragCoord.xy / uGrainPx);
    float g = hf(gp.x, gp.y, floor(uTime * 24.0) + 51.0) - 0.5;
    col += g * uGrain * 0.12 * (0.4 + 0.6 * clamp(env + band, 0.0, 1.0));

    outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;
const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;
/** Every uniform set from props: uploaded together on a prop change or resize, never per frame. */
const PROP_UNIFORMS = [
    "uRes", "uCenter", "uSpx", "uPlace", "uPxCss", "uGrainPx", "uBg", "uBase", "uAccent", "uSc",
    "uDensity", "uBandY", "uPitch", "uLineW", "uCell", "uDashMin", "uDashMax", "uFall", "uJit",
    "uTwRate", "uTwMin", "uBandW", "uBandGlow", "uFringe", "uEndCenter", "uEndSide", "uEndJit",
    "uEdge", "uGlow", "uTip", "uCyan", "uCyanShare", "uHazeC", "uHazeDepth", "uRimC", "uRimY",
    "uRimCurve", "uRimAmt", "uSeed", "uGrain", "uVig", "uHoverAmt", "uTapMode",
];
/** The few that move every frame. */
const FRAME_UNIFORMS = ["uTime", "uFallT", "uMouse", "uHover", "uLean", "uPour", "uTaps"];
function buildGL(gl) {
    const sh = (type, src) => {
        const s = gl.createShader(type);
        if (!s)
            return null;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            if (!gl.isContextLost())
                console.error("ArgentCloudburst shader:", gl.getShaderInfoLog(s));
            gl.deleteShader(s);
            return null;
        }
        return s;
    };
    const vs = sh(gl.VERTEX_SHADER, VERT);
    const fs = sh(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog)
        return null;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, "aPos");
    gl.linkProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        if (!gl.isContextLost())
            console.error("ArgentCloudburst link:", gl.getProgramInfoLog(prog));
        return null;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const u = {};
    for (const n of PROP_UNIFORMS)
        u[n] = gl.getUniformLocation(prog, n);
    for (const n of FRAME_UNIFORMS)
        u[n] = gl.getUniformLocation(prog, n);
    return {
        gl,
        prog,
        u,
        timer: gl.getExtension("EXT_disjoint_timer_query_webgl2"),
        pending: [],
    };
}
/** Median of the first n values, sorted in a reused scratch array (no allocation). */
function median(src, n, scratch) {
    for (let i = 0; i < n; i++) {
        const v = src[i];
        let j = i - 1;
        while (j >= 0 && scratch[j] > v) {
            scratch[j + 1] = scratch[j];
            j--;
        }
        scratch[j + 1] = v;
    }
    return scratch[n >> 1];
}
function mountRain(root, canvas, evt, userProps) {
    var _a, _b;
    const props = Object.assign({}, DEFAULTS, userProps);
    const merged = { current: { adv: { ...ADVANCED_DEFAULTS, ...((_a = props.advanced) !== null && _a !== void 0 ? _a : {}) }, place: { ...DEFAULT_PLACEMENT, ...((_b = props.placement) !== null && _b !== void 0 ? _b : {}) } } };
    const propsRef = { current: props };
    const wakeRef = { current: null };
    const reduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionK = reduced ? 0.25 : 1;
    // Frame and buffer.
    let W = 0;
    let H = 0;
    let shown = 1;
    let level = 0;
    let dirty = true;
    let rate = 0;
    let clock = 0;
    let fallT = 0;
    // Composition height (S × Scale) in CSS px, and the content's angle, for the wind.
    let Sz = 1;
    let angC = 1;
    let angS = 0;
    // Pointer, as a 0..1 share of the frame (v runs down).
    let cx = 0;
    let cy = 0;
    let moved = false;
    let scrolled = false;
    let inside = false;
    let held = false;
    let tu = 0.5;
    let tv = 0.5;
    let mx = 0.5;
    let my = 0.5;
    let hov = 0;
    // Wind: last pointer sample, smoothed sweep speed, lean and its velocity.
    let pu = 0.5;
    let pv = 0.5;
    let hadPrev = false;
    let gust = 0;
    let lean = 0;
    let leanV = 0;
    let pour = 0;
    // Tap splashes, per slot: u, v (0..1 of the frame), age (s), strength (0 = free).
    const taps = new Float64Array(TAP_SLOTS * 4);
    const tapBuf = new Float32Array(TAP_SLOTS * 4);
    let tapNext = 0;
    let tapDirty = true;
    let tapAlive = false;
    // Last uploaded per-frame uniforms, so unchanged ones are skipped.
    let lTime = NaN;
    let lFall = NaN;
    let lMx = NaN;
    let lMy = NaN;
    let lHov = NaN;
    let lLean = NaN;
    let lPour = NaN;
    // Pacing and quality.
    const gaps = new Float64Array(15);
    const draws = new Float64Array(9);
    const costs = new Float64Array(9);
    const scratch = new Float64Array(15);
    let gapN = 0;
    let drawN = 0;
    let costN = 0;
    let period = 1000 / 60;
    let basePeriod = 1000;
    let tick = 0;
    let lastTick = -1;
    let lastDraw = -1;
    let drawn = 0;
    let slowSince = -1;
    let fastSince = -1;
    let lastRaise = -1e9;
    let bannedUntil = 0;
    let running = false;
    let visible = true;
    let raf = 0;
    let G = null;
    const init = () => {
        const gl = canvas.getContext("webgl2", {
            alpha: false,
            antialias: false,
            depth: false,
            stencil: false,
            powerPreference: "low-power",
            preserveDrawingBuffer: false,
        });
        G = gl && !gl.isContextLost() ? buildGL(gl) : null;
        // Without WebGL the root's Background shows through instead of a black canvas.
        canvas.style.visibility = G ? "visible" : "hidden";
        lTime = lFall = lMx = lMy = lHov = lLean = lPour = NaN;
        tapDirty = true;
        dirty = true;
    };
    const sizeCanvas = () => {
        if (!G || W <= 0 || H <= 0)
            return;
        // Never fewer buffer pixels than the layout box, even when shown shrunk.
        const dpr = Math.min(MAX_DPR, (window.devicePixelRatio || 1) * clamp(shown, 1, 2));
        let k = dpr * LADDER[level];
        const px = W * H * k * k;
        if (px > MAX_PIXELS)
            k *= Math.sqrt(MAX_PIXELS / px);
        k = Math.max(1, k);
        const bw = Math.max(1, Math.round(W * k));
        const bh = Math.max(1, Math.round(H * k));
        if (canvas.width !== bw || canvas.height !== bh) {
            canvas.width = bw;
            canvas.height = bh;
        }
        G.gl.viewport(0, 0, bw, bh);
        dirty = true;
        // Setting the size wiped the buffer: redraw now, not on the next paced tick.
        if (running) {
            applyProps(G);
            dirty = false;
            draw(G);
        }
    };
    /** Props → uniforms. Runs on a prop change or resize, never per frame. */
    const applyProps = (g) => {
        const p = propsRef.current;
        const { adv, place } = merged.current;
        const gl = g.gl;
        const u = g.u;
        const f = (n, v) => gl.uniform1f(u[n], v);
        const c3 = (n, v, d) => {
            const c = parseColor(typeof v === "string" ? v : d, [0, 0, 0, 1]);
            gl.uniform3f(u[n], c[0], c[1], c[2]);
        };
        rate = (clamp(num(p.speed, DEFAULTS.speed), 0, 100) / 50) * motionK;
        const bw = canvas.width;
        const bh = canvas.height;
        gl.useProgram(g.prog);
        gl.uniform2f(u.uRes, bw, bh);
        c3("uBg", p.background, DEFAULTS.background);
        c3("uBase", p.baseColor, DEFAULTS.baseColor);
        c3("uAccent", p.accentColor, DEFAULTS.accentColor);
        // Contain: S follows the width once the frame is narrower than 1200×800.
        const S = Math.min(bh, bw / REF_ASPECT);
        const z = clamp(num(p.zoom, DEFAULTS.zoom), 30, 100) / 100;
        f("uSpx", S * z);
        Sz = Math.max(1, Math.min(H, W / REF_ASPECT) * z);
        const ox = (clamp(num(place.x, 0), -50, 50) / 100) * bw;
        const oy = (clamp(num(place.y, 0), -50, 50) / 100) * bh;
        // GL y runs up; Y Offset positive moves the curtain down.
        gl.uniform2f(u.uCenter, bw / 2 + ox, bh / 2 - oy);
        const a = (clamp(num(place.angle, 0), -180, 180) * Math.PI) / 180;
        const t = (clamp(num(place.tilt, 0), -80, 80) * Math.PI) / 180;
        angC = Math.cos(a);
        angS = Math.sin(a);
        gl.uniform4f(u.uPlace, angC, angS, Math.cos(t), Math.sin(t));
        const pxCss = W > 0 ? bw / W : 1;
        f("uPxCss", pxCss);
        f("uGrainPx", Math.max(1, Math.round(pxCss)));
        // Streak size is fixed at the shipped 10% (its control was removed); Columns and Dash Cell tune it.
        f("uSc", DEFAULTS.scale / 100);
        f("uDensity", clamp(num(p.density, DEFAULTS.density), 0, 100) / 100);
        // 0 puts the bar on the composition's top edge, its glow half above it.
        f("uBandY", clamp(num(p.bandPosition, DEFAULTS.bandPosition), 0, 80) / 100);
        // Lanes per composition height at Streak Size 100% (the original counted per frame height).
        f("uPitch", 1 / clamp(num(adv.laneCount, ADVANCED_DEFAULTS.laneCount), 10, 400));
        f("uLineW", clamp(num(adv.lineFill, ADVANCED_DEFAULTS.lineFill), 5, 90) / 100);
        f("uCell", clamp(num(adv.dashCell, ADVANCED_DEFAULTS.dashCell), 2, 200) / 1000);
        const dMin = clamp(num(adv.dashMin, ADVANCED_DEFAULTS.dashMin), 1, 100) / 100;
        f("uDashMin", dMin);
        f("uDashMax", Math.max(dMin, clamp(num(adv.dashMax, ADVANCED_DEFAULTS.dashMax), 1, 100) / 100));
        // The original's fall rate, in composition heights per second at Speed 50.
        f("uFall", (0.092 * clamp(num(adv.fallSpeed, ADVANCED_DEFAULTS.fallSpeed), 0, 500)) / 100);
        f("uJit", clamp(num(adv.laneJitter, ADVANCED_DEFAULTS.laneJitter), 0, 100) / 100);
        f("uTwRate", clamp(num(adv.twinkleRate, ADVANCED_DEFAULTS.twinkleRate), 0, 120));
        f("uTwMin", clamp(num(adv.twinkleMin, ADVANCED_DEFAULTS.twinkleMin), 0, 100) / 100);
        f("uBandW", Math.max(0.005, clamp(num(adv.bandWidth, ADVANCED_DEFAULTS.bandWidth), 1, 50) / 100));
        f("uBandGlow", clamp(num(adv.bandGlow, ADVANCED_DEFAULTS.bandGlow), 0, 100) / 100);
        f("uFringe", clamp(num(adv.fringe, ADVANCED_DEFAULTS.fringe), 0, 100) / 100);
        f("uEndCenter", clamp(num(adv.endCenter, ADVANCED_DEFAULTS.endCenter), 5, 100) / 100);
        f("uEndSide", clamp(num(adv.endSide, ADVANCED_DEFAULTS.endSide), 5, 100) / 100);
        f("uEndJit", clamp(num(adv.endJitter, ADVANCED_DEFAULTS.endJitter), 0, 50) / 100);
        f("uEdge", clamp(num(adv.edgeBright, ADVANCED_DEFAULTS.edgeBright), 0, 100) / 100);
        f("uGlow", clamp(num(adv.glow, ADVANCED_DEFAULTS.glow), 0, 100) / 100);
        c3("uTip", adv.tipColor, ADVANCED_DEFAULTS.tipColor);
        c3("uCyan", adv.cyanColor, ADVANCED_DEFAULTS.cyanColor);
        f("uCyanShare", clamp(num(adv.cyanShare, ADVANCED_DEFAULTS.cyanShare), 0, 100) / 100);
        c3("uHazeC", adv.hazeColor, ADVANCED_DEFAULTS.hazeColor);
        f("uHazeDepth", clamp(num(adv.hazeDepth, ADVANCED_DEFAULTS.hazeDepth), 5, 100) / 100);
        c3("uRimC", adv.rimColor, ADVANCED_DEFAULTS.rimColor);
        f("uRimY", clamp(num(adv.rimY, ADVANCED_DEFAULTS.rimY), 0, 100) / 100);
        f("uRimCurve", clamp(num(adv.rimCurve, ADVANCED_DEFAULTS.rimCurve), 0, 50) / 100);
        f("uRimAmt", clamp(num(adv.rimStrength, ADVANCED_DEFAULTS.rimStrength), 0, 100) / 100);
        f("uSeed", Math.round(clamp(num(adv.seed, ADVANCED_DEFAULTS.seed), 0, 9999)));
        f("uGrain", clamp(num(adv.grain, ADVANCED_DEFAULTS.grain), 0, 100) / 100);
        f("uVig", clamp(num(adv.vignette, ADVANCED_DEFAULTS.vignette), 0, 100) / 100);
        // The top-level Hover row, as the builder moved it out of Advanced.
        f("uHoverAmt", clamp(num(adv.hover, DEFAULTS.hover), 0, 100) / 50);
        f("uTapMode", p.tapEffect === "splash" ? 0 : 1);
    };
    const draw = (g) => {
        const gl = g.gl;
        const ext = g.timer;
        const u = g.u;
        if (ext) {
            // Collect finished GPU timings (a few frames late, never stalling).
            while (g.pending.length) {
                const q = g.pending[0];
                if (!gl.getQueryParameter(q, gl.QUERY_RESULT_AVAILABLE))
                    break;
                const okT = !gl.getParameter(ext.GPU_DISJOINT_EXT);
                const ns = gl.getQueryParameter(q, gl.QUERY_RESULT);
                gl.deleteQuery(q);
                g.pending.shift();
                if (okT)
                    costs[costN++ % costs.length] = ns / 1e6;
            }
        }
        let q = null;
        if (ext && g.pending.length < 4) {
            q = gl.createQuery();
            if (q)
                gl.beginQuery(ext.TIME_ELAPSED_EXT, q);
        }
        const mxb = mx * canvas.width;
        const myb = (1 - my) * canvas.height;
        if (clock !== lTime)
            gl.uniform1f(u.uTime, (lTime = clock));
        if (fallT !== lFall)
            gl.uniform1f(u.uFallT, (lFall = fallT));
        if (mxb !== lMx || myb !== lMy)
            gl.uniform2f(u.uMouse, (lMx = mxb), (lMy = myb));
        if (hov !== lHov)
            gl.uniform1f(u.uHover, (lHov = hov));
        if (lean !== lLean)
            gl.uniform1f(u.uLean, (lLean = lean));
        const pourAmt = pour * (clamp(num(propsRef.current.downpour, DEFAULTS.downpour), 0, 10) / 5);
        if (pourAmt !== lPour)
            gl.uniform1f(u.uPour, (lPour = pourAmt));
        if (tapDirty || tapAlive) {
            const bw = canvas.width;
            const bh = canvas.height;
            for (let i = 0; i < TAP_SLOTS; i++) {
                const o = i * 4;
                tapBuf[o] = taps[o] * bw;
                tapBuf[o + 1] = (1 - taps[o + 1]) * bh;
                tapBuf[o + 2] = taps[o + 2];
                tapBuf[o + 3] = taps[o + 3];
            }
            gl.uniform4fv(u.uTaps, tapBuf);
            tapDirty = false;
        }
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (q && ext) {
            gl.endQuery(ext.TIME_ELAPSED_EXT);
            g.pending.push(q);
        }
        drawn++;
    };
    /**
     * Step resolution on measured GPU time, or without the timer on draws
     * arriving late against the display's own period. Drops after 0.5 s
     * slow, wins back after 2.5 s quick, and a level that had to be dropped
     * again right after a raise stays down for 20 s (no ping-pong).
     */
    const adapt = (now, interval) => {
        if (!G || drawn < 30)
            return;
        let slow = false;
        let fast = false;
        if (G.timer) {
            if (costN < costs.length)
                return;
            const med = median(costs, costs.length, scratch);
            slow = med > 0.85 * interval;
            fast = med < 0.4 * interval;
        }
        else {
            if (drawN < draws.length)
                return;
            const N = Math.max(1, Math.floor(1000 / 60 / Math.max(basePeriod, 4) + 0.1));
            const med = median(draws, draws.length, scratch);
            slow = med > N * basePeriod * 1.4;
            fast = med < N * basePeriod * 1.1;
        }
        if (slow) {
            fastSince = -1;
            if (slowSince < 0)
                slowSince = now;
            if (now - slowSince > 500 && level < LADDER.length - 1) {
                if (now - lastRaise < 3000)
                    bannedUntil = now + 20000;
                level++;
                slowSince = -1;
                costN = 0;
                drawN = 0;
                sizeCanvas();
            }
        }
        else {
            slowSince = -1;
            if (fast && level > 0 && now > bannedUntil) {
                if (fastSince < 0)
                    fastSince = now;
                if (now - fastSince > 2500) {
                    level--;
                    lastRaise = now;
                    fastSince = -1;
                    costN = 0;
                    drawN = 0;
                    sizeCanvas();
                }
            }
            else
                fastSince = -1;
        }
    };
    const frame = (now) => {
        raf = 0;
        if (!running || !G)
            return;
        raf = requestAnimationFrame(frame);
        if (lastTick >= 0) {
            const gap = now - lastTick;
            if (gap > 0 && gap < 200) {
                gaps[gapN++ % gaps.length] = gap;
                if (gapN >= gaps.length && gapN % 15 === 0) {
                    period = median(gaps, gaps.length, scratch);
                    basePeriod = Math.min(basePeriod, period);
                }
            }
        }
        lastTick = now;
        tick++;
        // Pace by vsync count: every Nth tick for a steady ~60 fps at any
        // refresh rate (90 Hz → every tick, 120/144/165 → every 2nd), so a
        // fast screen neither speeds the rain up nor doubles GPU work.
        const N = Math.max(1, Math.floor(1000 / 60 / Math.max(period, 4) + 0.1));
        // Pointer: read the rect only when the pointer moved or the page scrolled.
        if ((moved || scrolled) && inside) {
            const r = root.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) {
                tu = (cx - r.left) / r.width;
                tv = (cy - r.top) / r.height;
                if (W > 0)
                    shown = r.width / W;
            }
        }
        moved = false;
        scrolled = false;
        if (tick % N !== 0 && !dirty)
            return;
        const dt = lastDraw < 0 ? 0 : Math.min((now - lastDraw) / 1000, 0.05);
        if (lastDraw >= 0)
            draws[drawN++ % draws.length] = now - lastDraw;
        lastDraw = now;
        if (dirty) {
            applyProps(G);
            dirty = false;
        }
        const p = propsRef.current;
        // The light follows the cursor in ~40 ms; its strength fades in and out more gently.
        const hovTarget = inside ? 1 : 0;
        const kp = 1 - Math.exp(-dt / 0.04);
        if (hov < 0.01 && inside) {
            mx = tu;
            my = tv;
        }
        else {
            mx += (tu - mx) * kp;
            my += (tv - my) * kp;
        }
        hov += (hovTarget - hov) * (1 - Math.exp(-dt * 6));
        if (hov < 1e-3 && !inside)
            hov = 0;
        // Wind: the pointer's sweep along the curtain's own x, in composition heights per second.
        let sweep = 0;
        if (inside && hadPrev && dt > 0)
            sweep = ((tu - pu) * W * angC + (tv - pv) * H * angS) / Sz / dt;
        pu = tu;
        pv = tv;
        hadPrev = inside;
        gust += (clamp(sweep, -12, 12) - gust) * (1 - Math.exp(-dt / 0.08));
        if (Math.abs(gust) < 1e-4)
            gust = 0;
        const windAmt = (clamp(num(p.wind, DEFAULTS.wind), 0, 10) / 10) * (reduced ? 0.5 : 1);
        const leanTarget = clamp(gust * WIND_GAIN * windAmt, -LEAN_MAX, LEAN_MAX);
        // Damped spring, semi-implicit: the curtain swings with the gust and sways once as it settles.
        leanV += (LEAN_W * LEAN_W * (leanTarget - lean) - 2 * LEAN_Z * LEAN_W * leanV) * dt;
        lean += leanV * dt;
        if (leanTarget === 0 && Math.abs(lean) < 2e-4 && Math.abs(leanV) < 2e-3)
            lean = leanV = 0;
        // Downpour: bursts in while pressed, eases out after.
        const pourTarget = held ? 1 : 0;
        pour += (pourTarget - pour) * (1 - Math.exp(-dt / (held ? POUR_IN : POUR_OUT)));
        if (!held && pour < 1e-3)
            pour = 0;
        const pourAmt = pour * (clamp(num(p.downpour, DEFAULTS.downpour), 0, 10) / 5);
        // Splashes age in real time; the frame after the last one dies uploads it cleared.
        tapAlive = false;
        for (let i = 0; i < TAP_SLOTS; i++) {
            const o = i * 4;
            if (taps[o + 3] <= 0)
                continue;
            taps[o + 2] += dt;
            if (taps[o + 2] >= TAP_LIFE)
                taps[o + 3] = 0;
            else
                tapAlive = true;
            tapDirty = true;
        }
        clock = (clock + dt * rate) % TIME_WRAP;
        // The fall runs on its own clock, so speeding it up never jumps the dashes.
        fallT = (fallT + dt * (rate * (1 + POUR_FALL * pourAmt) + POUR_FLOOR * pourAmt * motionK)) % TIME_WRAP;
        draw(G);
        if (drawn % 60 === 0 && W > 0) {
            const r = root.getBoundingClientRect();
            const s = r.width / W;
            if (r.width > 0 && Math.abs(clamp(s, 1, 2) - clamp(shown, 1, 2)) > 0.05) {
                shown = s;
                sizeCanvas();
            }
        }
        adapt(now, N * period);
        const settled = Math.abs(hovTarget - hov) < 0.003 && Math.abs(tu - mx) < 1e-3 && Math.abs(tv - my) < 1e-3 &&
            gust === 0 && lean === 0 && pour === 0 && !held && !tapAlive && !tapDirty;
        if (rate <= 0 && settled && !dirty)
            stop();
    };
    const start = () => {
        if (running || !visible || document.hidden || !G)
            return;
        running = true;
        lastTick = -1;
        lastDraw = -1;
        raf = requestAnimationFrame(frame);
    };
    const stop = () => {
        running = false;
        if (raf)
            cancelAnimationFrame(raf);
        raf = 0;
    };
    wakeRef.current = () => {
        dirty = true;
        start();
    };
    init();
    const ro = new ResizeObserver((entries) => {
        const cr = entries[entries.length - 1].contentRect;
        if (cr.width === W && cr.height === H)
            return;
        W = cr.width;
        H = cr.height;
        const r = root.getBoundingClientRect();
        if (W > 0 && r.width > 0)
            shown = r.width / W;
        sizeCanvas();
        start();
    });
    ro.observe(root);
    const io = typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver((es) => {
            visible = es[es.length - 1].isIntersecting;
            if (visible)
                start();
            else
                stop();
        })
        : null;
    io === null || io === void 0 ? void 0 : io.observe(root);
    const onVis = () => {
        if (document.hidden)
            stop();
        else
            start();
    };
    document.addEventListener("visibilitychange", onVis);
    const onMove = (e) => {
        // Chrome re-sends moves at the same spot after layout; a resting cursor must not keep the loop awake.
        if (inside && e.clientX === cx && e.clientY === cy)
            return;
        cx = e.clientX;
        cy = e.clientY;
        moved = true;
        if (!inside)
            hadPrev = false;
        inside = true;
        start();
    };
    const onDown = (e) => {
        onMove(e);
        moved = true;
        held = true;
        // A click or tap sends a splash ring out from where it landed.
        if (e.button <= 0) {
            const amt = (clamp(num(propsRef.current.tap, DEFAULTS.tap), 0, 100) / 50) * (reduced ? 0.5 : 1);
            const r = root.getBoundingClientRect();
            if (amt > 0 && r.width > 0 && r.height > 0) {
                const o = (tapNext++ % TAP_SLOTS) * 4;
                taps[o] = (e.clientX - r.left) / r.width;
                taps[o + 1] = (e.clientY - r.top) / r.height;
                taps[o + 2] = 0;
                taps[o + 3] = amt;
                tapAlive = true;
                tapDirty = true;
            }
        }
        // Keep the release even if the press drags off the frame.
        start();
    };
    const onLeave = () => {
        inside = false;
        held = false;
        start();
    };
    const onUp = (e) => {
        held = false;
        // On touch, lifting the finger ends the hover too.
        if (e.pointerType !== "mouse")
            onLeave();
        start();
    };
    const onScroll = () => {
        scrolled = true;
    };
    evt.addEventListener("pointermove", onMove, { passive: true });
    evt.addEventListener("pointerdown", onDown, { passive: true });
    evt.addEventListener("pointerup", onUp);
    evt.addEventListener("pointerleave", onLeave);
    evt.addEventListener("pointercancel", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    // Survive a lost GPU context: pause, then rebuild on restore.
    const onLost = (e) => {
        e.preventDefault();
        stop();
        G = null;
    };
    const onRestored = () => {
        init();
        sizeCanvas();
        start();
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);
    return () => {
        stop();
        wakeRef.current = null;
        ro.disconnect();
        io === null || io === void 0 ? void 0 : io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        evt.removeEventListener("pointermove", onMove);
        evt.removeEventListener("pointerdown", onDown);
        evt.removeEventListener("pointerup", onUp);
        evt.removeEventListener("pointerleave", onLeave);
        evt.removeEventListener("pointercancel", onLeave);
        window.removeEventListener("scroll", onScroll, { capture: true });
        canvas.removeEventListener("webglcontextlost", onLost);
        canvas.removeEventListener("webglcontextrestored", onRestored);
    };
}
;
window.__mountRain = mountRain;

})();
/* Point B: "Digital Rain Curtain" як фон першого екрана */
(function(){
  function boot(){
    if(!window.__mountRain||document.getElementById('pb-rain'))return;
    var tint=document.querySelector('.scene-tint');if(!tint)return;
    var root=document.createElement('div');root.id='pb-rain';root.setAttribute('aria-hidden','true');
    root.style.cssText='position:fixed;inset:0;z-index:-2;pointer-events:none;overflow:hidden;background:#111144;display:none';
    var cv=document.createElement('canvas');cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;display:block';
    root.appendChild(cv);tint.parentNode.insertBefore(root,tint);
    try{window.__mountRain(root,cv,document.documentElement,window.__pbRainProps||{})}catch(e){root.remove();return}
    if(cv.style.visibility==='hidden'){root.remove();return}
    function upd(){
      var hero=document.getElementById('hero-dark'),vh=window.innerHeight||800,P=Math.min(1,Math.max(0,(window.scrollY||0)/(vh*.9)));
      var on=!!hero&&P<1;
      root.style.display=on?'block':'none';
      if(on)root.style.opacity=(1-P).toFixed(3);
    }
    addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);setInterval(upd,400);upd();
  }
  window.__pbRainProps={background:'#111144',baseColor:'#F6F5F4',accentColor:'#CDD2EB',density:45,bandPosition:0,zoom:100,hover:50,wind:5,downpour:5,tap:50,tapEffect:'lightning',speed:41,
    advanced:{tipColor:'#F6F5F4',cyanColor:'#F6F5F4',hazeColor:'#111144',rimColor:'#111144',vignette:0}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
