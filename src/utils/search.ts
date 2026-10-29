import { SkillNode, Language } from '../types';
import { getDomainForCategory } from '../data/categories';

/**
 * Normalizes Vietnamese diacritics / accents for seamless, accent-insensitive search.
 * e.g., "lập trình" -> "lap trinh", "kiểm thử" -> "kiem thu", "Đồ họa" -> "do hoa"
 */
export const removeAccents = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, m => (m === 'đ' ? 'd' : 'D'))
    .toLowerCase()
    .trim();
};

export interface SearchMatchResult {
  matched: boolean;
  score: number;
  matchField?: 'title' | 'tag' | 'summary' | 'objective' | 'content' | 'domain';
  snippet?: string;
}

/**
 * Searches across the entire skill node:
 * - Titles (VI & EN)
 * - Summaries (VI & EN)
 * - Full-Text Markdown content (VI & EN)
 * - Tags
 * - Practical objectives (VI & EN)
 * - Domain name & code
 */
export const matchSkillFullText = (
  skill: SkillNode,
  rawQuery: string,
  lang: Language = 'vi'
): SearchMatchResult => {
  if (!rawQuery || !rawQuery.trim()) {
    return { matched: true, score: 0 };
  }

  const queryNorm = removeAccents(rawQuery);
  const queryLower = rawQuery.toLowerCase().trim();

  // 1. Check Title (Highest Priority - Score 100)
  const titleNormVi = removeAccents(skill.title.vi);
  const titleNormEn = removeAccents(skill.title.en);
  if (titleNormVi.includes(queryNorm) || titleNormEn.includes(queryNorm) ||
      skill.title.vi.toLowerCase().includes(queryLower) || skill.title.en.toLowerCase().includes(queryLower)) {
    return {
      matched: true,
      score: 100,
      matchField: 'title',
      snippet: skill.title[lang]
    };
  }

  // 2. Check Tags (Score 80)
  const matchedTag = skill.tags.find(t => {
    const tNorm = removeAccents(t);
    return tNorm.includes(queryNorm) || t.toLowerCase().includes(queryLower);
  });
  if (matchedTag) {
    return {
      matched: true,
      score: 80,
      matchField: 'tag',
      snippet: `#${matchedTag}`
    };
  }

  // 3. Check Domain Name & Code (Score 70)
  const domain = getDomainForCategory(skill.category);
  const domainNormVi = removeAccents(domain.name.vi);
  const domainNormEn = removeAccents(domain.name.en);
  if (domain.code.toLowerCase().includes(queryLower) ||
      domainNormVi.includes(queryNorm) || domainNormEn.includes(queryNorm)) {
    return {
      matched: true,
      score: 70,
      matchField: 'domain',
      snippet: `${domain.code} ${domain.shortName[lang]}`
    };
  }

  // 4. Check Objectives (Score 60)
  for (const obj of skill.objectives) {
    const objViNorm = removeAccents(obj.text.vi);
    const objEnNorm = removeAccents(obj.text.en);
    if (objViNorm.includes(queryNorm) || objEnNorm.includes(queryNorm) ||
        obj.text.vi.toLowerCase().includes(queryLower) || obj.text.en.toLowerCase().includes(queryLower)) {
      return {
        matched: true,
        score: 60,
        matchField: 'objective',
        snippet: obj.text[lang]
      };
    }
  }

  // 5. Check Summary (Score 50)
  const summaryViNorm = removeAccents(skill.summary.vi);
  const summaryEnNorm = removeAccents(skill.summary.en);
  if (summaryViNorm.includes(queryNorm) || summaryEnNorm.includes(queryNorm) ||
      skill.summary.vi.toLowerCase().includes(queryLower) || skill.summary.en.toLowerCase().includes(queryLower)) {
    return {
      matched: true,
      score: 50,
      matchField: 'summary',
      snippet: skill.summary[lang]
    };
  }

  // 6. Check Full Markdown Content (Deep Full-Text - Score 30)
  const contentVi = skill.content.vi;
  const contentEn = skill.content.en;
  const contentViNorm = removeAccents(contentVi);
  const contentEnNorm = removeAccents(contentEn);

  const idxVi = contentViNorm.indexOf(queryNorm);
  const idxEn = contentEnNorm.indexOf(queryNorm);

  if (idxVi !== -1 || idxEn !== -1) {
    // Generate context snippet around the matched word
    const isVi = idxVi !== -1;
    const targetContent = isVi ? contentVi : contentEn;
    const matchIdx = isVi ? idxVi : idxEn;

    const start = Math.max(0, matchIdx - 40);
    const end = Math.min(targetContent.length, matchIdx + rawQuery.length + 40);
    let snippet = targetContent.slice(start, end).replace(/[#*`>]/g, ' ').replace(/\s+/g, ' ').trim();
    if (start > 0) snippet = '...' + snippet;
    if (end < targetContent.length) snippet = snippet + '...';

    return {
      matched: true,
      score: 30,
      matchField: 'content',
      snippet
    };
  }

  return { matched: false, score: 0 };
};
