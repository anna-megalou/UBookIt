import Image from "next/image";
import { Clock } from "tabler-icons-react";
import { BookOpen, CreditCard } from "lucide-react";
import { withBasePath } from "@/lib/utils";
import { faqItems, features as featuresData } from "@/lib/constants";
import Button from "@/components/ui/Button";
import FeatureCard from "@/components/ui/FeatureCard";
import FAQ from "@/components/ui/FAQ";
import About from "@/components/ui/About";
import Universities from "@/components/ui/Universities";

// Icon mapping for features
const iconMap: Record<string, typeof Clock | typeof BookOpen | typeof CreditCard> = {
  Clock,
  BookOpen,
  CreditCard,
};

// Map features data with icon components
const features = featuresData.map((feature) => ({
  ...feature,
  icon: iconMap[feature.iconName],
}));

export default function Home() {
  return (
    <div className="container bg-white rounded-4xl justify-center mx-auto px-auto">
      <div className="flex flex-col justify-start items-start w-full sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start">
        {/* Hero Section */}
        <div className="flex flex-row justify-center items-center px-30 pt-20 pb-14 w-4/7">
          {/* Left Content */}
          <div className="flex flex-col justify-start items-start sm:justify-center sm:items-center md:justify-start md:items-start lg:justify-start lg:items-start gap-12">
            <div className="flex flex-col justify-center items-start gap-8">
              <h1 className="text-5xl font-bold text-primary-dark">
                Παρέλαβε τα πανεπιστημιακά βιβλία σου εύκολα και γρήγορα
              </h1>
              <h4 className="text-xl text-secondary-dark">
                Παράγγειλε τα βιβλία σου μόνο με ένα κλίκ
              </h4>
            </div>

            <Button href="/login/prequalification" size="md">
              Sign In
            </Button>
          </div>
          <div className="absolute top-45 right-75 md:right-40">
            <Image
              priority
              src={withBasePath("/assets/images/kid_with_books.png")}
              alt="Hero Illustration"
              width={320}
              height={320}
              className="object-fill w-60 h-60 sm:hidden lg:block"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-row justify-center items-center px-30 sm:py-16 sm:gap-15">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-15 w-full">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                highlighted={feature.highlighted}
              />
            ))}
          </div>
        </div>
      </div>

      <div  id="about" className="flex flex-col">
        {/* Universities Section */}
        <div  className="w-full pt-26 pb-0 scroll-mt-20">
          <Universities />
        </div>

        {/* About Section */}
        <div  className="w-full pt-0 mt-0 pb-0 scroll-mt-20">
          <About />
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="w-full px-30 pt-0 scroll-mt-20">
        <FAQ items={faqItems} />
      </div>
    </div>
  );
}
