import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
// JSON locale imports (static so bundler can include them)
import en from './locales/en.json';
import zh from './locales/zh.json';

// Translation resources (extend here)
const translations = {
	en,
	zh,
	'zh-CN': zh,
	'zh-TW': zh,
};

// Create I18n instance with fallback support
const i18n = new I18n(translations, { enableFallback: true });

const FALLBACK_LOCALE = 'en';

const detectDeviceLocale = (): string => {
	try {
		// @ts-ignore runtime detection (newer API)
		if (typeof Localization.getLocales === 'function') {
			// @ts-ignore
			const locales = Localization.getLocales();
			if (locales?.length) {
				return (locales[0].languageTag || locales[0].languageCode) as string;
			}
		}
		// @ts-ignore older API
		return (Localization.locale as string) || FALLBACK_LOCALE;
	} catch {
		return FALLBACK_LOCALE;
	}
};

const normalizeLocale = (raw: string): string => {
	if (!raw) return FALLBACK_LOCALE;
	const tag = raw.replace('_', '-');
	if (translations[tag as keyof typeof translations]) return tag;
	const base = tag.split('-')[0];
	if (translations[base as keyof typeof translations]) return base;
	return FALLBACK_LOCALE;
};

// Initialize locale
const initialLocale = normalizeLocale(detectDeviceLocale());
i18n.locale = initialLocale;

// Type of translation keys (derived from English base JSON)
export const t = (key: string, options?: Parameters<I18n['t']>[1]) => i18n.t(key as string, options) as string;

interface LanguageContextValue {
	locale: string;
	setLocale: (next: string) => void;
	t: typeof t;
	available: string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [locale, setLocaleState] = useState<string>(i18n.locale);

	const setLocale = useCallback((next: string) => {
		const normalized = normalizeLocale(next);
		i18n.locale = normalized;
		setLocaleState(normalized);
	}, []);

	const value = useMemo<LanguageContextValue>(() => ({
		locale,
		setLocale,
		t,
		available: ['en', 'zh'],
	}), [locale, setLocale]);

	// Return without JSX (file kept as .ts)
	return React.createElement(LanguageContext.Provider, { value }, children as any);
};

export const useLanguage = () => {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
	return ctx;
};

export const supportedLocales = ['en', 'zh', 'es'] as const;
export type SupportedLocale = typeof supportedLocales[number];

export const isRTL = () => ['ar', 'he', 'fa'].includes(i18n.locale.split('-')[0]);

export default i18n;

