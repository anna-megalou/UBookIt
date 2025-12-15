import { Check, House, Truck, Timer, Heart } from "lucide-react";
import { aboutContent } from "@/lib/constants";

export default function About() {
  return (
    <div className="flex flex-col pt-0 pb-26 justify-start items-start w-full sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start">
      <section
        id="about"
        className="w-full pt-0 pb-16 bg-gray-50 dark:bg-gray-900 px-30 scroll-mt-20"
      >
        <div className="container  mt-16  mb-5 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 w-full">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                {aboutContent.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {aboutContent.description.paragraph1}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {aboutContent.description.paragraph2}
              </p>
              <div className="space-y-4">
                {aboutContent.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-300">
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {feature.title}
                      </span>{" "}
                      - {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    {aboutContent.benefitsCard.title}
                  </h3>
                  <div className="space-y-4">
                    {aboutContent.benefitsCard.benefits.map((benefit, index) => {
                      const icons = [Timer, House, Truck, Heart];
                      const Icon = icons[index];
                      return (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 mt-1 text-blue-500">
                            <Icon className="h-5 w-5" />
                          </div>
                          <p className="ml-3 text-gray-600 dark:text-gray-300">
                            {benefit.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    {aboutContent.benefitsCard.cta.text}{" "}
                    <a
                      href={aboutContent.benefitsCard.cta.href}
                      className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                    >
                      {aboutContent.benefitsCard.cta.linkText}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
