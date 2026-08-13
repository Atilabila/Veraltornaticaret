import { redirect } from 'next/navigation';

/** Legacy route — canonical teklif form is /teklif-al */
export default function TeklifPage() {
    redirect('/teklif-al');
}
