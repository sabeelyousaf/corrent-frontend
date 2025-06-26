import {useState, useCallback} from 'react';

const ImageUploader = ({images, setImages, multiple = true, maxFiles = 10}) => {
  const [isDragging, setIsDragging] = useState (false);

  const handleFileChange = e => {
    const files = Array.from (e.target.files);
    if (files.length + images.length > maxFiles) {
      alert (`You can upload a maximum of ${maxFiles} files`);
      return;
    }
    setImages (prev => [...prev, ...files]);
  };

  const handleDragOver = e => {
    e.preventDefault ();
    setIsDragging (true);
  };

  const handleDragLeave = () => {
    setIsDragging (false);
  };

  const handleDrop = e => {
    e.preventDefault ();
    setIsDragging (false);
    const files = Array.from (e.dataTransfer.files);
    if (files.length + images.length > maxFiles) {
      alert (`You can upload a maximum of ${maxFiles} files`);
      return;
    }
    setImages (prev => [...prev, ...files]);
  };

  const removeImage = index => {
    setImages (prev => prev.filter ((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="property-images"
          className="hidden"
          multiple={multiple}
          accept="image/*"
          onChange={handleFileChange}
        />
        <label
          htmlFor="property-images"
          className="cursor-pointer flex flex-col items-center justify-center space-y-2"
        >
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-gray-600">
            {isDragging
              ? 'Drop images here'
              : 'Drag & drop images here or click to browse'}
          </p>
          <p className="text-xs text-gray-500">
            {multiple
              ? `Upload up to ${maxFiles} images (${maxFiles - images.length} remaining)`
              : 'Upload a single image'}
          </p>
        </label>
      </div>

      {images.length > 0 &&
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map ((file, index) => (
            <div key={index} className="relative group">
              <img
                src={file instanceof File ? URL.createObjectURL (file) : file}
                alt={`Property ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage (index)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>}
    </div>
  );
};

export default ImageUploader;
