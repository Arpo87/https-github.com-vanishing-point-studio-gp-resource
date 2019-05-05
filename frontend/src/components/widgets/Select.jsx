import React from 'react'
import ExpandMoreIcon from '../../assets/icons/material/ExpandMore'
import './Select.scss'

class Select extends React.Component {
  state = { open: false }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
    document.addEventListener('keydown', this.handleKeyDown)
    this.buttonElement.addEventListener('click', this.handleButtonClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
    document.removeEventListener('keydown', this.handleKeyDown)
    this.buttonElement.removeEventListener('click', this.handleButtonClick)
  }

  render() {
    const { options, value } = this.props
    const { open } = this.state
    const selectedOption = options.find(o => o.key === value)
    const sortedOptions = [...options]
    sortedOptions.sort((first, second) => (first.key === value ? -1 : second.key === value ? 1 : 0))
    return (
      <div className={'select-wrapper' + (open ? ' open' : '')}>
        {open && (
          <div className="anchor">
            <ul className="select-popup">
              {sortedOptions.map((option, i) => (
                <li
                  key={option.key}
                  role="button"
                  className={'select-item' + (option.key === value ? ' selected' : '')}
                  onClick={() => this.updateSelection(option.key)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button type="button" ref={e => (this.buttonElement = e)}>
          <span>{selectedOption ? selectedOption.label : ''}</span>
        </button>
        <ExpandMoreIcon />
      </div>
    )
  }

  handleButtonClick = e => {
    e.stopPropagation()
    this.setState({ open: !this.state.open })
  }

  close = () => {
    this.setState({ open: false })
  }

  handleDocumentClick = e => {
    if (this.state.open) {
      if (document.body === document.activeElement) {
        this.buttonElement.focus()
      }
      this.close()
      e.stopPropagation()
    }
  }

  handleKeyDown = e => {
    if (this.state.open && (e.key === 'Escape' || e.keyCode === 27)) {
      this.close()
      e.stopPropagation()
    }
  }

  updateSelection = value => {
    if (this.props.onChange) this.props.onChange(value)
  }
}

export default Select
