const SimilarJopCard = () => {
  return (
    <>
      <article className="group bg-[#FFFFFF] flex max-xl:flex-col max-lg:flex-col max-sm:flex-col p-6 gap-3 border-2 border-transparent hover:border-[#4640DE] hover:shadow-lg transition duration-200 ease-in-out">
        <img className="w-12 h-14" src="/SimilarJopIcon.png" alt="jopIcon" />
        <div>
          <h3 className="text-xl text-[#25324B] group-hover:text-[#4640DE] font-semibold mb-2">
            Social Media Assistant
          </h3>
          <span className=" text-[#515B6F] my-2">Nomad . Paris, France</span>
          <div>
            <span className="text-[#FFB836] bg-[#EB85331A] w-fit inline-block text-base font-semibold rounded-3xl text-center mt-4 mr-4 p-2">
              Marketing
            </span>
            <span className="text-[#56CDAD] bg-[#56CDAD1A] w-fit inline-block text-base font-semibold rounded-3xl text-center mt-4 mr-4 p-2 ">
              Design
            </span>
            <span className="text-[#4640DE] p-2 bg-[#F8F8FD] w-fit inline-block text-base font-semibold rounded-3xl text-center my-1 mr-4">
              Project Management
            </span>
          </div>
        </div>
      </article>
    </>
  )
}

export default SimilarJopCard
