import type { Images } from "../Types";

function CompanyImagesSection({ images }: { images: Images[] }) {
  if (!images || images.length === 0) return null;

  const [mainImage, ...restImages] = images;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        
        <div className="w-full md:w-2/3 lg:w-[478px] aspect-[478/606]">
          <img
            src={mainImage.src}
            alt="Company"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {restImages.length > 0 && (
          <div className="flex flex-row md:flex-col gap-4 w-full md:w-1/3 lg:w-[262px]">
            {restImages.map((img, idx) => (
              <div key={idx} className="w-full aspect-[262/194]">
                <img
                  src={img.src}
                  alt={`Company ${idx + 2}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default CompanyImagesSection;
