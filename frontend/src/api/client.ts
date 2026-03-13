import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8081/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Helpers ────────────────────────────────────────────────────────────────
const unwrap = (res: any) => res.data;

// ─── Contact Messages ────────────────────────────────────────────────────────
export const postMessage       = (body: any) => api.post('/contact/messages', body).then(unwrap);
export const getMessages       = () => api.get('/data/messages').then(unwrap);

// ─── Portfolio ───────────────────────────────────────────────────────────────
export const getPortfolio      = () => api.get('/data').then(unwrap);

// ─── Personal ────────────────────────────────────────────────────────────────
export const getPersonal       = () => api.get('/data/personal').then(unwrap);
export const patchPersonal     = (body: any) => api.patch('/data/personal', body).then(unwrap);

// ─── Stats ───────────────────────────────────────────────────────────────────
export const getStats          = () => api.get('/data/stats').then(unwrap);
export const patchStats        = (body: any) => api.patch('/data/stats', body).then(unwrap);

// ─── About ───────────────────────────────────────────────────────────────────
export const getAbout          = () => api.get('/data/about').then(unwrap);
export const patchAbout        = (body: any) => api.patch('/data/about', body).then(unwrap);

// ─── Contact ─────────────────────────────────────────────────────────────────
export const getContact        = () => api.get('/data/contact').then(unwrap);
export const patchContact      = (body: any) => api.patch('/data/contact', body).then(unwrap);

// ─── Projects ────────────────────────────────────────────────────────────────
export const getProjects       = () => api.get('/data/projects').then(unwrap);
export const postProject       = (body: any) => api.post('/data/projects', body).then(unwrap);
export const putProject        = (id: number, body: any) => api.put(`/data/projects/${id}`, body).then(unwrap);
export const deleteProject     = (id: number) => api.delete(`/data/projects/${id}`).then(unwrap);

// ─── Timeline ────────────────────────────────────────────────────────────────
export const getTimeline       = () => api.get('/data/timeline').then(unwrap);
export const postTimeline      = (body: any) => api.post('/data/timeline', body).then(unwrap);
export const putTimeline       = (id: number, body: any) => api.put(`/data/timeline/${id}`, body).then(unwrap);
export const deleteTimeline    = (id: number) => api.delete(`/data/timeline/${id}`).then(unwrap);

// ─── Experience ──────────────────────────────────────────────────────────────
export const getExperience     = () => api.get('/data/experience').then(unwrap);
export const postExperience    = (body: any) => api.post('/data/experience', body).then(unwrap);
export const putExperience     = (id: number, body: any) => api.put(`/data/experience/${id}`, body).then(unwrap);
export const deleteExperience  = (id: number) => api.delete(`/data/experience/${id}`).then(unwrap);

// ─── Education ───────────────────────────────────────────────────────────────
export const getEducation      = () => api.get('/data/education').then(unwrap);
export const postEducation     = (body: any) => api.post('/data/education', body).then(unwrap);
export const putEducation      = (id: number, body: any) => api.put(`/data/education/${id}`, body).then(unwrap);
export const deleteEducation   = (id: number) => api.delete(`/data/education/${id}`).then(unwrap);

// ─── Certifications ──────────────────────────────────────────────────────────
export const getCertifications = () => api.get('/data/certifications').then(unwrap);
export const postCertification = (body: any) => api.post('/data/certifications', body).then(unwrap);
export const putCertification  = (id: number, body: any) => api.put(`/data/certifications/${id}`, body).then(unwrap);
export const deleteCertification = (id: number) => api.delete(`/data/certifications/${id}`).then(unwrap);

// ─── Honors ──────────────────────────────────────────────────────────────────
export const getHonors         = () => api.get('/data/honors').then(unwrap);
export const postHonor         = (body: any) => api.post('/data/honors', body).then(unwrap);
export const putHonor          = (id: number, body: any) => api.put(`/data/honors/${id}`, body).then(unwrap);
export const deleteHonor       = (id: number) => api.delete(`/data/honors/${id}`).then(unwrap);

// ─── Spoken Languages ────────────────────────────────────────────────────────
export const getSpokenLanguages = () => api.get('/data/spoken_languages').then(unwrap);
export const postSpokenLanguage = (body: any) => api.post('/data/spoken_languages', body).then(unwrap);
export const putSpokenLanguage  = (id: number, body: any) => api.put(`/data/spoken_languages/${id}`, body).then(unwrap);
export const deleteSpokenLanguage = (id: number) => api.delete(`/data/spoken_languages/${id}`).then(unwrap);

// ─── Tech Stack ──────────────────────────────────────────────────────────────
export const getTechStack      = () => api.get('/data/tech_stack').then(unwrap);
export const postTechStackItem = (body: string) => api.post('/data/tech_stack', body).then(unwrap);
export const deleteTechStackItem = (id: number) => api.delete(`/data/tech_stack/${id}`).then(unwrap);

// ─── Skills ──────────────────────────────────────────────────────────────────
export const getFrontendSkills  = () => api.get('/data/skills/frontend').then(unwrap);
export const postFrontendSkill  = (body: any) => api.post('/data/skills/frontend', body).then(unwrap);
export const deleteFrontendSkill = (id: number) => api.delete(`/data/skills/frontend/${id}`).then(unwrap);

export const getBackendSkills   = () => api.get('/data/skills/backend').then(unwrap);
export const postBackendSkill   = (body: any) => api.post('/data/skills/backend', body).then(unwrap);
export const deleteBackendSkill = (id: number) => api.delete(`/data/skills/backend/${id}`).then(unwrap);
