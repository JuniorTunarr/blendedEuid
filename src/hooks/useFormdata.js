const apiEndpoint = import.meta.env.VITE_PB_API;
export function useUpdateWithFormData() {
  return async function updateUser(userId, userData) {
    const formData = new FormData();
    for (let key in userData) {
      formData.append(key, userData[key]);
    }
    
    return await fetch(
      `${apiEndpoint}/collections/users/records/${userId}`,
      {
        method: 'PATCH',
        body: formData
      }
    );
  };
}
