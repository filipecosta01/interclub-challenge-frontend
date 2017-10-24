import React, { Component } from 'react'

import _ from 'lodash'
import styled from 'styled-components'

const StyledSearchWrapper = styled.div`
    display: flex;
`;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledMagnify = styled.i`
    width: 20px;
    margin-top: 9px;
    cursor: pointer;
    margin-left: -32px;
    display: inline-block;
    background-repeat: no-repeat;
    background-color: transparent;
    background-image: url('../assets/search.svg');
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

const StyledUnorderedList = styled.ul`
    padding: 0;
    margin: 0 auto;
`

const StyledOption = styled.li`
    display: flex;

    width: 300px;
    background-color: #FFF;
    border: 2px solid #c917a0;
    padding: 10px 32px 10px 10px;

    &:focus {
        outline: none;
    }

    &:hover {
        opacity:0.6
    }

    cursor: pointer;
`

export default class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchValue: '',
            onChangeText: () => {},
            optionSelected: ''
        }

        this._handleSelectedOption = this._handleSelectedOption.bind(this)
    }

    componentWillMount() {
        const { onChangeText } = this.props
        this.setState({ onChangeText: _.debounce(onChangeText, 100) })
    }

    _handleSelectedOption(event) {
        event.preventDefault()

        const value = event.target.value
        const { filteredMembers, onChangeText } = this.props

        const memberSelected = filteredMembers.filter(member => member['number'] === value)[0]
        const selectedValue = [memberSelected['first_name'], memberSelected['last_name']].join(' ')

        onChangeText(selectedValue)
        this.setState({ searchValue: selectedValue, optionSelected: memberSelected })
    }

    render() {
        const { searchValue, optionSelected } = this.state
        const { filteredMembers } = this.props
        const shouldDisplayDropdown = !_.isEmpty(searchValue) && filteredMembers.length > 0 && !optionSelected

        return (
            <StyledWrapper>
                <StyledSearchWrapper>
                    <StyledInput
                        type='text'
                        value={searchValue}
                        onChange={this._handleSearchValueChange}
                        placeholder='Enter Member Name or Number...' />
                    <StyledMagnify onClick={() => this.props.onChangeText(searchValue)} />
                </StyledSearchWrapper>
                {shouldDisplayDropdown &&
                    <StyledUnorderedList>
                        {filteredMembers.map(member =>
                            <StyledOption
                                key={member['number']}
                                value={member['number']}
                                onClick={this._handleSelectedOption}>
                                    {[member['first_name'], member['last_name']].join(' ')}
                            </StyledOption>
                        )}
                    </StyledUnorderedList>
                }
            </StyledWrapper>
        )
    }

    _handleSearchValueChange = e => {
        const { onChangeText } = this.state
        const text = e.target.value
        this.setState({ searchValue: text, optionSelected: '' })

        return onChangeText(text)
    }
}
