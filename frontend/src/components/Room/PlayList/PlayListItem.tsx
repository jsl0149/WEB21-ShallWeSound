import React, { useState } from 'react';
import styled from 'styled-components';
import { useSocket } from '../../../context/MyContext';

type Props = {
  MID: number;
  title: string;
  singer: string;
  isPlayed: boolean;
  isHost: boolean;
};

type TextProps = {
  color: string;
  weight: string;
  size: string;
};

const PlayListItem = ({ MID, title, singer, isPlayed, isHost }: Props) => {
  const socket: any = useSocket();
  const [isHover, setIsHover] = useState(false);

  const hoverOn = () => setIsHover(true);
  const hoverOut = () => setIsHover(false);

  const clickPlay = () => {
    if (isHost) socket.emit('clickAndPlayMusic', title);
  };

  const onRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    socket.emit('removeMusicInPlayListReq', MID);
  };

  return (
    <Item isPlayed={isPlayed} onMouseEnter={hoverOn} onMouseLeave={hoverOut} onClick={clickPlay}>
      <Layout>
        <TextWrapper>
          <Text color="#ffffff" weight="500" size="18px">
            {title}
          </Text>
          <Text color="#FAFAFA" weight="0" size="14px">
            {singer}
          </Text>
        </TextWrapper>
        {isHover ? isHost ? <CancelButton onClick={onRemove}>X</CancelButton> : <Detail></Detail> : <Detail></Detail>}
      </Layout>
    </Item>
  );
};

const Item = styled.div<{ isPlayed: boolean }>`
  height: 50px;
  margin: 0px 20px;
  padding: 4px 0px;
  line-height: 25px;
  background: ${props => (props.isPlayed ? '#ffffff1a' : 'transparent')};

  &:not(:last-child) {
    border-bottom: 1px solid #ecdff5;
  }
`;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const TextWrapper = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
`;

const Text = styled.div<TextProps>`
  color: ${props => props.color};
  font-weight: ${props => props.weight};
  font-size: ${props => props.size};
  margin: 0px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Detail = styled.div`
  position: relative;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #ffffff;
  margin-right: 10px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: inherit;
    border-radius: inherit;
  }

  &:before {
    top: -7px;
  }

  &:after {
    top: 7px;
  }
`;

const CancelButton = styled.button`
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
`;

export default PlayListItem;
