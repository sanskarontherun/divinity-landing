/**
 * Procedural point-cloud generators for the ember field.
 *
 * Two shapes only, on purpose:
 *  - "scatter": embers with no order — the ache, the noise, the unread pile.
 *  - "flame":   the same embers resolved into the flame-mark silhouette —
 *               the turn, the return, the form the scatter was always
 *               capable of.
 *
 * Both return a flat Float32Array of length count * 3 (x, y, z per point)
 * in a local unit space roughly [-1, 1] on x, [-1.1, 1.3] on y, so callers
 * can scale to taste.
 */

export function seededRandom(seed: number) {
  // Small deterministic PRNG (mulberry32) so re-renders are stable.
  let t = seed + 0x6d2b79f5;
  return function () {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Wide, viewport-filling scatter — used by the persistent ambient field so
 * dust reads across the *entire* screen, not a small clustered volume.
 * Distinct from generateScatter() above, which stays tight on purpose for
 * localized moments.
 */
export function generateAmbientScatter(count: number, seed = 21): Float32Array {
  const rand = seededRandom(seed);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    out[i * 3] = (rand() - 0.5) * 18;
    out[i * 3 + 1] = (rand() - 0.5) * 13;
    out[i * 3 + 2] = (rand() - 0.5) * 9;
  }
  return out;
}

/** Random scattered volume — a loose, slightly flattened cloud. */
export function generateScatter(count: number, seed = 1): Float32Array {
  const rand = seededRandom(seed);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 0.6 + rand() * 1.15;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    out[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    out[i * 3 + 1] = Math.cos(phi) * r * 0.85;
    out[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r * 0.7;
  }
  return out;
}

/**
 * Flame-silhouette width profile, 0 (base) to 1 (tip). Wider through the
 * lower-mid "belly", tapering to a point — echoes FlameMark's teardrop.
 */
function flameWidth(t: number): number {
  const belly = Math.sin(Math.PI * Math.pow(t, 0.62));
  const taper = 1 - Math.pow(t, 2.2) * 0.35;
  return Math.max(belly * taper, 0.001);
}

/** Points filling the flame silhouette (interior-weighted, not just edge). */
export function generateFlameTargets(count: number, seed = 7): Float32Array {
  const rand = seededRandom(seed);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.pow(rand(), 0.85); // bias slightly toward the base
    const w = flameWidth(t);
    const radial = Math.sqrt(rand()) * w; // denser toward the core
    const angle = rand() * Math.PI * 2;
    out[i * 3] = Math.cos(angle) * radial;
    out[i * 3 + 1] = t * 2.35 - 0.85;
    out[i * 3 + 2] = Math.sin(angle) * radial * 0.55;
  }
  return out;
}

/** Per-particle random values used to desync convergence + idle motion. */
export function generateSeeds(count: number, seed = 3): Float32Array {
  const rand = seededRandom(seed);
  const out = new Float32Array(count);
  for (let i = 0; i < count; i++) out[i] = rand();
  return out;
}
