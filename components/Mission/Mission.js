import styles from './mission.module.scss'
import PageTitle from '../PageTitle'
import Error from '../Error'

export const Mission = ({mission, gotInfo}) => {
  if (!gotInfo) {
    return (
      <>
        <PageTitle title={mission.name} />
        <Error message="No data found for this mission!" />
      </>
    )
  } else {
    return (
      <>
        <PageTitle title={mission.name} />
      </>
    )
  }
}