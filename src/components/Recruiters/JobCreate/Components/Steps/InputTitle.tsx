export function InputTitle({ title, description }: { title: string; description: string }) {
    return (
        <div className="w-1/2 mr-4">
            <p className="text-sm font-normal
                            sm:text-xs sm:font-medium
                            md:text-sm md:font-medium
                            lg:text-base
                            xl:text-lg xl:font-semibold">
                {title}
            </p>
            <p className="text-[#7C8493] text-xs 
            lg:text-sm xl:text-base">
                {description}
            </p>
        </div>
    );
}