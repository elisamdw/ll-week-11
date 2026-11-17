// Measures a printed cards PDF with PDFKit: each page's size, and how far the text sits from the paper's edges and from
// the cut line down the middle. Run by pdf.mjs after Chrome writes the PDF; by hand:
//   swift nextjs/app/cards/print/pdf-check.swift <file.pdf> [--png <dir>]
// Prints one JSON object. Sizes are in inches. --png also renders each page at 72 dpi into <dir>, to look at.
import AppKit
import Foundation
import PDFKit

let args = CommandLine.arguments
guard args.count > 1, let doc = PDFDocument(url: URL(fileURLWithPath: args[1])) else {
  FileHandle.standardError.write("Usage: swift pdf-check.swift <file.pdf> [--png <dir>]\n".data(using: .utf8)!)
  exit(1)
}
let pngDir = args.firstIndex(of: "--png").flatMap { $0 + 1 < args.count ? args[$0 + 1] : nil }
let inch = 72.0
func r2(_ x: Double) -> Double { (x * 100).rounded() / 100 }

var pages: [[String: Any]] = []
for i in 0..<doc.pageCount {
  guard let page = doc.page(at: i) else { continue }
  let box = page.bounds(for: .mediaBox)
  let w = Double(box.width), h = Double(box.height), mid = w / 2
  // One rectangle per printed character, in points from the bottom left (lines would merge across the two columns).
  let text = (page.string ?? "") as NSString
  var lines: [CGRect] = []
  for c in 0..<text.length {
    guard let ch = UnicodeScalar(text.character(at: c)), !CharacterSet.whitespacesAndNewlines.contains(ch) else { continue }
    let b = page.characterBounds(at: c)
    if b.width > 0.1 && b.height > 0.1 { lines.append(b) }
  }
  var entry: [String: Any] = ["page": i + 1, "width": r2(w / inch), "height": r2(h / inch), "chars": lines.count]
  if !lines.isEmpty {
    let left = lines.filter { Double($0.midX) < mid }, right = lines.filter { Double($0.midX) >= mid }
    entry["textLeft"] = r2(Double(lines.map { $0.minX }.min()!) / inch)
    entry["textRight"] = r2((w - Double(lines.map { $0.maxX }.max()!)) / inch)
    entry["textTop"] = r2((h - Double(lines.map { $0.maxY }.max()!)) / inch)
    entry["textBottom"] = r2(Double(lines.map { $0.minY }.min()!) / inch)
    // From the middle cut line: the left column's text must end, and the right column's start, a margin away.
    if let m = left.map({ $0.maxX }).max() { entry["leftColumnToCut"] = r2((mid - Double(m)) / inch) }
    if let m = right.map({ $0.minX }).min() { entry["cutToRightColumn"] = r2((Double(m) - mid) / inch) }
    // A character on the middle line means a card spilled over the cut.
    entry["charsOnCut"] = lines.filter { Double($0.minX) < mid && Double($0.maxX) > mid }.count
  }
  pages.append(entry)
  if let dir = pngDir {
    let img = page.thumbnail(of: NSSize(width: w, height: h), for: .mediaBox)
    if let tiff = img.tiffRepresentation, let rep = NSBitmapImageRep(data: tiff), let png = rep.representation(using: .png, properties: [:]) {
      try? FileManager.default.createDirectory(atPath: dir, withIntermediateDirectories: true)
      try? png.write(to: URL(fileURLWithPath: "\(dir)/page-\(i + 1).png"))
    }
  }
}
let out = try JSONSerialization.data(withJSONObject: ["file": args[1], "pages": doc.pageCount, "perPage": pages], options: [.prettyPrinted, .sortedKeys])
print(String(data: out, encoding: .utf8)!)
