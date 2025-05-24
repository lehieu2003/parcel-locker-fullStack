// src/components/SidebarItemComponent.tsx
import React, { useState } from 'react';
import { SidebarItem } from './sidebarItem';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

interface SidebarItemComponentProps {
  item: SidebarItem;
}

const SidebarItemComponent: React.FC<SidebarItemComponentProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <a href={item.link} className="block py-2 px-3 rounded text-white hover:text-blue-200 hover:bg-gray-700">{item.icon ? item.icon : null} {item.name}</a>
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 focus:outline-none bg-transparent text-white"
          >
            {isExpanded ? <KeyboardArrowRightRoundedIcon /> : <KeyboardArrowDownRoundedIcon />}
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-4">
          {item.children?.map((child, index) => (
            <SidebarItemComponent key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItemComponent;
