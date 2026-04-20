"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import SocialSignIn from "../SocialSignIn";
import Logo from "@/components/Layout/Header/Logo"
import { Toaster } from 'react-hot-toast';
import AuthDialogContext from "@/app/context/AuthDialogContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";


const Signin = ({signInOpen}:{signInOpen?:any}) => {
  const t = useTranslations('auth.signIn')
  const tCommon = useTranslations('auth.common')
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const authDialog = useContext(AuthDialogContext);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    if(result?.status === 200){
       setTimeout(() => {
        signInOpen(false);
       }, 1200);
      authDialog?.setIsSuccessDialogOpen(true);
      setTimeout(() => {
        authDialog?.setIsSuccessDialogOpen(false);
      }, 1100);
    }else{
      authDialog?.setIsFailedDialogOpen(true);
      setTimeout(() => {
        authDialog?.setIsFailedDialogOpen(false);
      }, 1100);
    }
  };


  




  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>

      <SocialSignIn />

      <span className="z-1 relative my-8 block text-center">
        <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-BorderLine dark:bg-dark_border"></span>
        <span className="text-body-secondary relative z-10 inline-block bg-white px-3 text-base dark:bg-secondary">
          {tCommon('or')}
        </span>
        <Toaster />
      </span>

      <form onSubmit={handleSubmit}>
        <div className="mb-[22px] space-y-2">
          <Label htmlFor="username">{t('username')}</Label>
          <Input
            id="username"
            type="text"
            placeholder={t('username')}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-[22px] space-y-2">
          <Label htmlFor="password">{t('password')}</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            placeholder={t('password')}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-9">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-darkprimary dark:hover:bg-darkprimary"
          >
            {t('submit')}
            {/* {loading && <Loader />} */}
          </Button>
        </div>
      </form>

      <Link
        href="/"
        className="mb-2 inline-block text-base text-dark hover:text-primary dark:text-white dark:hover:text-primary"
      >
        {t('forgotPassword')}
      </Link>
      <p className="text-body-secondary text-base">
        {t('notMember')}{" "}
        <Link href="/" className="text-primary hover:underline">
          {t('signUp')}
        </Link>
      </p>
    </>
  );
};

export default Signin;