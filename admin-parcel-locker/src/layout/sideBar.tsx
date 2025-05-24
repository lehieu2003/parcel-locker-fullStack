import React, { useState } from 'react';
import { SidebarItem } from './sidebarItem';
import SidebarItemComponent from './sidebarItemComponent';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

interface SidebarProps {
    items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
    const [isOpen, setIsOpen] = useState(true);
    const auth: any = useAuthUser();


    return (
        <div className={`flex flex-col bg-gray-800 text-white h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-4 bg-gray-800 focus:outline-none">
                {isOpen ? (
                    <div>
                        <div className="flex group items-center">
                            <div className="text-xl animate-fadeIn text-white font-bold transition duration-500 ease-in-out group-hover:text-gray-300">
                                Welcome back,
                                <span className="text-xl text-orange-400 font-bold transition duration-500 ease-in-out group-hover:text-orange-600">
                                    {auth.username ? ` ${auth.username}` : ` ${auth.username}`}
                                </span>
                            </div>
                            <KeyboardArrowLeftRoundedIcon />
                        </div>
                    </div>
                ) : (
                    <KeyboardArrowRightRoundedIcon />
                )}
            </button>

            {isOpen ? 
            <div className="flex flex-col p-2 space-y-4">
                {items.map((item, index) => (
                    <SidebarItemComponent key={index} item={isOpen ? item : { icon: item.icon, name: '', link: '' }} />
                ))}
            </div> 
            : 
            <div className="flex flex-col p-2 space-y-4 items-center">
                {items.map((item, index) => (
                    <SidebarItemComponent key={index} item={isOpen ? item : { icon: item.icon, name: '', link: '' }} />
                ))}
            </div>}

        </div>
    );
};

export default Sidebar;
