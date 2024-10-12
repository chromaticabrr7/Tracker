import React from 'react';
import styled from 'styled-components';

export const ButtonPrimary = styled.button`
    display: flex;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid white;
    border: none;
    color: black;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    background: rgba(255, 255, 255, 1);

    &:active {
        border: none;
        background: rgba(255, 255, 255, 0.8);
    }

    &:focus {
        border: none;
        outline: none;
    }
`;

export const ButtonSecondary = styled(ButtonPrimary)`
    color: white;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    text-shadow: none;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.2);
        outline: none;
    }

    &:active {
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.2);
    }

    &:focus {
        border: 1px solid rgba(255, 255, 255, 0.2);
        outline: none;
    }
`;

export default ButtonPrimary;