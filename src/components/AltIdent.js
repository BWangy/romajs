import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class AltIdent extends Component {
  render() {
    return (<div className="mdc-layout-grid__inner romajs-formrow">
      <div className="mdc-layout-grid__cell--span-3">
        <label>Alternative identifiers</label>
        <p className="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">
          All documentation elements in ODD have a canonical name, supplied as the value for their ident attribute.
          <br/>The altIdent element is used to supply an alternative name for the corresponding XML object, perhaps in a different language.
        </p>
      </div>
      <div className="mdc-layout-grid__cell--span-8">{
        this.props.altIdent.map((ai, pos) => {
          return (<div key={`ai${pos}`}><div className="mdc-text-field mdc-text-field--upgraded">
            <input autoFocus type="text" className="mdc-text-field__input" value={ai}
              onChange={(e) => this.props.updateElementDocs(this.props.element, 'altIdent', e.target.value, pos)}/>
            <div className="mdc-text-field__bottom-line" style={{transformOrigin: '145px center'}}/>
          </div>
          <i className="material-icons romajs-clickable" onClick={() => { this.props.deleteElementDocs(this.props.element, pos) }}>clear</i>
          </div>)
        })
      }
      <i className="material-icons romajs-clickable" onClick={() => {
        const pos = this.props.altIdent.length
        this.props.updateElementDocs(this.props.element, '', pos)
      }}>add_circle_outline</i>
      </div>
    </div>)
  }
}

AltIdent.propTypes = {
  element: PropTypes.string,
  altIdent: PropTypes.array,
  updateElementDocs: PropTypes.func,
  deleteElementDocs: PropTypes.func
}