import type { Metadata } from "next";
import VelkoobchodPageContent from "@/components/velkoobchod-page";

export const metadata: Metadata = {
  title: "Velkoobchod LED osvětlení B2B | BE-LIGHT",
  description:
    "Velkoobchodní spolupráce B2B – LED osvětlení pro firmy, montážníky, architekty a výrobce nábytku. Individuální ceny, stabilní sklad, technická podpora. BE-LIGHT – partner pro projekty.",
  alternates: {
    canonical: "https://www.belight.cz/velkoobchod",
  },
  openGraph: {
    title: "Velkoobchod LED osvětlení B2B | BE-LIGHT",
    description:
      "B2B dodavatel LED osvětlení. Individuální velkoobchodní ceny, stabilní sklad a technická podpora pro profesionály.",
    images: [
      {
        url: "https://images.pexels.com/photos/1253128/pexels-photo-1253128.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 630,
        alt: "Velkoobchod LED osvětlení BE-LIGHT",
      },
    ],
  },
};

export default function VelkoobchodPage() {
  return <VelkoobchodPageContent />;
}
