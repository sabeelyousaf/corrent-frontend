import {useDropzone} from 'react-dropzone';

const ImageUploader = ({images, setImages}) => {
  const {getRootProps, getInputProps, isDragActive} = useDropzone ({
    accept: {
      'image/*': [],
    },
    onDrop: acceptedFiles => {
      const newImages = acceptedFiles.map (file =>
        Object.assign (file, {
          preview: URL.createObjectURL (file),
        })
      );
      setImages (prev => [...prev, ...newImages]);
    },
  });

  const removeImage = index => {
    setImages (images.filter ((_, i) => i !== index));
  };

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
      </div>

      {/* Image Previews */}
      {images.length > 0 &&
        <div className="grid grid-cols-4 gap-4 mt-4">
          {images.map ((file, index) => (
            <div key={index} className="relative group">
              <img
                src={file.preview}
                alt={`Property ${index + 1}`}
                className="w-full h-24 object-cover rounded shadow"
              />
              <button
                type="button"
                onClick={() => removeImage (index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hidden group-hover:block"
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
