export const readFileAsText = async (file: File) => (
  new Promise((resolve: (value: string) => void, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  })
);
