import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

let Footer: FC = () => {
  return (
    <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="py-16">
        <Image
          alt="logo"
          src="/logo.svg"
          width="138"
          height="36"
          decoding="async"
          data-nimg="future"
          className="h-16"
          loading="lazy"
          style={{ color: "transparent" }}
        />
        <nav className="mt-10 text-sm" aria-label="quick links">
          <div className="-my-1 flex flex-col justify-center gap-x-6 sm:flex-row">
            <Link
              className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="https://www.bobbll.com/#features"
            >
              Features
            </Link>
            <Link
              className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="https://business.bobbll.com/privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link
              className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="https://business.bobbll.com/terms-and-conditions"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="/#testimonials"
            >
              Testimonials
            </Link>
            <Link
              className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="/#pricing"
            >
              Pricing
            </Link>
          </div>
        </nav>
      </div>
      <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
        <div className="flex gap-x-6">
          <Link className="group" href="https://uk.linkedin.com/company/bobbll">
            <Image
              alt=""
              src="/linkedin.webp"
              width="128"
              height="128"
              decoding="async"
              data-nimg="future"
              className="h-8 w-8"
              loading="lazy"
              style={{ color: "transparent" }}
            />
          </Link>
          <Link
            className="group"
            aria-label="Bobbll on Instagram"
            href="https://www.instagram.com/bobbll.app/"
          >
            <Image
              alt=""
              src="/instagram.webp"
              width="128"
              height="128"
              decoding="async"
              data-nimg="future"
              className="h-8 w-8"
              loading="lazy"
              style={{ color: "transparent" }}
            />
          </Link>
        </div>
        <p className="mt-6 text-sm text-slate-500 sm:mt-0">
          Copyright ©Bobbll. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
