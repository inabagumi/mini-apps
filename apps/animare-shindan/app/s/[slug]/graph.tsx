import clsx from 'clsx'

import { type ResultParameter } from '@/lib/analysis'

import styles from './graph.module.css'

type Props = {
  parameters: ResultParameter[]
  title: string
}

export default function Graph({ parameters, title }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>

      <dl className={styles.body}>
        {parameters.map((parameter, i) => (
          <div className={styles.parameter} key={parameter.label}>
            <dt className={styles.parameterLabel}>
              <span className={styles.parameterLabelText}>
                {parameter.label}
              </span>
            </dt>
            <dd className={styles.parameterValue}>
              <div
                className={styles.graphBar}
                style={{ width: `${parameter.value * 100}%` }}
              >
                <div
                  className={clsx(styles.graphBarValue, {
                    [styles.graphBarValueBlue]: i === 0
                  })}
                />
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
