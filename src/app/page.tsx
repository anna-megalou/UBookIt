import Image from "next/image";
import { Clock } from "tabler-icons-react";
import { BookOpen, CreditCard } from "lucide-react";
import { withBasePath } from "@/lib/utils";
import Button from "@/components/ui/Button";
import FeatureCard from "@/components/ui/FeatureCard";

const features = [
  {
    icon: Clock,
    title: "Παρακολούθηση παραγγελίας",
    description: "Παρακολούθησε την παραγγελία σου σε πραγματικό χρόνο",
    highlighted: true,
  },
  {
    icon: BookOpen,
    title: "Επιλογή βιβλίων",
    description: "Δήλωσε τα βιβλία σου όσο γρήγορα μπορείς",
    highlighted: false,
  },
  {
    icon: CreditCard,
    title: "Αγορά βιβλίων",
    description: "Ασφαλής πληρωμή και άμεση παράδοση στο σπίτι",
    highlighted: false,
  },
];

export default function Home() {
  return (
    <div className="container bg-white rounded-4xl justify-center mx-auto px-auto">
      <div className="flex flex-col justify-start items-start w-full relative sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-start lg:items-start">
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
          <div className="absolute bottom-60 right-65 md:right-20">
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
        <div className="flex flex-row justify-center items-center px-30 sm:py-16 sm:gap-15 relative">
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
    </div>
  );
}
