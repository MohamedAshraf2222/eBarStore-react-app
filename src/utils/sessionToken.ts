export const generateSessionToken = (): string => {
  const array = new Uint8Array(32); // 32 bytes = 64 hex chars
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
};


export const sessionTokenManager = () => {
  const TOKEN_KEY = "eBarSessionToken";

  const getToken = (): string => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token || generateAndStoreToken();
  };

  const generateAndStoreToken = (): string => {
    const newToken = generateSessionToken();
    localStorage.setItem(TOKEN_KEY, newToken);
    return newToken;
  };

  return { getToken };
};
