import { ReducerException } from '../utils/exceptions'
import { clone } from '../utils/clone'
import {
  DELETE_ATTRIBUTE_DOCS, UPDATE_ATTRIBUTE_DOCS, SET_NS, SET_USAGE
} from '../actions/attributes'

function markChange(member) {
  if (member._changed) {
    const changes = new Set(member._changed)
    changes.add('attributes')
    member._changed = Array.from(changes)
  } else {
    member._changed = ['attributes']
  }
}

function markAttChange(attribute, whatChanged) {
  if (attribute._changed) {
    const changes = new Set(attribute._changed)
    changes.add(whatChanged)
    attribute._changed = Array.from(changes)
  } else {
    attribute._changed = [whatChanged]
  }
}

function updateDocEl(m, action) {
  if (m.ident === action.member) {
    markChange(m)
    const att = m.attributes.filter(a => (a.ident === action.attr))[0]
    if (Array.isArray(att[action.docEl]) && action.index !== undefined) {
      att[action.docEl][action.index] = action.content
      markAttChange(att, action.docEl)
    } else {
      throw new ReducerException(`Description element content does not match ${action.content}.`)
    }
  }
}

function delDocEl(m, action) {
  if (m.ident === action.member) {
    markChange(m)
    const att = m.attributes.filter(a => (a.ident === action.attr))[0]
    if (Array.isArray(att[action.docEl]) && action.index !== undefined) {
      att[action.docEl].splice(action.index, 1)
      markAttChange(att, action.docEl)
    } else {
      throw new ReducerException(`Description element content does not match ${action.content}.`)
    }
  }
}

function setNs(m, action) {
  if (m.ident === action.member) {
    markChange(m)
    const att = m.attributes.filter(a => (a.ident === action.attr))[0]
    att.ns = action.ns
    markAttChange(att, 'ns')
  }
}

function setUsage(m, action) {
  if (m.ident === action.member) {
    markChange(m)
    const att = m.attributes.filter(a => (a.ident === action.attr))[0]
    att.usage = action.usage
    markAttChange(att, 'usage')
  }
}

export function oddAttributes(state, action) {
  const newState = clone(state)
  const customizationObj = newState.customization
  const customization = customizationObj.json
  switch (action.type) {
    case UPDATE_ATTRIBUTE_DOCS:
      switch (action.memberType) {
        case 'element':
          customization.elements.forEach(m => updateDocEl(m, action))
          break
        case 'class':
          customization.classes.attributes.forEach(m => updateDocEl(m, action))
          break
        default:
      }
      return newState
    case DELETE_ATTRIBUTE_DOCS:
      switch (action.memberType) {
        case 'element':
          customization.elements.forEach(m => delDocEl(m, action))
          break
        case 'class':
          customization.classes.attributes.forEach(m => delDocEl(m, action))
          break
        default:
      }
      return newState
    case SET_NS:
      switch (action.memberType) {
        case 'element':
          customization.elements.forEach(m => setNs(m, action))
          break
        case 'class':
          customization.classes.attributes.forEach(m => setNs(m, action))
          break
        default:
      }
      return newState
    case SET_USAGE:
      switch (action.memberType) {
        case 'element':
          customization.elements.forEach(m => setUsage(m, action))
          break
        case 'class':
          customization.classes.attributes.forEach(m => setUsage(m, action))
          break
        default:
      }
      return newState
    default:
      return state
  }
}
