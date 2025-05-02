import { SiInstagram, SiWhatsapp, SiTelegram, SiMedium  } from '@icons-pack/react-simple-icons';
import { Linkedin } from 'lucide-react';

function Footer() {
    return (
        <footer className="flex flex-col min-w-full  text-gray-600 dark:text-gray-300 relative border-t border-gray-300">
            <div className="grid grid-rows-3 grid-cols-1 md:grid-rows-1 md:grid-cols-4 lg:grid-cols-6 mt-8 md:mt-12 py-8 md:py-14 md:px-24">
                <div className="flex flex-col text-center md:text-left col-span-1 md:col-span-2 lg:col-span-4 mx-auto md:mx-0">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3HFP0xBWVlZiW2iyarUzvSx8zyEnzb66j3w&s" height="100" width="200" alt="Logo" className="object-cover object-center max-h-24" />
                </div>
                <div className='text-center md:text-left col-span-1'>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Us</h2>
                    <ul className="mt-4 space-y-2">
                        <li>Placeholder</li>
                    </ul>
                </div>
                <div className='text-center md:text-left col-span-1'>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">About Us</h2>
                    <ul className="mt-4 space-y-2">
                        <li><a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About GDGoC UPM</a></li>
                        <li><a href="/team" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Our Team</a></li>
                        <li><a href="/events" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Events</a></li>
                    </ul>
                </div>
            </div>
            <div className="min-w-full py-8 md:py-8 md:px-16">
                <div className="flex flex-row flex-wrap justify-center md:justify-between md:items-center mx-auto md:mx-24">
                    <div className="flex justify-center space-x-8 md:order-2 text-gray-400 hover:text-gray-500">
                        <a className="" href='https://www.instagram.com/gdg.upm'>
                            <span className="sr-only">Instagram</span>
                            <SiInstagram size={32}/>
                        </a>
                        <a className="" href='https://www.linkedin.com/company/google-developer-student-club-upm'>
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin size={32}/>
                        </a>
                        <a className="" href='https://medium.com/@gdgocupm'>
                            <span className="sr-only">Medium</span>                    
                            <SiMedium size={32}/>
                        </a>
                        <a className="" href='https://chat.whatsapp.com/K25fFURRpdA9kfZNqCzCXa'>
                            <span className="sr-only">WhatsApp</span>                    
                            <SiWhatsapp size={32}/>
                        </a>
                        <a className="" href='https://t.me/gdscupm'>
                            <span className="sr-only">Telegram</span>                    
                            <SiTelegram size={32}/>
                        </a>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-xs text-leading-5 text-center text-opacity-600 text-gray-500 dark:text-gray-300 max-w-sm">
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