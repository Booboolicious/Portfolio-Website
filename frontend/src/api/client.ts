import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8081/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Helpers ────────────────────────────────────────────────────────────────
const unwrap = (res: any) => res.data;

// ─── Contact Messages ────────────────────────────────────────────────────────
export const postMessage = async (body: any) => {
  const res = await api.post('/contact/messages', body);
  return unwrap(res);
};

export const getMessages = async () => {
  const res = await api.get('/data/messages');
  return unwrap(res);
};

// ─── Portfolio ───────────────────────────────────────────────────────────────
export const getPortfolio = async () => {
  const res = await api.get(`/data?t=${Date.now()}`);
  return unwrap(res);
};

// ─── Personal ────────────────────────────────────────────────────────────────
export const getPersonal = async () => {
  const res = await api.get('/data/personal');
  return unwrap(res);
};

export const patchPersonal = async (body: any) => {
  const res = await api.patch('/data/personal', body);
  return unwrap(res);
};

// ─── Stats ───────────────────────────────────────────────────────────────────
export const getStats = async () => {
  const res = await api.get('/data/stats');
  return unwrap(res);
};

export const patchStats = async (body: any) => {
  const res = await api.patch('/data/stats', body);
  return unwrap(res);
};

// ─── About ───────────────────────────────────────────────────────────────────
export const getAbout = async () => {
  const res = await api.get('/data/about');
  return unwrap(res);
};

export const patchAbout = async (body: any) => {
  const res = await api.patch('/data/about', body);
  return unwrap(res);
};

// ─── Contact ─────────────────────────────────────────────────────────────────
export const getContact = async () => {
  const res = await api.get('/data/contact');
  return unwrap(res);
};

export const patchContact = async (body: any) => {
  const res = await api.patch('/data/contact', body);
  return unwrap(res);
};

// ─── Projects ────────────────────────────────────────────────────────────────
export const getProjects = async () => {
  const res = await api.get('/data/projects');
  return unwrap(res);
};

export const postProject = async (body: any) => {
  const res = await api.post('/data/projects', body);
  return unwrap(res);
};

export const putProject = async (id: number, body: any) => {
  const res = await api.put(`/data/projects/${id}`, body);
  return unwrap(res);
};

export const deleteProject = async (id: number) => {
  const res = await api.delete(`/data/projects/${id}`);
  return unwrap(res);
};

// ─── Timeline ────────────────────────────────────────────────────────────────
export const getTimeline = async () => {
  const res = await api.get('/data/timeline');
  return unwrap(res);
};

export const postTimeline = async (body: any) => {
  const res = await api.post('/data/timeline', body);
  return unwrap(res);
};

export const putTimeline = async (id: number, body: any) => {
  const res = await api.put(`/data/timeline/${id}`, body);
  return unwrap(res);
};

export const deleteTimeline = async (id: number) => {
  const res = await api.delete(`/data/timeline/${id}`);
  return unwrap(res);
};

// ─── Experience ──────────────────────────────────────────────────────────────
export const getExperience = async () => {
  const res = await api.get('/data/experience');
  return unwrap(res);
};

export const postExperience = async (body: any) => {
  const res = await api.post('/data/experience', body);
  return unwrap(res);
};

export const putExperience = async (id: number, body: any) => {
  const res = await api.put(`/data/experience/${id}`, body);
  return unwrap(res);
};

export const deleteExperience = async (id: number) => {
  const res = await api.delete(`/data/experience/${id}`);
  return unwrap(res);
};

// ─── Education ───────────────────────────────────────────────────────────────
export const getEducation = async () => {
  const res = await api.get('/data/education');
  return unwrap(res);
};

export const postEducation = async (body: any) => {
  const res = await api.post('/data/education', body);
  return unwrap(res);
};

export const putEducation = async (id: number, body: any) => {
  const res = await api.put(`/data/education/${id}`, body);
  return unwrap(res);
};

export const deleteEducation = async (id: number) => {
  const res = await api.delete(`/data/education/${id}`);
  return unwrap(res);
};

// ─── Certifications ──────────────────────────────────────────────────────────
export const getCertifications = async () => {
  const res = await api.get('/data/certifications');
  return unwrap(res);
};

export const postCertification = async (body: any) => {
  const res = await api.post('/data/certifications', body);
  return unwrap(res);
};

export const putCertification = async (id: number, body: any) => {
  const res = await api.put(`/data/certifications/${id}`, body);
  return unwrap(res);
};

export const deleteCertification = async (id: number) => {
  const res = await api.delete(`/data/certifications/${id}`);
  return unwrap(res);
};

// ─── Honors ──────────────────────────────────────────────────────────────────
export const getHonors = async () => {
  const res = await api.get('/data/honors');
  return unwrap(res);
};

export const postHonor = async (body: any) => {
  const res = await api.post('/data/honors', body);
  return unwrap(res);
};

export const putHonor = async (id: number, body: any) => {
  const res = await api.put(`/data/honors/${id}`, body);
  return unwrap(res);
};

export const deleteHonor = async (id: number) => {
  const res = await api.delete(`/data/honors/${id}`);
  return unwrap(res);
};

// ─── Spoken Languages ────────────────────────────────────────────────────────
export const getSpokenLanguages = async () => {
  const res = await api.get('/data/spoken_languages');
  return unwrap(res);
};

export const postSpokenLanguage = async (body: any) => {
  const res = await api.post('/data/spoken_languages', body);
  return unwrap(res);
};

export const putSpokenLanguage = async (id: number, body: any) => {
  const res = await api.put(`/data/spoken_languages/${id}`, body);
  return unwrap(res);
};

export const deleteSpokenLanguage = async (id: number) => {
  const res = await api.delete(`/data/spoken_languages/${id}`);
  return unwrap(res);
};

// ─── Tech Stack ──────────────────────────────────────────────────────────────
export const getTechStack = async () => {
  const res = await api.get('/data/tech_stack');
  return unwrap(res);
};

export const postTechStackItem = async (body: string) => {
  const res = await api.post('/data/tech_stack', body);
  return unwrap(res);
};

export const deleteTechStackItem = async (id: number) => {
  const res = await api.delete(`/data/tech_stack/${id}`);
  return unwrap(res);
};

// ─── Skills ──────────────────────────────────────────────────────────────────
export const getFrontendSkills = async () => {
  const res = await api.get('/data/skills/frontend');
  return unwrap(res);
};

export const postFrontendSkill = async (body: any) => {
  const res = await api.post('/data/skills/frontend', body);
  return unwrap(res);
};

export const deleteFrontendSkill = async (id: number) => {
  const res = await api.delete(`/data/skills/frontend/${id}`);
  return unwrap(res);
};

export const getBackendSkills = async () => {
  const res = await api.get('/data/skills/backend');
  return unwrap(res);
};

export const postBackendSkill = async (body: any) => {
  const res = await api.post('/data/skills/backend', body);
  return unwrap(res);
};

export const deleteBackendSkill = async (id: number) => {
  const res = await api.delete(`/data/skills/backend/${id}`);
  return unwrap(res);
};

export const patchSkills = async (body: any) => {
  const res = await api.patch('/data/skills', body);
  return unwrap(res);
};
