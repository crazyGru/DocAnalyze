/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import mammoth from 'mammoth';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export const determineLanguage = (text: string, englishThreshold = 0.5) => {
  const englishCount = [...text].filter((char) => /[A-Za-z]/.test(char)).length;
  const chineseCount = [...text].filter((char) =>
    /[\u4e00-\u9fff]/.test(char)
  ).length;
  const englishPercentage = englishCount / text.length;
  const chinesePercentage = chineseCount / text.length;
  return englishPercentage >= chinesePercentage &&
    englishPercentage >= englishThreshold
    ? 'English'
    : chinesePercentage > englishPercentage
    ? 'Chinese'
    : 'Unknown';
};

export const checkDocLang = async ({ url }: { url: string }) => {
  try {
    const text = await mammoth.extractRawText({ path: url });
    if (!text) return null;
    return determineLanguage(text.value);
  } catch (e) {
    console.log("Error while loaing: ", e)
  }
};