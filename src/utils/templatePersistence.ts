import { TemplateModel } from '../types/template';

const ACTIVE_TEMPLATE_ID_KEY = 'scoped_ai_active_template_id_v1';
const TEMPLATE_PERSISTENCE_PREFIX = 'scoped_ai_saved_template_';

const memoryStorage = new Map<string, string>();

function getItem(key: string): string | null {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
  } catch {}
  return memoryStorage.get(key) || null;
}

function setItem(key: string, value: string): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
      return;
    }
  } catch {}
  memoryStorage.set(key, value);
}

function removeItem(key: string): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
      return;
    }
  } catch {}
  memoryStorage.delete(key);
}

/**
 * Persists a customized canonical TemplateModel for a specific template ID.
 */
export function savePersistedTemplate(templateId: string, model: TemplateModel): boolean {
  try {
    const key = `${TEMPLATE_PERSISTENCE_PREFIX}${templateId}_v1`;
    setItem(key, JSON.stringify(model));
    return true;
  } catch (err) {
    console.error(`Failed to persist template "${templateId}" to storage:`, err);
    return false;
  }
}

/**
 * Loads a persisted customized TemplateModel for a specific template ID.
 * Returns null if no customization exists.
 */
export function loadPersistedTemplate(templateId: string): TemplateModel | null {
  try {
    const key = `${TEMPLATE_PERSISTENCE_PREFIX}${templateId}_v1`;
    const saved = getItem(key);
    if (saved) {
      return JSON.parse(saved) as TemplateModel;
    }
  } catch (err) {
    console.error(`Failed to load persisted template "${templateId}" from storage:`, err);
  }
  return null;
}

/**
 * Removes a persisted customized TemplateModel for a specific template ID (Reset Template).
 */
export function removePersistedTemplate(templateId: string): boolean {
  try {
    const key = `${TEMPLATE_PERSISTENCE_PREFIX}${templateId}_v1`;
    removeItem(key);
    return true;
  } catch (err) {
    console.error(`Failed to remove persisted template "${templateId}" from storage:`, err);
    return false;
  }
}

/**
 * Persists the active template ID.
 */
export function saveActiveTemplateId(templateId: string | null): void {
  try {
    if (templateId) {
      setItem(ACTIVE_TEMPLATE_ID_KEY, templateId);
    } else {
      removeItem(ACTIVE_TEMPLATE_ID_KEY);
    }
  } catch (err) {
    console.error('Failed to save active template ID to storage:', err);
  }
}

/**
 * Loads the active template ID.
 */
export function loadActiveTemplateId(): string | null {
  try {
    return getItem(ACTIVE_TEMPLATE_ID_KEY);
  } catch (err) {
    console.error('Failed to load active template ID from storage:', err);
    return null;
  }
}
