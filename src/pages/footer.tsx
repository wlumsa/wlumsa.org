import msalogo from "../assets/imgs/msalogo 1.png"
import phone from "../assets/imgs/circle-phone-flip 1.svg"
import email from "../assets/imgs/email.png"
import insta from "../assets/imgs/instagram.png"
import fb from "../assets/imgs/facebook.png"
import Image from "next/image";
import Link from "next/link"
const Footer:React.FC = () => {
  return (
    
    <footer className="footer p-10 bg-purple-950  w-full  gap-10 grid-flow-col">
        <div>
            <Image className="w-40 h-40  " src={msalogo} alt = "logo"/>
        </div>
        <div className="justify-self-end">
            <div className="w-[322px] h-[47px] text-white text-[32px] font-semibold">Connect with us:</div>
            <div className="grid grid-flow-col place-items-center  justify-content-center gap-7 ">
                <a href="https://www.facebook.com/wlumsa/">
                    <Image className="w-12 h-12  " src={fb} alt = "facebook"/>
                </a>
                
                <a href="https://www.instagram.com/wlumsa/">
                    <Image className="w-12 h-12  " src={insta} alt = "fitnagram"/>
                </a>
                <a href="mailto:msa@wlu.ca">
                    <Image className="w-12 h-12  " src={email} alt = "email"/>
                </a>
                <a href="">
                    <Image className="w-20 h-12  " src={phone} alt = "phone #?"/>
                </a>
            </div>
        </div>

    </footer>
    
  );
};

export default Footer;

