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
  const paddedValues = [...data.values]
  const paddedLabels = [...data.labels]
  for (let i = data.values.length - 1; i < MAX_SLICES; i++) {
    paddedValues.push(0)
    paddedLabels.push('' + i)
  }
  return (
    <div className="bar-stack">
      {data.total > 0 &&
        paddedValues.map((value, i) => {
          const label = paddedLabels[i]
          const width = (value / data.total) * 100 + '%'
          const formattedWidth = formatPercent(value, data.total)
          const isZero = formattedWidth === '0%'

          let textOffset
          if (!isZero && i > 0) {
            textOffset = calculateTextOffset(i, paddedValues, data.total)
          }
          return (
            <div key={label} className={'bar-stack-item color-scale-item' + (isZero ? ' zero' : '')} style={{ width }}>
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

export default BarStack
