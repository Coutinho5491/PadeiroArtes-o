// Otimiza as fotos de origem (iFood/Instagram da marca) para src/assets.
// Uso: node scripts/process-images.mjs <pasta-origem-ifood> <pasta-origem-ig>
// Nunca amplia: apenas reduz quando a largura passa de 1600px.
import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";
import { join, parse } from "node:path";

const [ifoodDir, igDir] = process.argv.slice(2);
const out = "src/assets/photos";
mkdirSync(out, { recursive: true });
mkdirSync("src/assets/brand", { recursive: true });

async function optimize(src, name) {
  const img = sharp(src).rotate();
  const meta = await img.metadata();
  await img
    .resize({ width: Math.min(meta.width, 1600), withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(join(out, `${name}.jpg`));
  console.log(name, `${meta.width}x${meta.height}`);
}

for (const f of readdirSync(ifoodDir)) {
  const { name } = parse(f);
  if (name === "logo") continue;
  await optimize(join(ifoodDir, f), name);
}
for (const [file, name] of [["ig-3.jpg", "chef-fernando"], ["ig-9.jpg", "processo-alecrim"], ["ig-4.jpg", "evento-cupcakes"]]) {
  await optimize(join(igDir, file), name);
}

// Logo: converte o fundo branco em transparência, preservando o verde original.
const { data, info } = await sharp(join(ifoodDir, "logo.jpg")).raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);
let sum = [0, 0, 0], n = 0;
for (let i = 0, j = 0; i < data.length; i += info.channels, j += 4) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  const ink = Math.max(0, Math.min(1, (255 - Math.min(r, g, b)) / 120));
  if (ink > 0.95) { sum[0] += r; sum[1] += g; sum[2] += b; n++; }
  rgba[j] = r; rgba[j + 1] = g; rgba[j + 2] = b; rgba[j + 3] = Math.round(ink * 255);
}
const green = sum.map((v) => Math.round(v / n));
console.log("brand green", "#" + green.map((v) => v.toString(16).padStart(2, "0")).join(""));
// Recolore pixels de tinta para o verde médio (evita franjas brancas).
for (let j = 0; j < rgba.length; j += 4) { rgba[j] = green[0]; rgba[j + 1] = green[1]; rgba[j + 2] = green[2]; }
await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile("src/assets/brand/logo.png");
// Versão em creme para fundos escuros
for (let j = 0; j < rgba.length; j += 4) { rgba[j] = 246; rgba[j + 1] = 240; rgba[j + 2] = 228; }
await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile("src/assets/brand/logo-cream.png");
