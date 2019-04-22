import React from 'react'
import CloseIcon from '../../assets/icons/Close'
import image1 from '../../assets/images/m1.png'
import image2 from '../../assets/images/m2.png'
import './InfoDialog.scss'

const InfoDialog = ({ children, close }) => (
  <div className="info-dialog">
    <div className="dialog-content">
      <h1>Greenpeace Mediterranean</h1>
      <button className="close-button plain" type="button" onClick={close}>
        <CloseIcon />
      </button>
      <div className="content">
        <div className="text">{children}</div>
        <div className="images">
          <img src={image1} alt="" />
          <img src={image2} alt="" />
        </div>
      </div>
    </div>
  </div>
)

const InfoDialogWithText = props => (
  <InfoDialog {...props}>
    <p>Established office in two very different cultural and economic contexts.</p>
    <p>
      <b>Turkey</b>, developing country, with a democratic deficit and an economy in crisis with inflation hitting 25%,
      collapsing currency but a solid fundraising operation that somehow keeps up.
    </p>
    <p>
      <b>Israel</b>, very expensive developed country, with variable political context ref neighbours, militarised
      democracy, but a very weak fundraising operation with a v. different culture of giving.
    </p>
    <p>
      Operating as an NGO in both countries difficult, but more of a direct threat in Turkey with regular arrests of
      civil society leaders.
    </p>
    <p>
      Biggest threats internal, with end of block funding, and contribution demands, combined with historical debt from
      combined entity.
    </p>
  </InfoDialog>
)

export default InfoDialogWithText
