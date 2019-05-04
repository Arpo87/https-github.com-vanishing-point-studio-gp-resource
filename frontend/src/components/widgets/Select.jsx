import React from 'react'
import ExpandMoreIcon from '../../assets/icons/material/ExpandMore'
import './Select.scss'

class Select extends React.Component {
  state = {
    open: false,
    selection: this.props.options.length > 0 ? this.props.options[0] : '',
  }

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
    const { options } = this.props
    const { open, selection } = this.state
    const sortedOptions = [...options]
    sortedOptions.sort((first, second) => (first === selection ? -1 : second === selection ? 1 : 0))
    return (
      <div className={'select-wrapper' + (open ? ' open' : '')}>
        {open && (
          <div className="anchor">
            <ul className="select-popup">
              {sortedOptions.map((option, i) => (
                <li
                  key={option}
                  role="button"
                  className={'select-item' + (option === selection ? ' selected' : '')}
                  onClick={() => this.updateSelection(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button type="button" ref={e => (this.buttonElement = e)}>
          <span>{selection}</span>
        </button>
        <ExpandMoreIcon />
      </div>
    )
  }

  handleButtonClick = e => {
    e.stopPropagation()
    this.setState({ open: !this.state.open, keyFocus: -1 })
  }

  close = () => {
    this.setState({ open: false, keyFocus: -1 })
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

  updateSelection = selection => {
    this.setState({ selection })
  }
}

export default Select
