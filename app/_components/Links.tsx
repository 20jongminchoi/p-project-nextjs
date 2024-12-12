"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Pathnames = [
  {
    pathname: "/parking/aispace",
    label: "AI 공학관",
  },
  {
    pathname: "/parking/center",
    label: "학생회관",
  },
];

export const Links = () => {
  const currentPathname = usePathname();
  console.log(currentPathname);

  return (
    <div className="mt-4 flex gap-4 font-medium text-lg">
      {Pathnames.map(({ pathname, label }) => (
        <Link
          key={pathname}
          href={
            pathname === "/parking/aispace"
              ? "/parking/aispace"
              : "/parking/center"
          }
          className={clsx(
            "underline",
            currentPathname === pathname ? "text-blue-500 font-semibold" : ""
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
