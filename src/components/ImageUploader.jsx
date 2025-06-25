import {useEffect} from 'react';
import {useDropzone} from 'react-dropzone';

const ImageUploader = ({images, setImages}) => {
  const {getRootProps, getInputProps, isDragActive} = useDropzone ({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    onDrop: acceptedFiles => {
      const newImages = acceptedFiles.map (file =>
        Object.assign (file, {
          preview: URL.createObjectURL (file), // For preview
        })
      );
      setImages (prev => [...prev, ...newImages]); // Store File objects
    },
  });

  const removeImage = index => {
    URL.revokeObjectURL (images[index].preview); // Cleanup preview
    setImages (images.filter ((_, i) => i !== index));
  };

  // Cleanup on unmount
  useEffect (
    () => {
      return () => {
        images.forEach (image => URL.revokeObjectURL (image.preview));
      };
    },
    [images]
  );

  return (
    <div className="w-full bg-white">
      <div
        {...getRootProps ()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${isDragActive ? 'bg-blue-50 border-blue-400' : 'bg-white'}`}
      >
        <input {...getInputProps ()} />
        <p className="text-sm text-zinc-500">
          Drag & drop property images here, or click to select
        </p>
        <p className="text-xs text-zinc-400 mt-1">(Max 10 images)</p>
      </div>

      {/* Previews */}
      {images.length > 0 &&
        <div className="grid grid-cols-4 gap-4 mt-4">
          {images.map ((file, index) => (
            <div key={index} className="relative group">
              <img
                src={file.preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded shadow"
                onLoad={() => URL.revokeObjectURL (file.preview)}
              />
              <button
                type="button"
                onClick={() => removeImage (index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>}
    </div>
  );
};

export default ImageUploader;
