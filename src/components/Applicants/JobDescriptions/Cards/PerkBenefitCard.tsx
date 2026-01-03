type BenefitProps = {
  [key: string]: any
}

const PerksBenefitCard = ({ benefit }: BenefitProps) => {
  return (
    <>
      <article className="mt-4 p-4 hover:bg-slate-50">
        <img className="mb-4" src={benefit?.icon} alt="PerksImage"></img>
        <h3 className="text-xl text-[#25324B] font-semibold mb-2">
          {benefit?.title}
        </h3>
        <p className=" text-[#515B6F] my-2">{benefit?.description}</p>
      </article>
    </>
  )
}

export default PerksBenefitCard
