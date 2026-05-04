import { Configuration } from "./Configuration";
import { DocNavigation } from "./DocNavigation";
import { Introduction } from "./Introduction";
import { PackageStructure } from "./PackageStructure";
import { QuickStart } from "./QuickStart";

interface DocumentationProps {
  title: string
  description: string
}

export const Documentation = ({ title, description }: DocumentationProps) => {
  return (
    <div className="dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) p-6 lg:mt-0 mt-0 pt-6!">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl font-bold text-secondary dark:text-white md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-base leading-7 text-SlateBlue dark:text-darktext md:text-lg">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-3 col-span-12 lg:block hidden">
            <DocNavigation />
          </div>
          <div className="lg:col-span-9 col-span-12">
            <Introduction />
            <PackageStructure />
            <QuickStart />
            <Configuration />
          </div>
        </div>
      </div>
    </div>
  );
};
