import type { SettingsCategoryItem, SettingsReportReasons, SettingsTip } from '@/types/types';
import type { AdminMainCategory, AdminCategoryJobReport, AdminMainCategorySubcategory } from './types';

const DEFAULT_REPORT_REASONS: SettingsReportReasons = {
  reportingServiceProvider: '—',
  reportingClient: '—',
  jobReports: [],
};

const DEFAULT_JOB_TIP: SettingsTip = {
  title: '—',
  description: '—',
};

const DEFAULT_SUBCATEGORY = 'General';
const DEFAULT_ICON_FALLBACKS = [
  '/settings-icon1.png',
  '/settings-icon2.png',
  '/settings-icon3.png',
  '/settings-icon4.png',
  '/settings-icon5.png',
  '/settings-icon6.png',
  '/settings-icon7.png',
  '/settings-icon8.png',
];

function normalizeSubCategories(category: AdminMainCategory): string[] {
  const rawCandidates =
    (category.subCategories ??
      category.subcategories ??
      category.children ??
      []) as
      | Array<AdminMainCategorySubcategory | string | null | undefined>
      | string
      | null
      | undefined;

  if (!Array.isArray(rawCandidates)) {
    if (typeof rawCandidates === 'string') {
      const trimmed = rawCandidates.trim();
      return trimmed.length > 0 ? [trimmed] : [];
    }
    return [];
  }

  return rawCandidates
    .map((entry, index) => {
      if (typeof entry === 'string') {
        return entry.trim();
      }
      if (entry && typeof entry === 'object') {
        const candidate =
          (entry as AdminMainCategorySubcategory).name ??
          (entry as AdminMainCategorySubcategory).title ??
          (entry as AdminMainCategorySubcategory).label;
        if (typeof candidate === 'string' && candidate.trim().length > 0) {
          return candidate.trim();
        }
        return `Subcategory ${index + 1}`;
      }
      return null;
    })
    .filter((value): value is string => Boolean(value));
}

function normalizeJobReports(category: AdminMainCategory): SettingsReportReasons['jobReports'] {
  const nestedReports = category.reportReasons?.jobReports;
  const rawReports = Array.isArray(nestedReports)
    ? nestedReports
    : Array.isArray(category.jobReports)
    ? category.jobReports
    : [];

  return rawReports
    .map((report, index) => {
      const normalizedReason =
        typeof report?.reason === 'string' && report.reason.trim().length > 0
          ? report.reason.trim()
          : `Report ${index + 1}`;
      return {
        reason: normalizedReason,
        autoBlock: Boolean((report as AdminCategoryJobReport)?.autoBlock),
      };
    })
    .filter((report) => Boolean(report.reason));
}

function pickIconInfo(
  category: AdminMainCategory,
  index: number,
): { url: string | undefined; isFallback: boolean } {
  const candidates = [
    category.icon,
    category.image,
    category.thumbnail,
    category.coverImage,
  ].filter((value): value is string => typeof value === 'string' && value.trim().length > 0);
  if (candidates.length > 0) {
    return { url: candidates[0], isFallback: false };
  }
  return {
    url: DEFAULT_ICON_FALLBACKS[index % DEFAULT_ICON_FALLBACKS.length],
    isFallback: true,
  };
}

function normalizeReportReason(
  primary?: string,
  secondary?: string,
  fallback?: string,
): string {
  const candidate = primary ?? secondary ?? fallback;
  if (typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate.trim();
  }
  return '—';
}

function normalizeTips(category: AdminMainCategory): SettingsTip {
  const nested = category.jobTips ?? category.tips ?? null;
  const titleCandidate =
    nested?.title ?? category.jobTipTitle ?? category.tipTitle ?? DEFAULT_JOB_TIP.title;
  const descriptionCandidate =
    nested?.description ??
    category.jobTipDescription ??
    category.tipDescription ??
    DEFAULT_JOB_TIP.description;

  return {
    title:
      typeof titleCandidate === 'string' && titleCandidate.trim().length > 0
        ? titleCandidate.trim()
        : DEFAULT_JOB_TIP.title,
    description:
      typeof descriptionCandidate === 'string' && descriptionCandidate.trim().length > 0
        ? descriptionCandidate.trim()
        : DEFAULT_JOB_TIP.description,
  };
}

function normalizeCategoryName(category: AdminMainCategory, index: number): string {
  const candidate =
    category.name ?? category.title ?? category.category ?? `Category ${index + 1}`;
  if (typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate.trim();
  }
  return `Category ${index + 1}`;
}

function normalizeJobId(category: AdminMainCategory, index: number): string {
  const candidate =
    category.reference ??
    category.code ??
    (typeof category.id === 'string' ? category.id : undefined);
  if (typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate.trim();
  }
  if (typeof category.uuid === 'string' && category.uuid.trim().length > 0) {
    return `#CT-${category.uuid.replace(/[^A-Za-z0-9]/g, '').slice(0, 6).toUpperCase()}`;
  }
  return `#CT${(index + 1).toString().padStart(4, '0')}`;
}

export function mapAdminMainCategoryToSettingsCategory(
  category: AdminMainCategory,
  index: number,
): SettingsCategoryItem {
  const subCategories = normalizeSubCategories(category);
  const jobReports = normalizeJobReports(category);
  const subCategoryCount =
    typeof category.subCategoryCount === 'number' && !Number.isNaN(category.subCategoryCount)
      ? category.subCategoryCount
      : subCategories.length;

  const reportReasons: SettingsReportReasons = {
    reportingServiceProvider: normalizeReportReason(
      category.reportReasons?.reportingServiceProvider,
      category.reportingServiceProvider,
      category.reportProviderReason,
    ),
    reportingClient: normalizeReportReason(
      category.reportReasons?.reportingClient,
      category.reportingClient,
      category.reportClientReason,
    ),
    jobReports,
  };

  const { url: iconUrl, isFallback } = pickIconInfo(category, index);

  return {
    jobId: normalizeJobId(category, index),
    category: normalizeCategoryName(category, index),
    subCategories:
      subCategories.length > 0
        ? subCategories
        : subCategoryCount > 0
        ? Array.from({ length: subCategoryCount }, (_, subIndex) => `Subcategory ${subIndex + 1}`)
        : [DEFAULT_SUBCATEGORY],
    subCategoryCount,
    icon: iconUrl,
    iconMissing: isFallback,
    reportReasons,
    jobTips: normalizeTips(category),
    uuid: typeof category.uuid === 'string' && category.uuid.trim().length > 0 ? category.uuid : undefined,
  };
}

export function mapAdminMainCategoriesToSettingsCategories(
  categories: AdminMainCategory[],
): SettingsCategoryItem[] {
  if (!Array.isArray(categories) || categories.length === 0) {
    return [];
  }
  return categories.map((category, index) => mapAdminMainCategoryToSettingsCategory(category, index));
}
