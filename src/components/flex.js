import styled from 'styled-components';

export const Flex = styled.div`{
  display: flex;

  & > * {
    flex-grow: 1;
  }
}`;
