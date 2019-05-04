import styled, { css } from "styled-components";


export const Container = styled.div`
  display: flex;
  position: relative;

  ${p => p.flexDirection && `flex-direction: ${p.flexDirection}`};

  ${p => p.flex && `flex: ${p.flex}`};

  ${p => p.zIndex && `z-index: ${p.zIndex}`};

  ${p =>
    p.height && Number.isInteger(p.height)
      ? css`
          height: ${p.height}px;
        `
      : css`
          height: ${p.height};
        `};

  ${p =>
    p.width && Number.isInteger(p.width)
      ? css`
          width: ${p.width}px;
        `
      : css`
          width: ${p.width};
        `};
`;
