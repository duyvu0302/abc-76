import Image from "next/image";

interface ServiceSectionProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ServiceSection({
  title,
  description,
  imageUrl,
}: ServiceSectionProps) {
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/3">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h3 className="text-xl font-bold text-center md:text-left mb-3">
            {title}
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
