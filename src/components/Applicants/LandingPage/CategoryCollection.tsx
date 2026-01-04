import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import instance from "../../AxiosConfig/instance";
import {
  DesignIcon,
  SalesIcon,
  MarketingIcon,
  FinanceIcon,
  TechnologyIcon,
  EngineeringIcon,
  BusinessIcon,
  HumanResourceIcon,
} from "./CategoryIcon";

function CategoryCollection() {
  const [categories, setCategories] = useState<any[]>([]);


  const iconMap: { [key: string]: JSX.Element } = {
    "Design": <DesignIcon />,
    "Sales": <SalesIcon />,
    "Marketing": <MarketingIcon />,
    "Finance": <FinanceIcon />,
    "Technology": <TechnologyIcon />,
    "Engineering": <EngineeringIcon />,
    "Business": <BusinessIcon />,
    "Human Resource": <HumanResourceIcon />,
  };

  async function getCategories() {
    try {
      const res = await instance.get('/categories');
      const data = res.data.data;
      
      const categoriesWithIcons = data.map((cat: any, index: number) => ({
        icon: iconMap[cat.name] || <DesignIcon />,
        title: cat.name,
        jobsCount: cat.jobCount,
        isHighlighted: index === 2, 
      }));
      
      setCategories(categoriesWithIcons);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              jobsCount={category.jobsCount}
              isHighlighted={category.isHighlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryCollection;