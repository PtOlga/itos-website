import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import MapSection from "@/components/Contact/MapSection";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact.hero");
  return {
    title: t("title"),
  };
}

const ContactPage = () => {
  const t = useTranslations("contact.hero");

  return (
    <>
      <HeroSub
        title={t("title")}
        description={t("description")}
      />
      <ContactInfo />
      <ContactForm />
      <MapSection />
      <Location />
    </>
  );
};

export default ContactPage;
