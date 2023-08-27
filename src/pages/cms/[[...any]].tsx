import dynamic from 'next/dynamic'

const CMS = dynamic(async () => await import('../../components/CMS'), {
 ssr: false,
})
export default function Home() {
    return <CMS/>;
}
