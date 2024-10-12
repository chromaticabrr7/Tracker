import React, { useState , useCallback} from 'react'
import Tracker from './components/Styled/Tracker'
import './Normalize.css'
import './App.css'

function App() {
  const [deploymentState, setDeploymentState] = useState({
    state: 'READY',
    stageReadout: 'Ready to deploy',
    progress: [false, false, false, false],
    progressChipLabel: 'Ready to deploy',
    chipBackgroundColor: '#F1F1F1',
    chipTextColor: '#4C4C4C',
    chipBackgroundHoverColor: '#d9d9d9',
    pointerEventsState: 'all'
  });

  const handleDeploy = useCallback(() => {
      setDeploymentState(prevState => ({
          ...prevState,
          state: 'DEPLOYING',
          stageReadout: 'Deploying to dev and staging',
          progress: [true, false, false, false],
          progressChipLabel: 'Deploying',
          chipBackgroundColor: '#F9F2D4',
          chipTextColor: '#AE810B',
          chipBackgroundHoverColor: '#e7ddb0',
          pointerEventsState: 'none'
      }));

      setTimeout(() => {
          setDeploymentState(prevState => ({
              ...prevState,
              state: 'APPROVAL',
              stageReadout: 'Manual approval',
              progress: [true, true, false, false],
              progressChipLabel: 'Needs approval',
              chipBackgroundColor: '#F9F2D4',
              chipTextColor: '#AE810B',
              chipBackgroundHoverColor: '#e7ddb0',
              pointerEventsState: 'none'
          }));
      }, 2000);
  }, []);

  const handleApproval = useCallback(() => {
      setDeploymentState(prevState => ({
          ...prevState,
          state: 'COMPLETING',
          stageReadout: 'Deploying to prod',
          progress: [true, true, true, false],
          progressChipLabel: 'Completing deploy',
          chipBackgroundColor: '#F9F2D4',
          chipTextColor: '#AE810B',
          chipBackgroundHoverColor: '#e7ddb0',
          pointerEventsState: 'none'
      }));

      setTimeout(() => {
          setDeploymentState(prevState => ({
              ...prevState,
              state: 'COMPLETED',
              stageReadout: 'Deploy successful',
              progress: [true, true, true, true],
              progressChipLabel: 'Completed',
              chipBackgroundColor: '#CFE9C5',
              chipTextColor: '#37804D',
              chipBackgroundHoverColor: '#b5d6a8',
              pointerEventsState: 'none'
          }));
      }, 4000);
  }, []);

  return (
    <>
      <Tracker 
        deploymentState={deploymentState}
        onDeploy={handleDeploy}
        onApprove={handleApproval}
      />
    </>
  )
}

export default App
