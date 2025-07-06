import { Subject } from '../types';

const API_BASE = 'https://tracebound-college-backend.onrender.com/api';

// === Reasoning API ===
export async function callBackendAPI(problem: string, subject: Subject): Promise<{ success: boolean; reasoning?: string; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/solve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problem, subject })
    });

    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();

    return { success: true, reasoning: data.solution };
  } catch (error: any) {
    console.error('❌ API Error:', error);
    return { success: false, error: error?.message || 'Failed to connect to reasoning API.' };
  }
}

// === Audit API ===
export async function callBackendAudit(reasoning: string): Promise<{ success: boolean; audit?: string; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/audit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reasoning })
    });

    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();

    return { success: true, audit: data.audit };
  } catch (error: any) {
    console.error('❌ Audit API Error:', error);
    return { success: false, error: error?.message || 'Failed to connect to audit API.' };
  }
}

// === OCR API ===
export async function callOCRAPI(imageFile: File): Promise<{ success: boolean; text?: string; error?: string }> {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE}/ocr`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();

    return { success: true, text: data.text };
  } catch (error: any) {
    console.error('❌ OCR API Error:', error);
    return { success: false, error: error?.message || 'Failed to connect to OCR API.' };
  }
}

// === Optional Utilities ===
export async function wakeUpRenderServer(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

export async function monitorBackendStatus(): Promise<void> {
  console.log('📡 Connected to:', API_BASE);
}

export async function debugNetworkStatus(): Promise<void> {
  console.log('🌐 Using live backend at:', API_BASE);
}
