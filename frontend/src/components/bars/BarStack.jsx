import React from 'react'
import { formatPercent } from '../../utils'
import './BarStack.scss'

const THRESHOLD_TO_BUMP_RIGHT = 0.02
const BUMP_VALUE = 12
const MAX_SLICES = 8

const findPreviousVisibleValue = (currentIndex, values, total) => {
  for (let i = currentIndex - 1; i >= 0; i--) {
    const isVisible = formatPercent(values[i], total) !== '0%'
    if (isVisible) {
      return { value: values[i], index: i }
    }
  }
  return null
}

const calculateTextOffset = (currentIndex, values, total) => {
  let index = currentIndex
  let offset = 0
  while (index > 0) {
    const previousVisible = findPreviousVisibleValue(index, values, total)
    if (previousVisible && previousVisible.value / total < THRESHOLD_TO_BUMP_RIGHT) {
      offset += BUMP_VALUE
      index = previousVisible.index
    } else {
      break
    }
  }
  return offset
}

const BarStack = ({ data }) => {
  return (
    <div className="bar-stack">
      {data.total > 0 &&
        data.values.map((value, i) => {
          const width = (value / data.total) * 100 + '%'
          const formattedWidth = formatPercent(value, data.total)
          const isZero = formattedWidth === '0%'

          let textOffset
          if (!isZero && i > 0) {
            textOffset = calculateTextOffset(i, data.values, data.total)
          }
          return (
            <div key={i} className={'bar-stack-item color-scale-item' + (isZero ? ' zero' : '')} style={{ width }}>
              <div className="bar color-scale-background" />
              <div className="value" style={textOffset ? { marginLeft: textOffset + 'px' } : undefined}>
                {formattedWidth}
              </div>
            </div>
          )
        })}
    </div>
  )
}

const BarStackPadded = ({ data }) => {
  const values = [...data.values]
  const labels = [...data.labels]
  for (let i = data.values.length - 1; i < MAX_SLICES; i++) {
    values.push(0)
    labels.push('')
  }
  return <BarStack data={{ values, labels, total: data.total }} />
}

export default BarStackPadded
