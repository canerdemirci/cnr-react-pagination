import styles from './styles.module.css';
import React, { useEffect, useState } from "react";
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import PageButton from "./pagebutton";
import CustomSelect from './customselect';

interface IPagination {
    dataLength: number;
    dataLengthPerPage: number;
    // Range limit of page buttons shown on the component
    btn_range?: number;
    onChange: (page: number) => void,
    pageButtonClassName?: string;
    pageButtonSelectedClassName?: string;
    // Main container
    paginationClassName?: string;
    buttonContainerClassName?: string;
    infoSectionClassName?: string;
    // Icons
    firstBtnIcon?: React.ReactNode;
    prevBtnIcon?: React.ReactNode;
    nextBtnIcon?: React.ReactNode;
    lastBtnIcon?: React.ReactNode;
}

export default function Pagination({ dataLength, dataLengthPerPage,
    btn_range = 7, onChange,
    pageButtonClassName, pageButtonSelectedClassName,
    paginationClassName, buttonContainerClassName,
    infoSectionClassName, firstBtnIcon, prevBtnIcon,
    nextBtnIcon, lastBtnIcon }: IPagination) {
    const lastPage = Math.ceil(dataLength / dataLengthPerPage);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [shownItemsRange, setShownItemsRange] = useState<string>(`1-${dataLengthPerPage}`);
    const [buttonArray, setButtonArray] = useState<number[]>(Array.from({ length: btn_range }, (_, i) => i + 1));

    useEffect(() => {
        const shownItemCountSofar = currentPage * dataLengthPerPage;
        const startingPoint = shownItemCountSofar - dataLengthPerPage + 1;

        setShownItemsRange(`${startingPoint}-${Math.min(shownItemCountSofar, dataLength)}`);
        setButtonArray(arrangeButtonArray());
    }, [currentPage]);

    function onChangePage(page: number) {
        setCurrentPage(page);
        onChange(page);
    }

    function arrangeButtonArray(): number[] {
        /*
        ** We want this arrangment. Selected page is in parentheses.
        ** (Default range limit is 7)
        ** 1, 2, 3, 4, 5, 6, 7 or 16, 17, 18, 19, 20, 21, 22 => If clicked in range limit array remains same.
        ** 1, 2, 3, 4, 5, 6, 7 => (7) => 6, (7), 8, 9, 10, 11, 12
        ** 6, 7, 8, 9, 10, 11, 12 => (6) => 1, 2, 3, 4, 5, (6), 7
        */
        let newArr: number[] = [];

        // If there are as many pages as range limit.
        if (lastPage <= btn_range) {
            return newArr = Array.from({ length: lastPage }, (_, i) => i + 1);
        }

        // * FIRST
        // If selected page is 1.
        if (currentPage === 1) {
            newArr = Array.from({ length: btn_range }, (_, i) => i + 1);
        }
        // * LAST
        // If selected page is last page.
        else if (currentPage === lastPage) {
            newArr = Array.from({ length: btn_range }, (_, i) => i === 0 ? lastPage : lastPage - i).reverse();
        }
        // * PREVIOUS - 6, 7, 8, 9, 10, 11, 12 => (6) => 1, 2, 3, 4, 5, (6), 7
        // If selected page is in button array and is first and not 1.
        else if (currentPage <= buttonArray[0] && currentPage !== 1) {
            let start = Math.max(currentPage - btn_range + 2, 1);
            let end = start + btn_range;

            for (let i = start; i < end; i++) {
                newArr.push(i);
            }
        // * NEXT - 1, 2, 3, 4, 5, 6, 7 => (7) => 6, (7), 8, 9, 10, 11, 12
        // If selected page is in button array and is last and not last page.
        } else if (currentPage >= buttonArray[buttonArray.length - 1] && currentPage !== lastPage) {
            let start = currentPage - 1;
            let end = start + btn_range;

            if (end > lastPage) {
                end = lastPage + 1;
                start = lastPage - btn_range + 1;
            }

            for (let i = start; i < end; i++) {
                newArr.push(i);
            }
        }
        // If selected page is in button array.
        else {
            return [...buttonArray];
        }

        return newArr;
    }

    if (dataLength <= dataLengthPerPage)
        return (<div></div>);

    return (
        <div className={(paginationClassName ?? styles.pagination) + ' ' + styles.normalize}>
            {/* Buttons */}
            <div className={buttonContainerClassName ?? styles.buttonContainer}>
                {/* First Button */}
                {buttonArray[0] !== 1 && (<PageButton
                    icon={firstBtnIcon ?? <MdSkipPrevious />}
                    onClick={() => onChangePage(1)}
                    className={pageButtonClassName}
                />)}
                {/* Previous Button */}
                {currentPage !== 1 && (<PageButton
                    icon={prevBtnIcon ?? <GrFormPreviousLink />}
                    onClick={() => onChangePage(currentPage - 1)}
                    className={pageButtonClassName}
                />)}
                {/* Page Buttons */}
                {buttonArray.map(i => <PageButton
                    key={i}
                    pageNumber={i}
                    isSelected={currentPage === i}
                    onClick={() => onChangePage(i)}
                    className={pageButtonClassName}
                    selectedClassName={pageButtonSelectedClassName}
                />)}
                {/* Next Button */}
                {currentPage !== lastPage && (
                    <PageButton
                        icon={nextBtnIcon ?? <GrFormNextLink />}
                        onClick={() => onChangePage(currentPage + 1)}
                        className={pageButtonClassName}
                    />
                )}
                {/* Last Button */}
                {buttonArray[buttonArray.length - 1] !== lastPage && (
                    <PageButton
                        icon={lastBtnIcon ?? <MdSkipNext />}
                        onClick={() => onChangePage(lastPage)}
                        className={pageButtonClassName}
                    />
                )}
            </div>
            {/* Info Section */}
            <div className={infoSectionClassName ?? styles.infoSection}>
                <CustomSelect
                    options={Array.from({ length: lastPage }, (_, i) => i + 1)}
                    onChange={(value) => onChangePage(value)}
                />
                <span>{shownItemsRange} of {dataLength}</span>
            </div>
        </div>
    );
}