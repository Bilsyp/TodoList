export const updateItemChecked = (array, id, checked) => {
  const previousArray = [...array];
  const updatedArray = array.map((item) => {
    const previousItem = previousArray.find(
      (prevItem) => prevItem.id === item.id
    );
    if (item.id === id) {
      return {
        ...previousItem, // Meng-overwrite item dengan nilai dari array sebelumnya
        checked: checked, // Meng-overwrite kunci 'checked' dengan nilai baru
      };
    }
    return item; // Mempertahankan item yang tidak berubah
  });
  return updatedArray;
};
