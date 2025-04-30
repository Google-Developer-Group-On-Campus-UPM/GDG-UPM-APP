import { SiInstagram, SiWhatsapp, SiTelegram, SiMedium  } from '@icons-pack/react-simple-icons';
import { Linkedin } from 'lucide-react';

function Footer() {
    return (
        <footer className="flex flex-col min-w-full  text-gray-600 dark:text-gray-300 relative">
            <div className="grid grid-rows-2 py-8 md:py-24 md:px-24"></div>
            <div className="min-w-full py-8 md:py-16 md:px-16">
                <div className="flex flex-row flex-wrap justify-center md:justify-between mx-auto">
                    <div className="flex justify-center space-x-8 md:order-2">
                        <a className="text-gray-400 hover:text-gray-500" href='https://www.instagram.com/gdg.upm'>
                            <span className="-m-1 p-0 overflow-hidden whitespace-nowrap border-0 absolute">Instagram</span>
                            <SiInstagram/>
                        </a>
                        <a className="text-gray-400 hover:text-gray-500" href='https://www.linkedin.com/company/google-developer-student-club-upm'><Linkedin/></a>
                        <a className="text-gray-400 hover:text-gray-500" href='https://medium.com/@gdgocupm'><SiMedium/></a>
                        <a className="text-gray-400 hover:text-gray-500" href='https://chat.whatsapp.com/K25fFURRpdA9kfZNqCzCXa'><SiWhatsapp/></a>
                        <a className="text-gray-400 hover:text-gray-500" href='https://t.me/gdscupm'><SiTelegram/></a>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-xs text-leading-5 text-center text-opacity-60 text-gray-600  dark:text-gray-300 max-w-sm">
                            © {new Date().getFullYear()} GDGoC UPM. All rights reserved.
                            <br />
                            Developed by Wong Yong Xi and Google Developer Group on Campus UPM
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;