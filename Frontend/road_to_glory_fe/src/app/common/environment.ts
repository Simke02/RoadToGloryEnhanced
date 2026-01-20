// In Docker/nginx environment, use empty string for relative URLs
// When running frontend separately (e.g., ng serve), use full backend URL
export const environment = {
    production: false,
    // Set this to '' when running with Docker/nginx (requests will be proxied)
    // Set this to 'http://localhost:3000' when running frontend separately with 'ng serve'
    baseApiUrl: 'http://localhost:3000' 
};
