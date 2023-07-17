import Image from "next/image"
import asalamualkum from "../assets/imgs/asalamualkum.png"

const loader:React.FC = () => {
  return (
    <div className='bg-purple-950 h-screen w-screen flex items-center justify-center'>
        <Image src = {asalamualkum} alt = "image" />
    </div>
  )
}

export default loader