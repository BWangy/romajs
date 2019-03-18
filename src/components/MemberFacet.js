import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MembersFacet extends Component {
  toggleMemberTypeVisibility(type) {
    // Option of aggregating. Keeping it here in case after user testing we decide to switch back.
    // const types = new Set(this.props.visibleMemberTypes)
    // if (types.has(type)) {
    //   if (types.size > 1) {
    //     types.delete(type)
    //   }
    // } else {
    //   types.add(type)
    // }
    if (this.props.visibleMemberTypes.indexOf(type) === -1) {
      this.props.setMemberTypeVisibility([type])
    }
  }

  render() {
    let checkmark = ''
    let activeClass = ''
    if (this.props.visibleMemberTypes.indexOf(this.props.type) !== -1) {
      checkmark = <i className="material-icons mdc-chip__icon mdc-chip__icon--leading">done</i>
      activeClass = 'romajs-active'
    }
    return (
      <div className={`mdc-chip mdc-ripple-upgraded ${activeClass}`} onClick={() => {
        this.toggleMemberTypeVisibility(this.props.type)
      }}>
        {checkmark}
        <div className="mdc-chip__text">{this.props.label}</div>
      </div>
    )
  }
}

MembersFacet.propTypes = {
  setMemberTypeVisibility: PropTypes.func.isRequired,
  visibleMemberTypes: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}
