"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialSignUp from "../SocialSignUp";
import Logo from "@/components/Layout/Header/Logo"
import { useContext, useState } from "react";
import Loader from "@/components/Common/Loader";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
const SignUp = ({signUpOpen}:{signUpOpen?:any}) => {
  const t = useTranslations('auth.signUp')
  const tCommon = useTranslations('auth.common')
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const authDialog = useContext(AuthDialogContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);
    const data = new FormData(e.currentTarget);
    const value = Object.fromEntries(data.entries());
    const finalData = { ...value };

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(t('success'));
        setLoading(false);
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
      setTimeout(() => {
        signUpOpen(false);
      }, 1200);
      authDialog?.setIsUserRegistered(true);

      setTimeout(() => {
        authDialog?.setIsUserRegistered(false);
      }, 1100);

  };

  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>

      <SocialSignUp />

      <span className="z-1 relative my-8 block text-center">
        <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-BorderLine dark:bg-dark_border"></span>
        <span className="text-body-secondary relative z-10 inline-block bg-white dark:bg-darklight px-3 text-base dark:bg-dark">
          {tCommon('or')}
        </span>
      </span>

      <form onSubmit={handleSubmit}>
        <div className="mb-[22px] space-y-2">
          <Label htmlFor="name">{t('name')}</Label>
          <Input
            id="name"
            type="text"
            placeholder={t('name')}
            name="name"
            required
          />
        </div>
        <div className="mb-[22px] space-y-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t('email')}
            name="email"
            required
          />
        </div>
        <div className="mb-[22px] space-y-2">
          <Label htmlFor="password">{t('password')}</Label>
          <Input
            id="password"
            type="password"
            placeholder={t('password')}
            name="password"
            required
          />
        </div>
        <div className="mb-9">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-darkprimary dark:hover:bg-darkprimary"
          >
            {t('submit')} {loading && <Loader />}
          </Button>
        </div>
      </form>

      <p className="text-body-secondary mb-4 text-base">
        {t('agreement')}{" "}
        <a href="/#" className="text-primary hover:underline">
          {t('privacy')}
        </a>{" "}
        {t('and')}{" "}
        <a href="/#" className="text-primary hover:underline">
          {t('policy')}
        </a>
      </p>

      <p className="text-body-secondary text-base">
        {t('alreadyHave')}
        <Link
          href="/"
          className="pl-2 text-primary hover:bg-darkprimary hover:underline"
        >
          {t('signIn')}
        </Link>
      </p>
    </>
  );
};

export default SignUp;
