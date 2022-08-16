import { memo } from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

export interface IProps { 
    onClick: () => void; 
    label?: string; 
    isDisabled?: boolean; 
    size?: 'S' | 'M';
    isFullWidth?: boolean;
}

const Button = memo(({ onClick, label, isDisabled, size, isFullWidth }: IProps) => {
    const _handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        onClick && onClick();
    };

    const classes = classnames(styles.buttonWrap, {
        [styles[size as string]]: size,
        [styles.fullWidth]: isFullWidth
    })

    return (
        <button 
            type='button' 
            disabled={isDisabled} 
            className={classes} 
            onClick={_handleClick}
        >
            {label}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;