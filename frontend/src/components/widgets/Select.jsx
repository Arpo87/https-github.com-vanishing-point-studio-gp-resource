import React from 'react'
import ExpandMoreIcon from '../../assets/icons/material/ExpandMore'
import './Select.scss'

class Select extends React.Component {
  state = {
    open: false,
    selection: this.props.options.length > 0 ? this.props.options[0] : '',
    keyFocus: -1,
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
    const { open, selection, keyFocus } = this.state
    return (
      <div className={'select-wrapper' + (open ? ' open' : '')}>
        {open && (
          <div className="anchor">
            <ul className="select-popup">
              {options.map((option, i) => (
                <li
                  key={option}
                  role="button"
                  className={
                    'select-item' + (option === selection ? ' selected' : '') + (i === keyFocus ? ' key-focus' : '')
                  }
                  onClick={() => this.updateSelection(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button type="button" ref={e => (this.buttonElement = e)} onKeyDown={this.handleButtonKeyDown}>
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

  handleButtonKeyDown = e => {
    if (e.key === 'ArrowDown' || e.keyCode === 40) {
      this.incrementKeyFocus(1)
    } else if (e.key === 'ArrowUp' || e.keyCode === 38) {
      this.incrementKeyFocus(-1)
    } else if (e.key === 'Enter' || e.keyCode === 13) {
      if (this.state.keyFocus > -1) {
        this.setState({ selection: this.props.options[this.state.keyFocus], open: false, keyFocus: -1 })
        e.preventDefault()
      }
    }
  }

  incrementKeyFocus = amount => {
    const l = this.props.options.length
    let keyFocus
    if (this.state.keyFocus === -1) {
      keyFocus = amount > 0 ? 0 : l - 1
    } else {
      const sum = this.state.keyFocus + amount
      keyFocus = sum >= 0 ? sum % l : (sum + l) % l
    }
    this.setState({ keyFocus })
  }
}

export default Select
