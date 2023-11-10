import React from 'react';
import styled from 'styled-components';

// 헤더 스타일드 컴포넌트
const HeaderWrapper = styled.header`
  background-color: #3498db;
  padding: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Navigation = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 20px;

    li {
      a {
        text-decoration: none;
        color: white;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

// 헤더 컴포넌트
const Header = () => {
  return (
    <HeaderWrapper>
      <Logo>Moogeul</Logo>
      <Navigation>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/report">Report</a></li>
        </ul>
      </Navigation>
    </HeaderWrapper>
  );
};

export default Header;