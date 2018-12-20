import styled from 'styled-components';
import { Tag } from 'antd';

export const Channel = styled.div`
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
  margin: 0;
`;

export const ChannelInfo = styled.div`
  padding: 15px 15px 15px 23px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    font-size: 16px;
    margin: 0;
  }
`;

export const ChannelTags = styled.div`
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-columns: auto;
`;

export const StyledTag = styled(Tag)`
  align-self: center;
  font-size: 9px;
  border: none;
  margin-right: 3px;
  margin-bottom: 3px;
`;

export const MemberCount = styled.p`
  margin: 0;
  padding: 10px 0;
  font-size: 12px;
`;
