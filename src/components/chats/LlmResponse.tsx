import { CATEGORY_RESPONSE } from "../Constants";

function Categories() {
  return (
    <div className="divide-y">
      {CATEGORY_RESPONSE.map((category, index) => {
        return (
          <div className=" flex items-center w-full h-7 mt-3  justify-between">
            <div className=" w-full font-medium leading-7">
              Category {category.category} : {category.title}
            </div>
            <button className="w-6 h-6">
              <img src="/icons/dropdown.svg" alt="dropdown" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function LlmResponse() {
  return (
    <div className=" flex flex-col gap-3">
      <div className=" flex items-center gap-3">
        <img src="/icons/logo.svg" alt="logo" className="h-6 w-6" />
        <span className=" font-medium leading-5 text-[#323232] ">Response</span>
      </div>
      <div className="text-[#323232]">
        <h3 className=" font-bold text-lg leading-8 ">
          Strategic Guidance for High School Achievers
        </h3>
        <div className="text-sm font-light leading-7">
          Transitioning from high school to college requires careful planning,
          especially for students with strong academic and extracurricular
          backgrounds. This guide offers strategies for college selection,
          research opportunities, time management, and showcasing leadership,
          helping students align their goals with the right programs to ensure a
          successful college journey.
        </div>
      </div>
      <Categories />
    </div>
  );
}
