import styled, { keyframes } from 'styled-components';

export function Loading() {
  return (
    <CardSkeleton>
      <ProductSkeleton width="13%" height="25px" marginTop="13px" />
      <Container>
        <Wrap>
          <ProductSkeleton width="45%" height="35px" />
          <ProductSkeleton width="45%" height="35px" />
        </Wrap>
        <WrapL>
          <ProductSkeleton width="48%" height="35px" />
          <ProductSkeleton width="48%" height="35px" />
        </WrapL>
      </Container>
      <ProductSkeleton marginTop="12px" height="40px" />
      <WrapB>
        <ProductSkeleton marginTop="180px" width="100%" height="35px" />
      </WrapB>
    </CardSkeleton>
  );
}
const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const CardSkeleton = styled.div`
  width: 680px;
  height: 414px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 20px;
`;

const ProductSkeleton = styled.div`
  display: inline-block;
  height: ${(props) => props.height || '14px'};
  width: ${(props) => props.width || '94%'};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-bottom: 8px;
  margin-top: ${(props) => props.marginTop || '0'};
  margin-right: ${(props) => props.marginRight || '20px'};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 660px;
`;

const Wrap = styled.span`
  display: flex;
  width: 50%;
`;

const WrapL = styled.span`
  display: flex;
  width: 37%;
`;

const WrapB = styled.span`
  width: 20%;
  margin-left: 250px;
`;
