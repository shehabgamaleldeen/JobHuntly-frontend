export function InputTitle({ title, description }: { title: string; description: string }) {
    return (
        <div className="w-1/2">
            <p className="text-base font-semibold
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