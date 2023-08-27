export const getUserPbImageURL = (item, fileName = 'avatar') => 
  `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName]}`