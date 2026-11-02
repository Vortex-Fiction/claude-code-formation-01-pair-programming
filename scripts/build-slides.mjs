import { readFileSync } from 'node:fs';
import path from 'node:path';
import pptxgen from 'pptxgenjs';

const ROOT_FOLDER = path.join(import.meta.dirname, '..');
const SOURCE_FILE = path.join(ROOT_FOLDER, 'slides.md');
const OUTPUT_FILE = path.join(ROOT_FOLDER, 'slides.pptx');

const COLORS = {
  ink: '1F1B18',
  paper: 'FFFFFF',
  clay: 'C15F3C',
  sand: 'F4EDE6',
  muted: '6B625C',
};
const HEADING_FONT = 'Cambria';
const BODY_FONT = 'Calibri';
const CODE_FONT = 'Courier New';
const DENSE_SLIDE_LINE_COUNT = 7;

const SLIDE_SEPARATOR = /\n---\n/;
const NOTE_PATTERN = /<!--([\s\S]*?)-->/g;
const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`)/;

function readSlides() {
  const source = readFileSync(SOURCE_FILE, 'utf8').replace(/\r\n/g, '\n');
  const [, , ...slides] = source.split(/^---$/m);
  return slides
    .join('---')
    .split(SLIDE_SEPARATOR)
    .map((slide) => slide.trim());
}

function toRuns(text, baseOptions) {
  return text
    .split(INLINE_PATTERN)
    .filter((part) => part.length > 0)
    .map((part) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return { text: part.slice(2, -2), options: { ...baseOptions, bold: true } };
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return { text: part.slice(1, -1), options: { ...baseOptions, fontFace: CODE_FONT } };
      }
      return { text: part, options: { ...baseOptions } };
    });
}

function parseTableRow(line) {
  return line
    .split('|')
    .slice(1, -1)
    .map((cell) => cell.trim());
}

function parseSlide(markdown) {
  const notes = [...markdown.matchAll(NOTE_PATTERN)].map((match) => match[1].trim());
  const lines = markdown.replace(NOTE_PATTERN, '').split('\n');
  const slide = { title: '', paragraphs: [], tableRows: [], notes: notes.join('\n\n') };
  let isInCode = false;
  for (const line of lines) {
    if (line.startsWith('```')) {
      isInCode = !isInCode;
      continue;
    }
    if (isInCode) {
      slide.paragraphs.push({ kind: 'code', text: line });
      continue;
    }
    if (line.startsWith('# ')) {
      slide.title = line.slice(2).trim();
      continue;
    }
    if (line.startsWith('|')) {
      if (!/^\|[\s|-]+\|$/.test(line)) {
        slide.tableRows.push(parseTableRow(line));
      }
      continue;
    }
    if (line.trim() === '') {
      continue;
    }
    const bullet = line.match(/^\s*- (.*)$/);
    if (bullet) {
      slide.paragraphs.push({ kind: 'bullet', text: bullet[1] });
      continue;
    }
    const numbered = line.match(/^\s*\d+\. (.*)$/);
    if (numbered) {
      slide.paragraphs.push({ kind: 'numbered', text: numbered[1] });
      continue;
    }
    if (line.startsWith('> ')) {
      slide.paragraphs.push({ kind: 'quote', text: line.slice(2) });
      continue;
    }
    slide.paragraphs.push({ kind: 'text', text: line.trim() });
  }
  return slide;
}

function toParagraphRuns(paragraph, fontSize) {
  const base = { fontSize, color: COLORS.ink, paraSpaceAfter: 6 };
  if (paragraph.kind === 'bullet') {
    return toRuns(paragraph.text, { ...base, bullet: true });
  }
  if (paragraph.kind === 'numbered') {
    return toRuns(paragraph.text, { ...base, bullet: { type: 'number' } });
  }
  if (paragraph.kind === 'quote') {
    return toRuns(paragraph.text, { ...base, italic: true, color: COLORS.clay });
  }
  if (paragraph.kind === 'code') {
    return [
      {
        text: paragraph.text || ' ',
        options: { ...base, fontFace: CODE_FONT, fontSize: 14, paraSpaceAfter: 0 },
      },
    ];
  }
  return toRuns(paragraph.text, base);
}

function buildBodyRuns(paragraphs) {
  const fontSize = paragraphs.length > DENSE_SLIDE_LINE_COUNT ? 16 : 20;
  const runsPerParagraph = paragraphs.map((paragraph) => toParagraphRuns(paragraph, fontSize));
  return runsPerParagraph.flatMap((runs) =>
    runs.map((run, index) => ({
      text: run.text,
      options: { ...run.options, breakLine: index === runs.length - 1 },
    })),
  );
}

function defineLayouts(presentation) {
  presentation.defineSlideMaster({
    title: 'COVER',
    background: { color: COLORS.ink },
    objects: [
      {
        placeholder: {
          options: {
            name: 'title',
            type: 'title',
            x: 0.6,
            y: 1.6,
            w: 8.8,
            h: 1.4,
            fontFace: HEADING_FONT,
            fontSize: 40,
            bold: true,
            color: COLORS.paper,
            valign: 'bottom',
          },
          text: '',
        },
      },
      {
        placeholder: {
          options: {
            name: 'body',
            type: 'body',
            x: 0.6,
            y: 3.1,
            w: 8.8,
            h: 1.6,
            fontFace: BODY_FONT,
            fontSize: 20,
            color: COLORS.sand,
            valign: 'top',
          },
          text: '',
        },
      },
    ],
  });
  presentation.defineSlideMaster({
    title: 'CONTENT',
    background: { color: COLORS.paper },
    objects: [
      {
        placeholder: {
          options: {
            name: 'title',
            type: 'title',
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.9,
            fontFace: HEADING_FONT,
            fontSize: 30,
            bold: true,
            color: COLORS.ink,
            valign: 'middle',
          },
          text: '',
        },
      },
      {
        placeholder: {
          options: {
            name: 'body',
            type: 'body',
            x: 0.5,
            y: 1.35,
            w: 9,
            h: 3.8,
            fontFace: BODY_FONT,
            fontSize: 20,
            color: COLORS.ink,
            valign: 'top',
          },
          text: '',
        },
      },
    ],
    slideNumber: { x: 9.2, y: 5.2, w: 0.5, h: 0.3, fontSize: 10, color: COLORS.muted },
  });
}

function addTable(slide, rows) {
  const [header, ...body] = rows;
  const headerCells = header.map((cell) => ({
    text: toRuns(cell, { bold: true, color: COLORS.paper }),
    options: { fill: { color: COLORS.clay } },
  }));
  const bodyCells = body.map((row) =>
    row.map((cell) => ({ text: toRuns(cell, { color: COLORS.ink }) })),
  );
  slide.addTable([headerCells, ...bodyCells], {
    x: 0.5,
    y: 1.45,
    w: 9,
    fontFace: BODY_FONT,
    fontSize: 16,
    border: { type: 'solid', pt: 1, color: COLORS.sand },
    fill: { color: COLORS.paper },
    valign: 'middle',
  });
}

function addSlide(presentation, parsedSlide, isCover) {
  const slide = presentation.addSlide({ masterName: isCover ? 'COVER' : 'CONTENT' });
  slide.addText(parsedSlide.title, { placeholder: 'title' });
  if (parsedSlide.tableRows.length > 0) {
    addTable(slide, parsedSlide.tableRows);
  }
  if (parsedSlide.paragraphs.length > 0) {
    const runs = buildBodyRuns(parsedSlide.paragraphs);
    const coverRuns = runs.map((run) => ({
      text: run.text,
      options: { ...run.options, color: COLORS.sand },
    }));
    slide.addText(isCover ? coverRuns : runs, { placeholder: 'body', fit: 'shrink' });
  }
  if (parsedSlide.notes.length > 0) {
    slide.addNotes(parsedSlide.notes);
  }
}

async function buildDeck() {
  const presentation = new pptxgen();
  presentation.layout = 'LAYOUT_16x9';
  presentation.theme = { headFontFace: HEADING_FONT, bodyFontFace: BODY_FONT };
  presentation.title = 'Phase 1 — Pair programming efficace';
  defineLayouts(presentation);
  const slides = readSlides().map(parseSlide);
  const lastIndex = slides.length - 1;
  slides.forEach((parsedSlide, index) => {
    addSlide(presentation, parsedSlide, index === 0 || index === lastIndex);
  });
  await presentation.writeFile({ fileName: OUTPUT_FILE });
  console.log(`${slides.length} slides written to ${OUTPUT_FILE}`);
}

await buildDeck();
