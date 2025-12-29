export default function JobCreateHeader() {
    return (
        <div className="job-create-header">
            <header className="flex items-center gap-2 pb-2 md:pb-4 lg:pb-8">
                <button>
                    <img
                        className="w-5 h-5 md:w-6 md:h-6 lg:w-9 lg:h-9"
                        src="/public/images/JobCreateHeader/BackIcon.png"
                        alt="Back"
                    />
                </button>
                <p className="text-base font-normal md:text-lg md:font-medium lg:text-2xl lg:font-semibold">
                    Post a Job
                </p>
            </header>

            <nav className="pb-4 sm:pb-2 md:pb-4 lg:pb-8">
                <ul className="flex flex-col items-center 
                  sm:grid sm:grid-cols-2 sm:gap-2 sm:p-2 sm:border sm:border-[#D6DDEB] sm:rounded
                  md:flex md:flex-row md:justify-evenly md:gap-0 md:p-0">
                    <li
                        className="w-full sm:w-full md:w-auto justify-start flex gap-4 items-center py-2 px-4 border-b border-b-[#D6DDEB]
                        lg:py-2 lg:px-4 
                        xl:py-3 xl:px-8 
                        sm:border-b-0">
                        <img
                            className="w-9 h-9
                            sm:w-7 sm:h-7
                            lg:w-9 lg:h-9 
                            xl:w-12 xl:h-12"
                            src="/public/images/JobCreateHeader/JobCase.png"
                            alt="Job Case"
                        />
                        <section className="text-justify">
                            <p className="text-[#7C8493] text-sm sm:text-[10px] md:text-xs lg:text-sm xl:text-base">
                                Step 1/4
                            </p>
                            <p className="text-sm font-semibold
                            sm:text-xs sm:font-medium
                            lg:text-base
                            xl:text-lg xl:font-semibold">
                                Job Information
                            </p>
                        </section>
                    </li>

                    <li
                        className="w-full sm:w-full md:w-auto justify-start flex gap-4 items-center py-2 px-4 border-b border-b-[#D6DDEB]
                        lg:py-2 lg:px-4 
                        xl:py-3 xl:px-8 
                        sm:border-b-0">
                        <img
                            className="w-9 h-9
                            sm:w-7 sm:h-7
                            lg:w-9 lg:h-9 
                            xl:w-12 xl:h-12"
                            src="/public/images/JobCreateHeader/JobDescSelected.png"
                            alt="Job Description"
                        />
                        <section className="text-justify">
                            <p className="text-[#7C8493] text-sm sm:text-[10px] md:text-xs lg:text-sm xl:text-base">
                                Step 2/4
                            </p>
                            <p className="text-sm font-semibold
                            sm:text-xs sm:font-medium
                            lg:text-base
                            xl:text-lg xl:font-semibold">
                                Job Description
                            </p>
                        </section>
                    </li>

                    <li
                        className="w-full sm:w-full md:w-auto justify-start flex gap-4 items-center py-2 px-4 border-b border-b-[#D6DDEB]
                        lg:py-2 lg:px-4 
                        xl:py-3 xl:px-8
                        sm:border-b-0">
                        <img
                            className="w-9 h-9
                            sm:w-7 sm:h-7
                            lg:w-9 lg:h-9 
                            xl:w-12 xl:h-12"
                            src="/public/images/JobCreateHeader/PerksSelected.png"
                            alt="Job Perks & Benefits"
                        />
                        <section className="text-justify">
                            <p className="text-[#7C8493] text-sm sm:text-[10px] md:text-xs lg:text-sm xl:text-base">
                                Step 3/4
                            </p>
                            <p className="text-sm font-semibold
                            sm:text-xs sm:font-medium
                            lg:text-base
                            xl:text-lg xl:font-semibold">
                                Job Perks & Benefits
                            </p>
                        </section>
                    </li>

                    <li
                        className="w-full sm:w-full md:w-auto justify-start flex gap-4 items-center py-2 px-4
                        lg:py-2 lg:px-4 
                        xl:py-3 xl:px-8">
                        <img
                            className="w-9 h-9
                            sm:w-7 sm:h-7
                            lg:w-9 lg:h-9 
                            xl:w-12 xl:h-12"
                            src="/public/images/JobCreateHeader/JobQuestionsSelected.png"
                            alt="Job Application Questions"
                        />
                        <section className="text-justify">
                            <p className="text-[#7C8493] text-sm sm:text-[10px] md:text-xs lg:text-sm xl:text-base">
                                Step 4/4
                            </p>
                            <p className="text-sm font-semibold
                            sm:text-xs sm:font-medium
                            lg:text-base
                            xl:text-lg xl:font-semibold">
                                Job Application Questions
                            </p>
                        </section>
                    </li>
                </ul>
            </nav>
        </div>
    );
}