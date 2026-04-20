import HeroSub from "@/components/SharedComponent/HeroSub";
import NotFound from "../../NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page",
};

const ErrorPage = async () => {
  const messages = (await import("../../messages/sv.json")).default;
  const t = messages.notFound;

  return (
    <>
      <HeroSub
        title="404"
        description={t.heroDescription}
      />
      <NotFound title={t.title} text={t.text} buttonLabel={t.button} homeHref="/" />
    </>
  );
};

export default ErrorPage;
