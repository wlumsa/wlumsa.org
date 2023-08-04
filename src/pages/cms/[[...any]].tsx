import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
const CMS = dynamic(async () => await import('./CMS'), {
 ssr: false,
})
export default function Home() {
    return <CMS/>;
}
