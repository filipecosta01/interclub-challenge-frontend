import React, {Component} from 'react'

import _ from 'lodash'
import styled from 'styled-components'
import ReactLoading from 'react-loading'

import SearchBar from '../../components/SearchBar'

const StyledWrapper = styled.div`
    width: 100vw;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledMask = styled.div`
    background-color: #FFF;
    display: block;
    width: 100%;
    height: 20vh;
    top: 0;
    left: 0;
    z-index: -1;

    &::after {
        background-color: #7E57C2;
        content: '';
        display: block;
        width: 100%;
        height: calc(100% - 20vh);
        overflow-y: auto;
        position: absolute;
        top: calc(20vh + 22px);
        z-index: -1;
    }
`

const StyledLogoLink = styled.a`
    position: absolute;
    z-index: 2;
    top: 50px;
    left: 50px;
    width: 48px;
    height: 48px;
`

const StyledResults = styled.div`
display: flex;
padding: 50px;
flex-wrap: wrap;
flex-direction: row;
justify-content: center;
max-height: 70vh;
overflow-y: auto;
`

const StyledMemberCard = styled.div`
color: #FFF;
display: flex;
padding: 15px;
cursor: pointer;
transition: 0.3s;
border-radius: 5px;
align-items: center;
margin: 0 25px 25px 0;
min-width: 250px;
flex-direction: column;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
    }
`

const StyledMemberCardPhoto = styled.img`
border-radius: 5px 5px 0 0;
width: 50px;
height: 50px;
`

const StyledMemberCardInfo = styled.div`
display: flex;
padding: 2px 16px;
flex-direction: column;
align-items: center;
`

const StyledEmptyResultMessage = styled.span`
    color: #FFF;
    font-size: 20px;
    font-weight: bold;
`

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasSearch: false
        }

        this.onChangeText = this.onChangeText.bind(this)
    }

    componentDidMount() {
        const { getMembers } = this.props

        getMembers()
    }

    onChangeText(searchValue) {
        const { filterMembers } = this.props

        this.setState({ hasSearch: !_.isEmpty(searchValue) })

        filterMembers(searchValue)
    }

    render() {
        const { isLoading, members, filteredMembers } = this.props
        const { hasSearch } = this.state

        const elementsToRender = hasSearch ? filteredMembers : members
        const showEmptyResultMessage = members.length === 0 || hasSearch && filteredMembers.length === 0

        return (
            <StyledWrapper>
                <StyledMask />
                <StyledLogoLink href='https://interclub.io' target='_blank'>
                    <img src='/assets/logo_48x48.png' />
                </StyledLogoLink>
                <SearchBar onChangeText={this.onChangeText} filteredMembers={filteredMembers} />
                <StyledResults>
                    {isLoading && <ReactLoading type="spinningBubbles" color="#FFF" />}
                    {!isLoading && showEmptyResultMessage && <StyledEmptyResultMessage>No members found.</StyledEmptyResultMessage>}
                    {!isLoading && !showEmptyResultMessage && elementsToRender.map(member =>
                        <StyledMemberCard key={member.id}>
                            <StyledMemberCardPhoto src="/assets/no_profile.png" alt="Avatar" />
                            <StyledMemberCardInfo>
                                <h3>
                                    {member['first_name']}
                                    {' '}
                                    {member['last_name']}
                                </h3>
                                <span>Id: {member['number']}</span>
                            </StyledMemberCardInfo>
                        </StyledMemberCard>
                    )}
                </StyledResults>
            </StyledWrapper>
        )
    }
}
