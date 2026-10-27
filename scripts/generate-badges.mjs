/**
 * 批量生成 docs/media/badges/ 下的徽章 SVG。
 *
 * 徽章定义在 docs/data/badges.json：url 是 shields.io 徽章地址模板，
 * 其中的 {logo} 占位符会在运行时替换为 docs/media/badges/logos/ 下
 * 对应图片的 base64 data URI（shields 的 logo 参数只支持 data URI）。
 *
 * 用法：
 *   node scripts/generate-badges.mjs          生成并覆盖写入
 *   node scripts/generate-badges.mjs --check  只校验本地文件与 shields 渲染结果是否一致
 */
import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const manifestPath = path.join(root, "docs/data/badges.json")
const outputDir = path.join(root, "docs/media/badges")
const logoDir = path.join(outputDir, "logos")

const checkOnly = process.argv.includes("--check")

const MIME_BY_EXT = { ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml" }

function buildLogoDataUri(logoFile) {
  const ext = path.extname(logoFile).toLowerCase()
  const mime = MIME_BY_EXT[ext]
  if (!mime) throw new Error(`Unsupported logo type: ${logoFile}`)
  const buf = fs.readFileSync(path.join(logoDir, logoFile))
  return `data:${mime};base64,${buf.toString("base64")}`
}

function encodeUrl(url) {
  // shields 要求查询参数中的 data URI 整体编码；路径里的非 ASCII 文案需 percent-encode
  return [...url].map((c) => (c.charCodeAt(0) > 127 ? encodeURIComponent(c) : c)).join("")
}

async function fetchBadge(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(encodeUrl(url))
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const body = await res.text()
      if (!body.includes("<svg") || body.includes(">not found<") || body.includes(">invalid")) {
        throw new Error(`unexpected response: ${body.slice(0, 120)}`)
      }
      return body
    } catch (err) {
      if (attempt === retries) throw err
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt))
    }
  }
  throw new Error("unreachable")
}

async function main() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  const mismatches = []

  for (const badge of manifest.badges) {
    let url = badge.url
    if (badge.logo) url = url.replace("{logo}", encodeURIComponent(buildLogoDataUri(badge.logo)))

    const svg = await fetchBadge(url)
    const outPath = path.join(outputDir, badge.name)

    if (checkOnly) {
      const current = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8") : ""
      if (current === svg) {
        console.log(`OK        ${badge.name}`)
      } else {
        mismatches.push(badge.name)
        console.log(`MISMATCH  ${badge.name}`)
      }
      continue
    }

    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, svg, "utf8")
    console.log(`generated ${badge.name} (${Buffer.byteLength(svg)}B)`)
  }

  if (checkOnly && mismatches.length > 0) {
    console.error(`\n${mismatches.length} badge(s) out of date: ${mismatches.join(", ")}`)
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exitCode = 1
})
