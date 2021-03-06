import React from "react";
import {create} from 'react-test-renderer'
import StatusProfile from "../StatusProfile";

describe('StatusProfileComponent', () => {
  test('after creation <span> should be displayed', () => {
    const component = create(<StatusProfile status={'Testing status'}/>)
    const root = component.root
    const span = root.findByType('span')
    expect(span).not.toBeNaN()
  })
  test('after creation span should be displayed with correct text', () => {
    const component = create(<StatusProfile status={'Testing status'}/>)
    const root = component.root
    const span = root.findByType('span')
    expect(span.children[0]).toBe('Testing status')
  })
  test('after creation <input> should`t be displayed', () => {
    const component = create(<StatusProfile status={'Testing status'}/>)
    const root = component.root
    expect(() => {
      root.findByType('input')
    }).toThrow()
  })
  test('input should be displayed in editMode instead of span', () => {
    const component = create(<StatusProfile status={'Testing status'}/>)
    const root = component.root
    const span = root.findByType('span')
    span.props.onDoubleClick()
    const input = root.findByType('input')
    expect(input.props.value).toBe('Testing status')
  })
})