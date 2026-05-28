import type { Metadata } from 'next';
import siteMetadata from '@/app/metadata.json';
import GdprPageContent from '@/components/gdpr-page-content';

export const metadata: Metadata = (siteMetadata as Record<string, Metadata>)['/gdpr'];

export default function GdprPage() {
  return <GdprPageContent />;
}
