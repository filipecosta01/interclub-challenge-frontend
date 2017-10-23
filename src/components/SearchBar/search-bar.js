import React, { Component } from 'react'

import _ from 'lodash'
import searchImage from '../../static/images/search.svg'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
`;

const StyledMagnify = styled.i`
    width: 20px;
    margin-top: 9px;
    cursor: pointer;
    margin-left: -32px;
    display: inline-block;
    background-repeat: no-repeat;
    background-color: transparent;
    background-image: url(${searchImage});
`;

const StyledInput = styled.input`
    display: flex;

    border-radius: 2px;
    width: 300px;
    padding: 10px 32px 10px 10px;
    font-size: 16px;
    border: 2px solid #c917a0;

    &:focus {
        outline: none;
    }

`;

export default class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchValue: '',
            onChangeText: () => {}
        }
    }

    componentWillMount() {
        const { onChangeText } = this.props
        this.setState({ onChangeText: _.debounce(onChangeText, 300) })
    }

    render() {
        const { searchValue } = this.state

        return (
            <StyledWrapper>
                    <StyledInput
                        type='text'
                        value={searchValue}
                        onChange={this._handleSearchValueChange}
                        placeholder='Enter Member Name or Number...' />
                    <StyledMagnify onClick={() => this.props.onChangeText(searchValue)} />
            </StyledWrapper>
        )
    }

    _handleSearchValueChange = e => {
        const { onChangeText } = this.state
        const text = e.target.value
        this.setState({ searchValue: text })

        return onChangeText(text)
    }
}
