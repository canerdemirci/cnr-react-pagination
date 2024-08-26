import React from 'react';
import styles from './styles.module.css';

interface Props {
    pageNumber?: number;
    icon?: React.ReactNode;
    isSelected?: boolean;
    className?: string | undefined;
    selectedClassName?: string | undefined;
    onClick: () => void;
}

const PageButton = ({ pageNumber, icon, isSelected = false, onClick,
    className, selectedClassName }: Props) => {
    const btnClassName = isSelected ? 
        (selectedClassName ?? styles.pageBtn) + ' ' +
        (className ?? styles.selected) :
        (className ?? styles.pageBtn);
    
    return (
        <a
            href='#'
            className={btnClassName}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}>
            {icon ?? pageNumber}
        </a>
    );
}

export default PageButton;