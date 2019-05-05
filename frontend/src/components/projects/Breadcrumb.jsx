import React from 'react'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '../../assets/icons/material/ArrowForward'
import './Breadcrumb.scss'

const Breadcrumb = ({ name }) =>
  name ? (
    <h1 className="breadcrumb">
      <Link to="/projects">Projects</Link>
      <ArrowForwardIcon />
      <span>{name}</span>
    </h1>
  ) : (
    <h1 className="breadcrumb">Projects</h1>
  )

export default Breadcrumb
