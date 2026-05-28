import type { Metadata } from "next";
import KatalogyPage from "@/components/katalogy-page";

export const metadata: Metadata = {
  title: "Katalogy ke stažení | BE-LIGHT",
  description:
    "Stáhněte si produktové katalogy prémiového LED osvětlení KLUŚ design. Kompletní přehledy svítidel, LED lišt a technické parametry.",
  alternates: {
    canonical: "https://macaly-yoynr8mzgtw8xuliw7ld87lf.macaly.app/katalogy",
  },
};

export default function Page() {
  return <KatalogyPage />;
}
