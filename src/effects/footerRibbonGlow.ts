// @ts-nocheck
(function () {
  var LAYERS = 84,
    TWIST = 1.25,
    DRAG = 0.18;
  var VERT =
    "#version 300 es\nconst vec2 P[3]=vec2[3](vec2(-1.0,-1.0),vec2(3.0,-1.0),vec2(-1.0,3.0));\nvoid main(){gl_Position=vec4(P[gl_VertexID],0.0,1.0);}\n";
  var FIELD =
    "#version 300 es\nprecision highp float;uniform vec2 uRes;uniform float uTime;uniform vec3 uC1;uniform vec3 uC2;uniform float uSize;uniform float uAngle;uniform vec2 uMouse;uniform float uOn;uniform float uReach;uniform vec2 uVel;out vec4 o;\n" +
    "const float LAYERS=" +
    LAYERS.toFixed(1) +
    ";const float TWIST=" +
    TWIST.toFixed(3) +
    ";const float DRAG=" +
    DRAG.toFixed(3) +
    ";const float GAIN=0.62;const vec2 CENTRE=vec2(-0.62,0.24);const float TILT=0.6;const float ZOOM=1.05;const float THETA=2.13;const float SHEAR=0.963;const float SHRINK=0.953;const vec2 WARP_FREQ=vec2(0.42,2.4);const vec2 WARP_AMP=vec2(0.13,0.027);const vec2 ASPECT=vec2(2.1,0.17);const float OFFSET=0.36;const float GLOW=0.0021;const float SOFT=0.0019;const float FALLOFF=0.37;const float PHASE=12.0;const float CYCLE=0.16;const float HUE_TRAVEL=2.0;\n" +
    "mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,s,-s,c);}\n" +
    "void main(){vec2 R=uRes;vec2 pos=(gl_FragCoord.xy-0.5*R)/R.y;vec2 d=pos-uMouse;float w=uOn*exp(-dot(d,d)/(uReach*uReach));if(w>1e-4)pos=uMouse+rot(w*TWIST)*d*(1.0-0.3*min(w,1.0))-uVel*min(w,1.0)*DRAG;\n" +
    "pos=rot(uAngle)*pos/uSize;float t=uTime*0.49+PHASE;float breath=(-sin(uTime*0.735)+sin(uTime*0.49+1.0))*0.25+0.5;vec2 u=rot(TILT)*((pos-CENTRE)*(ZOOM-breath*0.085));mat2 fold=mat2(cos(THETA),sin(THETA),-SHEAR,cos(THETA));vec3 col=vec3(0.0);\n" +
    "for(float i=1.0;i<=LAYERS;i+=1.0){u.x-=sin(u.y*WARP_FREQ.x+t+i*0.007)*WARP_AMP.x;u.y-=sin(u.x*WARP_FREQ.y-t+i*0.02)*WARP_AMP.y;u=fold*u*SHRINK;vec2 q=(u-vec2(OFFSET+breath*0.1,0.0))*ASPECT;float g=GLOW/(dot(q,q)+SOFT)*(0.25+breath*0.4);float r=length(u);float k=sin(i*CYCLE+t*1.2+r*HUE_TRAVEL)*0.5+0.5;col+=g*mix(uC1,uC2,k)*(0.62+0.5*k)*exp2(-r*FALLOFF);}\n" +
    "vec3 x=max(col*GAIN,0.0);col=(x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14);col=pow(clamp(col,0.0,1.0),vec3(0.85,0.92,0.98));col*=1.0-smoothstep(0.5,1.6,length(pos))*0.07;o=vec4(col,1.0);}\n";
  var FINISH =
    "#version 300 es\nprecision highp float;uniform sampler2D uField;uniform vec2 uRes;uniform float uTime;uniform vec3 uBg;out vec4 o;\nfloat ign(vec2 p,float f){p+=5.588238*mod(f,64.0);return fract(52.9829189*fract(0.06711056*p.x+0.00583715*p.y));}\nvoid main(){vec2 frag=gl_FragCoord.xy;vec3 L=max(texture(uField,frag/uRes).rgb,0.0);L*=0.55;vec3 col=uBg+L*(1.0-uBg);col+=(ign(frag,floor(uTime*24.0))-0.5)/255.0;o=vec4(clamp(col,0.0,1.0),1.0);}\n";
  var BG = [15 / 255, 28 / 255, 77 / 255],
    C1 = [42 / 255, 70 / 255, 184 / 255],
    C2 = [245 / 255, 112 / 255, 15 / 255];
  function prog(gl, frag) {
    function sh(t, s) {
      var x = gl.createShader(t);
      gl.shaderSource(x, s);
      gl.compileShader(x);
      if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(x));
        return null;
      }
      return x;
    }
    var v = sh(gl.VERTEX_SHADER, VERT),
      f = sh(gl.FRAGMENT_SHADER, frag);
    if (!v || !f) return null;
    var p = gl.createProgram();
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null;
    return p;
  }
  function loc(gl, p, n) {
    var o = {};
    n.forEach(function (k) {
      o[k] = gl.getUniformLocation(p, k);
    });
    return o;
  }
  function mount(foot) {
    var canvas = document.createElement("canvas");
    canvas.className = "footer-ribbon";
    canvas.setAttribute("aria-hidden", "true");
    foot.insertBefore(canvas, foot.firstChild);
    var gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
    });
    if (!gl) return;
    var field = prog(gl, FIELD),
      fin = prog(gl, FINISH);
    if (!field || !fin) return;
    var uf = loc(gl, field, [
        "uRes",
        "uTime",
        "uC1",
        "uC2",
        "uSize",
        "uAngle",
        "uMouse",
        "uOn",
        "uReach",
        "uVel",
      ]),
      un = loc(gl, fin, ["uField", "uRes", "uTime", "uBg"]);
    gl.bindVertexArray(gl.createVertexArray());
    var fbo = gl.createFramebuffer(),
      tex = null,
      tw = 0,
      th = 0,
      half = !!gl.getExtension("EXT_color_buffer_float");
    function resize(w, h) {
      if (w === tw && h === th && tex) return;
      for (var a = 0; a < 2; a++) {
        if (tex) gl.deleteTexture(tex);
        tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          half ? gl.RGBA16F : gl.RGBA8,
          w,
          h,
          0,
          gl.RGBA,
          half ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE,
          null,
        );
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          tex,
          0,
        );
        var ok =
          gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        if (ok || !half) break;
        half = false;
      }
      tw = w;
      th = h;
    }
    var p = { tx: 0, ty: 0, inside: false };
    function move(e) {
      var r = foot.getBoundingClientRect();
      p.tx = e.clientX - r.left;
      p.ty = e.clientY - r.top;
      p.inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
    }
    addEventListener("pointermove", move, { passive: true });
    var mx = 0,
      my = 0,
      vx = 0,
      vy = 0,
      on = 0,
      last = -1,
      clock = 0,
      raf = 0,
      vis = true,
      still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function render(now) {
      raf = 0;
      if (last > 0 && now - last < 30) {
        if (vis && !still) raf = requestAnimationFrame(render);
        return;
      }
      if (!foot.isConnected) {
        removeEventListener("pointermove", move);
        return;
      }
      var dt = last < 0 ? 0 : Math.min(Math.max((now - last) / 1000, 0), 0.05);
      last = now;
      clock = (clock + dt * (still ? 0 : 1)) % 3600;
      var dpr = Math.min(devicePixelRatio || 1, 1.5),
        cw = canvas.clientWidth || 1200,
        ch = canvas.clientHeight || 600,
        bw = Math.max(1, Math.round(cw * dpr)),
        bh = Math.max(1, Math.round(ch * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      resize(Math.max(1, Math.round(bw / 2)), Math.max(1, Math.round(bh / 2)));
      var present = p.inside ? 1 : 0;
      if (present && on < 0.02) {
        mx = p.tx;
        my = p.ty;
      }
      on += (present - on) * (1 - Math.exp(-dt * 5));
      var k = 1 - Math.exp(-dt * 16),
        nx = mx + (p.tx - mx) * k,
        ny = my + (p.ty - my) * k;
      if (dt > 0) {
        var kv = 1 - Math.exp(-dt * 8);
        vx += ((nx - mx) / dt - vx) * kv;
        vy += ((ny - my) / dt - vy) * kv;
      }
      mx = nx;
      my = ny;
      var vl = Math.hypot(vx, vy) / ch,
        cap = vl > 3 ? 3 / vl : 1;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, tw, th);
      gl.useProgram(field);
      gl.uniform2f(uf.uRes, tw, th);
      gl.uniform1f(uf.uTime, clock);
      gl.uniform3f(uf.uC1, C1[0], C1[1], C1[2]);
      gl.uniform3f(uf.uC2, C2[0], C2[1], C2[2]);
      gl.uniform1f(uf.uSize, 1);
      gl.uniform1f(uf.uAngle, -Math.PI);
      gl.uniform2f(uf.uMouse, (mx - cw / 2) / ch, (ch / 2 - my) / ch);
      gl.uniform1f(uf.uOn, on);
      gl.uniform1f(uf.uReach, 240 / ch);
      gl.uniform2f(uf.uVel, (vx / ch) * cap, (-vy / ch) * cap);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, bw, bh);
      gl.useProgram(fin);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(un.uField, 0);
      gl.uniform2f(un.uRes, bw, bh);
      gl.uniform1f(un.uTime, clock);
      gl.uniform3f(un.uBg, BG[0], BG[1], BG[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (vis && !still) raf = requestAnimationFrame(render);
    }
    new IntersectionObserver(function (es) {
      vis = es[0].isIntersecting;
      if (vis && !raf) {
        last = -1;
        raf = requestAnimationFrame(render);
      }
    }).observe(foot);
    raf = requestAnimationFrame(render);
  }
})();
