import PerksBenefitCard from './Cards/PerkBenefitCard'

type Benefit = {
  [key: string]: any
}

type PerksBenefitsProps = {
  Benefits?: Benefit[]
}

const PerksBenefits = ({ Benefits = [] }: PerksBenefitsProps) => {
  return (
    <>
      <section className="bg-[#FFFFFF]">
        <div className="w-4/5 m-auto ">
          <div>
            <h2 className="text-[#25324B] text-3xl font-semibold mb-2 max-sm:mt-8">
              Perks & Benefits
            </h2>
            <span className=" text-[#515B6F] my-2">
              Community engagement to ensure that is supported and actively
              represented online
            </span>
          </div>
          <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-8 mb-8">
            {Benefits.map((benefit) => (
              <PerksBenefitCard key={benefit?._id} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default PerksBenefits
