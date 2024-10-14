import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { 
    IconAlertCircle, 
    IconAlertCircleFilled, 
    IconLoader2, 
    IconArrowBadgeRightFilled, 
    IconHelpOctagonFilled, 
    IconSquareRoundedCheckFilled, 
    IconSquare, 
    IconCircleCheckFilled, 
    IconCircle, 
    IconShieldLockFilled, 
    IconDirectionSignFilled,
    IconCircleArrowRightFilled,
    IconCheck,
    IconPointFilled } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import ButtonPrimary, { ButtonSecondary } from '../Tiles/Button';

const Tracker = ({ deploymentState, onDeploy, onApprove}) => {
    const getCheckColor = (progress) =>  {
        switch (progress) {
            case 'incomplete': 
                return '0';
            case 'pending': 
                return '0';
            case 'complete':
                return '1';
            default:
                return '0';
        }
    }

    const getStatusLightColor = (progress) => {
        switch (progress) {
            case 'incomplete':
                return 'rgba(0, 0, 0, 0.2)';
            case 'pending':
                return '#AE810B';
            default: 
                return 'rgba(0, 0, 0, 0.2)';
        }
    }

    return (
        <>
            <DeploymentTrackerContainer>
                <Container style={{padding: '16px 16px 0px 16px', gap: '16px'}}>
                    <ProgressChip deploymentState={deploymentState} onDeploy={onDeploy}/>
                    <Container style={{fontSize: '20px', fontWeight: '600', lineHeight: '30px'}}>
                        deploy-7
                    </Container>
                    <Container style={{flexDirection: 'row', gap: '4px'}}>
                        <span style={{fontSize: '14px', fontWeight: '600', lineHeight: '20px'}}>Current step:</span>
                        <span style={{fontSize: '14px', fontWeight: '400', lineHeight: '20px'}}>{deploymentState.stageReadout}</span>
                    </Container>
                    <Container>
                        <TrackerContainer>
                            {deploymentState.progress.map((deployProgress, index) => (
                                <Checkpoint key={index} status={deployProgress} style={{width: 'auto', padding: '0px 6px 0px 4px', display: 'flex', gap: '4px'}}>
                                    {deployProgress &&
                                        <motion.div
                                            key={deployProgress}
                                            // animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            transition={{ type: 'spring', duration: 0.6 }}
                                        >
                                            {(deployProgress === 'incomplete' || deployProgress === 'pending') && 
                                                <IconPointFilled style={{width: '14px', color: getStatusLightColor(deployProgress)}}/>
                                            }
                                            <motion.div
                                                key={deployProgress}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ type: 'spring', duration: 0.6 }}
                                            >
                                                {(deployProgress === 'complete') &&
                                                    <IconCheck stroke={3} style={{color: '#37804D', width: '14px', opacity: getCheckColor(deployProgress)}} status={deployProgress ? 'complete' : 'incomplete'}/>
                                                }
                                            </motion.div>
                                        </motion.div>
                                    }
                                    <span style={{fontFamily: 'Roboto Mono', fontSize: '14px', fontWeight: '500'}}>{deploymentState.environment[index]}</span>
                                </Checkpoint>
                            ))}
                            <TrackerProgressContainer>
                                <TrackerProgressBar deploymentState={deploymentState.state}/>
                            </TrackerProgressContainer>
                        </TrackerContainer>
                    </Container>
                    <FloatingContainer className={deploymentState.state === 'APPROVAL' ? 'show' : ''}>
                        <Container style={{gap: '8px'}}>
                            <Container style={{flexDirection: 'row', gap: '8px'}}>
                                <IconAlertCircleFilled style={{width: '20px'}}/>
                                <span style={{fontSize: '16px', fontWeight: '500', lineHeight: '24px'}}>Manual approval</span>
                            </Container>
                            <span style={{fontSize: '14px', fontWeight: '400', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '24px'}}>Would you like to approve this push and continue deployment?</span>
                        </Container>
                        <Container style={{flexDirection: 'row', gap: '16px', width: '100%'}}>
                            <ButtonSecondary style={{width: '100%'}}>Deny</ButtonSecondary>
                            <ButtonPrimary onClick={onApprove} style={{width: '100%'}}>Approve</ButtonPrimary>
                        </Container>
                    </FloatingContainer>
                </Container>
                <Divider />
                <Container style={{padding: '0px 16px 16px 16px'}}>
                    <span style={{fontSize: '14px', fontWeight: '600', lineHeight: '24px', marginBottom: '16px'}}>What's changing?</span>
                    <Container style={{flexDirection: 'row', gap: '16px', marginBottom: '0px'}}>
                        <ConfigBeforeContainer>
                            <Chip>core-api-6</Chip>
                            <Container style={{gap: '0px', fontFamily: 'Roboto Mono', fontSize: '14px', color: 'rgba(0, 0, 0, 0.7)'}}>
                                <span>image: img-1</span>
                                <span>cmd: npm start</span>
                                <span style={{fontWeight: '500'}}>health_check:</span>
                            </Container>
                        </ConfigBeforeContainer>
                        <ConfigAfterContainer>
                            <Chip>core-api-7</Chip>
                            <Container style={{gap: '0px', fontFamily: 'Roboto Mono', fontSize: '14px'}}>
                                <span>image: img-2</span>
                                <span>cmd: /demo-app</span>
                                <span style={{fontWeight: '500', color: '#37804D'}}>health_check: /notes</span>
                            </Container>
                        </ConfigAfterContainer>
                    </Container>
                </Container>
            </DeploymentTrackerContainer>
        </>
    );
}

const ProgressChip = ({ deploymentState, onDeploy }) => {
    const textRef = useRef(null);
    const [chipWidth, setChipWidth] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        if (textRef.current) {
            const textWidth = textRef.current.getBoundingClientRect().width;
            setChipWidth(textWidth + 40);
        }
    }, [deploymentState.progressChipLabel]);

    useEffect(() => {
        setHasInteracted(true);
    }, []);


    return (
        <ButtonChip
            as={motion.button}
            onClick={onDeploy}
            animate={{ width: chipWidth }}
            transition={{ duration: 0.02, ease: 'easeOut' }}
            chipBackgroundColor={deploymentState.chipBackgroundColor}
            chipTextColor={deploymentState.chipTextColor}
            chipBackgroundHoverColor={deploymentState.chipBackgroundHoverColor}
            pointerEventsState={deploymentState.pointerEventsState}
        >
            {deploymentState.state === 'READY' &&
                <>
                    <IconCircleArrowRightFilled style={{position: 'absolute', left: '8px', width: '16px', opacity: '80%'}}/>
                    <span style={{width: '16px'}}></span>
                </>
            }
            {deploymentState.state === 'DEPLOYING' &&
                <>
                    <Loader style={{position: 'absolute', left: '8px', width: '16px', opacity: '80%'}}/>
                    <span style={{width: '20px'}}></span>
                </>
            }
            {deploymentState.state === 'APPROVAL' &&
                <>
                    <IconShieldLockFilled style={{position: 'absolute', left: '8px', width: '16px', opacity: '80%'}}/>
                    <span style={{width: '16px'}}></span>
                </>
            }
            {deploymentState.state === 'COMPLETING' &&
                <>
                    <Loader style={{position: 'absolute', left: '8px', width: '16px', opacity: '80%'}}/>
                    <span style={{width: '20px'}}></span>
                </>
            }
            {deploymentState.state === 'WRAPPING' &&
                <>
                    <Loader style={{position: 'absolute', left: '8px', width: '16px', opacity: '80%'}}/>
                    <span style={{width: '20px'}}></span>
                </>
            }
            {deploymentState.state === 'COMPLETED' &&
                <>
                    <IconCircleCheckFilled style={{position: 'absolute', left: '8px', width: '16px', opacity: '80%'}}/>
                    <span style={{width: '16px'}}></span>
                </>
            }
            <motion.span 
                ref={textRef} 
                style={{whiteSpace: 'nowrap'}}
                key={deploymentState.progressChipLabel}
                initial={{ opacity: 0, translateY: '16px' }}
                animate={{ opacity: 1, translateY: '0px'}}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
            >
                {deploymentState.progressChipLabel}
            </motion.span>
        </ButtonChip>
    );
};

const DeploymentTrackerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 400px;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 20.536px 34.955px 0px rgba(0, 0, 0, 0.05), 0px 10.98px 18.689px 0px rgba(0, 0, 0, 0.04), 0px 6.155px 10.477px 0px rgba(0, 0, 0, 0.04), 0px 3.269px 5.564px 0px rgba(0, 0, 0, 0.03), 0px 1.36px 2.315px 0px rgba(0, 0, 0, 0.02);
    max-height: 500px;
    animation-name: slide-on-load;
    animation-duration: 1s;
    transition: all 0.3s ease-in-out;

    @keyframes slide-on-load {
        0% {
            opacity: 0;
            transform: translateY(16px);
        }

        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }
`;

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: auto;
`;

const FloatingContainer = styled(Container)`
    position: absolute;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    top: 147px;
    left: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    backdrop-filter: blur(8px);
    box-shadow: 0px 20.536px 34.955px 0px rgba(0, 0, 0, 0.05), 0px 10.98px 18.689px 0px rgba(0, 0, 0, 0.04), 0px 6.155px 10.477px 0px rgba(0, 0, 0, 0.04), 0px 3.269px 5.564px 0px rgba(0, 0, 0, 0.03), 0px 1.36px 2.315px 0px rgba(0, 0, 0, 0.02);
    z-index: 10;
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.2s ease-in-out;
    pointer-events: none;

    &.show {
        opacity: 1;
        pointer-events: all;
        transform: translateY(0);
    }
`;

const VariableContainer = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 16px;
    opacity: 0;
    max-height: 0;
    transition: opacity 0.1s ease-in-out, max-height 0.1s ease-in-out;
    
    &.show {
        opacity: 1;
        max-height: 500px;
    }
`;

const Divider = styled.div`
    height: 1px;  
    background-color: rgba(0, 0, 0, 0.05);
    width: 400px;
`;

const ConfigBeforeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    width: auto;
    border-radius: 8px;
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.03);
`;

const ConfigAfterContainer = styled(ConfigBeforeContainer)`
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
`;

const Chip = styled.div`
    padding: 4px 8px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    width: auto;
`;

const ButtonChip = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 4px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    background-color: ${(props) => (props.chipBackgroundColor)};
    color: ${(props) => (props.chipTextColor)};
    border: none;
    padding: 2px 8px;
    border-radius: 40px;
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    pointer-events: ${(props) => (props.pointerEventsState)};

    &:hover {
        border: none;
        background-color: ${(props) => (props.chipBackgroundHoverColor)};
    }

    &:active {
        border: none;
    }

    &:focus {
        border: none;
        outline: none;
    }
`;

const TrackerContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;  
    justify-content: space-between;
    gap: 4px;
`;

const TrackerProgressBar = styled.div`
    width: ${(props) => getTrackerProgressBarWidth(props.deploymentState)};
    height: 1.5px;
    background-color: #37804D;
    position: absolute;
    border-radius: 24px;
    transition: all 0.3s ease-out;
`;

const getTrackerProgressBarWidth = (state) => {
    switch(state) {
        case 'READY':
            return '0';
        case 'DEPLOYING':
            return '0%';
        case 'APPROVAL':
            return '40%';
        case 'COMPLETING':
            return '60%';
        case 'WRAPPING':
            return '60%';
        case 'COMPLETED':
            return '100%';
        default:
            return '0';
    }
};

const TrackerProgressContainer = styled(TrackerProgressBar)`
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 1;
    width: 100%;  
    overflow: hidden;
    top: 11px;
`;

const getCheckpointProgress = (status) => {
    switch(status) {
        case 'incomplete':
            return {
                background: '#FFFFFF',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                textColor: 'rgba(0, 0, 0, 0.7)'
            };
        case 'pending':
            return {
                background: '#F9F2D4',
                borderColor: '#AE810B',
                textColor: '#AE810B'
            };
        case 'complete':
            return {
                background: '#eff8ec',
                borderColor: '#37804D',
                textColor: '#37804D'
            };
        default:
            return {
                background: '#FFFFFF',
                borderColor: 'rgba(0, 0, 0, 0.2)',
                textColor: 'rgba(0, 0, 0, 0.7)'
            };
    }
}

const Checkpoint = styled.div`
    display: flex;  
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 24px;
    border-radius: 8px;
    background-color: ${(props) => getCheckpointProgress(props.status).background};
    border: 
        1.5px
        solid 
        ${(props) => getCheckpointProgress(props.status).borderColor}
    ;
    box-shadow: ${(props) => (props.status === 'pending' ? '0px 0px 0px 4px #ebd8a9' : '0px 0px 0px 0px #ebd8a9')};
    z-index: 2;
    transition: all 0.2s ease-out;

    span {
        color: ${(props) => getCheckpointProgress(props.status).textColor}
    }
`;

const Loader = styled.div`
    width: 16px;
    height: 16px;
    border: 2px solid #AE810B;
    border-top-color: #fffdf8;
    border-radius: 50%;
    animation: spin 0.5s linear infinite;

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default Tracker;