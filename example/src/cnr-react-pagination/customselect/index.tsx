import styles from './styles.module.css';
import { FaAngleDown } from 'react-icons/fa';
import React, { useState } from 'react';

interface Props {
    options: number[];
    onChange: (value: number) => void;
}

export default function CustomSelect({ options, onChange }: Props) {
    const [value, setValue] = useState(1);

    return (
        <div className={styles.customSelect}>
            <div>
                <span>{value}</span>
                <FaAngleDown />
            </div>
            <div>
                {options
                    .map(i => (<div key={i} onClick={() => {
                        setValue(i);
                        onChange(i);
                    }}>{i}</div>))}
            </div>
        </div>
    )
}