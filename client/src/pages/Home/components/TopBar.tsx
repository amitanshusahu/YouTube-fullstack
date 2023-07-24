import styled from 'styled-components'

export default function TopBar() {
  return (
    <StyledDiv>
      <div className="input-wrapper">
        <input type="search" placeholder='Search..' />
      </div>

    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  width: calc(100% - 60px);
  padding: 30px;
  padding-top: 30px;
  background-color: white;
`