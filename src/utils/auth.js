export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function isLoggedIn() {
  return !!getToken();
}

export function getUser() {
  const token = getToken();
  if (!token) {
    console.log('No token found in localStorage');
    return null;
  }
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));
    console.log('JWT decoded:', decoded); // Depuración
    return {
      id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '',
      email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || '',
      phone: decoded['phone'] || '',
      role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || ''
    };
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}