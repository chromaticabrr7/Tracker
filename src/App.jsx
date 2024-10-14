import React, { useState , useCallback} from 'react'
import Tracker from './components/Styled/Tracker'
import './Normalize.css'
import './App.css'

function App() {
  const [deploymentState, setDeploymentState] = useState({
    state: 'READY',
    stageReadout: 'Ready to deploy',
    environment: ['dev', 'staging', 'approval', 'prod'],
    progress: ['incomplete', 'incomplete', 'incomplete', 'incomplete'],
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
          stageReadout: 'Deploying to dev',
          progress: ['pending', 'incomplete', 'incomplete', 'incomplete'],
          progressChipLabel: 'Deploying',
          chipBackgroundColor: '#F9F2D4',
          chipTextColor: '#AE810B',
          chipBackgroundHoverColor: '#e7ddb0',
          pointerEventsState: 'none'
      }));

      setTimeout(() => {
          setDeploymentState(prevState => ({
              ...prevState,
              state: 'DEPLOYING',
              stageReadout: 'Deploying to staging',
              progress: ['complete', 'pending', 'incomplete', 'incomplete'],
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
                progress: ['complete', 'complete', 'pending', 'incomplete'],
                progressChipLabel: 'Needs approval',
                chipBackgroundColor: '#F9F2D4',
                chipTextColor: '#AE810B',
                chipBackgroundHoverColor: '#e7ddb0',
                pointerEventsState: 'none'
            }));
        }, 3000);
      }, 2000);

  }, []);

  const handleApproval = useCallback(() => {
      setDeploymentState(prevState => ({
          ...prevState,
          state: 'COMPLETING',
          stageReadout: 'Deploying to prod',
          progress: ['complete', 'complete', 'complete', 'pending'],
          progressChipLabel: 'Deploying',
          chipBackgroundColor: '#F9F2D4',
          chipTextColor: '#AE810B',
          chipBackgroundHoverColor: '#e7ddb0',
          pointerEventsState: 'none'
      }));

      setTimeout(() => {
          setDeploymentState(prevState => ({
              ...prevState,
              state: 'WRAPPING',
              stageReadout: 'Tying up loose ends',
              progress: ['complete', 'complete', 'complete', 'pending'],
              progressChipLabel: 'Wrapping up',
              chipBackgroundColor: '#F9F2D4',
              chipTextColor: '#AE810B',
              chipBackgroundHoverColor: '#e7ddb0',
              pointerEventsState: 'none'
          }));

          setTimeout(() => {
              setDeploymentState(prevState => ({
                  ...prevState,
                  state: 'COMPLETED',
                  stageReadout: 'Successfully deployed',
                  progress: ['complete', 'complete', 'complete', 'complete'],
                  progressChipLabel: 'Completed',
                  chipBackgroundColor: '#CFE9C5',
                  chipTextColor: '#37804D',
                  chipBackgroundHoverColor: '#b5d6a8',
                  pointerEventsState: 'none'
              }))
          }, 2000)
      }, 4000)

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
