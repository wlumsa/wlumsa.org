import msalogo from "../assets/imgs/msalogo 1.png"
import phone from "../assets/imgs/circle-phone-flip 1.svg"
import email from "../assets/imgs/email.png"
import insta from "../assets/imgs/instagram.png"
import fb from "../assets/imgs/facebook.png"
import Image from "next/image";
import Link from "next/link"
const Footer:React.FC = () => {
  return (
    <div className="w-full grid">
        <footer className="footer p-10 bg-purple-950 text-base-content gap-0 ">
            <div>
                <span className="footer-title"> Quick Links</span>
                <a className="link link-hover" href= "">Home</a>
                <a className="link link-hover" href= "">Home</a>
                <a className="link link-hover" href= "">Home</a>
                <a className="link link-hover" href= "">Home</a>
            </div>
            <div>
                <span className="footer-title"> University Guide</span>
                <a className="link link-hover" href= "">Home</a>
                <a className="link link-hover" href= "">Home</a>
                <a className="link link-hover" href= "">Home</a>
                <a className="link link-hover" href= "">Home</a>
            </div>
            <div>
                <span className="footer-title"> Social </span>
                <a className="link link-hover" href= "">Home</a>
                <a className="link link-hover" href= "">Home</a>
                <a className="link link-hover" href= "">Home</a>
                <a className="link link-hover" href= "">Home</a>
            </div>
            <div>
                <span className="footer-title"> Other </span>
                <a className="link link-hover" href= "">Home</a>
                <a className="link link-hover" href= "">Home</a>
                <a className="link link-hover" href= "">Home</a>
            </div>
        </footer>
        <footer className="footer px-10 py-4 border-t bg-purple-950 text-base-content border-[#B99393]">
            <div className=" items-center grid-flow-col text-lg">
                <Image src= {msalogo} alt = "logo"/>
                <p>Wilfrid Laurier University <br/> Muslim Students Association</p>
            </div>
            <div className="md:place-self-center md:justify-self-end">
                <div className="grid grid-flow-col gap-4">
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
    </div>
  );
};

export default Footer;



/*
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
    */